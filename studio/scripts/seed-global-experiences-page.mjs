import {getCliClient} from 'sanity/cli'
import {
  GRID_DEFAULTS,
  GLOBAL_CTA_ROW_STYLES,
  GLOBAL_HERO_GRADIENT,
  createKeyGenerator,
  createBlockHelpers,
} from './seed-helpers.mjs'

const client = getCliClient({apiVersion: '2024-01-01'})
const k = createKeyGenerator()
const {block, faqAnswer, globalCtaBlock, globalFooterRow} = createBlockHelpers(k)

const audienceCards = [
  {
    title: '18+ Students and Young Adults',
    description:
      'For students exploring direction, independence, confidence, university choices, work, travel, or plans.',
    accentColor: 'primary',
    lucide: 'user',
  },
  {
    title: 'Gap-Year Students',
    description: 'For young people who want a meaningful experience before or alongside university.',
    accentColor: 'secondary',
    lucide: 'plane',
  },
  {
    title: 'School and University Groups',
    description:
      'For visiting groups looking for workshops, culture, personal development, and real-world learning in Barcelona.',
    accentColor: 'primary',
    lucide: 'users',
  },
  {
    title: 'Partner Organisations',
    description: 'For agencies, residences, academies, and institutions looking for tailored student programmes.',
    accentColor: 'secondary',
    lucide: 'handshake',
  },
]

const howSteps = [
  {
    title: 'Understand the Group',
    description: 'We clarify the age range, goals, dates, numbers, budget, and preferred themes.',
  },
  {
    title: 'Design the Experience',
    description:
      'We build a programme combining workshops, reflection, cultural experiences, and practical logistics.',
  },
  {
    title: 'Deliver in Barcelona',
    description:
      'Students take part in a structured experience blending learning, exploration, mentoring, and city discovery.',
  },
  {
    title: 'Reflect and Move Forward',
    description: 'The programme ends with reflection, next steps, and a clearer sense of direction.',
  },
]

const includeItems = [
  'Life design and discovery workshops',
  'Entrepreneurship and project-based learning',
  'Business, leadership and communication sessions',
  'Confidence and self-awareness activities',
  'Barcelona cultural experiences',
  'University and career exploration',
  'Sport, wellbeing, and lifestyle elements',
  'Real-world projects',
  'Reflection and mentoring',
]

const themeCards = [
  {
    title: 'Life Design Barcelona',
    description: 'Direction, identity, confidence, choices, and future possibilities.',
    accentColor: 'primary',
  },
  {
    title: 'Entrepreneurship & Future Skills',
    description: 'Business, creativity, communication, innovation, and real-world projects.',
    accentColor: 'secondary',
  },
  {
    title: 'Leadership & Communication',
    description: 'Teamwork, public speaking, decision-making, responsibility, and confidence.',
    accentColor: 'primary',
  },
  {
    title: 'School & University Visits',
    description:
      'Meaningful Barcelona experiences combine workshops, culture, and personal development.',
    accentColor: 'secondary',
  },
  {
    title: 'Custom Partner Programmes',
    description:
      'Tailored short courses for schools, universities, agencies, residences, or organisations.',
    accentColor: 'primary',
  },
]

const overviewFaqs = [
  {
    q: 'Who are Global programmes for?',
    a: 'Older students, school groups, university groups, gap-year students, and partner organisations.',
  },
  {
    q: 'How long are the programmes?',
    a: 'Programmes can range from short workshops to multi-day or multi-week experiences.',
  },
  {
    q: 'Can programmes be customised?',
    a: 'Yes. Programmes can be adapted around age, dates, themes, budget, accommodation, and desired outcomes.',
  },
  {
    q: 'Do you provide accommodation?',
    a: 'iCollege can help coordinate with local accommodation partners where needed, depending on dates, availability, and group size.',
  },
  {
    q: 'Can this work for school visits?',
    a: 'Yes. Global can support school groups seeking a Barcelona experience focused on learning, reflection, and personal development.',
  },
  {
    q: 'Can this work for 18+ students?',
    a: 'Yes. Global is especially suitable for young adults exploring direction, independence, university, work, entrepreneurship, or life choices.',
  },
]

const page = {
  _id: 'global-experiences-page',
  _type: 'page',
  title: 'Global Experiences',
  slug: {_type: 'slug', current: 'global-experiences'},
  seo: {
    _type: 'seo',
    metaTitle: 'Global Overview | iCollege Global | iCollege Life',
    metaDescription:
      'Barcelona-based learning experiences for groups and older students — life design, entrepreneurship, leadership, culture, and structured programmes through iCollege Global.',
    noIndex: false,
  },
  pageBuilder: [
    {
      _key: 'global-overview-hero',
      _type: 'heroSection',
      ...GLOBAL_HERO_GRADIENT,
      minHeight: '58vh',
      badge: 'iCollege Global',
      heading: 'Barcelona-Based Learning Experiences for Groups and Older Students',
      subtitle:
        'iCollege Global creates short programmes for school and university groups, older students, gap-year students, and partner organisations.\n\nProgrammes combine life design, business, entrepreneurship, leadership, communication, culture, language and real-world exploration in Barcelona.',
      pills: [
        'Life Design',
        'Entrepreneurship',
        'Leadership',
        'Communication',
        'Culture',
        'Barcelona Experiences',
      ],
      buttons: [
        {
          _key: k(),
          _type: 'callToAction',
          action: 'calendly',
          label: 'Enquire About a Programme',
          variant: 'primary',
        },
        {
          _key: k(),
          _type: 'callToAction',
          action: 'link',
          label: 'Explore Global Programmes',
          variant: 'outline',
          link: [{_key: k(), _type: 'pageSlug', slug: 'global-experiences/programmes'}],
        },
      ],
    },
    {
      _key: 'global-overview-what-is',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'global-overview-what-is-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-overview-what-is-copy',
              _type: 'richTextBlock',
              eyebrow: 'Overview',
              content: [
                block('What is iCollege Global?', 'h2'),
                block(
                  'iCollege Global is the experience-based side of iCollege Life. While iCollege Academy supports flexible academic pathways, Global helps older students and groups explore life beyond school through short programmes, workshops, projects, and Barcelona-based experiences.',
                ),
                block(
                  'Students are encouraged to think more clearly about who they are, what they value, where they are going, and what kind of future they want to build.',
                ),
                block('Learning should not only happen in classrooms.', 'normal', undefined, undefined, ['strong']),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'global-overview-who-for',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {
        _type: 'blockStyles',
        borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
        background: {color: '#f7f7f7'},
      },
      columns: [
        {
          _key: 'global-overview-who-for-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-overview-who-for-grid',
              _type: 'featureCardGrid',
              eyebrow: 'Audience',
              title: 'Who It Is For',
              subtitle: 'iCollege Global is designed for:',
              style: 'audience',
              columns: '2',
              cards: audienceCards.map((card) => ({
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
      _key: 'global-overview-includes',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'global-overview-includes-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-overview-includes-copy',
              _type: 'richTextBlock',
              eyebrow: 'Flexibility',
              content: [
                block('What Programmes Can Include', 'h2'),
                block(
                  'Each programme can be adapted around the group, age, goals, dates, and budget. Possible elements include:',
                ),
                ...includeItems.map((item) => block(item, 'normal', 'bullet', 1)),
                block(
                  'The goal is not simply to visit Barcelona. The goal is to use Barcelona as a place to learn, reflect, explore, and grow.',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'global-overview-why-barcelona',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {_type: 'blockStyles', background: {color: '#f7f7f7'}},
      columns: [
        {
          _key: 'global-overview-why-barcelona-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-overview-why-barcelona-copy',
              _type: 'richTextBlock',
              eyebrow: 'Place',
              content: [
                block('Why Barcelona?', 'h2'),
                block(
                  'Barcelona is an ideal city for international learning. It combines culture, history, sport, design, entrepreneurship, universities, creativity, and Mediterranean lifestyle in one accessible global city.',
                ),
                block(
                  'For students, Barcelona can become a living classroom, a place to explore ideas, independence, identity, and future direction.',
                ),
                block('Barcelona is not just the setting. It is part of the learning experience.', 'normal', undefined, undefined, ['strong']),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'global-overview-themes',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      paddingY: 'lg',
      columns: [
        {
          _key: 'global-overview-themes-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-overview-themes-grid',
              _type: 'featureCardGrid',
              eyebrow: 'Themes',
              title: 'Example Programme Themes',
              style: 'themePreview',
              columns: '5',
              cards: themeCards.map((card) => ({
                _key: k(),
                _type: 'featureCard',
                title: card.title,
                description: card.description,
                accentColor: card.accentColor,
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'global-overview-how',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {
        _type: 'blockStyles',
        borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
        background: {color: '#f7f7f7'},
      },
      columns: [
        {
          _key: 'global-overview-how-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-overview-how-grid',
              _type: 'featureCardGrid',
              eyebrow: 'Process',
              title: 'How It Works',
              style: 'processStep',
              columns: '4',
              cards: howSteps.map((step) => ({
                _key: k(),
                _type: 'featureCard',
                title: step.title,
                description: step.description,
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'global-overview-academy-global',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'global-overview-academy-global-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-overview-academy-global-copy',
              _type: 'richTextBlock',
              eyebrow: 'iCollege Life',
              content: [
                block('Academy and Global', 'h2'),
                block(
                  'The same belief connects Academy and Global: Education should support the life a young person is trying to build, not put it on hold!',
                ),
                block(
                  'The Academy supports flexible academic pathways. Global offers short experiences that help older students and groups explore life, work, leadership, entrepreneurship, and direction.',
                ),
                block(
                  'Together, they reflect the wider mission of iCollege Life: Helping young people build credible futures and meaningful lives.',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'global-overview-explore-links',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'global-overview-explore-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-overview-explore-cards',
              _type: 'featureCardGrid',
              eyebrow: 'Explore',
              title: 'Go deeper',
              subtitle: 'Programme detail and partner landing pages build on this overview.',
              titleAlign: 'center',
              style: 'exploreLink',
              columns: '2',
              cards: [
                {
                  _key: k(),
                  _type: 'featureCard',
                  title: 'Global Programmes',
                  description: 'Themes, formats, and what every programme can include.',
                  cta: {label: 'Continue', href: '/global-experiences/programmes'},
                  icon: {source: 'lucide', lucide: 'graduation-cap'},
                },
                {
                  _key: k(),
                  _type: 'featureCard',
                  title: 'For Schools & Groups',
                  description: 'Partner pathways for school visits, universities, and organisations.',
                  cta: {label: 'Continue', href: '/global-experiences/for-schools-and-groups'},
                  icon: {source: 'lucide', lucide: 'landmark'},
                },
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'global-overview-faq',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {_type: 'blockStyles', background: {color: '#f7f7f7'}},
      columns: [
        {
          _key: 'global-overview-faq-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-overview-faq-block',
              _type: 'faqBlock',
              eyebrow: 'FAQ',
              title: 'Questions Partners Often Ask',
              variation: 'default',
              enableSchema: true,
              items: overviewFaqs.map((item) => ({
                _key: k(),
                _type: 'faqItem',
                question: item.q,
                answer: faqAnswer(item.a),
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'global-overview-final-cta',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      paddingY: 'none',
      containerAlign: 'center',
      blockStyles: GLOBAL_CTA_ROW_STYLES,
      columns: [
        {
          _key: 'global-overview-final-cta-col',
          verticalAlign: 'top',
          content: [
            globalCtaBlock({
              key: 'global-overview-final-cta-block',
              heading: 'Enquire About iCollege Global',
              paragraphs: [
                'Every programme is designed around the student or group.',
                'Tell us who the programme is for, what you are looking for, and when you plan to come to Barcelona.',
              ],
              postButtonText:
                'We can help you understand what is possible, realistic, and worth building.',
              buttons: [
                {
                  _key: k(),
                  _type: 'callToAction',
                  action: 'calendly',
                  label: 'Enquire About a Programme',
                  variant: 'primary',
                },
                {
                  _key: k(),
                  _type: 'callToAction',
                  action: 'link',
                  label: 'Explore Global Programmes',
                  variant: 'outline',
                  link: [{_key: k(), _type: 'pageSlug', slug: 'global-experiences/programmes'}],
                },
              ],
            }),
          ],
        },
      ],
    },
    globalFooterRow('global-overview'),
  ],
}

async function main() {
  console.log('Seeding global experiences page…')
  await client.createOrReplace(page)
  console.log('Published document: global-experiences-page (/global-experiences)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
