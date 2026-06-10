'use client'

import Link from 'next/link'
import {ArrowRight, MapPin} from 'lucide-react'
import {stegaClean} from 'next-sanity'
import {Button} from '@/components/ui/button'
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

  const cleanHighlight = highlight ? stegaClean(highlight) : null
  const cleanText = stegaClean(text)
  if (!cleanHighlight || !cleanText.includes(cleanHighlight)) return text

  const parts = cleanText.split(cleanHighlight)
  const color = highlightColor ? stegaClean(highlightColor).trim() : null

  return (
    <>
      {parts[0]}
      <span
        className={cn('font-semibold', !color && 'text-secondary')}
        style={color ? {color} : undefined}
      >
        {highlight}
      </span>
      {parts.slice(1).join(cleanHighlight)}
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
  const ctaHref = d.ctaHref ? stegaClean(d.ctaHref) : undefined

  if (cards.length === 0) return null

  const ctaIsExternal = Boolean(ctaHref?.startsWith('http'))
  const introText = d.subtitle || d.bodyParagraph

  return (
    <div>
      {(d.locationLabel || d.title || introText) && (
        <MotionInView
          className={cn('mb-8', titleAlign === 'center' ? 'text-center' : 'text-left')}
          margin="-100px"
        >
          {d.locationLabel && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/20 px-4 py-2">
              <MapPin className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium text-secondary">{d.locationLabel}</span>
            </div>
          )}

          {d.title && (
            <h2 className="text-3xl font-heading font-bold leading-[1.08] tracking-tight text-background sm:text-4xl md:text-[2.625rem]">
              {d.title}
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
            {renderFooterText(d.footerText, d.footerHighlight, d.footerHighlightColor)}
          </p>
        </MotionInView>
      )}

      {d.ctaLabel && ctaHref && (
        <MotionInView className="mt-10 flex justify-center" margin="-20px" delay={0.2}>
          <Button
            size="lg"
            className="h-auto rounded-full bg-primary px-8 py-3 text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link
              href={ctaHref}
              target={ctaIsExternal ? '_blank' : undefined}
              rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
            >
              {d.ctaLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </MotionInView>
      )}
    </div>
  )
}
