import type {
  HOME_PAGE_QUERY_RESULT,
  PAGE_QUERY_RESULT,
  BLOG_POSTS_QUERY_RESULT,
  BLOG_POST_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
} from '@/sanity/types'

// ---------- Settings ----------
export type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT> & {
  footerTagline?: string | null
  footerTaglineLinkText?: string | null
  footerTaglineLinkHref?: string | null
  footerAboutLinks?: FooterNavLink[] | null
  footerAcademyLinks?: FooterNavLink[] | null
  footerGlobalLinks?: FooterNavLink[] | null
  footerConnectCtaText?: string | null
  footerConnectCtaUrl?: string | null
  footerContactEmail?: string | null
  footerWhatsappNumber?: string | null
  footerContactAddress?: string | null
  footerContactCity?: string | null
  footerBrandLine?: string | null
  footerCopyrightName?: string | null
  footerLegalLinks?: FooterNavLink[] | null
}
export type NavItem = NonNullable<SiteSettings['mainNav']>[number]
export type NavLink = Extract<NavItem, {_type: 'navLink'}>
export type NavDropdown = Extract<NavItem, {_type: 'navDropdown'}>
export type DropdownItem = NavDropdown['items'][number]
export type FooterNavLink = {
  _key?: string
  text?: string
  url?: string
  newTab?: boolean
}
export type SocialLink = NonNullable<SiteSettings['socialLinks']>[number]

// ---------- Pages ----------
export type HomePage = HOME_PAGE_QUERY_RESULT
export type PageData = NonNullable<PAGE_QUERY_RESULT>

// ---------- Blog ----------
export type BlogPostData = NonNullable<BLOG_POST_QUERY_RESULT>
export type BlogPostListItem = BLOG_POSTS_QUERY_RESULT[number]

// ---------- Page Builder ----------
// PAGE_QUERY_RESULT has pageBuilder as a non-null array on its type, so use it directly
export type PageBuilderBlock = NonNullable<PageData['pageBuilder']>[number]
export type HeroSectionData = Extract<PageBuilderBlock, {_type: 'heroSection'}>
export type GridRowData = Extract<PageBuilderBlock, {_type: 'gridRow'}>
export type GridColumn = GridRowData['columns'][number]
export type ContentBlock = NonNullable<GridColumn['content']>[number]

// ---------- Content block types ----------
export type RichTextBlockData = Extract<ContentBlock, {_type: 'richTextBlock'}>
export type ImageBlockData = Extract<ContentBlock, {_type: 'imageBlock'}>
export type CallToActionData = Extract<ContentBlock, {_type: 'callToAction'}>
export type ExternalVideoData = Extract<ContentBlock, {_type: 'externalVideo'}>
export type YoutubeVideoData = Extract<ContentBlock, {_type: 'youtubeVideo'}>
export type TabbedContentData = Extract<ContentBlock, {_type: 'tabbedContent'}>
export type AccordionData = Extract<ContentBlock, {_type: 'accordion'}>
export type SpacerDividerData = Extract<ContentBlock, {_type: 'spacerDivider'}>
export type CountdownTimerData = Extract<ContentBlock, {_type: 'countdownTimer'}>
export type IconTextData = Extract<ContentBlock, {_type: 'iconText'}>
export type ButtonGroupData = Extract<ContentBlock, {_type: 'buttonGroup'}>
export type StatMetricData = Extract<ContentBlock, {_type: 'statMetric'}>
export type TestimonialQuoteData = Extract<ContentBlock, {_type: 'testimonialQuote'}>
export type AlertNoticeData = Extract<ContentBlock, {_type: 'alertNotice'}>
export type PricingCardData = Extract<ContentBlock, {_type: 'pricingCard'}>
export type SocialEmbedData = Extract<ContentBlock, {_type: 'socialEmbed'}>
export type LogoRowData = Extract<ContentBlock, {_type: 'logoRow'}>
export type MapEmbedData = Extract<ContentBlock, {_type: 'mapEmbed'}>
export type CodeBlockData = Extract<ContentBlock, {_type: 'codeBlock'}>
export type DataTableData = Extract<ContentBlock, {_type: 'dataTable'}>
export type LottieAnimationData = Extract<ContentBlock, {_type: 'lottieAnimation'}>
export type FormBlockData = Extract<ContentBlock, {_type: 'formBlock'}>
export type FaqBlockData = Extract<ContentBlock, {_type: 'faqBlock'}>
export type FeatureCardGridData = Extract<ContentBlock, {_type: 'featureCardGrid'}>
export type ExperienceCardGridData = Extract<ContentBlock, {_type: 'experienceCardGrid'}> & {
  eyebrow?: string | null
  bodyParagraph?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
}
export type TestimonialCarouselData = Extract<ContentBlock, {_type: 'testimonialCarousel'}>
export type ImageGalleryData = Extract<ContentBlock, {_type: 'imageGallery'}>
export type TocBlockData = Extract<ContentBlock, {_type: 'tocBlock'}>
export type TagPillsData = Extract<ContentBlock, {_type: 'tagPills'}>
export type PartnersNetworkData = {
  _type: 'partnersNetwork'
  _key?: string
  eyebrow?: string
  heading?: string
  subtitle?: string
  logosLabel?: string
  logos?: Array<{
    _key?: string
    alt?: string
    link?: string
    image?: {
      asset?: {
        _id?: string
        url?: string
        metadata?: {lqip?: string; dimensions?: {width?: number; height?: number}}
      }
    }
  }>
  displayStyle?: 'row' | 'grid' | null
  gridColumns?: number | null
  grayscale?: boolean | null
  size?: 'small' | 'medium' | 'large' | null
  blockStyles?: Record<string, unknown>
}
export type CtaSectionData = {
  _type: 'ctaSection'
  _key?: string
  eyebrow?: string
  heading?: string
  subtitle?: string
  size?: 'large' | 'medium' | string | null
  bodyParagraphs?: Array<{
    _key?: string
    text?: string
    emphasis?: boolean
  }>
  buttons?: Array<{
    _key?: string
    _type: 'callToAction'
    label?: string
    action?: string
    link?: Array<{_type: string; [key: string]: unknown}>
    color?: string
    textColor?: string
    hoverColor?: string
    variant?: string
  }>
  trustItems?: string[]
  prospectusLink?: {
    label?: string
    link?: Array<{_type: string; [key: string]: unknown}>
  }
  blockStyles?: Record<string, unknown>
}

// ---------- SEO ----------
export type SeoData = NonNullable<PageData['seo']>
