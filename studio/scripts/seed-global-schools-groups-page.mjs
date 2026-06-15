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

const whoWeWorkWith = [
  {
    title: 'Schools',
    description:
      'Barcelona visits with educational purpose, personal development, and cultural learning.',
    accentColor: 'primary',
    lucide: 'school',
  },
  {
    title: 'Universities',
    description:
      'Short international experiences around business, entrepreneurship, life design, discovery, communication, culture, language and global learning.',
    accentColor: 'secondary',
    lucide: 'graduation-cap',
  },
  {
    title: 'Education Agencies',
    description: 'A trusted Barcelona partner to help design and deliver student experiences.',
    accentColor: 'primary',
    lucide: 'network',
  },
  {
    title: 'Sports Academies',
    description:
      'Personal development, leadership, communication, or life-design workshops for athletes.',
    accentColor: 'secondary',
    lucide: 'dumbbell',
  },
  {
    title: 'Residences and Student Organisations',
    description: 'Workshops, short courses, or structured experiences for young adults and residents.',
    accentColor: 'primary',
    lucide: 'building-2',
  },
]

const partnerWays = [
  {
    title: 'Programme Design',
    description: 'Learning structure, themes, workshops, and outcomes.',
    accentColor: 'primary',
    lucide: 'layout-grid',
  },
  {
    title: 'Add-On Workshops',
    description:
      'Life design, entrepreneurship, leadership, or communication sessions inside an existing trip.',
    accentColor: 'secondary',
    lucide: 'puzzle',
  },
  {
    title: 'Local Delivery',
    description: 'Workshops, mentoring, and local learning experiences in Barcelona.',
    accentColor: 'primary',
    lucide: 'map-pin',
  },
  {
    title: 'Full Experience Support',
    description:
      'A broader programme including workshops, activities, learning spaces, and local partners where appropriate.',
    accentColor: 'secondary',
    lucide: 'layers',
  },
]

const formatHeaders = ['Format', 'Best for', 'Example']
const formatRows = [
  ['Half-Day Workshop', 'Short visits or local groups', 'Life design, leadership, communication'],
  ['1–3 Day Programme', 'School or university visits', 'Workshops + Barcelona experiences'],
  ['1 Week Programme', 'Deeper group learning', 'Projects, culture, reflection'],
  ['2 Week Programme', 'Residential or study-trip model', 'Workshops, excursions, mentoring'],
  ['Custom Programme', 'Schools, agencies, academies, partners', 'Built around your goals and dates'],
]

const possibleThemes = [
  'life design',
  'entrepreneurship',
  'leadership and communication',
  'confidence and self-awareness',
  'Barcelona culture and language',
  'real-world projects',
  'university and career exploration',
  'sport, wellbeing, and lifestyle',
  'reflection and mentoring',
]

const processSteps = [
  {
    title: 'Understand Your Group',
    description:
      'We discuss age, group size, dates, goals, budget, accommodation needs, and desired outcomes.',
  },
  {
    title: 'Design the Programme',
    description:
      'We propose a structure that balances workshops, city experiences, reflection, and logistics.',
  },
  {
    title: 'Deliver in Barcelona',
    description:
      'Students take part in a structured experience designed to help them learn, explore, and grow.',
  },
  {
    title: 'Reflect and Move Forward',
    description: 'The programme closes with reflection, next steps, and a clearer sense of direction.',
  },
]

const schoolsFaqs = [
  {
    q: 'Can you customise programmes for our school or organisation?',
    a: 'Yes. Programmes are usually adapted around age, goals, dates, numbers, budget, and desired outcomes.',
  },
  {
    q: 'Can you work with an existing school trip?',
    a: 'Yes. iCollege can add workshops, mentoring, reflection, or educational structure to an existing Barcelona visit.',
  },
  {
    q: 'Can you help with accommodation?',
    a: 'Where needed, we can help coordinate with local accommodation partners, depending on dates, availability, and group size.',
  },
  {
    q: 'Do you work with sports academies?',
    a: 'Yes. We can support academies with leadership, communication, life design, academic direction, or personal development workshops for athletes.',
  },
  {
    q: 'What age groups do you work with?',
    a: 'Global programmes are usually best for older school students, university students, gap-year students, and young adults. We can discuss younger groups where the fit is right.',
  },
  {
    q: 'Are programmes accredited?',
    a: 'Most Global programmes are non-credit experiences unless arranged through a partner institution. They are designed for learning, reflection, personal development, and future direction.',
  },
]

function buildDataTable(headers, rows, {caption, variant = 'default'} = {}) {
  return {
    _key: k(),
    _type: 'dataTable',
    variant,
    caption,
    striped: variant !== 'formats',
    compact: false,
    headers: headers.map((text) => ({_key: k(), _type: 'tableHeader', text})),
    rows: rows.map((cells) => ({
      _key: k(),
      _type: 'dataTableRow',
      cells: cells.map((text) => ({_key: k(), _type: 'tableCell', text})),
    })),
  }
}

const page = {
  _id: 'global-schools-groups-page',
  _type: 'page',
  title: 'For Schools and Groups',
  slug: {_type: 'slug', current: 'global-experiences/for-schools-and-groups'},
  seo: {
    _type: 'seo',
    metaTitle: 'For Schools & Groups | Global | iCollege Life',
    metaDescription:
      "Barcelona learning experiences for schools, universities, and partner organisations — workshops, culture, real-world learning, and structured reflection around your group's goals.",
    noIndex: false,
  },
  pageBuilder: [
    {
      _key: 'schools-groups-hero',
      _type: 'heroSection',
      ...GLOBAL_HERO_GRADIENT,
      minHeight: '90vh',
      badge: 'For Schools & Groups',
      heading:
        'Barcelona Learning Experiences for Schools, Universities, and Partner Organisations',
      subtitle:
        "iCollege Global helps schools, universities, agencies, academies, and partner organisations create meaningful Barcelona-based learning experiences for students.\n\nProgrammes combine workshops, cultural exploration, real-world learning, and structured reflection, designed around your group's age, goals, dates, and budget.",
      pills: [
        'School Visits',
        'University Groups',
        'Gap-Year Groups',
        'Sports Academies',
        'Partner Programmes',
      ],
      buttons: [
        {
          _key: k(),
          _type: 'callToAction',
          action: 'calendly',
          label: 'Plan a Group Programme',
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
      _key: 'schools-groups-more-than-trip',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      paddingY: 'lg',
      columns: [
        {
          _key: 'schools-groups-more-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'schools-groups-more-copy',
              _type: 'richTextBlock',
              eyebrow: 'Partner programmes',
              content: [
                block('More Than a Standard Trip', 'h2'),
                block(
                  'A standard trip can be enjoyable. A well-designed learning experience can be transformational.',
                ),
                block(
                  'iCollege Global helps groups explore independence, leadership, communication, entrepreneurship, culture, and future direction in Barcelona.',
                ),
                block(
                  'Barcelona gives the experience energy. iCollege gives it structure.',
                  'normal',
                  undefined,
                  undefined,
                  ['strong'],
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'schools-groups-who',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      paddingY: 'lg',
      blockStyles: {
        _type: 'blockStyles',
        borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
        background: {color: '#f7f7f7'},
      },
      columns: [
        {
          _key: 'schools-groups-who-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'schools-groups-who-grid',
              _type: 'featureCardGrid',
              eyebrow: 'Partner organisations',
              title: 'Who We Work With',
              style: 'audience',
              columns: '5',
              cards: whoWeWorkWith.map((item) => ({
                _key: k(),
                _type: 'featureCard',
                title: item.title,
                description: item.description,
                accentColor: item.accentColor,
                accentApplyTo: ['icon', 'iconBg'],
                icon: {source: 'lucide', lucide: item.lucide},
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'schools-groups-build',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      paddingY: 'lg',
      columns: [
        {
          _key: 'schools-groups-build-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'schools-groups-build-copy',
              _type: 'richTextBlock',
              eyebrow: 'What We Can Build',
              content: [block('Programmes can be designed as:', 'h2')],
            },
            buildDataTable(formatHeaders, formatRows, {variant: 'formats'}),
            {
              _key: 'schools-groups-themes',
              _type: 'tagPills',
              label: 'Possible themes include:',
              tone: 'outline',
              items: possibleThemes,
            },
          ],
        },
      ],
    },
    {
      _key: 'schools-groups-process',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      paddingY: 'lg',
      blockStyles: {
        _type: 'blockStyles',
        borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
        background: {color: '#f5f5f5'},
      },
      columns: [
        {
          _key: 'schools-groups-process-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'schools-groups-process-grid',
              _type: 'featureCardGrid',
              eyebrow: 'Process',
              title: 'How It Works',
              style: 'processStep',
              columns: '4',
              cards: processSteps.map((step) => ({
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
      _key: 'schools-groups-why',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      paddingY: 'lg',
      columns: [
        {
          _key: 'schools-groups-why-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'schools-groups-why-copy',
              _type: 'richTextBlock',
              headingScale: 'compact',
              content: [
                block('Why Barcelona Works', 'h2'),
                block(
                  'Barcelona offers a rare mix of culture, sport, design, history, entrepreneurship, universities, an international community, and a Mediterranean lifestyle.',
                ),
                block(
                  'For students, it can become a living classroom, a city where they explore ideas, identity, independence, and future possibilities.',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'schools-groups-ways',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      paddingY: 'lg',
      blockStyles: {
        _type: 'blockStyles',
        borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
        background: {color: '#f7f7f7'},
      },
      columns: [
        {
          _key: 'schools-groups-ways-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'schools-groups-ways-grid',
              _type: 'featureCardGrid',
              eyebrow: 'Ways to Partner',
              title: 'iCollege can support partners through:',
              style: 'partnerGrid',
              columns: '2',
              cards: partnerWays.map((item) => ({
                _key: k(),
                _type: 'featureCard',
                title: item.title,
                description: item.description,
                accentColor: item.accentColor,
                accentApplyTo: ['icon', 'iconBg'],
                icon: {source: 'lucide', lucide: item.lucide},
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'schools-groups-faq',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      paddingY: 'lg',
      columns: [
        {
          _key: 'schools-groups-faq-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'schools-groups-faq-block',
              _type: 'faqBlock',
              eyebrow: 'FAQ',
              title: 'Questions Partners Often Ask',
              subtitle:
                'If you need something more specific, start with a short call — we can walk through fit, timing, and outcomes together.',
              variation: 'cards',
              enableSchema: true,
              items: schoolsFaqs.map((item) => ({
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
      _key: 'schools-groups-final-cta',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      paddingY: 'none',
      containerAlign: 'center',
      blockStyles: GLOBAL_CTA_ROW_STYLES,
      columns: [
        {
          _key: 'schools-groups-final-cta-col',
          verticalAlign: 'top',
          content: [
            globalCtaBlock({
              key: 'schools-groups-final-cta-block',
              heading: 'Plan a Group Programme',
              paragraphs: [
                'Tell us about your group, dates, goals, and what you want students to gain from their time in Barcelona.',
                'We can help design something meaningful, realistic, and worth doing.',
              ],
              postButtonText:
                'Programmes can be adapted around age, group size, dates, budget, accommodation, and desired outcomes.',
              buttons: [
                {
                  _key: k(),
                  _type: 'callToAction',
                  action: 'calendly',
                  label: 'Plan a Group Programme',
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
    globalFooterRow('schools-groups'),
  ],
}

async function main() {
  console.log('Seeding global schools and groups page…')
  await client.createOrReplace(page)
  console.log('Published document: global-schools-groups-page (/global-experiences/for-schools-and-groups)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
