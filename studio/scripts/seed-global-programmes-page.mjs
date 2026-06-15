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

const programmeThemes = [
  {
    title: 'Life Design Barcelona',
    summary:
      'For students exploring direction, identity, choices, confidence, and future possibilities.',
    bulletsLabel: 'Can include',
    bullets: [
      'Strengths and values exploration',
      'Decision-making and confidence',
      'University, work, and lifestyle reflection',
      'Mentoring and guided reflection',
      'Barcelona-based experiences',
    ],
    bestFor: '18+ students, gap-year students, young adults, and pre-university groups.',
    accentColor: 'primary',
    lucide: 'compass',
  },
  {
    title: 'Entrepreneurship & Future Skills',
    summary:
      'For students interested in business, creativity, communication, and real-world projects.',
    bulletsLabel: 'Can include',
    bullets: [
      'Business idea development',
      'Problem-solving challenges',
      'Communication and pitching',
      'Personal branding basics',
      'Project-based learning',
      'Local entrepreneur talks where possible',
    ],
    bestFor:
      'School groups, university groups, gap-year students, and young people interested in business or creativity.',
    accentColor: 'secondary',
    lucide: 'lightbulb',
  },
  {
    title: 'Leadership & Communication',
    summary:
      'For students who want to build confidence, responsibility, and the ability to work with others.',
    bulletsLabel: 'Can include',
    bullets: [
      'Public speaking',
      'Teamwork challenges',
      'Leadership workshops',
      'Communication practice',
      'Feedback and reflection',
    ],
    bestFor: 'Schools, universities, sports academies, and youth organisations.',
    accentColor: 'primary',
    lucide: 'mic-2',
  },
  {
    title: 'Barcelona Learning Experience',
    summary: 'For groups who want more than a standard school trip.',
    bulletsLabel: 'Can include',
    bullets: [
      "Barcelona's history, culture and language",
      'Design, sport, business, or creativity themes',
      'Guided city experiences',
      'Reflection workshops',
      'Group projects',
      'Evening or weekend activities where appropriate',
    ],
    bestFor:
      'Visiting school groups, university groups, international partners, and educational travel organisations.',
    accentColor: 'secondary',
    lucide: 'map-pinned',
  },
  {
    title: 'Custom Partner Programme',
    summary:
      'For schools, universities, agencies, academies, and organisations wanting a tailored experience.',
    bulletsLabel: 'Possible themes',
    bullets: [
      'Life design',
      'Entrepreneurship',
      'Leadership',
      'Communication',
      'Sport and wellbeing',
      'Global citizenship',
      'University preparation',
      'Career exploration',
      'Barcelona cultural learning',
    ],
    bestFor: 'Partners who want a bespoke Barcelona-based learning experience.',
    accentColor: 'primary',
    lucide: 'sliders-horizontal',
  },
]

const formatHeaders = ['Format', 'Best for', 'Example use']
const formatRows = [
  ['Half-Day Workshop', 'Local or visiting groups', 'Life design, leadership, communication'],
  ['1–3 Day Programme', 'Short visits', 'Workshops + cultural learning'],
  ['1 Week Experience', 'Deeper group programme', 'Learning, projects, reflection, and city experiences'],
  ['2 Week Experience', 'Residential or study-trip model', 'Workshops, excursions, mentoring, projects'],
  ['Custom Programme', 'Partner organisations', 'Built around goals, dates, and budget'],
]

const includesCards = [
  {
    title: 'Learning',
    description:
      'Workshops, discussions, projects, talks, or guided sessions around the chosen theme.',
    accentColor: 'primary',
    lucide: 'book-open',
  },
  {
    title: 'Experience',
    description:
      'Barcelona-based activities that connect learning to real places, people, culture, and opportunities.',
    accentColor: 'secondary',
    lucide: 'map-pin',
  },
  {
    title: 'Reflection',
    description:
      'Structured reflection so students understand what the experience means for their future.',
    accentColor: 'primary',
    lucide: 'message-circle',
  },
]

const bookers = [
  {title: 'School groups', lucide: 'users'},
  {title: 'University groups', lucide: 'graduation-cap'},
  {title: 'Gap-year students', lucide: 'plane'},
  {title: '18+ students and young adults', lucide: 'user-check'},
  {title: 'Sports academies', lucide: 'dumbbell'},
  {title: 'Education agencies', lucide: 'handshake'},
  {title: 'Residences and student accommodation partners', lucide: 'building-2'},
  {title: 'International organisations', lucide: 'globe-2'},
  {title: 'Families seeking a short, structured experience', lucide: 'heart-handshake'},
]

const programmeFaqs = [
  {
    q: 'Are programmes fixed or customised?',
    a: "Some core themes are fixed, but programmes are usually adapted around the group's age, goals, dates, numbers, and budget.",
  },
  {
    q: 'How long can programmes be?',
    a: 'They can range from a short workshop to a multi-day or multi-week experience.',
  },
  {
    q: 'Can accommodation be included?',
    a: 'iCollege can help coordinate with accommodation partners where needed, depending on availability, group size, and dates.',
  },
  {
    q: 'Can you include cultural activities?',
    a: 'Yes. Cultural experiences can be included, but the aim is to connect activities to learning, reflection, or personal development.',
  },
  {
    q: 'Can programmes be run for school visits?',
    a: 'Yes. iCollege Global is well-suited to schools seeking a Barcelona visit with a more educational purpose than a standard trip.',
  },
  {
    q: 'Can individuals join?',
    a: 'Some programmes may be available for individual 18+ or gap-year students. Others are designed for groups or partner organisations.',
  },
  {
    q: 'Do programmes include academic credit?',
    a: 'Most iCollege Global programmes are non-credit experiences unless arranged through a partner institution. They are designed for learning, reflection, skills, and personal development.',
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
  _id: 'global-programmes-page',
  _type: 'page',
  title: 'Global Programmes',
  slug: {_type: 'slug', current: 'global-experiences/programmes'},
  seo: {
    _type: 'seo',
    metaTitle: 'Global Programmes | iCollege Global | iCollege Life',
    metaDescription:
      'Barcelona-based short learning experiences for schools, universities, gap-year students, and partners — life design, entrepreneurship, leadership, culture, and structured reflection.',
    noIndex: false,
  },
  pageBuilder: [
    {
      _key: 'global-programmes-hero',
      _type: 'heroSection',
      ...GLOBAL_HERO_GRADIENT,
      minHeight: '82vh',
      badge: 'Global Programmes',
      heading: 'Short Learning Experiences With Purpose',
      subtitle:
        "iCollege Global creates Barcelona-based programmes for older students, school groups, university groups, gap-year students, and partner organisations.\n\nEach programme combines learning, real-world experiences, cultural exploration, and structured reflection, designed around the group's goals.",
      pills: ['Life Design', 'Entrepreneurship', 'Leadership', 'Communication', 'Culture', 'Barcelona'],
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
          label: 'For Schools & Groups',
          variant: 'outline',
          link: [{_key: k(), _type: 'pageSlug', slug: 'global-experiences/for-schools-and-groups'}],
        },
      ],
    },
    {
      _key: 'global-programmes-themes',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {_type: 'blockStyles', borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'}},
      columns: [
        {
          _key: 'global-programmes-themes-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-programmes-themes-grid',
              _type: 'featureCardGrid',
              eyebrow: 'Explore',
              title: 'Programme Themes',
              style: 'programmeTheme',
              columns: '3',
              cards: programmeThemes.map((theme) => ({
                _key: k(),
                _type: 'featureCard',
                title: theme.title,
                description: theme.summary,
                bulletsLabel: theme.bulletsLabel,
                includes: theme.bullets,
                bestFor: [theme.bestFor],
                accentColor: theme.accentColor,
                accentApplyTo: ['icon', 'iconBg'],
                icon: {source: 'lucide', lucide: theme.lucide},
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'global-programmes-formats',
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
          _key: 'global-programmes-formats-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-programmes-formats-copy',
              _type: 'richTextBlock',
              eyebrow: 'Formats',
              content: [block('Programme Formats', 'h2')],
            },
            buildDataTable(formatHeaders, formatRows, {variant: 'formats'}),
          ],
        },
      ],
    },
    {
      _key: 'global-programmes-includes',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      paddingY: 'lg',
      columns: [
        {
          _key: 'global-programmes-includes-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-programmes-includes-grid',
              _type: 'featureCardGrid',
              eyebrow: 'Foundations',
              title: 'What Every Programme Includes',
              style: 'foundations',
              columns: '3',
              cards: includesCards.map((card) => ({
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
      _key: 'global-programmes-bookers',
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
          _key: 'global-programmes-bookers-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-programmes-bookers-grid',
              _type: 'featureCardGrid',
              eyebrow: 'Bookings',
              title: 'Who Can Book?',
              subtitle: 'iCollege Global can work with:',
              style: 'bookingChips',
              columns: '5',
              cards: bookers.map((item) => ({
                _key: k(),
                _type: 'featureCard',
                title: item.title,
                icon: {source: 'lucide', lucide: item.lucide},
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'global-programmes-faq',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      paddingY: 'lg',
      columns: [
        {
          _key: 'global-programmes-faq-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'global-programmes-faq-block',
              _type: 'faqBlock',
              eyebrow: 'FAQ',
              title: 'Questions Partners Often Ask',
              variation: 'default',
              enableSchema: true,
              items: programmeFaqs.map((item) => ({
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
      _key: 'global-programmes-final-cta',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      paddingY: 'none',
      containerAlign: 'center',
      blockStyles: GLOBAL_CTA_ROW_STYLES,
      columns: [
        {
          _key: 'global-programmes-final-cta-col',
          verticalAlign: 'top',
          content: [
            globalCtaBlock({
              key: 'global-programmes-final-cta-block',
              heading: 'Build a Programme With Us',
              paragraphs: [
                'Tell us who the programme is for, what you want students to gain, and when you are thinking of coming to Barcelona.',
                'We can help shape a programme that is meaningful, realistic, and worth doing.',
              ],
              postButtonText:
                'Programmes can be adapted around age, dates, group size, goals, and budget.',
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
                  label: 'For Schools & Groups',
                  variant: 'outline',
                  link: [{_key: k(), _type: 'pageSlug', slug: 'global-experiences/for-schools-and-groups'}],
                },
              ],
            }),
          ],
        },
      ],
    },
    globalFooterRow('global-programmes'),
  ],
}

async function main() {
  console.log('Seeding global programmes page…')
  await client.createOrReplace(page)
  console.log('Published document: global-programmes-page (/global-experiences/programmes)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
