'use client'

import Link from 'next/link'
import {ArrowRight, MapPin} from 'lucide-react'
import {stegaClean} from 'next-sanity'
import {Button} from '@/components/ui/button'
import {SectionHeading} from '@/components/ui/SectionHeading'
import {MotionInView} from '@/components/motion/MotionInView'
import type {ExperienceCardGridData} from '@/types/sanity'
import {ExperienceCardGridCard} from './ExperienceCardGridCard'

type ExtendedExperienceCardGridData = ExperienceCardGridData & {
  eyebrow?: string | null
  bodyParagraph?: string | null
  locationLabel?: string | null
  titleAlign?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
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

  return (
    <div className="border-t border-white/10">
      <MotionInView className="mb-8" margin="-100px">
        {d.locationLabel && (
          <div className="mb-6 inline-flex gap-2 rounded-full border border-secondary/30 bg-secondary/20 px-4 py-2">
            <MapPin className="h-5 w-5 text-secondary" />
            <span className="text-sm font-medium text-secondary">{d.locationLabel}</span>
          </div>
        )}

        {d.eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
            {d.eyebrow}
          </p>
        )}

        {d.title && (
          <SectionHeading
            title={d.title}
            subtitle={d.subtitle || undefined}
            tone="inverse"
            align={titleAlign}
          />
        )}
      </MotionInView>

      {d.bodyParagraph && (
        <MotionInView
          className="mb-10 max-w-3xl space-y-4 text-sm font-medium leading-relaxed text-background sm:text-base"
          margin="-40px"
          delay={0.05}
        >
          <p>{d.bodyParagraph}</p>
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

      {d.ctaLabel && ctaHref && (
        <MotionInView className="mt-10 flex justify-center" margin="-20px" delay={0.2}>
          <Button
            size="lg"
            className="rounded-xl bg-primary px-8 text-primary-foreground hover:bg-primary/90"
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
