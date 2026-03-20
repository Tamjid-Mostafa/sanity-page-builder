import {stegaClean} from 'next-sanity'
import {SanityImage} from '../../shared/SanityImage'

interface IconImageValue {
  asset?: {_id?: string; url?: string; metadata?: {lqip?: string; dimensions?: {width: number; height: number}}}
  alt?: string
  hotspot?: {x: number; y: number}
  crop?: {top: number; bottom: number; left: number; right: number}
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

export function IconTextContent({data}: {data: Record<string, unknown>}) {
  const icon = data.icon as IconImageValue | undefined
  const title = data.title as string | undefined
  const description = data.description as string | undefined
  const alignment = (data.alignment as string) || 'left'

  const layout = LAYOUT_CLASSES[stegaClean(alignment)] || LAYOUT_CLASSES.left

  return (
    <div className={layout.container}>
      {icon?.asset && (
        <div className="shrink-0">
          <SanityImage
            value={icon}
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
        </div>
      )}
      <div className={layout.text}>
        {title && (
          <h4 className="text-lg font-semibold text-foreground">
            {title}
          </h4>
        )}
        {description && (
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
