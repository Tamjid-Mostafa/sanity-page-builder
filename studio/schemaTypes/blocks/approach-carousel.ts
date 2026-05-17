import {defineType, defineField, defineArrayMember} from 'sanity'
import {InlineElementIcon} from '@sanity/icons'

export const approachCarouselType = defineType({
  name: 'approachCarousel',
  title: 'Approach Carousel',
  type: 'object',
  icon: InlineElementIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small label above the title (e.g. "Our Approach")',
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
      name: 'cards',
      title: 'Cards',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'approachCard',
          fields: [
            defineField({
              name: 'label',
              title: 'Card Label',
              type: 'string',
              description: 'Small uppercase eyebrow on the card (e.g. "Philosophy")',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
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
                ],
                layout: 'radio',
              },
            }),
          ],
          preview: {
            select: {title: 'title', label: 'label'},
            prepare({title, label}: {title?: string; label?: string}) {
              return {title: title || 'Approach Card', subtitle: label}
            },
          },
        }),
      ],
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
        title: title || 'Approach Carousel',
        subtitle: `${cards?.length ?? 0} cards`,
        media: InlineElementIcon,
      }
    },
  },
})
