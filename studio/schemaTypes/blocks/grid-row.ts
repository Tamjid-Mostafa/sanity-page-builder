import {defineType, defineField, defineArrayMember} from 'sanity'
import {DashboardIcon, ImageIcon} from '@sanity/icons'
import {LayoutPickerInput} from '../../components/LayoutPickerInput'
import {ColumnsInput} from '../../components/ColumnsInput'


const LAYOUT_OPTIONS = [
  {title: 'Full Width', value: 'full'},
  {title: '50 / 50', value: '50-50'},
  {title: '33 / 66', value: '33-66'},
  {title: '66 / 33', value: '66-33'},
  {title: '25 / 75', value: '25-75'},
  {title: '75 / 25', value: '75-25'},
  {title: '33 / 33 / 33', value: '33-33-33'},
  {title: '25 / 50 / 25', value: '25-50-25'},
  {title: '25 / 25 / 25 / 25', value: '25-25-25-25'},
] as const

export const gridRowType = defineType({
  name: 'gridRow',
  title: 'Grid Row',
  type: 'object',
  icon: DashboardIcon,
  groups: [
    {name: 'columns', title: 'Columns', default: true},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'columns',
      description: 'Pick a column layout, then add content to each column below.',
      validation: (rule) => rule.required(),
      initialValue: '50-50',
      components: {
        input: LayoutPickerInput,
      },
    }),

    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      group: 'columns',
      validation: (rule) => rule.required().min(1),
      components: {
        input: ColumnsInput,
      },
      of: [
        defineArrayMember({
          type: 'object',
          name: 'gridColumn',
          title: 'Column',
          fields: [
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                // Rich text & media
                defineArrayMember({type: 'richTextBlock'}),
                defineArrayMember({type: 'imageBlock'}),
                defineArrayMember({type: 'callToAction'}),
                defineArrayMember({type: 'externalVideo'}),
                defineArrayMember({type: 'youtubeVideo'}),
                // Interactive
                defineArrayMember({type: 'tabbedContent'}),
                defineArrayMember({type: 'accordion'}),
                defineArrayMember({type: 'spacerDivider'}),
                defineArrayMember({type: 'countdownTimer'}),
                // Display
                defineArrayMember({type: 'iconText'}),
                defineArrayMember({type: 'buttonGroup'}),
                defineArrayMember({type: 'statMetric'}),
                defineArrayMember({type: 'testimonialQuote'}),
                defineArrayMember({type: 'alertNotice'}),
                defineArrayMember({type: 'pricingCard'}),
                // Embeds & data
                defineArrayMember({type: 'socialEmbed'}),
                defineArrayMember({type: 'logoRow'}),
                defineArrayMember({type: 'mapEmbed'}),
                defineArrayMember({type: 'codeBlock'}),
                defineArrayMember({type: 'dataTable'}),
                defineArrayMember({type: 'lottieAnimation'}),
                // Forms & FAQ
                defineArrayMember({type: 'formBlock'}),
                defineArrayMember({type: 'faqBlock'}),
                // Grids & galleries
                defineArrayMember({type: 'featureCardGrid'}),
                defineArrayMember({type: 'experienceCardGrid'}),
                defineArrayMember({type: 'approachCarousel'}),
                defineArrayMember({type: 'testimonialCarousel'}),
                defineArrayMember({type: 'imageGallery'}),
                defineArrayMember({type: 'tocBlock'}),
                defineArrayMember({type: 'ctaSection'}),
                defineArrayMember({type: 'partnersNetwork'}),
                defineArrayMember({type: 'tagPills'}),
              ],
              options: {
                insertMenu: {
                  views: [{name: 'grid'}],
                },
              },
            }),
            defineField({
              name: 'verticalAlign',
              title: 'Vertical Align',
              type: 'string',
              description: 'Controls how content aligns when columns have different heights.',
              initialValue: 'top',
              options: {
                list: [
                  {title: 'Top', value: 'top'},
                  {title: 'Center', value: 'center'},
                  {title: 'Bottom', value: 'bottom'},
                  {title: 'Sticky', value: 'sticky'},
                ],
              },
            }),
            defineField({
              name: 'blockStyles',
              title: 'Column Styles',
              type: 'blockStyles',
              options: {collapsible: true, collapsed: true},
            }),
          ],
          preview: {
            select: {content: 'content'},
            prepare({content}: {content?: Array<unknown>}) {
              const blockCount = content?.length ?? 0
              return {
                title: 'Column',
                subtitle: `${blockCount} block${blockCount !== 1 ? 's' : ''}`,
              }
            },
          },
        }),
      ],
    }),

    // --- Style tab ---
    defineField({
      name: 'gap',
      title: 'Column Gap',
      type: 'string',
      group: 'style',
      description: 'Space between columns.',
      initialValue: 'md',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
          {title: 'Extra Large', value: 'xl'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'reverseOnMobile',
      title: 'Reverse order on mobile',
      type: 'boolean',
      group: 'style',
      description:
        'Reverses the column stacking order on small screens. Useful when you want text above image on mobile.',
      initialValue: false,
    }),
    defineField({
      name: 'paddingY',
      title: 'Vertical Padding',
      type: 'string',
      group: 'style',
      initialValue: 'compact',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Compact', value: 'compact'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
          {title: 'Extra Large', value: 'xl'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'paddingX',
      title: 'Horizontal Padding',
      type: 'string',
      group: 'style',
      initialValue: 'md',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      group: 'style',
      initialValue: 'full',
      options: {
        list: [
          {title: 'Narrow (768px)', value: 'narrow'},
          {title: 'Content (896px)', value: 'content'},
          {title: 'Default (site container)', value: 'default'},
          {title: 'Wide (1400px)', value: 'wide'},
          {title: 'Full Width', value: 'full'},
        ],
      },
    }),
    defineField({
      name: 'containerAlign',
      title: 'Container Alignment',
      type: 'string',
      group: 'style',
      description: 'Only visible when Max Width is not Full Width.',
      initialValue: 'center',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'blockStyles',
      title: 'Advanced Layout',
      type: 'blockStyles',
      group: 'style',
      options: {collapsible: true, collapsed: true},
    }),
  ],
  preview: {
    select: {
      layout: 'layout',
      columns: 'columns',
      // Pull the most useful label fields from the first block in the first column
      blockTitle:   'columns[0].content[0].title',
      blockHeading: 'columns[0].content[0].heading',
      blockEyebrow: 'columns[0].content[0].eyebrow',
      // richTextBlock stores its heading inside portable-text children
      richTextSpan: 'columns[0].content[0].content[0].children[0].text',
    },
    prepare({
      layout,
      columns,
      blockTitle,
      blockHeading,
      blockEyebrow,
      richTextSpan,
    }: {
      layout?: string
      columns?: Array<unknown>
      blockTitle?: string
      blockHeading?: string
      blockEyebrow?: string
      richTextSpan?: string
    }) {
      const colCount = columns?.length ?? 0
      const layoutLabel =
        LAYOUT_OPTIONS.find((o) => o.value === layout)?.title ?? layout ?? '—'

      // Prefer a real content label in this order: title → heading → rich-text span → eyebrow
      const derivedLabel = blockTitle || blockHeading || richTextSpan || blockEyebrow

      return {
        title: derivedLabel
          ? `${derivedLabel}`
          : `Grid Row — ${layoutLabel}`,
        subtitle: `${layoutLabel} · ${colCount} col${colCount !== 1 ? 's' : ''}`,
        media: DashboardIcon,
      }
    },
  },
})
