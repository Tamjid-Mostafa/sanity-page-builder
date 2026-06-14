import {stegaClean} from 'next-sanity'
import type {TagPillsData} from '@/types/sanity'
import {cn} from '@/lib/utils'

function luminance(color: string) {
  const hex = color.replace('#', '')
  if (hex.length !== 6) return null
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return 0.299 * r + 0.587 * g + 0.114 * b
}

function isDarkSurface(blockStyles?: {
  background?: {color?: string | null}
  typography?: {textColor?: string | null}
} | null) {
  if (!blockStyles) return false
  const bg = blockStyles.background?.color
  const text = blockStyles.typography?.textColor
  const bgL = bg ? luminance(bg) : null
  const textL = text ? luminance(text) : null
  return (bgL !== null && bgL < 140) || (textL !== null && textL > 200)
}

export function TagPillsContent({data}: {data: TagPillsData}) {
  const blockStyles = stegaClean(data.blockStyles) as {
    background?: {color?: string | null}
    typography?: {textColor?: string | null}
  } | null
  const onDark = isDarkSurface(blockStyles)
  const tone = stegaClean((data as {tone?: string | null}).tone) || 'solid'
  const isOutline = tone === 'outline'
  const items = (data.items ?? []).filter((item): item is string => Boolean(item))

  if (items.length === 0) return null

  return (
    <ul
      className="flex flex-wrap gap-2"
      {...(onDark ? {'data-block-text-tone': 'on-dark'} : {})}
    >
      {items.map((label) => (
        <li
          key={label}
          className={cn(
            'tag-pill inline-flex items-center',
            isOutline
              ? 'rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-light text-foreground sm:text-sm'
              : 'rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background',
          )}
        >
          {label}
        </li>
      ))}
    </ul>
  )
}
