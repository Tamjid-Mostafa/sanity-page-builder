import {SanityImage} from '../../shared/SanityImage'

interface ImageData {
  image?: {
    asset?: {_id?: string; url?: string; metadata?: {lqip?: string; dimensions?: {width: number; height: number}}}
    alt?: string
    hotspot?: {x: number; y: number}
    crop?: {top: number; bottom: number; left: number; right: number}
  }
  caption?: string
}

export function ImageContent({data}: {data: Record<string, unknown>}) {
  const {image, caption} = data as unknown as ImageData

  if (!image?.asset) return null

  return (
    <figure>
      <SanityImage
        value={image}
        className="w-full rounded-lg object-cover"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
