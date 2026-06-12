'use client'

import {useState, useCallback} from 'react'
import {motion, AnimatePresence} from 'motion/react'
import {Calendar, ArrowRight} from 'lucide-react'
import {stegaClean} from 'next-sanity'
import {toPlainText} from '@portabletext/toolkit'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {PortableTextRenderer} from '../../shared/PortableTextRenderer'
import {cn} from '@/lib/utils'
import {easing} from '@/lib/animations'
import {openCalendly} from '@/lib/site-cta'
import type {FaqBlockData} from '@/types/sanity'

type FaqItem = NonNullable<FaqBlockData['items']>[number]

// --- JSON-LD -----------------------------------------------------------------

function buildJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
      .filter((item) => item.question && item.answer)
      .map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer ? toPlainText(item.answer) : '',
        },
      })),
  }
}

// --- Default variation (two-column accordion) --------------------------------

function FAQColumn({
  items,
  openKey,
  onToggle,
  isSecondaryColumn = false,
}: {
  items: FaqItem[]
  openKey: string | null
  onToggle: (key: string) => void
  /** Right column: keep top border on mobile where columns stack (union point). */
  isSecondaryColumn?: boolean
}) {
  return (
    <div className="flex flex-col">
      {items.map((item) => {
        const isOpen = openKey === item._key
        return (
          <div
            key={item._key}
            className={cn(
              'border-t border-border',
              isSecondaryColumn ? 'md:first:border-t-0' : 'first:border-t-0',
            )}
          >
            <button
              type="button"
              onClick={() => onToggle(item._key)}
              className={cn(
                'w-full flex items-start justify-between gap-4 py-5 text-left transition-opacity duration-200',
                isOpen ? 'opacity-100' : 'opacity-90',
              )}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium leading-snug pr-2 sm:text-[15px]">
                {item.question || 'Untitled'}
              </span>
              <span
                className="shrink-0 w-6 text-center text-xl font-light leading-none select-none opacity-80"
                aria-hidden
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{height: 0, opacity: 0}}
                  animate={{height: 'auto', opacity: 1}}
                  exit={{height: 0, opacity: 0}}
                  transition={{duration: 0.28, ease: easing.smooth}}
                  className="overflow-hidden"
                >
                  <div className="pb-5 pr-8 text-sm leading-relaxed opacity-70">
                    {item.answer && item.answer.length > 0 ? (
                      <PortableTextRenderer value={item.answer} />
                    ) : (
                      <p>No answer provided.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

function DefaultFaq({data}: {data: FaqBlockData}) {
  const allowMultipleOpen = data.allowMultipleOpen ?? true
  const firstOpenByDefault = data.firstOpenByDefault ?? false
  const items = data.items || []

  const initialOpenKey =
    firstOpenByDefault && items.length > 0 ? items[0]._key : null

  const [openKey, setOpenKey] = useState<string | null>(initialOpenKey)
  const [leftOpenKey, setLeftOpenKey] = useState<string | null>(initialOpenKey)
  const [rightOpenKey, setRightOpenKey] = useState<string | null>(null)

  const toggleGlobal = useCallback(
    (key: string) => {
      setOpenKey((prev) => (prev === key ? null : key))
    },
    [],
  )

  const toggleLeft = useCallback(
    (key: string) => {
      setLeftOpenKey((prev) => {
        const next = prev === key ? null : key
        if (!allowMultipleOpen) setRightOpenKey(null)
        return next
      })
    },
    [allowMultipleOpen],
  )

  const toggleRight = useCallback(
    (key: string) => {
      setRightOpenKey((prev) => {
        const next = prev === key ? null : key
        if (!allowMultipleOpen) setLeftOpenKey(null)
        return next
      })
    },
    [allowMultipleOpen],
  )

  if (items.length === 0) return null

  const mid = Math.ceil(items.length / 2)
  const left = items.slice(0, mid)
  const right = items.slice(mid)
  const hasHeader = Boolean(data.title || data.subtitle)

  return (
    <div>
      {data.title && (
        <h2 className="text-2xl font-heading font-bold tracking-tight sm:text-3xl">
          {data.title}
        </h2>
      )}
      {data.subtitle && (
        <p className="mt-2 text-base opacity-70">{data.subtitle}</p>
      )}
      <div
        className={cn(
          'grid md:grid-cols-2 md:gap-x-12 lg:gap-x-20',
          hasHeader && 'mt-8',
        )}
      >
        {allowMultipleOpen ? (
          <>
            <FAQColumn items={left} openKey={leftOpenKey} onToggle={toggleLeft} />
            <FAQColumn
              items={right}
              openKey={rightOpenKey}
              onToggle={toggleRight}
              isSecondaryColumn
            />
          </>
        ) : (
          <>
            <FAQColumn items={left} openKey={openKey} onToggle={toggleGlobal} />
            <FAQColumn
              items={right}
              openKey={openKey}
              onToggle={toggleGlobal}
              isSecondaryColumn
            />
          </>
        )}
      </div>
    </div>
  )
}

// --- Grouped variation -------------------------------------------------------

type FaqGroup = {
  _key: string
  label?: string
  accent?: string
  items?: FaqItem[]
}

type GroupedFaqData = FaqBlockData & {
  variation?: string
  eyebrow?: string
  showCta?: boolean
  ctaLabel?: string
  groups?: FaqGroup[]
}

function GroupedFaq({data}: {data: GroupedFaqData}) {
  const groups: FaqGroup[] = (data.groups as FaqGroup[] | undefined) ?? []
  const allItems = groups.flatMap((g) => g.items ?? [])
  const enableSchema = data.enableSchema ?? true
  const showCta = data.showCta ?? false
  const ctaLabel = data.ctaLabel || 'Book a Conversation'

  return (
    <div>
      {enableSchema && allItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(buildJsonLd(allItems))}}
        />
      )}

      <motion.div
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: '-80px'}}
        transition={{duration: 0.5}}
        className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          {data.eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {data.eyebrow}
            </p>
          )}
          {data.title && (
            <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-[2.625rem]">
              {data.title}
            </h2>
          )}
        </div>
        {showCta && (
          <button
            type="button"
            onClick={() => openCalendly()}
            className="group inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground"
          >
            <Calendar className="h-4 w-4" />
            {ctaLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        )}
      </motion.div>

      <motion.div
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: '-40px'}}
        transition={{duration: 0.5}}
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="faq-all" className="border-b-0">
            <AccordionTrigger
              className={cn(
                'px-6 py-5 text-left transition-colors duration-200 hover:no-underline',
                'text-base font-semibold text-foreground data-[state=open]:text-foreground hover:text-foreground',
              )}
            >
              <div className="flex w-full items-center justify-between gap-4 pr-3">
                <div className="min-w-0">
                  <p>View all frequently asked questions</p>
                  <p className="mt-1 text-xs font-normal">
                    Tap to expand the complete section
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-8">
                {groups.map((group) => {
                  const accent = stegaClean(group.accent) as string | undefined
                  return (
                    <div key={group._key} className="space-y-4">
                      {group.label && (
                        <p
                          className={cn(
                            'text-[11px] font-semibold uppercase tracking-[0.13em]',
                            accent === 'secondary' ? 'text-secondary-foreground' : 'text-primary',
                          )}
                        >
                          {group.label}
                        </p>
                      )}
                      <div className="space-y-5">
                        {(group.items ?? []).map((item) => (
                          <div key={item._key} className="space-y-2">
                            <h3 className="text-base font-semibold text-foreground">
                              {item.question}
                            </h3>
                            {item.answer && item.answer.length > 0 ? (
                              <div className="prose prose-sm max-w-none font-light leading-relaxed text-foreground">
                                <PortableTextRenderer value={item.answer} />
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </div>
  )
}

// --- Main export -------------------------------------------------------------

export function FaqBlockContent({data}: {data: FaqBlockData}) {
  const enableSchema = data.enableSchema ?? true
  const items = data.items || []
  const variation = stegaClean((data as GroupedFaqData).variation) || 'default'

  if (variation === 'grouped') {
    return <GroupedFaq data={data as GroupedFaqData} />
  }

  return (
    <div>
      {enableSchema && items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(buildJsonLd(items))}}
        />
      )}
      <DefaultFaq data={data} />
    </div>
  )
}
