import {
  DARK_SURFACE,
  FIT_FORM_URL,
  GRID_DEFAULTS,
  HERO_GRADIENT,
  MUTED_SURFACE,
  ON_DARK_TEXT,
  createBlockHelpers,
  createKeyGenerator,
  getCliClient,
} from './seed-helpers.mjs'

const client = getCliClient({apiVersion: '2024-01-01'})
const k = createKeyGenerator()
const {block, faqAnswer, ctaButtons, academyFooterRow} = createBlockHelpers(k)

const supportSystemCards = [
  {
    title: 'Mentoring & Check-Ins',
    description:
      'Regular conversations to review progress, set goals, build confidence, improve habits, and connect academic work to future direction.',
    lucide: 'message-circle',
    accentColor: 'primary',
  },
  {
    title: 'Weekly Study Structure',
    description:
      'A clear rhythm for coursework, independent study, deadlines, tutor sessions, training, travel, or other commitments.',
    lucide: 'calendar-range',
    accentColor: 'secondary',
  },
  {
    title: 'Progress Tracking',
    description:
      'Visibility on course progress, attendance, engagement, completed work, upcoming deadlines, and areas needing support.',
    lucide: 'bar-chart-3',
    accentColor: 'primary',
  },
  {
    title: 'Parent Communication',
    description:
      'Regular updates so families understand what is happening, where progress is being made, and what needs attention.',
    lucide: 'users',
    accentColor: 'secondary',
  },
  {
    title: 'Teaching Coordination',
    description: 'Targeted subject support where needed without endless extra lessons.',
    lucide: 'network',
    accentColor: 'primary',
  },
]

const developmentPills = [
  'confidence',
  'independence',
  'organisation',
  'communication',
  'responsibility',
  'time management',
  'resilience',
  'decision-making',
  'self-awareness',
  'future direction',
]

const supportRows = [
  {
    programme: 'Flex/Online Pathway',
    support: 'Weekly structure, mentoring, live teaching, parent updates, progress tracking',
  },
  {
    programme: 'University Pathway',
    support: 'Online support plus supervised study, in-person mentoring, teaching and community',
  },
  {
    programme: 'Athlete Pathway',
    support: 'Support built around training, travel, competition, and academy communication',
  },
  {
    programme: 'Premier Pathway',
    support: 'Higher-touch mentoring, pathway planning, parent communication, and university guidance',
  },
  {
    programme: '1-to-1 Support',
    support: 'Targeted subject tuition that strengthens the wider pathway',
  },
]

const faqs = [
  {
    question: 'How often do students meet with a mentor?',
    answer:
      'This depends on the programme and level of support. Most students have regular mentoring or academic check-ins as part of their weekly rhythm.',
  },
  {
    question: 'Will parents receive updates?',
    answer:
      'Yes. Parent communication is built into the model, so families understand progress, concerns, and next steps.',
  },
  {
    question: 'Is this suitable for students who lack confidence?',
    answer:
      'Yes. Many students join iCollege to gain more confidence, structure, and direction. The key is that they are willing to engage with the process.',
  },
  {
    question: 'Do you supervise students every day?',
    answer:
      'Not necessarily. Some students work mostly online, while others access in-person support through the Barcelona hub. The level of supervision depends on the programme.',
  },
  {
    question: 'Can you coordinate subject tutors?',
    answer:
      'Yes. Where needed, iCollege can help coordinate subject support to align with the student’s broader academic pathway.',
  },
  {
    question: 'Is mentoring the same as therapy?',
    answer:
      'No. Mentoring is focused on academic progress, confidence, independence, habits, and future direction. It is not a replacement for therapy or specialist clinical support.',
  },
]

const page = {
  _id: 'academy-personal-support-page',
  _type: 'page',
  title: 'Structure & Mentoring',
  slug: {_type: 'slug', current: 'academy/personal-support'},
  seo: {
    _type: 'seo',
    metaTitle: 'Structure & Mentoring | iCollege Academy | iCollege Life',
    metaDescription:
      'Flexible education with rhythm, accountability, and mentoring — the iCollege support system including check-ins, weekly structure, progress tracking, parent communication, and teaching coordination.',
    noIndex: false,
  },
  pageBuilder: [
    {
      _key: 'personal-support-hero',
      _type: 'heroSection',
      ...HERO_GRADIENT,
      badge: 'Structure & Mentoring',
      heading: 'Flexible Education Only Works With',
      headingHighlight: 'Structure',
      subtitle:
        'iCollege Academy is not just an online qualification route.\n\nStudents need rhythm, accountability, mentoring, and clear communication for flexible education to work effectively.\n\nEvery iCollege Academy pathway includes a support system around the student, helping them stay on track academically while building confidence, independence, and direction.',
      pills: ['Mentoring', 'Structure', 'Reporting', 'Trust', 'Confidence', 'Coordination', 'Life Design'],
      buttons: ctaButtons('personal-support-hero-cta-primary', 'personal-support-hero-cta-secondary'),
    },
    {
      _key: 'personal-support-integrated',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {
        _type: 'blockStyles',
        background: {color: DARK_SURFACE},
        typography: {textColor: '#ffffff'},
      },
      columns: [
        {
          _key: 'personal-support-integrated-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'personal-support-integrated-grid',
              _type: 'featureCardGrid',
              style: 'onDark',
              columns: '3',
              eyebrow: 'Support model',
              title: 'The iCollege Support System',
              subtitle:
                'Flexible learning gives students freedom. The iCollege support system makes sure that freedom does not become drift. Depending on the programme, support may include:',
              cards: supportSystemCards.map((card) => ({
                _key: k(),
                _type: 'featureCard',
                title: card.title,
                description: card.description,
                accentColor: card.accentColor,
                accentApplyTo: ['icon', 'iconBg'],
                icon: {source: 'lucide', lucide: card.lucide},
              })),
            },
            {
              _key: 'personal-support-integrated-close',
              _type: 'richTextBlock',
              blockStyles: {_type: 'blockStyles', ...ON_DARK_TEXT},
              content: [block('The goal is simple: help students become more capable, not more dependent.', 'blockquote')],
            },
          ],
        },
      ],
    },
    {
      _key: 'personal-support-why-it-matters',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'personal-support-why-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'personal-support-why-copy',
              _type: 'richTextBlock',
              eyebrow: 'Development',
              content: [
                block('What Students Build', 'h2'),
                block(
                  'Academic qualifications matter. But students also need the personal skills that help them succeed beyond school.',
                ),
                block('iCollege supports students in developing:'),
              ],
            },
            {
              _key: 'personal-support-why-pills',
              _type: 'tagPills',
              items: developmentPills,
            },
            {
              _key: 'personal-support-why-close',
              _type: 'richTextBlock',
              content: [
                block(
                  'This is especially important for students who are studying online, training seriously, moving internationally, or preparing for life beyond traditional school.',
                  'blockquote',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'personal-support-life-design',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {
        _type: 'blockStyles',
        background: {color: MUTED_SURFACE},
      },
      columns: [
        {
          _key: 'personal-support-life-design-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'personal-support-life-design-copy',
              _type: 'richTextBlock',
              eyebrow: 'Programmes',
              content: [
                block('How Support Varies by Programme', 'h2'),
                block('Different students need different levels of support.'),
              ],
            },
            {
              _key: 'personal-support-life-design-table',
              _type: 'dataTable',
              headers: [
                {_key: k(), text: 'Programme'},
                {_key: k(), text: 'Typical support'},
              ],
              rows: supportRows.map((row) => ({
                _key: k(),
                cells: [
                  {_key: k(), text: row.programme},
                  {_key: k(), text: row.support},
                ],
              })),
              striped: true,
              compact: false,
            },
          ],
        },
      ],
    },
    {
      _key: 'personal-support-family-partnership',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'personal-support-family-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'personal-support-family-copy',
              _type: 'richTextBlock',
              eyebrow: 'Expectations',
              content: [
                block('What Support Is, and Is Not', 'h2'),
                block(
                  'iCollege provides structure, mentoring, and accountability, but not dependency. We do not aim to create students who need constant chasing. We work best when students are willing to engage, communicate, attend, complete work, and build trust.',
                ),
                block(
                  'We believe and want all our students to take ownership of their learning, but we realise this can take time in most cases.',
                ),
                block(
                  'Families also need to support the process by communicating clearly and setting realistic expectations.',
                ),
                block('The aim is not to control students. The aim is to help them grow.', 'blockquote', null, null, [
                  'strong',
                ]),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'personal-support-faq',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {
        _type: 'blockStyles',
        background: {color: MUTED_SURFACE},
      },
      columns: [
        {
          _key: 'personal-support-faq-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'personal-support-faq-block',
              _type: 'faqBlock',
              variation: 'default',
              eyebrow: 'FAQs',
              title: 'Questions Parents Often Ask',
              enableSchema: true,
              allowMultipleOpen: true,
              firstOpenByDefault: false,
              items: faqs.map((item) => ({
                _key: k(),
                question: item.question,
                answer: faqAnswer(item.answer),
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'personal-support-final-cta',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      containerAlign: 'center',
      blockStyles: {
        _type: 'blockStyles',
        background: {color: DARK_SURFACE},
        typography: {textColor: '#ffffff', textAlign: 'center'},
        borderTop: {width: '1px', style: 'solid', color: 'rgba(255,255,255,0.1)'},
      },
      columns: [
        {
          _key: 'personal-support-final-cta-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'personal-support-final-cta-block',
              _type: 'ctaSection',
              eyebrow: 'Next step',
              heading: 'Start With the Right Support',
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
                  text: "The right level of support depends on the student's goals, maturity, confidence, independence, and academic needs. iCollege helps families build a pathway that gives the student enough freedom to grow — and enough structure to stay on track.",
                },
                {
                  _key: k(),
                  _type: 'ctaBodyParagraph',
                  emphasis: true,
                  text: 'We will help you understand what level of support your child may need.',
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
                  link: [{_key: k(), _type: 'linkExternal', url: FIT_FORM_URL, openInNewTab: true}],
                  variant: 'outline',
                },
              ],
            },
          ],
        },
      ],
    },
    academyFooterRow('personal-support'),
  ],
}

async function main() {
  console.log('Seeding academy personal support page…')
  await client.createOrReplace(page)
  console.log('Published document: academy-personal-support-page (/academy/personal-support)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
