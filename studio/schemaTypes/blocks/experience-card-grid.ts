import {defineType, defineField, defineArrayMember} from 'sanity'
import {ImageIcon} from '@sanity/icons'

const TITLE_ALIGN_OPTIONS = [
  {title: 'Left', value: 'left'},
  {title: 'Center', value: 'center'},
] as const

export const experienceCardGridType = defineType({
  name: 'experienceCardGrid',
  title: 'Experience Card Grid',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'locationLabel',
      title: 'Location Label',
      type: 'string',
      description: 'Badge text above the heading, e.g. Barcelona, Spain',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the heading, e.g. iCollege Global',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'titleAlign',
      title: 'Title Alignment',
      type: 'string',
      initialValue: 'left',
      options: {list: [...TITLE_ALIGN_OPTIONS], layout: 'radio'},
    }),
    defineField({
      name: 'bodyParagraph',
      title: 'Body Paragraph',
      type: 'text',
      rows: 4,
      description: 'Introductory paragraph between the heading and image cards.',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      validation: (rule) => rule.required().min(2).max(6),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'experienceCard',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
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
              rows: 2,
            }),
          ],
          preview: {
            select: {title: 'title', media: 'image'},
            prepare({title, media}: {title?: string; media?: React.ReactNode}) {
              return {title: title || 'Experience Card', media}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
      rows: 3,
      description: 'Supporting paragraph below the image grid.',
    }),
    defineField({
      name: 'footerHighlight',
      title: 'Footer Highlight',
      type: 'string',
      description: 'Optional highlighted phrase inside the footer text.',
    }),
    defineField({
      name: 'footerHighlightColor',
      title: 'Highlight Color',
      type: 'string',
      description: 'CSS color for the highlighted phrase (e.g. #F5A623 or var(--color-secondary)).',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      description: 'Button text below the cards, e.g. Explore iCollege Global',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA URL',
      type: 'string',
      description: 'Internal path (e.g. /global-experiences) or full URL',
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
        title: title || 'Experience Card Grid',
        subtitle: `${cards?.length ?? 0} cards`,
        media: ImageIcon,
      }
    },
  },
})
