import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const k = () => Math.random().toString(36).slice(2, 11)

const span = (text) => ({_key: k(), _type: 'span', marks: [], text})

const block = (text, style = 'normal', listItem, level) => {
  const node = {
    _key: k(),
    _type: 'block',
    style,
    markDefs: [],
    children: [span(text)],
  }
  if (listItem) {
    node.listItem = listItem
    node.level = level ?? 1
  }
  return node
}

const FIT_FORM_URL = 'https://forms.gle/UnMumWXLvgjEgU2LA'
const HUB_IMAGE_URL =
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1920&q=80'

const studentItems = [
  'Accredited qualifications with our learning partners',
  'Live teaching support',
  'Academic planning',
  'Study platforms',
  'Sequences of learning',
  'Progress tracking',
  'Mentoring and regular check-ins',
]

const approachCards = [
  {
    label: 'Our approach',
    title: 'Recognised Pathways',
    description:
      'Students follow academic routes that can lead to recognised qualifications, depending on their age, goals, and chosen provider pathway.',
    lucide: 'award',
    accentColor: 'primary',
  },
  {
    label: 'Our approach',
    title: 'Weekly Structure',
    description:
      'Each student has a rhythm of study, mentoring, check-ins, and academic expectations.',
    lucide: 'calendar-clock',
    accentColor: 'secondary',
  },
  {
    label: 'Our approach',
    title: 'Human Mentoring',
    description:
      'Students are supported by real people who know them, understand their goals, and help them stay accountable.',
    lucide: 'users',
    accentColor: 'primary',
  },
  {
    label: 'Our approach',
    title: 'Progress Tracking',
    description:
      'We monitor academic progress, study habits, engagement, deadlines, and next steps.',
    lucide: 'line-chart',
    accentColor: 'secondary',
  },
  {
    label: 'Our approach',
    title: 'Parent Communication',
    description: 'Parents receive clear updates, not vague reassurance.',
    lucide: 'message-square',
    accentColor: 'primary',
  },
  {
    label: 'Our approach',
    title: 'University Direction',
    description:
      'Where relevant, we help students understand the academic choices that protect future university options.',
    lucide: 'graduation-cap',
    accentColor: 'secondary',
  },
]

const principleCards = [
  {
    title: 'Design before delivery',
    description: 'Every pathway should have a clear purpose.',
    lucide: 'lightbulb',
    accentColor: 'secondary',
  },
  {
    title: 'Structure with flexibility',
    description: 'Freedom works best with expectations.',
    lucide: 'layers',
    accentColor: 'secondary',
  },
  {
    title: 'Human-led support',
    description: 'Technology helps, but people remain central.',
    lucide: 'heart-handshake',
    accentColor: 'secondary',
  },
  {
    title: 'Clear communication',
    description: 'Families should not be left guessing.',
    lucide: 'messages-square',
    accentColor: 'secondary',
  },
  {
    title: 'Responsible growth',
    description: 'We grow carefully, without losing quality or care.',
    lucide: 'sprout',
    accentColor: 'secondary',
  },
]

const page = {
  _id: 'how-we-work-page',
  _type: 'page',
  title: 'How iCollege Works',
  slug: {_type: 'slug', current: 'about/how-we-work'},
  seo: {
    _type: 'seo',
    metaTitle: 'How iCollege Works | About | iCollege Life',
    metaDescription:
      'Flexible learning, clear structure, and real support. iCollege combines recognised qualifications with mentoring, progress tracking, and university pathway guidance—online or through our Barcelona hub when it helps.',
    noIndex: false,
  },
  pageBuilder: [
    {
      _key: 'hww-hero',
      _type: 'heroSection',
      layout: 'fullWidth',
      alignment: 'left',
      verticalAlign: 'end',
      decorativeBackground: true,
      backgroundType: 'gradient',
      gradientFrom: '#0f172a',
      gradientMid: '#0c1e35',
      gradientTo: '#112840',
      gradientDirection: 'to bottom right',
      minHeight: '70vh',
      badge: 'About iCollege Life',
      heading: 'How iCollege',
      headingHighlight: 'Works',
      subtitle:
        'Flexible learning. Clear structure. Real support.\n\niCollege Life gives students flexible academic pathways without leaving them to manage everything on their own.\n\nWe combine recognised qualifications with mentoring, structure, progress tracking, and university pathway guidance so that students can learn and parents are well-informed.\n\nFlexibility works best when structure is built in.',
      buttons: [
        {
          _key: 'hww-hero-cta-primary',
          _type: 'callToAction',
          action: 'calendly',
          label: 'Book a Conversation',
          variant: 'primary',
        },
        {
          _key: 'hww-hero-cta-secondary',
          _type: 'callToAction',
          action: 'link',
          label: 'Check Your Fit',
          link: [
            {
              _key: k(),
              _type: 'linkExternal',
              url: FIT_FORM_URL,
              openInNewTab: true,
            },
          ],
          variant: 'outline',
        },
      ],
    },
    {
      _key: 'hww-model-intro',
      _type: 'gridRow',
      layout: 'full',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'compact',
      gap: 'md',
      blockStyles: {
        _type: 'blockStyles',
        borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
      },
      columns: [
        {
          _key: 'hww-model-intro-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'hww-model-intro-copy',
              _type: 'richTextBlock',
              eyebrow: 'How it fits together',
              content: [
                block(
                  'A Flexible Model With Structure Built In',
                  'h2',
                ),
                block(
                  'Every student begins with a clear understanding of their current situation, goals, academic needs, and future options. The pathway is flexible, but the support is intentional.',
                ),
                block(
                  'Students are not simply given online courses and left to their own devices. They are guided, monitored, mentored, and supported.',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'hww-model-split',
      _type: 'gridRow',
      layout: '50-50',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'none',
      gap: 'xl',
      columns: [
        {
          _key: 'hww-students-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'hww-students-copy',
              _type: 'richTextBlock',
              eyebrow: 'For students',
              content: [
                block('What Students Receive', 'h3'),
                block(
                  'Students receive a structured academic pathway built around their goals and learning needs.',
                ),
                ...studentItems.map((item) => block(item, 'normal', 'bullet', 1)),
                block(
                  'The aim is simple: help students stay motivated, organised, and moving forward.',
                ),
              ],
            },
          ],
        },
        {
          _key: 'hww-families-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'hww-families-copy',
              _type: 'richTextBlock',
              eyebrow: 'For families',
              content: [
                block('What Parents Receive', 'h3'),
                block('Parents receive clarity.'),
                block(
                  'We track attendance, study habits, academic progress, deadlines, concerns, and next steps. Families are kept updated so they can see what is working, where support is needed, and how the student is progressing.',
                ),
                block(
                  'For many families, this is the missing piece in flexible education. We believe students need independence, but parents still need visibility.',
                ),
              ],
              blockStyles: {
                _type: 'blockStyles',
                background: {color: '#ffffff'},
                border: {width: '1px', style: 'solid', color: '#e5e5e5'},
                borderTop: {width: '2px', style: 'solid', color: '#f5a623'},
                borderRadius: {
                  topLeft: '16px',
                  topRight: '16px',
                  bottomLeft: '16px',
                  bottomRight: '16px',
                },
                padding: {
                  top: '24px',
                  right: '24px',
                  bottom: '24px',
                  left: '24px',
                  topMd: '32px',
                  rightMd: '32px',
                  bottomMd: '32px',
                  leftMd: '32px',
                },
              },
            },
          ],
        },
      ],
    },
    {
      _key: 'hww-approach-row',
      _type: 'gridRow',
      layout: 'full',
      paddingY: 'compact',
      gap: 'md',
      columns: [
        {
          _key: 'hww-approach-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'hww-approach-carousel',
              _type: 'approachCarousel',
              eyebrow: 'Day to day',
              title: 'Our Approach',
              titleAlign: 'left',
              cards: approachCards.map((card) => ({
                _key: k(),
                _type: 'approachCard',
                label: card.label,
                title: card.title,
                description: card.description,
                accentColor: card.accentColor,
                icon: {source: 'lucide', lucide: card.lucide},
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'hww-principles-row',
      _type: 'gridRow',
      layout: 'full',
      paddingY: 'compact',
      blockStyles: {
        _type: 'blockStyles',
        background: {color: '#383838'},
      },
      columns: [
        {
          _key: 'hww-principles-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'hww-principles-grid',
              _type: 'featureCardGrid',
              eyebrow: 'How we think',
              title: 'The Principles Behind the Model',
              subtitle:
                'We believe flexible education should be serious, structured, and human. That means:',
              style: 'onDark',
              columns: '3',
              cards: principleCards.map((card) => ({
                _key: k(),
                _type: 'featureCard',
                title: card.title,
                description: card.description,
                accentColor: card.accentColor,
                icon: {source: 'lucide', lucide: card.lucide},
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'hww-barcelona-banner',
      _type: 'heroSection',
      layout: 'fullWidth',
      alignment: 'left',
      backgroundType: 'image',
      hubOverlay: true,
      backgroundImage: {
        _type: 'image',
        alt: 'Professional learning environment',
        asset: {_type: 'reference', _ref: 'pending'},
      },
      badge: 'Where you learn',
      heading: 'Online or Hybrid Through Our',
      headingHighlight: 'Barcelona Hub',
      subtitle:
        'iCollege is designed to work online. Students can study from anywhere, with structure, mentoring, and regular support built around them.\n\nFor students in Barcelona, or visiting for part of the year, our hub adds supervised study, in-person mentoring, community, and a more professional learning environment.\n\nOnline by design. Barcelona, when it helps.',
    },
    {
      _key: 'hww-closing-row',
      _type: 'gridRow',
      layout: 'full',
      maxWidth: 'default',
      containerAlign: 'center',
      paddingY: 'compact',
      blockStyles: {
        _type: 'blockStyles',
        borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
      },
      columns: [
        {
          _key: 'hww-closing-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'hww-closing-cta',
              _type: 'ctaSection',
              eyebrow: 'Next step',
              heading: 'Is This the Right Fit?',
              size: 'medium',
              bodyParagraphs: [
                {
                  _key: k(),
                  _type: 'ctaBodyParagraph',
                  emphasis: false,
                  text: 'iCollege is best suited to students and families who want flexibility while still caring deeply about progress, standards, university options, and long-term development.',
                },
                {
                  _key: k(),
                  _type: 'ctaBodyParagraph',
                  emphasis: false,
                  text: 'It may be right for students who are training seriously, moving internationally, struggling with traditional school, preparing for university, or needing a more personal academic path.',
                },
              ],
              buttons: [
                {
                  _key: k(),
                  _type: 'callToAction',
                  action: 'calendly',
                  label: 'Book a Conversation',
                  variant: 'primary',
                },
                {
                  _key: k(),
                  _type: 'callToAction',
                  action: 'link',
                  label: 'Check Your Fit',
                  link: [
                    {
                      _key: k(),
                      _type: 'linkExternal',
                      url: FIT_FORM_URL,
                      openInNewTab: true,
                    },
                  ],
                  variant: 'outline',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

async function uploadHubImage() {
  console.log('Uploading Barcelona hub background image…')
  const response = await fetch(HUB_IMAGE_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch hub image: ${response.status}`)
  }
  const buffer = Buffer.from(await response.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, {
    filename: 'barcelona-hub.jpg',
  })
  return asset._id
}

async function main() {
  console.log('Seeding how-we-work page…')
  const hubImageRef = await uploadHubImage()
  const document = structuredClone(page)
  const barcelona = document.pageBuilder.find(
    (section) => section._key === 'hww-barcelona-banner',
  )
  if (barcelona?.backgroundImage?.asset) {
    barcelona.backgroundImage.asset._ref = hubImageRef
  }
  await client.createOrReplace(document)
  console.log('Published document: how-we-work-page (/about/how-we-work)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
