import {stegaClean} from 'next-sanity'
import {PortableTextRenderer} from '../../shared/PortableTextRenderer'
import type {RichTextBlockData} from '@/types/sanity'

export function RichTextContent({data}: {data: RichTextBlockData}) {
  const eyebrow = stegaClean(data.eyebrow)

  if (!eyebrow && !data.content) return null

  return (
    <div className="prose prose-slate max-w-none">
      {eyebrow && (
        <p className="not-prose mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {eyebrow}
        </p>
      )}
      {data.content && <PortableTextRenderer value={data.content} />}
    </div>
  )
}
