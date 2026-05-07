import {defineType, defineField, defineArrayMember} from 'sanity'
import {RocketIcon} from '@sanity/icons'
import {ColorStringInput} from '../../components/ColorStringInput'

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: RocketIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'slides', title: 'Slides'},
    {name: 'videos', title: 'Videos'},
    {name: 'media', title: 'Media'},
    {name: 'background', title: 'Background'},
    {name: 'style', title: 'Style'},
  ],
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'content',
      initialValue: 'videoSlideshow',
      options: {
        list: [
          {title: 'Cinematic Slideshow (full-screen video + slides)', value: 'videoSlideshow'},
          {title: 'Full Width (overlay)', value: 'fullWidth'},
          {title: 'Split (text + media)', value: 'split'},
        ],
        layout: 'radio',
      },
    }),

    // ── CINEMATIC SLIDESHOW fields (videoSlideshow layout) ────────────────
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      group: 'slides',
      description: 'Text content for the hero. Can be fewer than the number of videos — slides cycle independently (e.g. 1 slide + 4 videos = same text, 4 different videos).',
      hidden: ({parent}) => parent?.layout !== 'videoSlideshow',
      validation: (rule) => rule.min(1).max(6),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'heroSlide',
          title: 'Slide',
          fields: [
            defineField({name: 'tag', title: 'Tag / Label', type: 'string', description: 'Small uppercase label above headline'}),
            defineField({name: 'headline', title: 'Headline', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3}),
          ],
          preview: {
            select: {tag: 'tag', headline: 'headline'},
            prepare({tag, headline}: {tag?: string; headline?: string}) {
              return {title: headline || 'Slide', subtitle: tag}
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'backgroundVideos',
      title: 'Background Videos',
      type: 'array',
      group: 'videos',
      description: 'Background videos cycle independently of slides. Add as many as you like regardless of slide count. Use .mp4 for best compatibility.',
      hidden: ({parent}) => parent?.layout !== 'videoSlideshow',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'heroVideo',
          title: 'Video',
          fields: [
            defineField({name: 'title', title: 'Internal Title', type: 'string', validation: (r) => r.required()}),
            defineField({
              name: 'video',
              title: 'Video File',
              type: 'file',
              options: {accept: 'video/*'},
            }),
            defineField({
              name: 'poster',
              title: 'Poster / Thumbnail',
              type: 'image',
              options: {hotspot: true},
              description: 'Shown while video loads',
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare({title}: {title?: string}) {
              return {title: title || 'Video'}
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'slideDurationMs',
      title: 'Slide Duration (ms)',
      type: 'number',
      group: 'slides',
      initialValue: 6000,
      description: 'How long each slide plays before advancing (milliseconds)',
      hidden: ({parent}) => parent?.layout !== 'videoSlideshow',
      validation: (rule) => rule.min(1000).max(30000),
    }),

    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      group: 'content',
      hidden: ({parent}) => parent?.layout !== 'videoSlideshow',
      fields: [
        defineField({name: 'label', type: 'string', title: 'Label', initialValue: 'Book a Conversation'}),
        defineField({
          name: 'action',
          type: 'string',
          title: 'Action',
          initialValue: 'calendly',
          options: {list: [{title: 'Open Calendly', value: 'calendly'}, {title: 'Navigate to URL', value: 'link'}], layout: 'radio'},
        }),
        defineField({name: 'href', type: 'string', title: 'URL', hidden: ({parent}: {parent?: {action?: string}}) => parent?.action !== 'link'}),
      ],
    }),

    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      group: 'content',
      hidden: ({parent}) => parent?.layout !== 'videoSlideshow',
      fields: [
        defineField({name: 'label', type: 'string', title: 'Label', initialValue: 'Check Your Fit'}),
        defineField({name: 'href', type: 'string', title: 'URL', initialValue: '/apply'}),
      ],
    }),

    defineField({
      name: 'pills',
      title: 'Credential Pills',
      type: 'array',
      group: 'content',
      description: 'Small badges shown below the CTAs',
      hidden: ({parent}) => parent?.layout !== 'videoSlideshow',
      of: [defineArrayMember({type: 'string'})],
    }),

    defineField({
      name: 'prospectusLink',
      title: 'Prospectus Download URL',
      type: 'url',
      group: 'content',
      description: 'Link shown below pills (e.g. /prospectus)',
      hidden: ({parent}) => parent?.layout !== 'videoSlideshow',
    }),

    // ── Non-slideshow fields ──────────────────────────────────────────────
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      group: 'content',
      description: 'Small pill badge above the heading',
      hidden: ({parent}) => parent?.layout === 'videoSlideshow',
    }),
    defineField({
      name: 'badgeLink',
      title: 'Badge Link',
      type: 'string',
      group: 'content',
      description: 'Optional URL for the badge',
      hidden: ({parent}) => parent?.layout === 'videoSlideshow',
    }),
    defineField({
      name: 'heading',
      title: 'Heading (H1)',
      type: 'string',
      group: 'content',
      hidden: ({parent}) => parent?.layout === 'videoSlideshow',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      group: 'content',
      rows: 3,
      hidden: ({parent}) => parent?.layout === 'videoSlideshow',
    }),
    defineField({
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      group: 'content',
      initialValue: 'center',
      hidden: ({parent}) => parent?.layout === 'videoSlideshow',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      group: 'content',
      hidden: ({parent}) => parent?.layout === 'videoSlideshow',
      of: [defineArrayMember({type: 'callToAction'})],
      validation: (rule) => rule.max(3),
    }),

    // Media (split layout)
    defineField({
      name: 'mediaImage',
      title: 'Media Image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
      ],
      hidden: ({parent}) => parent?.layout !== 'split',
    }),
    defineField({
      name: 'mediaPosition',
      title: 'Media Position',
      type: 'string',
      group: 'media',
      initialValue: 'right',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => parent?.layout !== 'split',
    }),

    // Background
    defineField({
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      group: 'background',
      initialValue: 'color',
      options: {
        list: [
          {title: 'Color', value: 'color'},
          {title: 'Gradient', value: 'gradient'},
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
      },
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      group: 'background',
      description: 'Hex color',
      hidden: ({parent}) => parent?.backgroundType !== 'color',
      components: {input: ColorStringInput},
    }),
    defineField({
      name: 'gradientFrom',
      title: 'Gradient From',
      type: 'string',
      group: 'background',
      description: 'Start hex color',
      hidden: ({parent}) => parent?.backgroundType !== 'gradient',
      components: {input: ColorStringInput},
    }),
    defineField({
      name: 'gradientTo',
      title: 'Gradient To',
      type: 'string',
      group: 'background',
      description: 'End hex color',
      hidden: ({parent}) => parent?.backgroundType !== 'gradient',
      components: {input: ColorStringInput},
    }),
    defineField({
      name: 'gradientDirection',
      title: 'Gradient Direction',
      type: 'string',
      group: 'background',
      initialValue: 'to bottom right',
      options: {
        list: [
          {title: 'To Bottom', value: 'to bottom'},
          {title: 'To Bottom Right', value: 'to bottom right'},
          {title: 'To Right', value: 'to right'},
          {title: 'To Top Right', value: 'to top right'},
        ],
      },
      hidden: ({parent}) => parent?.backgroundType !== 'gradient',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      group: 'background',
      hidden: ({parent}) => parent?.backgroundType !== 'image',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'file',
      group: 'background',
      description: 'Video file asset (mp4 recommended). Used for fullWidth/split layouts.',
      options: {accept: 'video/*'},
      hidden: ({parent}) => parent?.backgroundType !== 'video' || parent?.layout === 'videoSlideshow',
    }),
    defineField({
      name: 'overlay',
      title: 'Overlay Opacity',
      type: 'number',
      group: 'background',
      description: '0 = none, 100 = fully opaque black overlay',
      initialValue: 0,
      validation: (rule) => rule.min(0).max(100),
      hidden: ({parent}) =>
        !['image', 'video'].includes(parent?.backgroundType as string),
    }),

    // Style
    defineField({
      name: 'minHeight',
      title: 'Minimum Height',
      type: 'string',
      group: 'style',
      initialValue: '75vh',
      options: {
        list: [
          {title: 'Auto', value: 'auto'},
          {title: '50vh', value: '50vh'},
          {title: '75vh', value: '75vh'},
          {title: '100vh (Full Screen)', value: '100vh'},
        ],
      },
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      group: 'style',
      description: 'Hex color for heading and subtitle',
      components: {input: ColorStringInput},
    }),
    defineField({
      name: 'maxWidth',
      title: 'Content Max Width',
      type: 'string',
      group: 'style',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Narrow (768px)', value: 'narrow'},
          {title: 'Default (1200px)', value: 'default'},
          {title: 'Wide (1400px)', value: 'wide'},
        ],
      },
    }),
    defineField({
      name: 'blockStyles',
      title: 'Advanced Styles',
      type: 'blockStyles',
      group: 'style',
      options: {collapsible: true, collapsed: true},
    }),
  ],
  preview: {
    select: {heading: 'heading', layout: 'layout', firstSlide: 'slides.0.headline'},
    prepare({heading, layout, firstSlide}: {heading?: string; layout?: string; firstSlide?: string}) {
      const layoutLabels: Record<string, string> = {
        videoSlideshow: 'Cinematic Slideshow',
        split: 'Split',
        fullWidth: 'Full Width',
      }
      const title = layout === 'videoSlideshow' ? (firstSlide || 'Cinematic Hero') : (heading || 'Hero Section')
      return {
        title,
        subtitle: `Hero — ${layoutLabels[layout ?? ''] ?? layout ?? 'Full Width'}`,
        media: RocketIcon,
      }
    },
  },
})
