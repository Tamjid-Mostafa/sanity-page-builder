import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'

interface SanityImageProps {
  value: {
    asset?: {_id?: string; url?: string; metadata?: {lqip?: string | null; dimensions?: {width: number; height: number} | null} | null} | null
    alt?: string | null
    hotspot?: {x: number; y: number} | null
    crop?: {top: number; bottom: number; left: number; right: number} | null
  }
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
}

export function SanityImage({value, width = 800, height, className, priority, fill}: SanityImageProps) {
  if (!value?.asset) return null

  const dimensions = value.asset.metadata?.dimensions
  const computedHeight = height || (dimensions ? Math.round(width * (dimensions.height / dimensions.width)) : Math.round(width / 1.5))

  const src = urlFor(value).width(width).height(computedHeight).url()

  if (fill) {
    return (
      <Image
        className={className}
        src={src}
        alt={value.alt || ''}
        fill
        priority={priority}
        placeholder={value.asset.metadata?.lqip ? 'blur' : 'empty'}
        blurDataURL={value.asset.metadata?.lqip || undefined}
      />
    )
  }

  return (
    <Image
      className={className}
      src={src}
      alt={value.alt || ''}
      width={width}
      height={computedHeight}
      priority={priority}
      placeholder={value.asset.metadata?.lqip ? 'blur' : 'empty'}
      blurDataURL={value.asset.metadata?.lqip || undefined}
    />
  )
}
