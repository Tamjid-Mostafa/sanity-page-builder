import {defineType, defineField} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const microFooterLineType = defineType({
  name: 'microFooterLine',
  title: 'Micro Footer Line',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Global', value: 'global'},
          {title: 'Academy', value: 'academy'},
        ],
        layout: 'radio',
      },
      initialValue: 'global',
    }),
    defineField({
      name: 'blockStyles',
      title: 'Block Styles',
      type: 'blockStyles',
      options: {collapsible: true, collapsed: true},
    }),
  ],
  preview: {
    select: {variant: 'variant'},
    prepare({variant}: {variant?: string}) {
      const label = variant === 'academy' ? 'Academy' : 'Global'
      return {title: 'Micro footer line', subtitle: label}
    },
  },
})
