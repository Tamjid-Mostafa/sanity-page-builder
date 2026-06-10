import {defineType, defineField} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const footerNavLinkType = defineType({
  name: 'footerNavLink',
  title: 'Footer Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Internal path (e.g. /about) or full URL',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'newTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'text', subtitle: 'url'},
    prepare({title, subtitle}: {title?: string; subtitle?: string}) {
      return {title: title || 'Link', subtitle}
    },
  },
})
