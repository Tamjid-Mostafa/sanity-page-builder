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

  const linkBlock = (text, href) => {
    const markKey = k()
    return {
      _key: k(),
      _type: 'block',
      style: 'normal',
      markDefs: [{_key: markKey, _type: 'link', href, openInNewTab: false}],
      children: [{_key: k(), _type: 'span', marks: [markKey], text}],
    }
  }

  const legalSectionBlocks = (index, section) => {
    const blocks = [block(`${index}. ${section.title}`, 'h2')]
    for (const paragraph of section.paragraphs ?? []) {
      blocks.push(block(paragraph))
    }
    for (const item of section.bullets ?? []) {
      blocks.push(block(item, 'normal', 'bullet'))
    }
    for (const paragraph of section.afterBullets ?? []) {
      blocks.push(block(paragraph))
    }
    for (const sub of section.subsections ?? []) {
      blocks.push(block(sub.title, 'h3'))
      blocks.push(block(sub.body))
    }
    if (section.inlineLink) {
      blocks.push(linkBlock(section.inlineLink.label, section.inlineLink.href))
    }
    if (section.contactEmail) {
      blocks.push(linkBlock(section.contactEmail, `mailto:${section.contactEmail}`))
    }
    return blocks
  }

  const legalHero = ({key, heading, subtitle, intro = []}) => ({
    _key: key,
    _type: 'heroSection',
    ...GLOBAL_HERO_GRADIENT,
    minHeight: '70vh',
    badge: 'Legal',
    heading,
    subtitle: [subtitle, ...intro].filter(Boolean).join('\n\n'),
  })

  const legalContentRow = (pageKey, sections) => ({
    _key: `${pageKey}-content`,
    _type: 'gridRow',
    layout: 'full',
    ...GRID_DEFAULTS,
    paddingY: 'lg',
    columns: [
      {
        _key: `${pageKey}-content-col`,
        verticalAlign: 'top',
        content: [
          {
            _key: `${pageKey}-content-block`,
            _type: 'richTextBlock',
            headingScale: 'legal',
            content: sections.flatMap((section, index) =>
              legalSectionBlocks(index + 1, section),
            ),
          },
        ],
      },
    ],
  })

  const legalClosingRow = (pageKey, microLine, lastUpdated = 'May 2026') => ({
    _key: `${pageKey}-closing`,
    _type: 'gridRow',
    layout: 'full',
    ...GRID_DEFAULTS,
    columns: [
      {
        _key: `${pageKey}-closing-col`,
        verticalAlign: 'top',
        content: [
          {
            _key: `${pageKey}-updated`,
            _type: 'richTextBlock',
            headingScale: 'legal',
            content: [block(`Last updated: ${lastUpdated}`)],
            blockStyles: {
              _type: 'blockStyles',
              typography: {textColor: '#737373', fontSize: '14px'},
            },
          },
          {
            _key: `${pageKey}-micro`,
            _type: 'richTextBlock',
            headingScale: 'legal',
            content: [block(microLine)],
            blockStyles: {
              _type: 'blockStyles',
              typography: {textAlign: 'center', textColor: '#737373', fontSize: '14px'},
              borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
              padding: {top: '32px'},
            },
          },
        ],
      },
    ],
  })

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

  return {
    span,
    block,
    linkBlock,
    legalSectionBlocks,
    legalHero,
    legalContentRow,
    legalClosingRow,
    faqAnswer,
    ctaButtons,
    globalCtaBlock,
    globalFooterRow,
    academyFooterRow,
  }
}
