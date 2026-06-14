'use client'

import {stegaClean} from 'next-sanity'
import {ArrowRight} from 'lucide-react'
import {openCalendly} from '@/lib/site-cta'
import {Button} from '@/components/ui/button'
import {cn} from '@/lib/utils'
import type {ButtonGroupData} from '@/types/sanity'

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

const ALIGN_MAP: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

export function ButtonGroupContent({data}: {data: ButtonGroupData}) {
  const buttons = data.buttons || []
  const direction = data.direction || 'horizontal'
  const alignment = data.alignment || 'left'

  if (buttons.length === 0) return null

  const cleanDirection = stegaClean(direction)
  const cleanAlignment = stegaClean(alignment)
  const flexDirection = cleanDirection === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
  const justifyClass = ALIGN_MAP[cleanAlignment] || ALIGN_MAP.left

  return (
    <div className={cn('flex', flexDirection, justifyClass, 'items-center gap-3')}>
      {buttons.map((button) => {
        if (!button.label) return null

        const cleanAction = stegaClean((button as {action?: string}).action) || 'link'
        const cleanVariant = stegaClean((button as {variant?: string}).variant) || 'primary'
        const label = stegaClean(button.label) || button.label
        const {href, isExternal} = resolveHref((button.link || []) as unknown as LinkItem[])
        const hasCustomColors = Boolean(button.color || button.textColor)
        const isOutline = cleanVariant === 'outline' && !hasCustomColors

        if (cleanAction === 'calendly') {
          return (
            <Button
              key={button._key}
              size="lg"
              onClick={() => openCalendly()}
              className="group cursor-pointer rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
            >
              {label}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          )
        }

        if (isOutline) {
          return (
            <Button
              key={button._key}
              size="lg"
              variant="ghost"
              asChild
              className="group rounded-lg border border-border bg-background px-8 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-muted"
            >
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                {label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
          )
        }

        const inlineStyle: React.CSSProperties = hasCustomColors
          ? {
              backgroundColor: stegaClean(button.color) || undefined,
              color: stegaClean(button.textColor) || undefined,
            }
          : {}

        return (
          <a
            key={button._key}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            style={inlineStyle}
          >
            {label}
          </a>
        )
      })}
    </div>
  )
}
