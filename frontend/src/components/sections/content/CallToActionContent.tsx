'use client'

import {stegaClean} from 'next-sanity'
import {ArrowRight} from 'lucide-react'
import {openCalendly} from '@/lib/site-cta'
import type {CallToActionData} from '@/types/sanity'
import {cn} from '@/lib/utils'

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
  primary:
    'inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg group',
  secondary:
    'inline-flex items-center gap-2 rounded-lg bg-white/15 px-6 py-2.5 text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-colors hover:bg-foreground/5',
  outline:
    'inline-flex items-center gap-2 rounded-lg border border-foreground/20 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5',
  ghost:
    'inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5',
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
  const showArrow = cleanVariant === 'primary' && !hasCustomColors

  const inlineStyle: React.CSSProperties = hasCustomColors
    ? {backgroundColor: cleanColor || undefined, color: cleanTextColor || undefined}
    : {}

  const baseClasses = 'text-center'
  const colorClasses = hasCustomColors
    ? 'inline-block rounded-lg px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90'
    : VARIANT_CLASSES[cleanVariant] || VARIANT_CLASSES.primary

  if (cleanAction === 'calendly') {
    return (
      <button
        type="button"
        onClick={() => openCalendly()}
        className={cn(baseClasses, colorClasses, 'cursor-pointer')}
        style={inlineStyle}
      >
        {data.label}
        {showArrow && (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        )}
      </button>
    )
  }

  const {href, isExternal} = resolveHref((data.link || []) as unknown as LinkItem[])

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(baseClasses, colorClasses, 'w-full sm:w-auto')}
      style={inlineStyle}
    >
      {data.label}
      {showArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </a>
  )
}
