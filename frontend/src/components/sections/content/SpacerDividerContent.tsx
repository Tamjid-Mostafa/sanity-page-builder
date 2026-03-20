import {stegaClean} from 'next-sanity'

const HEIGHT_MAP: Record<string, string> = {
  sm: 'h-4 md:h-6',
  md: 'h-8 md:h-12',
  lg: 'h-12 md:h-16',
  xl: 'h-16 md:h-24',
}

export function SpacerDividerContent({data}: {data: Record<string, unknown>}) {
  const type = stegaClean((data.type as string) || 'spacer')
  const height = stegaClean((data.height as string) || 'md')
  const heightClass = HEIGHT_MAP[height] || HEIGHT_MAP.md

  if (type === 'divider') {
    return (
      <div className={heightClass + ' flex items-center'}>
        <hr className="w-full border-t border-border" />
      </div>
    )
  }

  return <div className={heightClass} aria-hidden="true" />
}
