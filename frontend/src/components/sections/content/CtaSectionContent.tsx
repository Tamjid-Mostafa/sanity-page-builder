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

function luminance(color: string) {
  const hex = color.replace('#', '')
  if (hex.length !== 6) return null
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return 0.299 * r + 0.587 * g + 0.114 * b
}

function isDarkSurface(blockStyles?: {
  background?: {color?: string | null}
  typography?: {textColor?: string | null}
} | null) {
  if (!blockStyles) return false
  const bg = blockStyles.background?.color
  const text = blockStyles.typography?.textColor
  const bgL = bg ? luminance(bg) : null
  const textL = text ? luminance(text) : null
  return (bgL !== null && bgL < 140) || (textL !== null && textL > 200)
}

function resolveBodyParagraphs(
  bodyParagraphs: CtaSectionData['bodyParagraphs'],
  subtitle?: string | null,
): BodyParagraph[] {
  if (bodyParagraphs && bodyParagraphs.length > 0) {
    return bodyParagraphs
      .map((paragraph, index) => ({
        _key: paragraph._key ?? `body-${index}`,
        text: paragraph.text ?? '',
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

function CtaSectionBackdrop() {
  return (
    <>
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0c2340] to-[#0f1f35]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-primary/12 blur-3xl sm:h-72 sm:w-72"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-secondary/10 blur-3xl sm:h-64 sm:w-64"
        aria-hidden
      />
    </>
  )
}

// --- Component ---------------------------------------------------------------
export function CtaSectionContent({data}: {data: CtaSectionData}) {
  const eyebrow = data.eyebrow
  const heading = data.heading
  const subtitle = data.subtitle
  const size = stegaClean((data as {size?: string}).size) || 'large'
  const isMedium = size === 'medium'
  const bodyParagraphs = resolveBodyParagraphs(data.bodyParagraphs, subtitle)
  const buttons = data.buttons ?? []
  const trustItems = (data.trustItems ?? []) as string[]
  const prospectus = data.prospectusLink
  const postButtonText = data.postButtonText
  const hasBody = bodyParagraphs.length > 0
  const blockStyles = stegaClean(
    (data as {blockStyles?: {background?: {color?: string | null}; typography?: {textColor?: string | null}}})
      .blockStyles,
  )
  const onDark = isDarkSurface(blockStyles)
  const isDarkCta = isMedium || onDark
  const buttonTone = 'on-dark'
  const useTrustPills = isMedium && trustItems.length > 0

  const content = (
    <motion.div
      initial={{opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-80px'}}
      transition={{duration: 0.5}}
      className={cn(
        'mx-auto flex w-full flex-col items-center text-center',
        isMedium ? 'max-w-3xl' : 'max-w-4xl',
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-xs font-semibold uppercase tracking-[0.14em] text-secondary',
            isMedium ? 'mb-4' : 'mb-5 tracking-[0.18em]',
          )}
        >
          {eyebrow}
        </p>
      )}

      {heading && (
        <h2
          className={cn(
            'font-heading font-bold tracking-tight leading-[1.08] text-white',
            isMedium
              ? 'max-w-2xl text-3xl sm:text-4xl md:text-[2.625rem]'
              : 'mb-6 max-w-3xl text-4xl leading-[1.06] sm:text-5xl md:text-6xl lg:text-[3.25rem]',
          )}
        >
          {heading}
        </h2>
      )}

      {hasBody && (
        <div
          className={cn(
            isMedium
              ? cn('w-full', postButtonText ? 'mt-6 space-y-4' : 'mt-4 space-y-4')
              : 'mb-10 max-w-2xl space-y-4 text-base font-medium leading-relaxed md:text-lg',
          )}
        >
          {bodyParagraphs.map((paragraph) => (
            <p
              key={paragraph._key}
              className={cn(
                isMedium
                  ? paragraph.emphasis
                    ? 'mx-auto max-w-xl text-xs font-medium leading-relaxed text-secondary sm:text-sm'
                    : 'mx-auto max-w-2xl text-sm font-light leading-relaxed text-white/80 sm:text-base'
                  : cn(
                      paragraph.emphasis
                        ? 'font-heading text-lg font-semibold text-white md:text-xl'
                        : 'text-white/90',
                    ),
              )}
            >
              {paragraph.text}
            </p>
          ))}
        </div>
      )}

      {buttons.length > 0 && (
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-3 sm:flex-row',
            isMedium ? 'mt-10' : 'mb-10',
            isMedium && 'w-full max-w-md sm:max-w-none',
          )}
        >
          {buttons.map((btn) => {
            if (!btn.label) return null
            const action = stegaClean(btn.action) || 'link'
            const label = btn.label
            const btnSize = isMedium ? 'lg' : 'lg'
            const btnShape = isMedium ? 'rounded-lg' : 'rounded-xl'

            if (action === 'calendly') {
              return (
                <BookConversationButton
                  key={btn._key}
                  tone={buttonTone}
                  size={btnSize}
                  showIcon={!isMedium}
                  showArrow
                  label={label}
                  className={btnShape}
                />
              )
            }

            const href = resolveHref(btn.link as Array<{_type: string; [key: string]: unknown}>)
            return (
              <OutlineCtaButton
                key={btn._key}
                href={href}
                label={label}
                tone={buttonTone}
                size={btnSize}
                newTab={isExternalLink(btn.link as Array<{_type: string; [key: string]: unknown}>)}
                className={btnShape}
              />
            )
          })}
        </div>
      )}

      {postButtonText && (
        <motion.p
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: 0.5, duration: 0.4}}
          className="mt-10 max-w-xl text-center text-xs font-light leading-relaxed text-white/55 sm:text-sm"
        >
          {postButtonText}
        </motion.p>
      )}

      {trustItems.length > 0 && (
        useTrustPills ? (
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{delay: 0.5, duration: 0.4}}
            className={cn(postButtonText ? 'mt-6' : 'mt-8', 'flex flex-wrap justify-center gap-2')}
          >
            {trustItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-medium text-white"
              >
                {item}
              </span>
            ))}
          </motion.div>
        ) : (
          <>
            <div className="mb-8 h-px w-12 bg-white/15" />
            <motion.div
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              viewport={{once: true}}
              transition={{delay: 0.35, duration: 0.5}}
              className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-medium tracking-wide text-white"
            >
              {trustItems.map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="inline-block h-1 w-1 rounded-full bg-secondary" />
                  {item}
                </span>
              ))}
            </motion.div>
          </>
        )
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
            className="group inline-flex items-center gap-1.5 text-sm text-white/90 transition-colors duration-200 hover:text-secondary"
          >
            {prospectus.label}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      )}
    </motion.div>
  )

  if (!isDarkCta) {
    return content
  }

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-t border-white/10 py-16 md:py-20 lg:py-24 -my-6 md:-my-8 lg:-my-10">
      <CtaSectionBackdrop />
      <div className="relative z-10 px-6 sm:px-8 lg:px-12">{content}</div>
    </div>
  )
}
