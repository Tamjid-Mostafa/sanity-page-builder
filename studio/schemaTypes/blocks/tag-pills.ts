import {defineType, defineField, defineArrayMember} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const tagPillsType = defineType({
  name: 'tagPills',
  title: 'Tag Pills',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Labels',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'blockStyles',
      title: 'Block Styles',
      type: 'blockStyles',
      options: {collapsible: true, collapsed: true},
    }),
  ],
  preview: {
    select: {items: 'items'},
    prepare({items}: {items?: string[]}) {
      const labels = items?.filter(Boolean) ?? []
      return {
        title: labels[0] || 'Tag Pills',
        subtitle: labels.length > 1 ? `${labels.length} pills` : undefined,
        media: TagIcon,
      }
    },
  },
})
