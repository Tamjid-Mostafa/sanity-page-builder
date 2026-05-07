'use client'

import {stegaClean} from 'next-sanity'
import {openCalendly} from '@/lib/site-cta'
import type {CallToActionData} from '@/types/sanity'

interface LinkInternal {
  _type: 'linkInternal'
  reference?: {slug?: {current?: string}}
}

interface LinkExternal {
  _type: 'linkExternal'
  url?: string
  newWindow?: boolean
}

interface PageSlugLink {
  _type: 'pageSlug'
  slug?: string
}

type LinkItem = LinkInternal | LinkExternal | PageSlugLink

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
      const slug = item as PageSlugLink
      return {href: `/${slug.slug || ''}`, isExternal: false}
    }
    default:
      return {href: '#', isExternal: false}
  }
}

export function CallToActionContent({data}: {data: CallToActionData}) {
  if (!data.label) return null

  const cleanAction = stegaClean((data as {action?: string}).action) || 'link'
  const hasCustomColors = Boolean(data.color || data.textColor)
  const cleanColor = stegaClean(data.color)
  const cleanTextColor = stegaClean(data.textColor)
  const cleanVariant = stegaClean(data.variant) || 'primary'

  const inlineStyle: React.CSSProperties = hasCustomColors
    ? {backgroundColor: cleanColor || undefined, color: cleanTextColor || undefined}
    : {}

  const baseClasses =
    'inline-block rounded-full px-6 py-3 font-medium transition-colors duration-200 text-center text-sm'
  const colorClasses = hasCustomColors
    ? 'hover:opacity-90'
    : VARIANT_CLASSES[cleanVariant] || VARIANT_CLASSES.primary

  if (cleanAction === 'calendly') {
    return (
      <button
        type="button"
        onClick={() => openCalendly()}
        className={`${baseClasses} ${colorClasses} cursor-pointer`}
        style={inlineStyle}
      >
        {data.label}
      </button>
    )
  }

  const {href, isExternal} = resolveHref((data.link || []) as unknown as LinkItem[])

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`${baseClasses} ${colorClasses}`}
      style={inlineStyle}
    >
      {data.label}
    </a>
  )
}

