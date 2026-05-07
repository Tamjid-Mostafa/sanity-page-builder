import {createImageUrlBuilder} from '@sanity/image-url'
import {projectId, dataset} from './client'

const builder = createImageUrlBuilder({projectId, dataset})

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source)
}

type SanityImageSource = Parameters<typeof builder.image>[0]

type SanityImageWithMetadata = {
  asset?: {
    metadata?: {
      lqip?: string | null
      dimensions?: {
        width?: number | null
        height?: number | null
      } | null
    } | null
  } | null
}

export type SanityImageProps = {
  src: string
  width: number
  height: number
  placeholder?: 'blur'
  blurDataURL?: string
}

type GetSanityImagePropsOptions = {
  width?: number
  quality?: number
  defaultWidth?: number
  defaultHeight?: number
  // Use asset as source to bypass Sanity crop/hotspot metadata when needed (e.g. logos).
  useAssetOnly?: boolean
}

export function getSanityImageProps(
  image: (SanityImageSource & SanityImageWithMetadata) | null | undefined,
  options: GetSanityImagePropsOptions = {},
): SanityImageProps | null {
  if (!image) return null

  const {
    width,
    quality,
    defaultWidth = 1200,
    defaultHeight = 675,
    useAssetOnly = false,
  } = options

  const metadata = image.asset?.metadata
  const originalWidth = metadata?.dimensions?.width ?? defaultWidth
  const originalHeight = metadata?.dimensions?.height ?? defaultHeight

  const targetWidth = width ?? originalWidth
  const targetHeight =
    originalWidth > 0
      ? Math.round((targetWidth * originalHeight) / originalWidth)
      : defaultHeight

  const source =
    useAssetOnly && image.asset
      ? (image.asset as SanityImageSource)
      : (image as SanityImageSource)

  let urlBuilder = urlFor(source).width(targetWidth).auto('format')
  if (typeof quality === 'number') {
    urlBuilder = urlBuilder.quality(quality)
  }

  const blurDataURL = metadata?.lqip || undefined

  return {
    src: urlBuilder.url(),
    width: targetWidth,
    height: targetHeight,
    placeholder: blurDataURL ? 'blur' : undefined,
    blurDataURL,
  }
}
