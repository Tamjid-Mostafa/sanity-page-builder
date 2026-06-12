import {stegaClean} from 'next-sanity'
import {SanityImage} from '../../shared/SanityImage'
import type {ImageBlockData} from '@/types/sanity'
import {cn} from '@/lib/utils'

export function ImageContent({data}: {data: ImageBlockData}) {
  if (!data.image?.asset) return null

  const isPortrait = stegaClean((data as {display?: string}).display) === 'portrait'

  return (
    <figure>
      <SanityImage
        value={data.image}
        className={cn(
          'w-full object-cover',
          isPortrait ? 'aspect-[4/5] rounded-2xl object-top' : 'rounded-lg',
        )}
      />
      {data.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {data.caption}
        </figcaption>
      )}
    </figure>
  )
}
