import type {CSSProperties, ReactNode} from 'react'
import {stegaClean} from 'next-sanity'

interface BlockStyles {
  padding?: {
    top?: string | null; right?: string | null; bottom?: string | null; left?: string | null
    topMd?: string | null; rightMd?: string | null; bottomMd?: string | null; leftMd?: string | null
    topLg?: string | null; rightLg?: string | null; bottomLg?: string | null; leftLg?: string | null
  } | null
  margin?: {
    top?: string | null; right?: string | null; bottom?: string | null; left?: string | null
    topMd?: string | null; rightMd?: string | null; bottomMd?: string | null; leftMd?: string | null
    topLg?: string | null; rightLg?: string | null; bottomLg?: string | null; leftLg?: string | null
  } | null
  border?: {width?: string | null; style?: string | null; color?: string | null} | null
  borderRadius?: {topLeft?: string | null; topRight?: string | null; bottomRight?: string | null; bottomLeft?: string | null} | null
  background?: {color?: string | null; image?: {asset?: {url?: string | null} | null} | null; size?: string | null; overlay?: string | null} | null
  typography?: {textAlign?: string | null; fontSize?: string | null; textColor?: string | null} | null
  effects?: {shadow?: string | null; opacity?: number | null; overflow?: string | null} | null
}

const SHADOW_MAP: Record<string, string> = {
  none: 'none',
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 6px rgba(0,0,0,0.07)',
  lg: '0 10px 15px rgba(0,0,0,0.1)',
  xl: '0 20px 25px rgba(0,0,0,0.1)',
}

function buildStyles(bs: BlockStyles | undefined | null): CSSProperties {
  if (!bs) return {}

  const styles: CSSProperties = {}

  // Padding (mobile only for inline -- responsive handled by className)
  if (bs.padding) {
    if (bs.padding.top) styles.paddingTop = bs.padding.top
    if (bs.padding.right) styles.paddingRight = bs.padding.right
    if (bs.padding.bottom) styles.paddingBottom = bs.padding.bottom
    if (bs.padding.left) styles.paddingLeft = bs.padding.left
  }

  // Margin
  if (bs.margin) {
    if (bs.margin.top) styles.marginTop = bs.margin.top
    if (bs.margin.right) styles.marginRight = bs.margin.right
    if (bs.margin.bottom) styles.marginBottom = bs.margin.bottom
    if (bs.margin.left) styles.marginLeft = bs.margin.left
  }

  // Border
  if (bs.border) {
    if (bs.border.width) styles.borderWidth = bs.border.width
    if (bs.border.style) styles.borderStyle = bs.border.style as CSSProperties['borderStyle']
    if (bs.border.color) styles.borderColor = bs.border.color
  }

  // Border radius
  if (bs.borderRadius) {
    const {topLeft = '0', topRight = '0', bottomRight = '0', bottomLeft = '0'} = bs.borderRadius
    styles.borderRadius = `${topLeft || '0'} ${topRight || '0'} ${bottomRight || '0'} ${bottomLeft || '0'}`
  }

  // Background
  if (bs.background) {
    if (bs.background.color) styles.backgroundColor = bs.background.color
    if (bs.background.image?.asset?.url) {
      styles.backgroundImage = `url(${bs.background.image.asset.url})`
      styles.backgroundSize = bs.background.size || 'cover'
      styles.backgroundPosition = 'center'
    }
  }

  // Typography
  if (bs.typography) {
    if (bs.typography.textAlign) styles.textAlign = bs.typography.textAlign as CSSProperties['textAlign']
    if (bs.typography.fontSize) styles.fontSize = `${bs.typography.fontSize}px`
    if (bs.typography.textColor) styles.color = bs.typography.textColor
  }

  // Effects
  if (bs.effects) {
    if (bs.effects.shadow) styles.boxShadow = SHADOW_MAP[bs.effects.shadow] || 'none'
    if (typeof bs.effects.opacity === 'number') styles.opacity = bs.effects.opacity / 100
    if (bs.effects.overflow) styles.overflow = bs.effects.overflow as CSSProperties['overflow']
  }

  return styles
}

function buildResponsiveClassName(bs: BlockStyles | undefined | null): string {
  if (!bs) return ''
  const classes: string[] = []

  // Tablet padding overrides (md breakpoint)
  if (bs.padding?.topMd) classes.push(`md:pt-[${bs.padding.topMd}]`)
  if (bs.padding?.rightMd) classes.push(`md:pr-[${bs.padding.rightMd}]`)
  if (bs.padding?.bottomMd) classes.push(`md:pb-[${bs.padding.bottomMd}]`)
  if (bs.padding?.leftMd) classes.push(`md:pl-[${bs.padding.leftMd}]`)

  // Desktop padding overrides (lg breakpoint)
  if (bs.padding?.topLg) classes.push(`lg:pt-[${bs.padding.topLg}]`)
  if (bs.padding?.rightLg) classes.push(`lg:pr-[${bs.padding.rightLg}]`)
  if (bs.padding?.bottomLg) classes.push(`lg:pb-[${bs.padding.bottomLg}]`)
  if (bs.padding?.leftLg) classes.push(`lg:pl-[${bs.padding.leftLg}]`)

  // Tablet margin overrides
  if (bs.margin?.topMd) classes.push(`md:mt-[${bs.margin.topMd}]`)
  if (bs.margin?.rightMd) classes.push(`md:mr-[${bs.margin.rightMd}]`)
  if (bs.margin?.bottomMd) classes.push(`md:mb-[${bs.margin.bottomMd}]`)
  if (bs.margin?.leftMd) classes.push(`md:ml-[${bs.margin.leftMd}]`)

  // Desktop margin overrides
  if (bs.margin?.topLg) classes.push(`lg:mt-[${bs.margin.topLg}]`)
  if (bs.margin?.rightLg) classes.push(`lg:mr-[${bs.margin.rightLg}]`)
  if (bs.margin?.bottomLg) classes.push(`lg:mb-[${bs.margin.bottomLg}]`)
  if (bs.margin?.leftLg) classes.push(`lg:ml-[${bs.margin.leftLg}]`)

  return classes.join(' ')
}

export function BlockStylesWrapper({
  blockStyles,
  children,
  className,
}: {
  blockStyles?: BlockStyles | null
  children: ReactNode
  className?: string
}) {
  const clean = blockStyles ? stegaClean(blockStyles) : blockStyles
  const inlineStyles = buildStyles(clean)
  const responsiveClasses = buildResponsiveClassName(clean)
  const hasOverlay = clean?.background?.overlay && clean?.background?.image?.asset?.url

  const combinedClassName = [className, responsiveClasses].filter(Boolean).join(' ')

  return (
    <div className={combinedClassName || undefined} style={inlineStyles}>
      {hasOverlay && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{backgroundColor: blockStyles!.background!.overlay!}}
        />
      )}
      {hasOverlay ? <div className="relative">{children}</div> : children}
    </div>
  )
}
