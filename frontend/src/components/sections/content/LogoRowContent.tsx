import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'

interface LogoImage {
  asset?: {_id?: string; url?: string; metadata?: {lqip?: string; dimensions?: {width: number; height: number}}}
  alt?: string
}

interface Logo {
  image?: LogoImage
  alt?: string
  link?: string
}

interface LogoRowData {
  logos?: Logo[]
  grayscale?: boolean
  size?: 'small' | 'medium' | 'large'
}

const SIZE_MAP: Record<string, {width: number; height: number; className: string}> = {
  small: {width: 80, height: 40, className: 'h-8 w-auto'},
  medium: {width: 120, height: 60, className: 'h-12 w-auto'},
  large: {width: 160, height: 80, className: 'h-16 w-auto'},
}

export function LogoRowContent({data}: {data: Record<string, unknown>}) {
  const {logos, grayscale, size} = data as unknown as LogoRowData

  if (!logos || logos.length === 0) return null

  const sizeKey = size && size in SIZE_MAP ? size : 'medium'
  const dimensions = SIZE_MAP[sizeKey]
  const grayscaleClass = grayscale ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300' : ''

  return (
    <div className="my-6">
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {logos.map((logo, index) => {
          if (!logo.image?.asset) return null

          const src = urlFor(logo.image)
            .width(dimensions.width * 2)
            .height(dimensions.height * 2)
            .url()
          const alt = logo.alt || logo.image.alt || ''

          const imageElement = (
            <Image
              src={src}
              alt={alt}
              width={dimensions.width}
              height={dimensions.height}
              className={`${dimensions.className} object-contain ${grayscaleClass}`}
            />
          )

          if (logo.link) {
            return (
              <a
                key={index}
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                {imageElement}
              </a>
            )
          }

          return (
            <div key={index} className="inline-flex items-center">
              {imageElement}
            </div>
          )
        })}
      </div>
    </div>
  )
}
