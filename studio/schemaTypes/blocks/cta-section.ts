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
    stringField('subtitle', 'Subtitle', {rows: 3}),
    defineField({
      name: 'buttons',
      title: 'CTA Buttons',
      type: 'array',
      description: 'Primary action buttons. Use "Open Calendly" action for booking links.',
      of: [defineArrayMember({type: 'callToAction'})],
      validation: (rule) => rule.max(3),
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
