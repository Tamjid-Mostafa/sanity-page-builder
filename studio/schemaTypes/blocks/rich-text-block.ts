import {defineType, defineField} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'
import {stringField} from '../shared/fields'

export const richTextBlockType = defineType({
  name: 'richTextBlock',
  title: 'Rich Text',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    stringField('eyebrow', 'Eyebrow', {
      description: 'Small uppercase label above the content (e.g. "Home Page")',
    }),
    defineField({
      name: 'leadingIcon',
      title: 'Leading Icon',
      type: 'lucide-icon',
      description: 'Optional icon displayed above the eyebrow.',
    }),
    defineField({
      name: 'eyebrowTone',
      title: 'Eyebrow Tone',
      type: 'string',
      initialValue: 'primary',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Muted', value: 'muted'},
          {title: 'Secondary (on dark)', value: 'secondary'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'headingScale',
      title: 'Heading Scale',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Compact', value: 'compact'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blockStyles',
      title: 'Block Styles',
      type: 'blockStyles',
      options: {collapsible: true, collapsed: true},
    }),
  ],
  preview: {
    select: {content: 'content', eyebrow: 'eyebrow'},
    prepare({
      content,
      eyebrow,
    }: {
      content?: Array<{children?: Array<{text?: string}>}>
      eyebrow?: string
    }) {
      const firstBlock = content?.[0]
      const text = firstBlock?.children?.map((c) => c.text).join('') || 'Rich Text'
      return {title: text, subtitle: eyebrow, media: DocumentTextIcon}
    },
  },
})
