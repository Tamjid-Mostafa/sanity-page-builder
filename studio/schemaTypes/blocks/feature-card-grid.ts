import {defineType, defineField, defineArrayMember} from 'sanity'
import {ThLargeIcon} from '@sanity/icons'

const COLUMN_OPTIONS = [
  {title: '2 Columns', value: '2'},
  {title: '3 Columns', value: '3'},
  {title: '4 Columns', value: '4'},
] as const

const STYLE_OPTIONS = [
  {title: 'Simple', value: 'simple'},
  {title: 'Bordered', value: 'bordered'},
  {title: 'Shadow', value: 'shadow'},
  {title: 'Highlighted', value: 'highlighted'},
] as const

export const featureCardGridType = defineType({
  name: 'featureCardGrid',
  title: 'Feature Card Grid',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
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
                  options: {
                    allowedIcons: [
                      'graduation-cap', 'globe', 'book-open', 'users', 'user',
                      'target', 'award', 'star', 'trophy', 'medal',
                      'briefcase', 'trending-up', 'rocket', 'bar-chart-2',
                      'heart', 'lightbulb', 'shield', 'check-circle', 'handshake',
                      'map-pin', 'compass', 'arrow-right', 'external-link',
                      'message-circle', 'mail', 'phone',
                      'monitor', 'smartphone', 'code-2',
                      'zap', 'layers', 'leaf', 'building-2', 'clock',
                    ],
                  },
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
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
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
