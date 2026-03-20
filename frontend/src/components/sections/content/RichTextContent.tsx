import type {PortableTextBlock} from '@portabletext/types'
import {PortableTextRenderer} from '../../shared/PortableTextRenderer'

export function RichTextContent({data}: {data: Record<string, unknown>}) {
  const content = data.content as PortableTextBlock[] | undefined
  if (!content) return null
  return (
    <div className="prose prose-slate max-w-none">
      <PortableTextRenderer value={content} />
    </div>
  )
}
