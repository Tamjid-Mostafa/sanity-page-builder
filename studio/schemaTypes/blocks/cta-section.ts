import {defineType, defineField, defineArrayMember} from 'sanity'
import {ThumbsUpIcon} from '@sanity/icons'
import {stringField, linkField} from '../shared/fields'

export const ctaSectionType = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  icon: ThumbsUpIcon,
  fields: [
    stringField('eyebrow', 'Eyebrow', {description: 'Small uppercase label above the heading (e.g. "Next step")'}),
    stringField('heading', 'Heading', {required: true}),
    stringField('subtitle', 'Subtitle', {
      rows: 3,
      description: 'Legacy single paragraph. Prefer Body Paragraphs for multi-line copy.',
    }),
    defineField({
      name: 'bodyParagraphs',
      title: 'Body Paragraphs',
      type: 'array',
      description: 'Supporting copy below the heading. Mark the last line as emphasized for the bold closing statement.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'ctaBodyParagraph',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'emphasis',
              title: 'Emphasized style',
              type: 'boolean',
              description: 'Use for the bold closing statement',
              initialValue: false,
            }),
          ],
          preview: {
            select: {title: 'text', emphasis: 'emphasis'},
            prepare({title, emphasis}: {title?: string; emphasis?: boolean}) {
              return {
                title: title || 'Paragraph',
                subtitle: emphasis ? 'Emphasized' : undefined,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'buttons',
      title: 'CTA Buttons',
      type: 'array',
      description: 'Primary action buttons. Use "Open Calendly" action for booking links.',
      of: [defineArrayMember({type: 'callToAction'})],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      initialValue: 'large',
      options: {
        list: [
          {title: 'Large (home hero)', value: 'large'},
          {title: 'Medium (page closing)', value: 'medium'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'closingStyle',
      title: 'Closing Style (deprecated)',
      type: 'string',
      hidden: true,
      readOnly: true,
      initialValue: 'global',
    }),
    stringField('postButtonText', 'Post-Button Text', {
      rows: 2,
      description: 'Optional line shown below the buttons (e.g. fees closing emphasis).',
    }),
    defineField({
      name: 'trustItems',
      title: 'Trust Indicator Chips',
      type: 'array',
      description: 'Short bullet labels shown below the buttons (e.g. "A Levels", "High School Diploma")',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'prospectusLink',
      title: 'Footer Link',
      description: 'Optional text link shown below the trust chips (e.g. "Download our prospectus")',
      type: 'object',
      fields: [
        stringField('label', 'Link Text'),
        linkField('link', 'Destination'),
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
    select: {heading: 'heading', eyebrow: 'eyebrow'},
    prepare({heading, eyebrow}: {heading?: string; eyebrow?: string}) {
      return {
        title: heading || 'CTA Section',
        subtitle: eyebrow || 'CTA Section',
        media: ThumbsUpIcon,
      }
    },
  },
})
