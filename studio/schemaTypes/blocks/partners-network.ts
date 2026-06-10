import {defineType, defineField, defineArrayMember} from 'sanity'
import {UsersIcon} from '@sanity/icons'
import {stringField} from '../shared/fields'

export const partnersNetworkType = defineType({
  name: 'partnersNetwork',
  title: 'Partners Network',
  type: 'object',
  icon: UsersIcon,
  fields: [
    stringField('eyebrow', 'Eyebrow', {
      description: 'Small label above the heading (e.g. "Partners and networks")',
    }),
    stringField('heading', 'Heading', {
      required: true,
      description: 'Main section heading (e.g. "Built with trusted partners")',
    }),
    stringField('subtitle', 'Subtitle', {
      rows: 3,
      description: 'Supporting paragraph below the heading',
    }),
    stringField('logosLabel', 'Logos Label', {
      description: 'Small label above the logo row (e.g. "Organisations & networks")',
    }),
    defineField({
      name: 'logos',
      title: 'Partner Logos',
      type: 'array',
      validation: (rule) => rule.min(1).max(12),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'partnerLogo',
          title: 'Logo',
          fields: [
            defineField({
              name: 'image',
              title: 'Logo',
              type: 'image',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
              description: 'Optional — clicking the logo opens this URL.',
            }),
          ],
          preview: {
            select: {media: 'image', alt: 'alt'},
            prepare({media, alt}) {
              return {title: alt || 'Partner logo', media}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'displayStyle',
      title: 'Logo Layout',
      type: 'string',
      initialValue: 'row',
      options: {
        list: [
          {title: 'Row (centered flex)', value: 'row'},
          {title: 'Grid', value: 'grid'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'gridColumns',
      title: 'Grid Columns (desktop)',
      type: 'number',
      initialValue: 6,
      hidden: ({parent}) => parent?.displayStyle !== 'grid',
      options: {
        list: [
          {title: '3', value: 3},
          {title: '4', value: 4},
          {title: '5', value: 5},
          {title: '6', value: 6},
        ],
      },
    }),
    defineField({
      name: 'grayscale',
      title: 'Grayscale Logos',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'size',
      title: 'Logo Size',
      type: 'string',
      initialValue: 'medium',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'blockStyles',
      title: 'Block Styles',
      type: 'blockStyles',
      options: {collapsible: true, collapsed: true},
    }),
  ],
  preview: {
    select: {heading: 'heading', eyebrow: 'eyebrow', logos: 'logos'},
    prepare({heading, eyebrow, logos}: {heading?: string; eyebrow?: string; logos?: unknown[]}) {
      const count = logos?.length ?? 0
      return {
        title: heading || 'Partners Network',
        subtitle: [eyebrow, count ? `${count} logo${count !== 1 ? 's' : ''}` : null]
          .filter(Boolean)
          .join(' · '),
        media: UsersIcon,
      }
    },
  },
})
