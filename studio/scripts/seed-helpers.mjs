export {getCliClient} from 'sanity/cli'

export const FIT_FORM_URL = 'https://forms.gle/UnMumWXLvgjEgU2LA'
export const DARK_SURFACE = '#383838'
export const MUTED_SURFACE = '#efefef'
export const ON_DARK_TEXT = {typography: {textColor: '#ffffff'}}

export const CARD_BLOCK_STYLES = {
  _type: 'blockStyles',
  background: {color: '#ffffff'},
  border: {width: '1px', style: 'solid', color: '#e5e5e5'},
  borderRadius: {
    topLeft: '16px',
    topRight: '16px',
    bottomLeft: '16px',
    bottomRight: '16px',
  },
  padding: {
    top: '24px',
    right: '24px',
    bottom: '24px',
    left: '24px',
    topMd: '32px',
    rightMd: '32px',
    bottomMd: '32px',
    leftMd: '32px',
  },
}

export const DARK_CALLOUT_STYLES = {
  _type: 'blockStyles',
  background: {color: DARK_SURFACE},
  typography: {textColor: '#ffffff'},
  borderRadius: {
    topLeft: '16px',
    topRight: '16px',
    bottomLeft: '16px',
    bottomRight: '16px',
  },
  padding: {
    top: '28px',
    right: '28px',
    bottom: '28px',
    left: '28px',
  },
}

export const GRID_DEFAULTS = {
  maxWidth: 'default',
  containerAlign: 'left',
  paddingY: 'compact',
}

export const HERO_GRADIENT = {
  layout: 'fullWidth',
  alignment: 'left',
  verticalAlign: 'end',
  decorativeBackground: true,
  backgroundType: 'gradient',
  gradientFrom: '#0f172a',
  gradientMid: '#0c1e35',
  gradientTo: '#112840',
  gradientDirection: 'to bottom right',
  minHeight: '78vh',
}

export const GLOBAL_HERO_GRADIENT = {
  layout: 'fullWidth',
  alignment: 'left',
  verticalAlign: 'end',
  decorativeBackground: true,
  backgroundType: 'gradient',
  gradientFrom: '#0a1628',
  gradientMid: '#0c2340',
  gradientTo: '#0f1f35',
  gradientDirection: 'to bottom right',
}

export const GLOBAL_CTA_ROW_STYLES = {
  _type: 'blockStyles',
  typography: {textAlign: 'center'},
}

/** Shared CTA row wrapper — background/blobs render in CtaSectionContent. */
export const CTA_ROW_STYLES = GLOBAL_CTA_ROW_STYLES

export function createKeyGenerator() {
  return () => Math.random().toString(36).slice(2, 11)
}

export function createBlockHelpers(k) {
  const span = (text, marks = []) => ({_key: k(), _type: 'span', marks, text})

  const block = (text, style = 'normal', listItem, level, marks = []) => {
    const node = {
      _key: k(),
      _type: 'block',
      style,
      markDefs: [],
      children: [span(text, marks)],
    }
    if (listItem) {
      node.listItem = listItem
      node.level = level ?? 1
    }
    return node
  }

  const faqAnswer = (text) => [block(text)]

  const ctaButtons = (primaryKey, secondaryKey) => [
    {
      _key: primaryKey,
      _type: 'callToAction',
      action: 'calendly',
      label: 'Book a Conversation',
      variant: 'primary',
    },
    {
      _key: secondaryKey,
      _type: 'callToAction',
      action: 'link',
      label: 'Check Your Fit',
      link: [{_key: k(), _type: 'linkExternal', url: FIT_FORM_URL, openInNewTab: true}],
      variant: 'outline',
    },
  ]

  const globalCtaBlock = ({
    key,
    heading,
    paragraphs,
    postButtonText,
    buttons,
  }) => ({
    _key: key,
    _type: 'ctaSection',
    heading,
    size: 'medium',
    bodyParagraphs: paragraphs.map((text) => ({
      _key: k(),
      _type: 'ctaBodyParagraph',
      text,
      emphasis: false,
    })),
    postButtonText,
    buttons,
  })

  const globalFooterRow = (pageKey) => ({
    _key: `${pageKey}-footer-line`,
    _type: 'gridRow',
    layout: 'full',
    maxWidth: 'default',
    containerAlign: 'center',
    paddingY: 'compact',
    blockStyles: {
      _type: 'blockStyles',
      borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
    },
    columns: [
      {
        _key: `${pageKey}-footer-line-col`,
        verticalAlign: 'top',
        content: [
          {
            _key: `${pageKey}-footer-line-block`,
            _type: 'microFooterLine',
            variant: 'global',
          },
        ],
      },
    ],
  })

  const academyFooterRow = (pageKey) => ({
    _key: `${pageKey}-footer-line`,
    _type: 'gridRow',
    layout: 'full',
    maxWidth: 'default',
    containerAlign: 'center',
    paddingY: 'compact',
    blockStyles: {
      _type: 'blockStyles',
      borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
    },
    columns: [
      {
        _key: `${pageKey}-footer-line-col`,
        verticalAlign: 'top',
        content: [
          {
            _key: `${pageKey}-footer-line-block`,
            _type: 'microFooterLine',
            variant: 'academy',
          },
        ],
      },
    ],
  })

  return {span, block, faqAnswer, ctaButtons, globalCtaBlock, globalFooterRow, academyFooterRow}
}
