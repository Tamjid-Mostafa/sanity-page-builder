import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const k = () => Math.random().toString(36).slice(2, 11)

const span = (text, marks = []) => ({_key: k(), _type: 'span', marks, text})

const block = (text, style = 'normal', listItem, level, marks = []) => {
  const node = {
    _key: k(),
    _type: 'block',
    style,
    markDefs: [],
    children: [span(text, marks)],
  }
  if (listItem) {
    node.listItem = listItem
    node.level = level ?? 1
  }
  return node
}

const FIT_FORM_URL = 'https://forms.gle/UnMumWXLvgjEgU2LA'
const DARK_SURFACE = '#383838'
const MUTED_SURFACE = '#efefef'
const ON_DARK_TEXT = {typography: {textColor: '#ffffff'}}

const CARD_BLOCK_STYLES = {
  _type: 'blockStyles',
  background: {color: '#ffffff'},
  border: {width: '1px', style: 'solid', color: '#e5e5e5'},
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
}

const heroPills = [
  'US High School Diploma',
  'GCSE/A-Level Support',
  'AP/SAT Guidance',
  'Mentoring',
  'Online/Barcelona Hybrid',
]

const whoItsForCards = [
  {
    title: 'Student-Athletes',
    description:
      'For students balancing academics with training, competition, travel, and sporting ambitions.',
    lucide: 'dumbbell',
    accentColor: 'primary',
  },
  {
    title: 'International Families',
    description:
      'For families who need continuity, structure, and recognised academic pathways.',
    lucide: 'globe-2',
    accentColor: 'secondary',
  },
  {
    title: 'Independent High-Achieving Learners',
    description:
      'For students who need more ownership with mentoring, accountability, and direction.',
    lucide: 'lightbulb',
    accentColor: 'primary',
  },
  {
    title: 'University-Focused Students',
    description:
      'For students who want options for US, UK, European, or global university routes.',
    lucide: 'graduation-cap',
    accentColor: 'secondary',
  },
  {
    title: 'Modern Lifestyle Families',
    description:
      'Families building more flexible lives around travel, work, and wellbeing.',
    lucide: 'users',
    accentColor: 'primary',
  },
  {
    title: 'Creatives, Performers and Young Entrepreneurs',
    description:
      'Performing arts and business students who are building real-world projects and portfolios.',
    lucide: 'palette',
    accentColor: 'secondary',
  },
  {
    title: 'Students Needing Direction',
    description:
      'Capable students who need more confidence, structure, mentoring, and accountability.',
    lucide: 'sparkles',
    accentColor: 'primary',
  },
]

const howItWorksSteps = [
  {
    title: 'Understand the Student',
    description:
      'We start with the student\'s current academic position, goals, lifestyle, strengths, challenges, and future ambitions. We baseline and assess before making any recommendations.',
    lucide: 'user-round-search',
    accentColor: 'primary',
  },
  {
    title: 'Design the Pathway',
    description:
      'We recommend the right academic route, such as a US High School Diploma, GCSE/A-Level support, AP/SAT preparation, English support, or a blended pathway.',
    lucide: 'compass',
    accentColor: 'secondary',
  },
  {
    title: 'Build the Structure',
    description:
      'We create a weekly rhythm of study, mentoring, tutor support, accountability, and progress tracking.',
    lucide: 'layout-list',
    accentColor: 'primary',
  },
  {
    title: 'Keep Parents Informed',
    description:
      'Families receive regular updates, so they know what is happening, where progress is being made, and what comes next.',
    lucide: 'message-circle',
    accentColor: 'secondary',
  },
]

const pathwayItems = [
  'Accredited US High School Diploma',
  'GCSE or A-Level support',
  'AP and SAT guidance',
  'English language or IELTS support',
  'Subject tuition where needed',
  'University pathway planning',
  'Online or Barcelona hybrid support',
]

const supportIncludes = [
  'Weekly mentoring and accountability',
  'Structured study planning',
  'Tutor coordination where needed',
  'Progress tracking',
  'Parent reporting',
  'University pathway guidance',
  'Clear expectations and routines',
]

const outcomeProgressions = [
  'US, UK, European, and international universities',
  'Athletic and academic pathways',
  'Gap-year or global experience programmes',
  'Creative, entrepreneurial, or alternative routes',
  'Further academic or professional development',
]

const parentTrustReasons = [
  'Flexibility without isolation',
  'Structure without rigidity',
  'Recognised pathways without confusion',
  'Mentoring without micromanagement',
  'Parent communication without constant chasing',
  'University guidance without forcing one definition of success',
]

const page = {
  _id: 'academy-page',
  _type: 'page',
  title: 'iCollege Academy',
  slug: {_type: 'slug', current: 'academy'},
  seo: {
    _type: 'seo',
    metaTitle: 'iCollege Academy | iCollege Life',
    metaDescription:
      'Flexible academic pathways for ambitious international students — online from anywhere or in person in Barcelona, with recognised routes, structure, mentoring, and university guidance.',
    noIndex: false,
  },
  pageBuilder: [
    {
      _key: 'academy-hero',
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
      minHeight: '78vh',
      badge: 'iCollege Academy',
      heading: 'Flexible Academic Pathways for',
      headingHighlight: 'Ambitious International Students',
      subtitle:
        'Study online from anywhere, or access in-person support through our Barcelona hub by following recognised academic pathways with structure, trust, confidence, and university guidance.\n\nIdeal for: Student-athletes · Globally mobile families · Independent high achievers · Creatives · Young entrepreneurs · Students needing confidence, direction, and support',
      pills: heroPills,
      buttons: [
        {
          _key: 'academy-hero-cta-primary',
          _type: 'callToAction',
          action: 'calendly',
          label: 'Book a Conversation',
          variant: 'primary',
        },
        {
          _key: 'academy-hero-cta-secondary',
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
      _key: 'academy-what-is',
      _type: 'gridRow',
      layout: 'full',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'compact',
      blockStyles: {
        _type: 'blockStyles',
        borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
      },
      columns: [
        {
          _key: 'academy-what-is-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-what-is-copy',
              _type: 'richTextBlock',
              eyebrow: 'The Academy',
              content: [
                block('What iCollege Academy Is', 'h2'),
                block(
                  'iCollege Academy is the core academic pathway of iCollege Life. We help students follow recognised qualification routes while providing the structure, mentoring, accountability, and parent communication that flexible education needs.',
                ),
                block(
                  'For some students, this means a US High School Diploma pathway with AP/SAT preparation. For others, it may include GCSE or A-Level support. For some, that might mean English or Spanish language support, subject tuition, or a blended route towards university.',
                ),
                block(
                  'Flexible education. Serious structure. Credible outcomes.',
                  'blockquote',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'academy-why-families',
      _type: 'gridRow',
      layout: 'full',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'compact',
      blockStyles: {
        _type: 'blockStyles',
        background: {color: MUTED_SURFACE},
      },
      columns: [
        {
          _key: 'academy-why-families-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-why-families-copy',
              _type: 'richTextBlock',
              eyebrow: 'Families',
              content: [
                block('Why Families Choose iCollege Academy', 'h2'),
                block(
                  'Families usually come to us because something about the traditional school model no longer fits. Their child may be training seriously, moving internationally, preparing for university, building a project, needing more confidence, or looking for a more personalised route.',
                ),
                block(
                  'iCollege Academy gives families a flexible alternative without leaving students isolated or unsupported.',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'academy-who-its-for',
      _type: 'gridRow',
      layout: 'full',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'compact',
      columns: [
        {
          _key: 'academy-who-its-for-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-who-its-for-grid',
              _type: 'featureCardGrid',
              style: 'bordered',
              columns: '3',
              eyebrow: 'Students',
              title: 'Who It Is For',
              subtitle:
                'iCollege Academy is designed for students whose lives, goals, or circumstances do not fit neatly into a traditional school model.',
              cards: whoItsForCards.map((card) => ({
                _key: k(),
                _type: 'featureCard',
                title: card.title,
                description: card.description,
                accentColor: card.accentColor,
                accentApplyTo: ['icon', 'iconBg'],
                icon: {source: 'lucide', lucide: card.lucide},
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'academy-right-fit',
      _type: 'gridRow',
      layout: 'full',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'compact',
      columns: [
        {
          _key: 'academy-right-fit-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-right-fit-copy',
              _type: 'richTextBlock',
              eyebrow: 'Fit',
              content: [
                block('Is iCollege the Right Fit?', 'h2'),
                block(
                  'iCollege Academy works best for students and families who want flexibility with structure. Students need to engage, communicate, attend check-ins, complete work, and take increasing ownership of their learning.',
                ),
                block(
                  'It may not be the right fit for families looking for constant supervision, a traditional school environment, or unlimited customisation without accountability.',
                ),
                block(
                  'Flexibility works best when expectations are clear, and everyone is committed to the process.',
                  'blockquote',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'academy-how-it-works',
      _type: 'gridRow',
      layout: 'full',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'compact',
      blockStyles: {
        _type: 'blockStyles',
        background: {color: DARK_SURFACE},
        typography: {textColor: '#ffffff'},
        borderTop: {width: '1px', style: 'solid', color: 'rgba(255,255,255,0.1)'},
      },
      columns: [
        {
          _key: 'academy-how-it-works-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-how-it-works-grid',
              _type: 'featureCardGrid',
              style: 'onDark',
              columns: '2',
              eyebrow: 'Process',
              title: 'How It Works',
              cards: howItWorksSteps.map((card) => ({
                _key: k(),
                _type: 'featureCard',
                title: card.title,
                description: card.description,
                accentColor: card.accentColor,
                accentApplyTo: ['icon', 'iconBg'],
                icon: {source: 'lucide', lucide: card.lucide},
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'academy-pathways-intro',
      _type: 'gridRow',
      layout: '50-50',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'compact',
      gap: 'xl',
      blockStyles: {
        _type: 'blockStyles',
        borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
      },
      columns: [
        {
          _key: 'academy-pathways-left',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-pathways-intro-copy',
              _type: 'richTextBlock',
              eyebrow: 'Pathways',
              content: [
                block('Academic Pathways', 'h2'),
                block(
                  'iCollege Academy is pathway-led, not one-size-fits-all. Depending on the student\'s goals, the pathway may include:',
                ),
              ],
            },
          ],
        },
        {
          _key: 'academy-pathways-right',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-pathways-list',
              _type: 'richTextBlock',
              blockStyles: CARD_BLOCK_STYLES,
              content: pathwayItems.map((item) => block(item, 'normal', 'bullet', 1)),
            },
          ],
        },
      ],
    },
    {
      _key: 'academy-pathways-cta',
      _type: 'gridRow',
      layout: 'full',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'none',
      columns: [
        {
          _key: 'academy-pathways-cta-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-pathways-close',
              _type: 'richTextBlock',
              content: [
                block(
                  'iCollege helps families understand which route makes sense, what is recognised, and how each pathway can support future university options.',
                ),
              ],
            },
            {
              _key: 'academy-pathways-link',
              _type: 'callToAction',
              action: 'link',
              label: 'Explore Qualifications & Pathways',
              variant: 'primary',
              link: [
                {
                  _key: k(),
                  _type: 'pageSlug',
                  slug: 'academy/curriculum-and-qualifications',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'academy-support-row',
      _type: 'gridRow',
      layout: '50-50',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'compact',
      gap: 'xl',
      blockStyles: {
        _type: 'blockStyles',
        background: {color: MUTED_SURFACE},
      },
      columns: [
        {
          _key: 'academy-support-left',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-support-intro',
              _type: 'richTextBlock',
              eyebrow: 'Support',
              content: [
                block('Flexible, But Structured', 'h2'),
                block(
                  'Flexibility only works when students are properly supported. That is why iCollege Academy includes:',
                ),
              ],
            },
          ],
        },
        {
          _key: 'academy-support-right',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-support-list',
              _type: 'richTextBlock',
              blockStyles: CARD_BLOCK_STYLES,
              content: [
                ...supportIncludes.map((item) => block(item, 'normal', 'bullet', 1)),
                block(
                  'Students are treated as young adults, while still receiving the guidance they need.',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'academy-barcelona-hub',
      _type: 'gridRow',
      layout: 'full',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'compact',
      blockStyles: {
        _type: 'blockStyles',
        background: {color: MUTED_SURFACE},
        borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
      },
      columns: [
        {
          _key: 'academy-barcelona-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-barcelona-copy',
              _type: 'richTextBlock',
              eyebrow: 'Delivery',
              content: [
                block('Online by Design. Barcelona, When It Helps.', 'h2'),
                block(
                  'iCollege Academy is built for internationally mobile students. Many students work with us online from wherever they are in the world.',
                ),
                block(
                  'For students based in Barcelona, or visiting for part of the year, our hub offers in-person structure, supervised study, mentoring, and community.',
                ),
                block('Barcelona is not a limitation. It is a launchpad.'),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'academy-outcomes',
      _type: 'gridRow',
      layout: '50-50',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'compact',
      gap: 'xl',
      blockStyles: {
        _type: 'blockStyles',
        borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
      },
      columns: [
        {
          _key: 'academy-outcomes-left',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-outcomes-copy',
              _type: 'richTextBlock',
              eyebrow: 'Direction',
              content: [
                block('Outcomes & Direction', 'h2'),
                block(
                  'Our goal is not simply for students to complete courses. It is to help them move forward with clarity, confidence, and credible options. iCollege Academy supports progression towards:',
                ),
                block(
                  'Every pathway is designed with the student\'s future in mind.',
                  'normal',
                  null,
                  null,
                  ['strong'],
                ),
              ],
            },
          ],
        },
        {
          _key: 'academy-outcomes-right',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-outcomes-list',
              _type: 'richTextBlock',
              blockStyles: CARD_BLOCK_STYLES,
              content: outcomeProgressions.map((item) => block(item, 'normal', 'bullet', 1)),
            },
          ],
        },
      ],
    },
    {
      _key: 'academy-parents-trust',
      _type: 'gridRow',
      layout: 'full',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'compact',
      blockStyles: {
        _type: 'blockStyles',
        background: {color: DARK_SURFACE},
        typography: {textColor: '#ffffff'},
        borderTop: {width: '1px', style: 'solid', color: 'rgba(255,255,255,0.1)'},
      },
      columns: [
        {
          _key: 'academy-parents-trust-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-parents-trust-grid',
              _type: 'featureCardGrid',
              style: 'onDark',
              columns: '3',
              eyebrow: 'For families',
              title: 'Why Parents Trust iCollege Academy',
              subtitle: 'Parents choose iCollege because it offers:',
              cards: parentTrustReasons.map((title) => ({
                _key: k(),
                _type: 'featureCard',
                title,
                accentColor: 'secondary',
                accentApplyTo: ['iconBg'],
              })),
            },
            {
              _key: 'academy-parents-trust-close',
              _type: 'richTextBlock',
              blockStyles: {_type: 'blockStyles', ...ON_DARK_TEXT},
              content: [
                block(
                  'This is education designed for the world students are actually entering.',
                  'blockquote',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'academy-final-cta',
      _type: 'gridRow',
      layout: 'full',
      maxWidth: 'default',
      containerAlign: 'center',
      paddingY: 'compact',
      blockStyles: {
        _type: 'blockStyles',
        background: {color: DARK_SURFACE},
        typography: {textColor: '#ffffff', textAlign: 'center'},
        borderTop: {width: '1px', style: 'solid', color: 'rgba(255,255,255,0.1)'},
      },
      columns: [
        {
          _key: 'academy-final-cta-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-final-cta-block',
              _type: 'ctaSection',
              eyebrow: 'Get started',
              heading: 'Start With a Conversation',
              size: 'medium',
              blockStyles: {
                _type: 'blockStyles',
                typography: {textColor: '#ffffff'},
              },
              bodyParagraphs: [
                {
                  _key: k(),
                  _type: 'ctaBodyParagraph',
                  emphasis: false,
                  text: 'Every student\'s situation is different. The best first step is a conversation about your child\'s goals, current academic position, and whether iCollege Academy is the right fit.',
                },
                {
                  _key: k(),
                  _type: 'ctaBodyParagraph',
                  emphasis: true,
                  text: 'If iCollege is not the right fit, we will tell you honestly.',
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
              trustItems: [
                'Online & hybrid',
                'Recognised pathways',
                'Mentoring & structure',
                'University guidance',
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'academy-footer-line',
      _type: 'gridRow',
      layout: 'full',
      maxWidth: 'default',
      containerAlign: 'center',
      paddingY: 'compact',
      blockStyles: {
        _type: 'blockStyles',
        borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
        typography: {textAlign: 'center'},
      },
      columns: [
        {
          _key: 'academy-footer-line-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'academy-footer-line-copy',
              _type: 'richTextBlock',
              content: [
                block(
                  'iCollege Academy is part of iCollege Life — helping young people design smarter lives, academically and beyond.',
                ),
              ],
            },
          ],
        },
      ],
    },
  ],
}

async function main() {
  console.log('Seeding academy page…')
  await client.createOrReplace(page)
  console.log('Published document: academy-page (/academy)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
