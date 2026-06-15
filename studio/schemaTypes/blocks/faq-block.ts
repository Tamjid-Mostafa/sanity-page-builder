import {defineType, defineField, defineArrayMember} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

const faqItemMember = defineArrayMember({
  type: 'object',
  name: 'faqItem',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {title: 'question'},
    prepare({title}: {title?: string}) {
      return {title: title || 'FAQ Item'}
    },
  },
})

export const faqBlockType = defineType({
  name: 'faqBlock',
  title: 'FAQ',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'variation',
      title: 'Variation',
      type: 'string',
      options: {
        list: [
          {title: 'Default (accordion per item)', value: 'default'},
          {title: 'Cards (two-column)', value: 'cards'},
          {title: 'Grouped (single outer accordion)', value: 'grouped'},
          {title: 'Stacked (single column)', value: 'stacked'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the title (shown in grouped variation)',
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
      name: 'showCta',
      title: 'Show CTA Button',
      type: 'boolean',
      description: 'Display a "Book a Conversation" button next to the title',
      initialValue: false,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      initialValue: 'Book a Conversation',
      hidden: ({parent}) => !parent?.showCta,
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      description: 'Used in Default variation',
      hidden: ({parent}) => parent?.variation === 'grouped',
      validation: (rule) =>
        rule.custom((items, context) => {
          const parent = context.parent as {variation?: string}
          if (parent?.variation !== 'grouped' && (!items || (items as unknown[]).length === 0)) {
            return 'At least one item is required'
          }
          return true
        }),
      of: [faqItemMember],
    }),
    defineField({
      name: 'groups',
      title: 'FAQ Groups',
      type: 'array',
      description: 'Used in Grouped variation — organise items by category',
      hidden: ({parent}) => parent?.variation !== 'grouped',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqGroup',
          fields: [
            defineField({
              name: 'label',
              title: 'Group Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'accent',
              title: 'Label Accent',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                ],
                layout: 'radio',
              },
              initialValue: 'primary',
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [faqItemMember],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: {title: 'label', items: 'items'},
            prepare({title, items}: {title?: string; items?: unknown[]}) {
              return {title: title || 'Group', subtitle: `${items?.length ?? 0} items`}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'enableSchema',
      title: 'Enable FAQ Schema (JSON-LD)',
      type: 'boolean',
      description: 'Outputs FAQPage structured data for SEO',
      initialValue: true,
    }),
    defineField({
      name: 'allowMultipleOpen',
      title: 'Allow Multiple Open',
      type: 'boolean',
      initialValue: true,
      hidden: ({parent}) => parent?.variation === 'grouped',
    }),
    defineField({
      name: 'firstOpenByDefault',
      title: 'First Item Open by Default',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.variation === 'grouped',
    }),
    defineField({
      name: 'blockStyles',
      title: 'Block Styles',
      type: 'blockStyles',
      options: {collapsible: true, collapsed: true},
    }),
  ],
  preview: {
    select: {title: 'title', items: 'items'},
    prepare({title, items}: {title?: string; items?: Array<unknown>}) {
      return {
        title: title || 'FAQ',
        subtitle: `${items?.length ?? 0} questions`,
        media: HelpCircleIcon,
      }
    },
  },
})
