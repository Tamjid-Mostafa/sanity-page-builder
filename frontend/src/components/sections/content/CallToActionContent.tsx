import {stegaClean} from 'next-sanity'

interface LinkInternal {
  _type: 'linkInternal'
  reference?: {slug?: {current?: string}}
}

interface LinkExternal {
  _type: 'linkExternal'
  url?: string
  newWindow?: boolean
}

interface PageSlug {
  _type: 'pageSlug'
  slug?: string
}

type LinkItem = LinkInternal | LinkExternal | PageSlug

const VARIANT_CLASSES: Record<string, string> = {
  primary: 'bg-foreground text-background hover:bg-foreground/90',
  secondary: 'bg-white/15 ring-1 ring-foreground/10 text-foreground hover:bg-foreground/5',
  outline: 'border border-foreground/20 text-foreground hover:bg-foreground/5',
  ghost: 'text-foreground hover:bg-foreground/5',
}

function resolveHref(linkItems: LinkItem[]): {href: string; isExternal: boolean} {
  const item = linkItems[0]
  if (!item) return {href: '#', isExternal: false}

  switch (stegaClean(item._type)) {
    case 'linkExternal': {
      const ext = item as LinkExternal
      return {href: ext.url || '#', isExternal: Boolean(ext.newWindow)}
    }
    case 'linkInternal': {
      const int = item as LinkInternal
      return {href: `/${int.reference?.slug?.current || ''}`, isExternal: false}
    }
    case 'pageSlug': {
      const slug = item as PageSlug
      return {href: `/${slug.slug || ''}`, isExternal: false}
    }
    default:
      return {href: '#', isExternal: false}
  }
}

export function CallToActionContent({data}: {data: Record<string, unknown>}) {
  const label = data.label as string | undefined
  const link = data.link as LinkItem[] | undefined
  const color = data.color as string | undefined
  const textColor = data.textColor as string | undefined
  const hoverColor = data.hoverColor as string | undefined
  const variant = (data.variant as string) || 'primary'

  if (!label) return null

  const {href, isExternal} = resolveHref(link || [])

  const hasCustomColors = Boolean(color || textColor)

  const cleanColor = stegaClean(color)
  const cleanTextColor = stegaClean(textColor)
  const cleanHoverColor = stegaClean(hoverColor)
  const cleanVariant = stegaClean(variant)

  const inlineStyle: React.CSSProperties = hasCustomColors
    ? {
        backgroundColor: cleanColor || undefined,
        color: cleanTextColor || undefined,
        ...(cleanHoverColor ? {'--cta-hover-bg': cleanHoverColor} as React.CSSProperties : {}),
      }
    : {}

  const baseClasses = 'inline-block rounded-full px-6 py-3 font-medium transition-colors duration-200 text-center text-sm'
  const colorClasses = hasCustomColors
    ? 'hover:opacity-90'
    : VARIANT_CLASSES[cleanVariant] || VARIANT_CLASSES.primary

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`${baseClasses} ${colorClasses}`}
      style={inlineStyle}
    >
      {label}
    </a>
  )
}
