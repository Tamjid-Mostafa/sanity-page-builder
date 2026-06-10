'use client'

import {Image} from 'next-sanity/image'
import {urlFor} from '@/sanity/lib/image'
import {easing, duration} from '@/lib/animations'
import {MotionInView} from '@/components/motion/MotionInView'

export type ExperienceCard = {
  _key?: string
  title?: string | null
  description?: string | null
  alt?: string | null
  image?: {
    asset?: {_ref?: string; url?: string | null} | null
    hotspot?: unknown
    crop?: unknown
  } | null
}

export function ExperienceCardGridCard({
  card,
  index,
}: {
  card: ExperienceCard
  index: number
}) {
  return (
    <MotionInView
      margin="-10%"
      transition={{
        delay: index * 0.1,
        duration: duration.slow,
        ease: easing.apple,
      }}
      className="group relative overflow-hidden rounded-xl border border-border/40 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative h-72 w-full overflow-hidden md:h-80">
        {card.image?.asset ? (
          <div className="relative h-full w-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.04]">
            <Image
              src={urlFor(card.image).width(1200).height(960).fit('crop').url()}
              alt={card.alt || card.title || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-secondary/20" />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-85" />

        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-7">
          {card.title && (
            <h3 className="text-xl font-heading font-bold leading-tight text-white md:text-2xl">
              {card.title}
            </h3>
          )}
          {card.description && (
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white">
              {card.description}
            </p>
          )}
        </div>
      </div>
    </MotionInView>
  )
}
