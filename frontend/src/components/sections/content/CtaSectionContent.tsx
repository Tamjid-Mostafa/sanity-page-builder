'use client'

import {stegaClean} from 'next-sanity'
import {motion} from 'motion/react'
import {ArrowRight} from 'lucide-react'
import Link from 'next/link'
import {BookConversationButton, OutlineCtaButton} from '@/components/BookConversationButton'
import {cn} from '@/lib/utils'
import type {CtaSectionData} from '@/types/sanity'

// --- Link resolution ---------------------------------------------------------
interface LinkInternal {_type: 'linkInternal'; reference?: {slug?: {current?: string}}}
interface LinkExternal {_type: 'linkExternal'; url?: string; newWindow?: boolean}
interface PageSlugLink {_type: 'pageSlug'; slug?: string}
type LinkItem = LinkInternal | LinkExternal | PageSlugLink

function resolveHref(linkItems?: Array<{_type: string; [key: string]: unknown}>): string {
  const item = linkItems?.[0] as LinkItem | undefined
  if (!item) return '#'
  switch (stegaClean(item._type)) {
    case 'linkExternal': return (item as LinkExternal).url || '#'
    case 'linkInternal': return `/${(item as LinkInternal).reference?.slug?.current || ''}`
    case 'pageSlug': return `/${(item as PageSlugLink).slug || ''}`
    default: return '#'
  }
}

function isExternalLink(linkItems?: Array<{_type: string; [key: string]: unknown}>): boolean {
  const item = linkItems?.[0] as LinkItem | undefined
  return stegaClean(item?._type) === 'linkExternal' && Boolean((item as LinkExternal).newWindow)
}

type BodyParagraph = { _key: string; text: string; emphasis?: boolean }

function resolveBodyParagraphs(
  bodyParagraphs: CtaSectionData['bodyParagraphs'],
  subtitle?: string | null,
): BodyParagraph[] {
  if (bodyParagraphs && bodyParagraphs.length > 0) {
    return bodyParagraphs
      .map((paragraph, index) => ({
        _key: paragraph._key ?? `body-${index}`,
        text: stegaClean(paragraph.text) ?? '',
        emphasis: paragraph.emphasis ?? false,
      }))
      .filter((paragraph) => paragraph.text.length > 0)
  }

  if (!subtitle) return []

  const parts = subtitle.split(/\n\n+/).map((part) => part.trim()).filter(Boolean)
  return parts.map((text, index) => ({
    _key: `subtitle-${index}`,
    text,
    emphasis: parts.length > 1 && index === parts.length - 1,
  }))
}

// --- Component ---------------------------------------------------------------
export function CtaSectionContent({data}: {data: CtaSectionData}) {
  const eyebrow = stegaClean(data.eyebrow)
  const heading = stegaClean(data.heading)
  const subtitle = stegaClean(data.subtitle)
  const bodyParagraphs = resolveBodyParagraphs(data.bodyParagraphs, subtitle)
  const buttons = data.buttons ?? []
  const trustItems = (data.trustItems ?? []) as string[]
  const prospectus = data.prospectusLink
  const hasBody = bodyParagraphs.length > 0

  return (
    <motion.div
      initial={{opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-80px'}}
      transition={{duration: 0.5}}
      className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
    >
      {eyebrow && (
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
          {eyebrow}
        </p>
      )}

      {heading && (
        <h2 className="mb-6 max-w-3xl font-heading text-4xl font-bold tracking-tight leading-[1.06] sm:text-5xl md:text-6xl lg:text-[3.25rem]">
          {heading}
        </h2>
      )}

      {hasBody && (
        <div className="mb-10 max-w-2xl space-y-4 text-base font-medium leading-relaxed md:text-lg">
          {bodyParagraphs.map((paragraph) => (
            <p
              key={paragraph._key}
              className={cn(
                paragraph.emphasis &&
                  'pt-1 font-heading text-lg font-semibold md:text-xl',
              )}
            >
              {paragraph.text}
            </p>
          ))}
        </div>
      )}

      {buttons.length > 0 && (
        <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {buttons.map((btn) => {
            if (!btn.label) return null
            const action = stegaClean(btn.action) || 'link'
            const label = stegaClean(btn.label)

            if (action === 'calendly') {
              return (
                <BookConversationButton
                  key={btn._key}
                  tone="on-dark"
                  size="lg"
                  showIcon
                  showArrow={false}
                  label={label}
                />
              )
            }

            const href = resolveHref(btn.link as Array<{_type: string; [key: string]: unknown}>)
            return (
              <OutlineCtaButton
                key={btn._key}
                href={href}
                label={label}
                tone="on-dark"
                size="lg"
                newTab={isExternalLink(btn.link as Array<{_type: string; [key: string]: unknown}>)}
              />
            )
          })}
        </div>
      )}

      {trustItems.length > 0 && (
        <>
          <div className="mb-8 h-px w-12 bg-current opacity-15" />
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{delay: 0.35, duration: 0.5}}
            className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-medium tracking-wide"
          >
            {trustItems.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-secondary" />
                {stegaClean(item)}
              </span>
            ))}
          </motion.div>
        </>
      )}

      {prospectus?.label && (
        <motion.div
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: 0.45, duration: 0.5}}
          className="mt-8"
        >
          <Link
            href={resolveHref(prospectus.link as Array<{_type: string; [key: string]: unknown}>)}
            className="group inline-flex items-center gap-1.5 text-sm opacity-90 transition-colors duration-200 hover:text-secondary"
          >
            {prospectus.label}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      )}
    </motion.div>
  )
}
