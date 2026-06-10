'use client'

import Link from 'next/link'
import {MapPin} from 'lucide-react'
import {stegaClean} from 'next-sanity'
import {MotionInView} from '@/components/motion/MotionInView'
import {cn} from '@/lib/utils'
import type {ExperienceCardGridData} from '@/types/sanity'
import {
  ExperienceCardGridCard,
  type ExperienceCard,
} from './ExperienceCardGridCard'

type ExtendedExperienceCardGridData = ExperienceCardGridData & {
  eyebrow?: string | null
  bodyParagraph?: string | null
  locationLabel?: string | null
  titleAlign?: string | null
  footerText?: string | null
  footerHighlight?: string | null
  footerHighlightColor?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  cards?: ExperienceCard[]
}

function renderFooterText(
  text?: string | null,
  highlight?: string | null,
  highlightColor?: string | null,
) {
  if (!text) return null
  if (!highlight || !text.includes(highlight)) return text
  const parts = text.split(highlight)
  const color = highlightColor?.trim() || null

  return (
    <>
      {parts[0]}
      <span
        className={cn('font-semibold', !color && 'text-secondary')}
        style={color ? {color} : undefined}
      >
        {highlight}
      </span>
      {parts.slice(1).join(highlight)}
    </>
  )
}

export function ExperienceCardGridContent({
  data,
}: {
  data: ExperienceCardGridData
}) {
  const d = data as ExtendedExperienceCardGridData
  const cards = d.cards || []
  const titleAlign = stegaClean(d.titleAlign) === 'center' ? 'center' : 'left'
  const title = stegaClean(d.title)
  const subtitle = stegaClean(d.subtitle)
  const bodyParagraph = stegaClean(d.bodyParagraph)
  const locationLabel = stegaClean(d.locationLabel)
  const ctaLabel = stegaClean(d.ctaLabel)
  const ctaHref = stegaClean(d.ctaHref)

  if (cards.length === 0) return null

  const ctaIsExternal = Boolean(ctaHref?.startsWith('http'))
  const introText = subtitle || bodyParagraph

  return (
    <div>
      {(locationLabel || title || introText) && (
        <MotionInView
          className={cn('mb-8', titleAlign === 'center' ? 'text-center' : 'text-left')}
          margin="-100px"
        >
          {locationLabel && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/20 px-4 py-2">
              <MapPin className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium text-secondary">{locationLabel}</span>
            </div>
          )}

          {title && (
            <h2 className="text-3xl font-heading font-bold leading-[1.08] tracking-tight text-background sm:text-4xl md:text-[2.625rem]">
              {title}
            </h2>
          )}

          {introText && (
            <p
              className={cn(
                'mt-4 max-w-3xl text-sm leading-relaxed text-background sm:text-base',
                titleAlign === 'center' && 'mx-auto',
              )}
            >
              {introText}
            </p>
          )}
        </MotionInView>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((card, index) => (
          <ExperienceCardGridCard
            key={card._key || index}
            card={card}
            index={index}
          />
        ))}
      </div>

      {d.footerText && (
        <MotionInView className="mt-8 text-center" margin="-20px" delay={0.15}>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-background/90 md:text-lg">
            {renderFooterText(
              stegaClean(d.footerText),
              stegaClean(d.footerHighlight),
              stegaClean(d.footerHighlightColor),
            )}
          </p>
        </MotionInView>
      )}

      {ctaLabel && ctaHref && (
        <MotionInView className="mt-8" margin="-20px" delay={0.2}>
          <Link
            href={ctaHref}
            target={ctaIsExternal ? '_blank' : undefined}
            rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
            className="inline-block text-sm font-medium text-background transition-colors duration-200 hover:text-background/80"
          >
            {ctaLabel}
          </Link>
        </MotionInView>
      )}
    </div>
  )
}
