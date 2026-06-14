import {defineType, defineField, defineArrayMember} from 'sanity'
import {ThLargeIcon} from '@sanity/icons'
import {TypographyInput} from '../../components/TypographyInput'

const COLUMN_OPTIONS = [
  {title: '1 Column', value: '1'},
  {title: '2 Columns', value: '2'},
  {title: '3 Columns', value: '3'},
  {title: '4 Columns', value: '4'},
] as const

const STYLE_OPTIONS = [
  {title: 'Simple', value: 'simple'},
  {title: 'Bordered', value: 'bordered'},
  {title: 'Shadow', value: 'shadow'},
  {title: 'Highlighted', value: 'highlighted'},
  {title: 'Audience', value: 'audience'},
  {title: 'Pathway', value: 'pathway'},
  {title: 'Pathway Detail (dark)', value: 'pathwayDetail'},
  {title: 'On Dark', value: 'onDark'},
  {title: 'Callout (dark accent)', value: 'callout'},
] as const

const CARD_ICON_SIZE_OPTIONS = [
  {title: 'Small', value: 'small'},
  {title: 'Medium', value: 'medium'},
  {title: 'Large', value: 'large'},
  {title: 'XL', value: 'xl'},
] as const

const ACCENT_TARGET_OPTIONS = [
  {title: 'Icon', value: 'icon'},
  {title: 'Icon BG', value: 'iconBg'},
  {title: 'Title', value: 'title'},
  {title: 'Subtitle', value: 'subtitle'},
  {title: 'Description', value: 'description'},
] as const

export const featureCardGridType = defineType({
  name: 'featureCardGrid',
  title: 'Feature Card Grid',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small label above the title',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'showStepNumbers',
      title: 'Show Step Numbers',
      type: 'boolean',
      initialValue: false,
      description: 'Display 01, 02, 03… on each card.',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'featureCard',
          fields: [
            defineField({
              name: 'coverImage',
              title: 'Cover Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'object',
              fields: [
                defineField({
                  name: 'source',
                  title: 'Source',
                  type: 'string',
                  initialValue: 'lucide',
                  options: {
                    list: [
                      {title: 'Lucide', value: 'lucide'},
                      {title: 'Image', value: 'image'},
                    ],
                    layout: 'radio',
                  },
                }),
                defineField({
                  name: 'lucide',
                  title: 'Lucide Icon',
                  type: 'lucide-icon',
                  hidden: ({parent}) => parent?.source !== 'lucide',
                  
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {hotspot: true},
                  hidden: ({parent}) => parent?.source !== 'image',
                }),
              ],
            }),
            defineField({
              name: 'accentColor',
              title: 'Accent Color',
              type: 'string',
              initialValue: 'primary',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                  {title: 'None', value: 'none'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'accentApplyTo',
              title: 'Accent Apply To',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              initialValue: ['icon'],
              options: {list: [...ACCENT_TARGET_OPTIONS], layout: 'list'},
              description: 'Choose which parts in this card should use Accent Color.',
              validation: (rule) => rule.unique(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Optional for Callout cards when only body text is needed.',
              validation: (rule) =>
                rule.custom((title, context) => {
                  const parent = context.parent as {description?: string}
                  if (title?.trim() || parent?.description?.trim()) return true
                  return 'Title or description is required'
                }),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle (bold)',
              type: 'string',
              description: 'Bold text shown below the title',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'bestFor',
              title: 'Best For',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              description: 'Used with Pathway Detail (dark) card style.',
            }),
            defineField({
              name: 'includes',
              title: 'Includes',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              description: 'Used with Pathway Detail (dark) card style.',
            }),
            defineField({
              name: 'note',
              title: 'Footer Note',
              type: 'text',
              rows: 2,
              description: 'Border-left callout at the bottom of Pathway Detail cards.',
            }),
            defineField({
              name: 'cta',
              title: 'Link',
              type: 'object',
              fields: [
                defineField({name: 'label', title: 'Label', type: 'string'}),
                defineField({name: 'href', title: 'URL', type: 'string'}),
              ],
            }),
          ],
          preview: {
            select: {title: 'title', media: 'icon'},
            prepare({title, media}: {title?: string; media?: React.ReactNode}) {
              return {title: title || 'Feature Card', media}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'titleAlign',
      title: 'Title Alignment',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'string',
      initialValue: '3',
      description: 'Use 1 Column for a single full-width card (e.g. sidebar callouts).',
      options: {list: [...COLUMN_OPTIONS], layout: 'radio'},
    }),
    defineField({
      name: 'style',
      title: 'Card Style',
      type: 'string',
      initialValue: 'simple',
      options: {list: [...STYLE_OPTIONS], layout: 'radio'},
    }),
    defineField({
      name: 'cardIconSize',
      title: 'Card Icon Size',
      type: 'string',
      initialValue: 'medium',
      options: {list: [...CARD_ICON_SIZE_OPTIONS], layout: 'radio'},
    }),
    defineField({
      name: 'cardTitleTypography',
      title: 'Card Title Typography',
      type: 'object',
      components: {input: TypographyInput},
      fields: [
        defineField({name: 'textAlign', title: 'Align', type: 'string'}),
        defineField({name: 'fontSize', title: 'Size', type: 'string'}),
        defineField({name: 'fontWeight', title: 'Weight', type: 'string'}),
        defineField({name: 'textColor', title: 'Color', type: 'string'}),
      ],
      description: 'Typography controls for the card title number/text.',
    }),
    defineField({
      name: 'blockStyles',
      title: 'Block Styles',
      type: 'blockStyles',
      options: {collapsible: true, collapsed: true},
    }),
  ],
  preview: {
    select: {title: 'title', cards: 'cards'},
    prepare({title, cards}: {title?: string; cards?: Array<unknown>}) {
      return {
        title: title || 'Feature Card Grid',
        subtitle: `${cards?.length ?? 0} cards`,
        media: ThLargeIcon,
      }
    },
  },
})
