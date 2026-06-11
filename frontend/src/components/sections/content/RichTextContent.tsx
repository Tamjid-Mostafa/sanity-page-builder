import {stegaClean} from 'next-sanity'
import {PortableTextRenderer} from '../../shared/PortableTextRenderer'
import type {RichTextBlockData} from '@/types/sanity'
import {cn} from '@/lib/utils'

export function RichTextContent({data}: {data: RichTextBlockData}) {
  const eyebrow = stegaClean(data.eyebrow)
  const typography = stegaClean(
    (data.blockStyles as {typography?: {fontWeight?: string}} | undefined)?.typography,
  )
  const useHeadingFont =
    typography?.fontWeight === '700' || typography?.fontWeight === '800'

  if (!eyebrow && !data.content) return null

  return (
    <div
      className={cn(
        'prose prose-slate max-w-none prose-p:my-0 prose-p:leading-snug prose-headings:text-inherit prose-p:text-inherit prose-li:text-inherit prose-strong:text-inherit',
        useHeadingFont && 'font-heading prose-p:font-bold prose-p:text-xl md:prose-p:text-2xl',
      )}
    >
      {eyebrow && (
        <p className="not-prose mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {eyebrow}
        </p>
      )}
      {data.content && <PortableTextRenderer value={data.content} />}
    </div>
  )
}
