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
      typography: {textAlign: 'center'},
    },
    columns: [
      {
        _key: `${pageKey}-footer-line-col`,
        verticalAlign: 'top',
        content: [
          {
            _key: `${pageKey}-footer-line-copy`,
            _type: 'richTextBlock',
            content: [
              block(
                'iCollege Academy is part of iCollege Life — helping young people design smarter lives, academically and beyond.',
              ),
            ],
          },
        ],
      },
    ],
  })

  return {span, block, faqAnswer, ctaButtons, academyFooterRow}
}
