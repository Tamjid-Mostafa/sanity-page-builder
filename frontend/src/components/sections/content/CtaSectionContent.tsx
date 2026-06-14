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
  const hasBody = bodyParagraphs.length > 0
  const blockStyles = stegaClean(
    (data as {blockStyles?: {background?: {color?: string | null}; typography?: {textColor?: string | null}}})
      .blockStyles,
  )
  const onDark = isDarkSurface(blockStyles)
  const buttonTone = onDark || !isMedium ? 'on-dark' : 'on-light'
  const isAcademyClosing = isMedium && onDark

  return (
    <motion.div
      initial={{opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-80px'}}
      transition={{duration: 0.5}}
      className={cn(
        'mx-auto flex w-full flex-col items-center text-center',
        isAcademyClosing ? 'max-w-3xl' : 'max-w-4xl',
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-xs font-semibold uppercase text-secondary',
            isAcademyClosing
              ? 'mb-4 tracking-[0.14em]'
              : 'mb-5 tracking-[0.18em]',
          )}
        >
          {eyebrow}
        </p>
      )}

      {heading && (
        <h2
          className={cn(
            'font-heading font-bold tracking-tight leading-[1.08]',
            onDark ? 'text-background' : 'text-foreground',
            isAcademyClosing
              ? 'max-w-2xl text-3xl sm:text-4xl md:text-[2.625rem]'
              : isMedium
                ? 'mb-8 max-w-xl text-3xl sm:text-4xl md:text-[2.625rem]'
                : 'mb-6 max-w-3xl text-4xl leading-[1.06] sm:text-5xl md:text-6xl lg:text-[3.25rem]',
          )}
        >
          {heading}
        </h2>
      )}

      {hasBody && (
        <div
          className={cn(
            isAcademyClosing
              ? 'w-full'
              : cn(
                  'max-w-2xl',
                  isMedium
                    ? 'mb-8 space-y-5 text-sm font-light leading-relaxed sm:text-base'
                    : 'mb-10 space-y-4 text-base font-medium leading-relaxed md:text-lg',
                ),
          )}
        >
          {bodyParagraphs.map((paragraph) => (
            <p
              key={paragraph._key}
              className={cn(
                isAcademyClosing
                  ? paragraph.emphasis
                    ? 'mx-auto mt-4 max-w-xl text-xs font-medium leading-relaxed text-secondary sm:text-sm'
                    : 'mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-background sm:text-base'
                  : cn(
                      onDark ? 'text-background/90' : undefined,
                      paragraph.emphasis &&
                        (isMedium
                          ? 'font-heading text-base font-semibold sm:text-lg'
                          : 'pt-1 font-heading text-lg font-semibold md:text-xl'),
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
            isAcademyClosing ? 'mt-10' : !isMedium && 'mb-10',
          )}
        >
          {buttons.map((btn) => {
            if (!btn.label) return null
            const action = stegaClean(btn.action) || 'link'
            const label = btn.label
            const btnSize = isAcademyClosing ? 'lg' : isMedium ? 'default' : 'lg'
            const btnShape = isAcademyClosing ? 'rounded-lg' : 'rounded-xl'

            if (action === 'calendly') {
              return (
                <BookConversationButton
                  key={btn._key}
                  tone={buttonTone}
                  size={btnSize}
                  showIcon={!isMedium && !isAcademyClosing}
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

      {trustItems.length > 0 && (
        isAcademyClosing ? (
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{delay: 0.5, duration: 0.4}}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {trustItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-medium text-background"
              >
                {item}
              </span>
            ))}
          </motion.div>
        ) : (
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
