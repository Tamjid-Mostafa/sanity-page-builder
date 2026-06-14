import {getCliClient} from 'sanity/cli'
import {
  FIT_FORM_URL,
  GRID_DEFAULTS,
  HERO_GRADIENT,
  CARD_BLOCK_STYLES,
  DARK_SURFACE,
  MUTED_SURFACE,
  createKeyGenerator,
  createBlockHelpers,
} from './seed-helpers.mjs'

const client = getCliClient({apiVersion: '2024-01-01'})
const k = createKeyGenerator()
const {block, faqAnswer, ctaButtons, academyFooterRow} = createBlockHelpers(k)

const programmeCards = [
  {
    title: 'Flex/Online Pathway',
    price: 'From €7,500/year',
    enrolment: 'Enrolment fee: €1,000',
    description:
      'Flexible academic pathway online, with mentoring, structure, progress tracking, parent reporting, and university guidance.',
    bestFor:
      'Globally mobile families, independent learners, travelling students, and students needing flexible online support.',
  },
  {
    title: 'University Pathway',
    price: 'From €13,500/year',
    enrolment: 'Enrolment fee: €1,500',
    format: 'Online or Barcelona Hybrid',
    description:
      'Deeper academic planning, stronger mentoring, university pathway guidance, and optional AP/SAT, IELTS, or subject support.',
    bestFor: 'Students aiming for US, UK, European, or international university options.',
  },
  {
    title: 'Premier Pathway',
    price: 'From €19,500/year',
    enrolment: 'Enrolment fee: €2,000',
    format: 'Online or Barcelona Hybrid',
    description:
      'Fully personalised, high-touch pathway with deeper planning, regular communication, academic coordination, mentoring, and future guidance.',
    bestFor:
      'Complex cases, high achievers, competitive university goals, and students needing a bespoke route.',
  },
  {
    title: 'Academic Pathway Review',
    price: '€350',
    enrolment: 'Credited against enrolment fee if joining within 30 days',
    description:
      'For families who need detailed guidance before choosing a programme. Helps clarify the best qualification route, previous schooling, university options, support level, and whether iCollege is the right fit.',
    bestFor: 'Families who need detailed advice before committing.',
  },
]

const paymentOptions = [
  {
    title: 'Annual Payment',
    body: 'Pay tuition in full before the programme begins and receive a 5% annual payment reduction in tuition fees.',
  },
  {
    title: 'Termly Payment',
    body: 'Tuition is paid in three instalments across the academic year.',
  },
  {
    title: 'Monthly Instalments',
    body: 'Monthly instalments may be available by agreement. These are a payment plan for the annual programme, not a month-to-month service.',
  },
]

const annualHeaders = ['Programme', 'Tuition', '5% Reduction', 'Enrolment Fee', 'Upfront Total']
const annualRows = [
  ['Flex/Online', '€7,500', '-€375', '€1,000', '€8,125'],
  ['University Pathway', '€13,500', '-€675', '€1,500', '€14,325'],
  ['Premier Pathway', '€19,500', '-€975', '€2,000', '€20,525'],
]

const usuallyIncluded = [
  'Academic pathway planning',
  'Mentoring and accountability',
  'Structured study rhythm',
  'Progress tracking',
  'Parent reporting',
  'University pathway guidance',
  'Tutor coordination where needed',
  'Online or Barcelona hybrid support',
]

const maybeExtra = [
  'Online provider fees',
  '1-to-1 subject tuition',
  'Additional AP/SAT preparation',
  'Additional English support',
  'GCSE or A-Level support',
  'External examinations',
  'Transcript request fees',
  'University application costs',
  'Document translation or legalisation',
]

const parentFaqs = [
  {
    q: 'Why are fees shown as "from" prices?',
    a: 'Because each student’s pathway can vary depending on qualification route, level of support, delivery format, provider costs, and additional academic support.',
  },
  {
    q: 'Is the enrolment fee included?',
    a: 'No. The enrolment fee is separate and secures the student’s place and onboarding.',
  },
  {
    q: 'Does the 5% annual payment reduction apply to the enrolment fee?',
    a: 'No. It applies to tuition fees only.',
  },
  {
    q: 'Can we pay monthly?',
    a: 'Monthly instalments may be available by agreement. They are a payment plan for the annual programme, not a cancel-any-time monthly service.',
  },
  {
    q: 'Are provider and exam fees included?',
    a: 'Not always. External course provider fees, exam fees, transcript fees, AP/SAT/IELTS fees, UNEDasis/PCE fees, and university application fees may be separate.',
  },
  {
    q: 'Is the Academic Pathway Review required?',
    a: 'Not always. It is most useful for families who need detailed advice before choosing a programme.',
  },
  {
    q: 'Is the Academic Pathway Review deducted from enrolment?',
    a: 'Yes. The €350 fee can be credited against the enrolment fee if the student joins within 30 days of the enrolment date.',
  },
  {
    q: 'How much does 1-to-1 tuition cost?',
    a: '1-to-1 tuition is usually charged from €60–€90 per hour, depending on the subject, level, tutor, and support required.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Payment by bank transfer or Wise is preferred. Card payments may be available via Stripe upon request. If paying by card, any Stripe processing fees may be added to the invoice.',
  },
  {
    q: 'Are taxes included?',
    a: 'Fees are shown in euros. Any applicable taxes or third-party costs will be confirmed before enrolment.',
  },
]

function buildDataTable(headers, rows, caption) {
  return {
    _key: k(),
    _type: 'dataTable',
    caption,
    striped: true,
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
  _id: 'academy-fees-page',
  _type: 'page',
  title: 'Academy Fees',
  slug: {_type: 'slug', current: 'academy/fees'},
  seo: {
    _type: 'seo',
    metaTitle: 'Academy Fees | iCollege Academy',
    metaDescription:
      'Clear iCollege Academy fees for flexible academic pathways, with programme options, payment methods, and parent FAQs.',
    noIndex: false,
  },
  pageBuilder: [
    {
      _key: 'fees-hero',
      _type: 'heroSection',
      ...HERO_GRADIENT,
      minHeight: '70vh',
      badge: 'iCollege Academy · Fees',
      heading: 'Clear fees for',
      headingHighlight: 'flexible academic pathways.',
      subtitle:
        'Most iCollege Academy students follow a US High School Diploma pathway, supported by structure, mentoring, parent reporting, and university guidance.\n\nFees are shown as from prices because each student\'s pathway and level of support may vary.',
      pills: ['US HSD focus', 'From prices', 'Barcelona & online'],
      buttons: ctaButtons('fees-hero-primary', 'fees-hero-secondary'),
    },
    {
      _key: 'fees-programmes',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {_type: 'blockStyles', borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'}},
      columns: [
        {
          _key: 'fees-programmes-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'fees-programmes-grid',
              _type: 'featureCardGrid',
              eyebrow: 'Programmes',
              title: 'Programme Fees',
              subtitle:
                'Three core pathways. Each includes structure, mentoring, and clear academic direction.',
              style: 'bordered',
              columns: '2',
              cards: programmeCards.map((card) => ({
                _key: k(),
                _type: 'featureCard',
                title: card.title,
                subtitle: `${card.price} · ${card.enrolment}`,
                description: `${card.description}\n\nBest for: ${card.bestFor}${card.format ? `\n\nFormat: ${card.format}` : ''}`,
                accentColor: 'primary',
                accentApplyTo: ['title'],
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'fees-payment-options',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {_type: 'blockStyles', background: {color: MUTED_SURFACE}},
      columns: [
        {
          _key: 'fees-payment-options-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'fees-payment-options-grid',
              _type: 'featureCardGrid',
              eyebrow: 'Billing',
              title: 'Payment Options',
              style: 'bordered',
              columns: '3',
              cards: paymentOptions.map((item, idx) => ({
                _key: k(),
                _type: 'featureCard',
                title: item.title,
                description: item.body,
                accentColor: idx % 2 === 0 ? 'primary' : 'secondary',
                accentApplyTo: ['title'],
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'fees-annual-table',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'fees-annual-table-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'fees-annual-table-copy',
              _type: 'richTextBlock',
              eyebrow: 'Annual pay',
              content: [
                block('Annual Payment Example', 'h2'),
                block(
                  'The 5% annual payment reduction applies to tuition fees only, not enrolment fees.',
                ),
              ],
            },
            buildDataTable(annualHeaders, annualRows, 'Annual payment example'),
          ],
        },
      ],
    },
    {
      _key: 'fees-included-extra',
      _type: 'gridRow',
      layout: '50-50',
      ...GRID_DEFAULTS,
      gap: 'xl',
      blockStyles: {_type: 'blockStyles', background: {color: MUTED_SURFACE}},
      columns: [
        {
          _key: 'fees-included-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'fees-included-copy',
              _type: 'richTextBlock',
              eyebrow: 'Transparency',
              blockStyles: CARD_BLOCK_STYLES,
              content: [
                block("What's Included, and What May Be Extra", 'h2'),
                block('Usually included', 'h3'),
                ...usuallyIncluded.map((item) => block(item, 'normal', 'bullet', 1)),
              ],
            },
          ],
        },
        {
          _key: 'fees-extra-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'fees-extra-copy',
              _type: 'richTextBlock',
              blockStyles: CARD_BLOCK_STYLES,
              content: [
                block('Maybe extra', 'h3'),
                ...maybeExtra.map((item) => block(item, 'normal', 'bullet', 1)),
                block(
                  'Guide: 1-to-1 tuition is usually charged from €60–€90 per hour, depending on subject, level, tutor, and support required.',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'fees-faq',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'fees-faq-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'fees-faq-block',
              _type: 'faqBlock',
              eyebrow: 'Parents',
              title: 'Questions Parents Often Ask',
              variation: 'default',
              enableSchema: true,
              items: parentFaqs.map((item) => ({
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
      _key: 'fees-final-cta',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      containerAlign: 'center',
      blockStyles: {
        _type: 'blockStyles',
        background: {color: DARK_SURFACE},
        typography: {textColor: '#ffffff', textAlign: 'center'},
      },
      columns: [
        {
          _key: 'fees-final-cta-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'fees-final-cta-block',
              _type: 'ctaSection',
              eyebrow: 'Next step',
              heading: 'Start with the right plan',
              size: 'medium',
              bodyParagraphs: [
                {
                  _key: k(),
                  _type: 'ctaBodyParagraph',
                  emphasis: false,
                  text: "The right programme depends on the student's goals, academic history, independence, and level of support needed.",
                },
                {
                  _key: k(),
                  _type: 'ctaBodyParagraph',
                  emphasis: true,
                  text: 'We will explain fees clearly before enrolment.',
                },
              ],
              buttons: ctaButtons(k(), k()),
              trustItems: ['Flex / online', 'University pathway', 'Premier pathway'],
            },
          ],
        },
      ],
    },
    academyFooterRow('academy-fees'),
  ],
}

async function main() {
  console.log('Seeding academy fees page…')
  await client.createOrReplace(page)
  console.log('Published document: academy-fees-page (/academy/fees)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
