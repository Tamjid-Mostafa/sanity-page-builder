'use client'

import {useState, useCallback} from 'react'
import {motion} from 'motion/react'
import {Calendar, ArrowRight} from 'lucide-react'
import {stegaClean} from '@sanity/client/stega'
import {PortableTextRenderer} from '../../shared/PortableTextRenderer'
import {toPlainText} from '@portabletext/toolkit'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {cn} from '@/lib/utils'
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

// --- Default variation -------------------------------------------------------

function DefaultFaq({data}: {data: FaqBlockData}) {
  const allowMultipleOpen = data.allowMultipleOpen ?? true
  const firstOpenByDefault = data.firstOpenByDefault ?? false
  const items = data.items || []

  const initialOpen =
    firstOpenByDefault && items.length > 0 ? new Set([items[0]._key]) : new Set<string>()

  const [openKeys, setOpenKeys] = useState<ReadonlySet<string>>(initialOpen)

  const toggleItem = useCallback(
    (key: string) => {
      setOpenKeys((prev) => {
        const next = new Set(prev)
        if (next.has(key)) {
          next.delete(key)
        } else {
          if (!allowMultipleOpen) next.clear()
          next.add(key)
        }
        return next
      })
    },
    [allowMultipleOpen],
  )

  if (items.length === 0) return null

  return (
    <div>
      {data.title && (
        <h2 className="text-2xl font-heading font-bold tracking-tight text-foreground sm:text-3xl">
          {data.title}
        </h2>
      )}
      {data.subtitle && <p className="mt-2 text-base text-muted">{data.subtitle}</p>}

      <div
        className={`${data.title || data.subtitle ? 'mt-8' : ''} divide-y divide-border rounded-xl border border-border`}
      >
        {items.map((item) => {
          const isOpen = openKeys.has(item._key)
          return (
            <div key={item._key}>
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-muted/30"
                aria-expanded={isOpen}
                onClick={() => toggleItem(item._key)}
              >
                <span className="pr-4 font-medium text-foreground">
                  {item.question || 'Untitled'}
                </span>
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center text-muted transition-transform duration-200"
                  style={{transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'}}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 3v10M3 8h10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-500 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  {item.answer && item.answer.length > 0 ? (
                    <div className="prose prose-slate max-w-none">
                      <PortableTextRenderer value={item.answer} />
                    </div>
                  ) : (
                    <p className="text-sm text-muted">No answer provided.</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
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
  const ctaLabel = stegaClean(data.ctaLabel) || 'Book a Conversation'

  return (
    <div>
      {enableSchema && allItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(buildJsonLd(allItems))}}
        />
      )}

      {/* Header row */}
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

      {/* Outer single accordion */}
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
      {enableSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(buildJsonLd(items))}}
        />
      )}
      <DefaultFaq data={data} />
    </div>
  )
}
