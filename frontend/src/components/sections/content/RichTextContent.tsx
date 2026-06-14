import {stegaClean} from 'next-sanity'
import {PortableTextRenderer} from '../../shared/PortableTextRenderer'
import {IconRenderer} from '@/lib/icon-registry'
import type {RichTextBlockData} from '@/types/sanity'
import {cn} from '@/lib/utils'

function luminance(color: string) {
  const hex = color.replace('#', '')
  if (hex.length !== 6) return null
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return 0.299 * r + 0.587 * g + 0.114 * b
}

function isDarkBackground(color?: string | null) {
  const l = color ? luminance(color) : null
  return l !== null && l < 140
}

function isLightText(color?: string | null) {
  const l = color ? luminance(color) : null
  return l !== null && l > 200
}

const EYEBROW_TONE: Record<string, string> = {
  primary: 'text-primary',
  muted: 'text-muted-foreground',
  secondary: 'text-secondary',
}

type ExtendedRichTextBlockData = RichTextBlockData & {
  leadingIcon?: string | null
  eyebrowTone?: string | null
}

export function RichTextContent({data}: {data: RichTextBlockData}) {
  const d = data as ExtendedRichTextBlockData
  const eyebrow = data.eyebrow
  const leadingIcon = stegaClean(d.leadingIcon)
  const eyebrowTone = stegaClean(d.eyebrowTone) || 'primary'
  const blockStyles = stegaClean(data.blockStyles) as {
    background?: {color?: string | null}
    typography?: {fontWeight?: string | null; textColor?: string | null}
  } | null
  const typography = blockStyles?.typography
  const onDark =
    isDarkBackground(blockStyles?.background?.color) ||
    isLightText(typography?.textColor)
  const useHeadingFont =
    typography?.fontWeight === '700' || typography?.fontWeight === '800'
  const inCard = Boolean(blockStyles?.background?.color)

  if (!eyebrow && !leadingIcon && !data.content) return null

  return (
    <div
      className={cn(
        'prose prose-slate max-w-none prose-p:my-0 prose-headings:text-inherit prose-p:text-inherit prose-li:text-inherit prose-strong:text-inherit',
        useHeadingFont
          ? 'font-heading prose-p:font-bold prose-p:text-xl md:prose-p:text-2xl prose-p:leading-snug'
          : 'prose-p:text-sm sm:prose-p:text-base prose-p:font-light prose-p:leading-relaxed prose-p:text-inherit [&_h2]:mb-0 [&_h2+*]:mt-6 [&_h3]:mt-0 [&_p]:mb-0 [&_p+p]:mt-4 [&_blockquote]:mt-0 [&_ul]:mt-0',
        onDark && 'text-inherit prose-headings:text-inherit',
      )}
    >
      {leadingIcon && (
        <div className="not-prose mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <IconRenderer
            name={leadingIcon}
            className="h-6 w-6 text-primary"
            strokeWidth={1.5}
            aria-hidden
          />
        </div>
      )}
      {eyebrow && (
        <p
          className={cn(
            'not-prose mb-2! text-xs font-semibold uppercase tracking-[0.14em]',
            onDark
              ? EYEBROW_TONE.secondary
              : EYEBROW_TONE[eyebrowTone] || EYEBROW_TONE.primary,
          )}
        >
          {eyebrow}
        </p>
      )}
      {data.content && (
        <div className={cn(inCard && eyebrow && '[&_p:first-of-type]:mt-3')}>
          <PortableTextRenderer value={data.content} />
        </div>
      )}
    </div>
  )
}
