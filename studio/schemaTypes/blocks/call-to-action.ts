import {defineType, defineField, defineArrayMember} from 'sanity'
import {LaunchIcon} from '@sanity/icons'
import {ColorStringInput} from '../../components/ColorStringInput'
import {stringField} from '../shared/fields'

export const callToActionType = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    stringField('label', 'Label', {required: true}),
    defineField({
      name: 'action',
      title: 'Action',
      type: 'string',
      initialValue: 'link',
      options: {
        list: [
          {title: 'Navigate to URL / Page', value: 'link'},
          {title: 'Open Calendly', value: 'calendly'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'array',
      hidden: ({parent}) => parent?.action === 'calendly',
      of: [
        defineArrayMember({type: 'linkInternal'}),
        defineArrayMember({type: 'linkExternal'}),
        defineArrayMember({type: 'pageSlug'}),
      ],
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {action?: string}
          if (parent?.action === 'calendly') return true
          if (!value || (value as unknown[]).length === 0) return 'Link is required'
          return true
        }),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color e.g. #FF6B35',
      components: {input: ColorStringInput},
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Hex color for button text',
      components: {input: ColorStringInput},
    }),
    defineField({
      name: 'hoverColor',
      title: 'Hover Color',
      type: 'string',
      description: 'Hex color on hover',
      components: {input: ColorStringInput},
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      initialValue: 'primary',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Outline', value: 'outline'},
          {title: 'Ghost', value: 'ghost'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare({title}: {title?: string}) {
      return {
        title: title || 'Call to Action',
        subtitle: 'Call to Action',
        media: LaunchIcon,
      }
    },
  },
})
