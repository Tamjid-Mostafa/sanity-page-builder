import {Image} from 'next-sanity/image'
import {urlFor} from '@/sanity/lib/image'
import {cn} from '@/lib/utils'
import type {LogoRowData} from '@/types/sanity'

type Logo = NonNullable<LogoRowData['logos']>[number]

// Augment the generated type with new schema fields not yet in typegen
type LogoRowDataExtended = LogoRowData & {
  displayStyle?: 'row' | 'grid' | null
  gridColumns?: number | null
}

const SIZE_MAP: Record<string, {width: number; height: number; className: string}> = {
  small: {width: 80, height: 40, className: 'h-6 w-auto'},
  medium: {width: 120, height: 40, className: 'h-7 w-auto max-w-[120px] sm:h-8 sm:max-w-[132px]'},
  large: {width: 160, height: 52, className: 'h-9 w-auto max-w-[140px]'},
}

const GRID_COLS_MAP: Record<number, string> = {
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  5: 'sm:grid-cols-3 lg:grid-cols-5',
  6: 'sm:grid-cols-3 lg:grid-cols-6',
}

export function LogoRowContent({data}: {data: LogoRowDataExtended}) {
  const logos = data.logos || []
  if (logos.length === 0) return null

  const sizeKey = data.size && data.size in SIZE_MAP ? data.size : 'medium'
  const dimensions = SIZE_MAP[sizeKey]
  const isGrid = data.displayStyle === 'grid'
  const cols = data.gridColumns ?? 6
  const grayscaleClass = data.grayscale
    ? 'grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-[filter,opacity] duration-300'
    : ''

  const renderImage = (logo: Logo) => {
    if (!logo.image?.asset) return null
    const src = urlFor(logo.image).width(dimensions.width * 2).height(dimensions.height * 2).url()
    return (
      <Image
        src={src}
        alt={logo.alt || ''}
        width={dimensions.width}
        height={dimensions.height}
        className={cn('object-contain', dimensions.className, grayscaleClass)}
        sizes={`${dimensions.width}px`}
      />
    )
  }

  if (isGrid) {
    return (
      <ul
        className={cn(
          'mx-auto grid grid-cols-2 items-center gap-x-4 gap-y-6',
          GRID_COLS_MAP[cols] ?? GRID_COLS_MAP[6],
        )}
      >
        {logos.map((logo: Logo, index: number) => {
          if (!logo.image?.asset) return null
          const img = renderImage(logo)
          return (
            <li
              key={logo._key ?? index}
              className="flex h-16 items-center justify-center rounded-2xl border border-border/60 bg-background/90 px-4 py-3 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-colors hover:border-border hover:bg-background"
            >
              {logo.link ? (
                <a href={logo.link} target="_blank" rel="noopener noreferrer">
                  {img}
                </a>
              ) : (
                img
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  // --- default row layout ---
  return (
    <div className="my-6">
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {logos.map((logo: Logo, index: number) => {
          if (!logo.image?.asset) return null
          const img = renderImage(logo)
          if (logo.link) {
            return (
              <a
                key={logo._key ?? index}
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                {img}
              </a>
            )
          }
          return (
            <div key={logo._key ?? index} className="inline-flex items-center">
              {img}
            </div>
          )
        })}
      </div>
    </div>
  )
}
