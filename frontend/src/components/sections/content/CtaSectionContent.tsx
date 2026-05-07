'use client'

import {stegaClean} from 'next-sanity'
import {motion} from 'motion/react'
import {Calendar, ArrowRight} from 'lucide-react'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {openCalendly} from '@/lib/site-cta'
import type {CtaSectionData} from '@/types/sanity'

// --- Link resolution ---------------------------------------------------------
interface LinkInternal {_type: 'linkInternal'; reference?: {slug?: {current?: string}}}
interface LinkExternal {_type: 'linkExternal'; url?: string; newWindow?: boolean}
interface PageSlugLink {_type: 'pageSlug'; slug?: string}
type LinkItem = LinkInternal | LinkExternal | PageSlugLink

function resolveHref(linkItems?: Array<{_type: string; [key: string]: unknown}>): string {
  const item = linkItems?.[0] as LinkItem | undefined
  if (!item) return '#'
  switch (stegaClean(item._type)) {
    case 'linkExternal': return (item as LinkExternal).url || '#'
    case 'linkInternal': return `/${(item as LinkInternal).reference?.slug?.current || ''}`
    case 'pageSlug': return `/${(item as PageSlugLink).slug || ''}`
    default: return '#'
  }
}

// --- Component ---------------------------------------------------------------
export function CtaSectionContent({data}: {data: CtaSectionData}) {
  const eyebrow = stegaClean(data.eyebrow)
  const heading = stegaClean(data.heading)
  const subtitle = stegaClean(data.subtitle)
  const buttons = data.buttons ?? []
  const trustItems = (data.trustItems ?? []) as string[]
  const prospectus = data.prospectusLink

  return (
    <div className="flex flex-col items-center text-center">
      {eyebrow && (
        <motion.p
          initial={{opacity: 0, y: 12}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-80px'}}
          transition={{duration: 0.5}}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary mb-5"
        >
          {eyebrow}
        </motion.p>
      )}

      {heading && (
        <motion.h2
          initial={{opacity: 0, y: 12}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-80px'}}
          transition={{duration: 0.5, delay: 0.05}}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-heading font-bold text-white tracking-tight leading-[1.04] mb-6 max-w-3xl"
        >
          {heading}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          initial={{opacity: 0, y: 12}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-80px'}}
          transition={{duration: 0.5, delay: 0.1}}
          className="text-base md:text-lg text-white font-light leading-relaxed max-w-xl mb-10"
        >
          {subtitle}
        </motion.p>
      )}

      {buttons.length > 0 && (
        <motion.div
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{delay: 0.2, duration: 0.5}}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          {buttons.map((btn) => {
            if (!btn.label) return null
            const action = stegaClean(btn.action) || 'link'
            const href = resolveHref(btn.link as Array<{_type: string; [key: string]: unknown}>)
            const isCalendly = action === 'calendly'
            const hasCustomColors = Boolean(btn.color || btn.textColor)
            const inlineStyle: React.CSSProperties = hasCustomColors
              ? {backgroundColor: stegaClean(btn.color) || undefined, color: stegaClean(btn.textColor) || undefined}
              : {}
            const btnClass = 'px-8 h-14 text-base rounded-xl font-bold group transition-colors duration-200 flex items-center gap-2'
            const colorClass = hasCustomColors ? 'hover:opacity-90' : 'bg-primary text-primary-foreground hover:bg-primary/90'

            if (isCalendly) {
              return (
                <Button key={btn._key} size="lg" type="button" onClick={() => openCalendly()}
                  className={`${btnClass} ${colorClass} cursor-pointer`} style={inlineStyle}>
                  <Calendar className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  {btn.label}
                </Button>
              )
            }
            return (
              <Button key={btn._key} size="lg" asChild className={`${btnClass} ${colorClass}`} style={inlineStyle}>
                <Link href={href}>{btn.label}</Link>
              </Button>
            )
          })}
        </motion.div>
      )}

      {trustItems.length > 0 && (
        <>
          <div className="w-12 h-px bg-white/15 mb-8" />
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{delay: 0.4, duration: 0.5}}
            className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-white text-xs font-medium tracking-wide"
          >
            {trustItems.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-secondary inline-block" />
                {stegaClean(item)}
              </span>
            ))}
          </motion.div>
        </>
      )}

      {prospectus?.label && (
        <motion.div
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: 0.5, duration: 0.5}}
          className="mt-8"
        >
          <Link
            href={resolveHref(prospectus.link as Array<{_type: string; [key: string]: unknown}>)}
            className="group inline-flex items-center gap-1.5 text-sm text-white hover:text-secondary transition-colors duration-200"
          >
            {prospectus.label}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>
      )}
    </div>
  )
}
