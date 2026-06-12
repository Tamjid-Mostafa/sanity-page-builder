import {stegaClean} from 'next-sanity'
import {SanityImage} from '../../shared/SanityImage'
import type {IconTextData} from '@/types/sanity'
import {cn} from '@/lib/utils'

function isDarkBackground(color?: string | null) {
  if (!color) return false
  const hex = color.replace('#', '')
  if (hex.length !== 6) return false
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return 0.299 * r + 0.587 * g + 0.114 * b < 140
}

const LAYOUT_CLASSES: Record<string, {container: string; text: string}> = {
  left: {
    container: 'flex flex-row items-start gap-4',
    text: 'text-left',
  },
  center: {
    container: 'flex flex-col items-center gap-3',
    text: 'text-center',
  },
  right: {
    container: 'flex flex-row-reverse items-start gap-4',
    text: 'text-right',
  },
}

export function IconTextContent({data}: {data: IconTextData}) {
  const alignment = data.alignment || 'left'
  const layout = LAYOUT_CLASSES[stegaClean(alignment)] || LAYOUT_CLASSES.left
  const onDark = isDarkBackground(
    stegaClean(
      (data.blockStyles as {background?: {color?: string | null}} | undefined)?.background
        ?.color,
    ),
  )

  return (
    <div className={layout.container}>
      {data.icon?.asset && (
        <div className="shrink-0">
          <SanityImage
            value={data.icon}
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
        </div>
      )}
      <div className={layout.text}>
        {data.title && (
          <h4
            className={cn(
              'font-heading font-semibold',
              onDark ? 'text-base font-bold text-background' : 'text-lg text-foreground',
            )}
          >
            {data.title}
          </h4>
        )}
        {data.description && (
          <p
            className={cn(
              'mt-0.5 text-sm leading-relaxed',
              onDark ? 'font-medium text-secondary' : 'text-muted',
            )}
          >
            {data.description}
          </p>
        )}
      </div>
    </div>
  )
}
