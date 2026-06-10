'use client'

import {Image} from 'next-sanity/image'
import {motion} from 'motion/react'
import {urlFor} from '@/sanity/lib/image'
import {cn} from '@/lib/utils'
import type {PartnersNetworkData} from '@/types/sanity'

type PartnerLogo = NonNullable<PartnersNetworkData['logos']>[number]

const SIZE_MAP: Record<string, {width: number; height: number; className: string}> = {
  small: {width: 120, height: 40, className: 'h-8 w-auto sm:h-10'},
  medium: {width: 160, height: 48, className: 'h-12 w-auto sm:h-16'},
  large: {width: 200, height: 64, className: 'h-14 w-auto sm:h-[4.5rem]'},
}

const GRID_COLS_MAP: Record<number, string> = {
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  5: 'sm:grid-cols-3 lg:grid-cols-5',
  6: 'sm:grid-cols-3 lg:grid-cols-6',
}

function PartnerLogoImage({
  logo,
  dimensions,
  grayscale,
}: {
  logo: PartnerLogo
  dimensions: (typeof SIZE_MAP)[string]
  grayscale: boolean
}) {
  if (!logo.image?.asset) return null

  const src = urlFor(logo.image).width(dimensions.width * 2).height(dimensions.height * 2).url()
  const img = (
    <Image
      src={src}
      alt={logo.alt || ''}
      width={dimensions.width}
      height={dimensions.height}
      className={cn(
        'object-contain',
        dimensions.className,
        grayscale &&
          'grayscale opacity-75 transition-[filter,opacity] duration-300 hover:grayscale-0 hover:opacity-100',
      )}
      sizes={`${dimensions.width}px`}
    />
  )

  if (logo.link) {
    return (
      <a href={logo.link} target="_blank" rel="noopener noreferrer" className="inline-flex">
        {img}
      </a>
    )
  }

  return img
}

export function PartnersNetworkContent({data}: {data: PartnersNetworkData}) {
  const logos = data.logos || []
  const sizeKey = data.size && data.size in SIZE_MAP ? data.size : 'medium'
  const dimensions = SIZE_MAP[sizeKey]
  const isGrid = data.displayStyle === 'grid'
  const cols = data.gridColumns ?? 6
  const grayscale = data.grayscale ?? false

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card px-6 py-10 shadow-sm ring-1 ring-black/3 sm:px-10 sm:py-12">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/6 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-secondary/8 blur-3xl"
        aria-hidden
      />

      <motion.div
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: '-60px'}}
        transition={{duration: 0.5}}
        className="relative mx-auto mb-10 max-w-2xl text-center"
      >
        {data.eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {data.eyebrow}
          </p>
        )}
        {data.heading && (
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.625rem] md:leading-[1.08]">
            {data.heading}
          </h2>
        )}
        {data.subtitle && (
          <p className="text-sm font-medium leading-relaxed opacity-80 sm:text-base">
            {data.subtitle}
          </p>
        )}
      </motion.div>

      {logos.length > 0 && (
        <motion.div
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-40px'}}
          transition={{duration: 0.5, delay: 0.06}}
          className="relative"
        >
          {data.logosLabel && (
            <p className="mb-6 text-center text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">
              {data.logosLabel}
            </p>
          )}

          {isGrid ? (
            <ul
              className={cn(
                'mx-auto grid max-w-4xl grid-cols-2 items-center gap-x-6 gap-y-8',
                GRID_COLS_MAP[cols] ?? GRID_COLS_MAP[6],
              )}
            >
              {logos.map((logo, index) => (
                <li key={logo._key ?? index} className="flex items-center justify-center">
                  <PartnerLogoImage logo={logo} dimensions={dimensions} grayscale={grayscale} />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14">
              {logos.map((logo, index) => (
                <li key={logo._key ?? index}>
                  <PartnerLogoImage logo={logo} dimensions={dimensions} grayscale={grayscale} />
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      )}
    </div>
  )
}
