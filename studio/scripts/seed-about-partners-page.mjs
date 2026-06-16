import {getCliClient} from 'sanity/cli'
import {
  createKeyGenerator,
  createBlockHelpers,
  DARK_SURFACE,
  ON_DARK_TEXT,
  GRID_DEFAULTS,
  HERO_GRADIENT,
} from './seed-helpers.mjs'

const client = getCliClient({apiVersion: '2024-01-01'})
const k = createKeyGenerator()
const {block, ctaButtons} = createBlockHelpers(k)

const PARTNERS_SECTIONS = [
  {
    _key: 'partners-hero',
    _type: 'heroSection',
    ...HERO_GRADIENT,
    maxWidth: 'default',
    minHeight: '70vh',
    badge: 'About iCollege Life',
    heading: 'Partners',
    subtitle:
      'Flexible education works best with the right ecosystem.\n\nWe do not believe that one institution needs to provide everything on its own.\n\nWe build around the student using selected qualification providers, academic specialists, pathway support, local resources, and international opportunities where they add real value.',
    buttons: ctaButtons('partners-hero-cta-primary', 'partners-hero-cta-secondary'),
  },
  {
    _key: 'partners-pathways-row',
    _type: 'gridRow',
    layout: '50-50',
    maxWidth: 'default',
    ...GRID_DEFAULTS,
    gap: 'xl',
    blockStyles: {_type: 'blockStyles', borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'}},
    columns: [
      {
        _key: 'partners-pathways-left',
        verticalAlign: 'top',
        content: [
          {
            _key: 'partners-pathways-copy',
            _type: 'richTextBlock',
            eyebrow: 'Academic pathways',
            content: [
              block('Recognised Academic Pathways', 'h2'),
              block(
                'Students at iCollege may follow recognised qualification routes through established providers, depending on their age, goals, previous education, and plans.',
              ),
            ],
          },
        ],
      },
      {
        _key: 'partners-pathways-right',
        verticalAlign: 'top',
        content: [
          {
            _key: 'partners-pathways-list',
            _type: 'richTextBlock',
            content: [
              block('US High School Diploma', 'normal', 'bullet', 1),
              block('GCSEs and A-Level support', 'normal', 'bullet', 1),
              block('AP and SAT preparation', 'normal', 'bullet', 1),
              block('English language development', 'normal', 'bullet', 1),
              block('Spanish language and university support', 'normal', 'bullet', 1),
              block('US, UK and wider Europe university preparation', 'normal', 'bullet', 1),
              block('iCollege adds the structure around: Recognised routes. Personal structure. Clear support.'),
            ],
          },
        ],
      },
    ],
  },
  {
    _key: 'partners-providers-row',
    _type: 'gridRow',
    layout: 'full',
    maxWidth: 'default',
    ...GRID_DEFAULTS,
    paddingY: 'lg',
    blockStyles: {
      _type: 'blockStyles',
      background: {color: DARK_SURFACE},
      typography: {textColor: '#ffffff'},
      borderTop: {width: '1px', style: 'solid', color: 'rgba(255,255,255,0.1)'},
    },
    columns: [
      {
        _key: 'partners-providers-col',
        verticalAlign: 'top',
        content: [
          {
            _key: 'partners-providers-intro',
            _type: 'richTextBlock',
            eyebrow: 'Academic partners',
            blockStyles: {_type: 'blockStyles', ...ON_DARK_TEXT},
            content: [
              block('Academic Providers & Qualification Routes', 'h2'),
              block(
                'iCollege works with recognised external providers and qualification routes where they are the best fit for the student.',
              ),
            ],
          },
          {
            _key: 'partners-providers-cards',
            _type: 'featureCardGrid',
            style: 'onDark',
            columns: '2',
            cards: [
              {
                _key: k(),
                _type: 'featureCard',
                title: 'We help families understand which pathway makes sense.',
                accentColor: 'secondary',
                accentApplyTo: ['bar'],
              },
              {
                _key: k(),
                _type: 'featureCard',
                title: 'We show how each route supports future university options.',
                accentColor: 'secondary',
                accentApplyTo: ['bar'],
              },
              {
                _key: k(),
                _type: 'featureCard',
                title: 'We define what level of structure each student needs to succeed.',
                accentColor: 'secondary',
                accentApplyTo: ['bar'],
              },
              {
                _key: k(),
                _type: 'featureCard',
                title: 'We keep students on track and connect choices to future opportunities.',
                accentColor: 'secondary',
                accentApplyTo: ['bar'],
              },
            ],
          },
          {
            _key: 'partners-providers-outro',
            _type: 'richTextBlock',
            blockStyles: {_type: 'blockStyles', ...ON_DARK_TEXT},
            content: [
              block(
                'Many families come to iCollege because they want flexibility, but they do not want to close future doors. We help students and parents think carefully about university pathways in the US, UK, Europe, and beyond. Flexibility should protect the future, not narrow it.',
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    _key: 'partners-barcelona-row',
    _type: 'gridRow',
    layout: '50-50',
    maxWidth: 'default',
    ...GRID_DEFAULTS,
    gap: 'xl',
    blockStyles: {_type: 'blockStyles', borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'}},
    columns: [
      {
        _key: 'partners-barcelona-left',
        verticalAlign: 'top',
        content: [
          {
            _key: 'partners-barcelona-copy',
            _type: 'richTextBlock',
            eyebrow: 'Local ecosystem',
            content: [
              block('Barcelona Hub & Local Ecosystem', 'h2'),
              block(
                'For students based in Barcelona, or visiting for part of the year, our local ecosystem adds structure, community, and real-world experience.',
              ),
              block('Barcelona support includes:', 'h3'),
              block('Supervised study, mentoring, and accountability', 'normal', 'bullet', 1),
              block(
                'A professional environment to build independence with support',
                'normal',
                'bullet',
                1,
              ),
              block(
                'Selected local organisations, educators, residences, and activity providers where useful',
                'normal',
                'bullet',
                1,
              ),
              block('Online by design. Barcelona, when it helps.', 'normal', 'bullet', 1),
            ],
          },
        ],
      },
      {
        _key: 'partners-barcelona-right',
        verticalAlign: 'top',
        content: [
          {
            _key: 'partners-athletes-copy',
            _type: 'richTextBlock',
            eyebrow: 'Student-athletes',
            content: [
              block('Student-Athletes & Specialist Pathways', 'h3'),
              block(
                'Flexible academic pathways around sporting commitments',
                'normal',
                'bullet',
                1,
              ),
              block(
                'Progress tracking, parent clarity, and university options in view',
                'normal',
                'bullet',
                1,
              ),
              block(
                'Joined-up support with families, coaches, academies, and specialist tutors',
                'normal',
                'bullet',
                1,
              ),
              block(
                'iCollege can support student-athletes by building flexible academic pathways around their sporting commitments while keeping progress, parent clarity, and university options in view.',
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    _key: 'partners-schools-row',
    _type: 'gridRow',
    layout: 'full',
    maxWidth: 'default',
    ...GRID_DEFAULTS,
    paddingY: 'lg',
    blockStyles: {
      _type: 'blockStyles',
      background: {color: DARK_SURFACE},
      typography: {textColor: '#ffffff'},
      borderTop: {width: '1px', style: 'solid', color: 'rgba(255,255,255,0.1)'},
    },
    columns: [
      {
        _key: 'partners-schools-col',
        verticalAlign: 'top',
        content: [
          {
            _key: 'partners-schools-intro',
            _type: 'richTextBlock',
            eyebrow: 'Schools and organisations',
            blockStyles: {_type: 'blockStyles', ...ON_DARK_TEXT},
            content: [
              block('Academic Support for Schools & Organisations', 'h2'),
              block(
                'iCollege Life partners with selected schools, academies and education organisations that need flexible academic support for their students. We help schools fill gaps, extend subject choice, and provide structured academic support without needing to hire every specialist teacher in-house.',
              ),
            ],
          },
          {
            _key: 'partners-schools-cards',
            _type: 'featureCardGrid',
            style: 'onDark',
            columns: '2',
            cards: [
              {_key: k(), _type: 'featureCard', title: 'GCSE, IGCSE and A-Level subject teaching', accentColor: 'secondary', accentApplyTo: ['bar']},
              {_key: k(), _type: 'featureCard', title: 'Small-group or one-to-one provision', accentColor: 'secondary', accentApplyTo: ['bar']},
              {_key: k(), _type: 'featureCard', title: 'Support for hard-to-staff subjects', accentColor: 'secondary', accentApplyTo: ['bar']},
              {_key: k(), _type: 'featureCard', title: 'Personal tutoring, mentoring and study coaching', accentColor: 'secondary', accentApplyTo: ['bar']},
              {_key: k(), _type: 'featureCard', title: 'Focused exam preparation', accentColor: 'secondary', accentApplyTo: ['bar']},
              {_key: k(), _type: 'featureCard', title: 'English and Spanish language support', accentColor: 'secondary', accentApplyTo: ['bar']},
              {_key: k(), _type: 'featureCard', title: 'Flexible academic pathways for students needing an alternative structure', accentColor: 'secondary', accentApplyTo: ['bar']},
              {_key: k(), _type: 'featureCard', title: 'Barcelona-based academic visits, study experiences and short programmes', accentColor: 'secondary', accentApplyTo: ['bar']},
            ],
          },
          {
            _key: 'partners-schools-outro',
            _type: 'richTextBlock',
            blockStyles: {_type: 'blockStyles', ...ON_DARK_TEXT},
            content: [
              block(
                'This model is especially useful for schools with small GCSE and A-Level groups, specialist subject needs, temporary staffing gaps, or students who require additional structure and accountability.',
              ),
              block(
                'To explore a school partnership, contact us for an initial conversation.',
                'blockquote',
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    _key: 'partners-collab-row',
    _type: 'gridRow',
    layout: '50-50',
    maxWidth: 'default',
    ...GRID_DEFAULTS,
    gap: 'xl',
    blockStyles: {_type: 'blockStyles', borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'}},
    columns: [
      {
        _key: 'partners-collab-left',
        verticalAlign: 'top',
        content: [
          {
            _key: 'partners-collab-copy',
            _type: 'richTextBlock',
            eyebrow: 'Collaboration',
            content: [
              block('Collaborating With iCollege', 'h2'),
              block(
                'We are open to working with organisations that share our commitment to serious, flexible, student-centred education.',
              ),
              block('We are interested in:'),
            ],
          },
        ],
      },
      {
        _key: 'partners-collab-right',
        verticalAlign: 'top',
        content: [
          {
            _key: 'partners-collab-list',
            _type: 'richTextBlock',
            content: [
              block(
                'This may include sports academies, education providers, international schools, residences, study-abroad organisations, universities, tutors, mentors, youth development organisations, and business support.',
              ),
              block('Our Partnership Principles', 'h3'),
              block('Support recognised academic progress', 'normal', 'bullet', 1),
              block('Improve student structure, confidence, or well-being', 'normal', 'bullet', 1),
              block('Strengthen future university or career options', 'normal', 'bullet', 1),
              block('Add meaningful local or international experience', 'normal', 'bullet', 1),
              block('Make the student journey clearer, not more complicated', 'normal', 'bullet', 1),
            ],
          },
        ],
      },
    ],
  },
  {
    _key: 'partners-closing-row',
    _type: 'gridRow',
    layout: 'full',
    ...GRID_DEFAULTS,
    containerAlign: 'center',
    blockStyles: {
      _type: 'blockStyles',
      borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
      typography: {textAlign: 'center'},
    },
    columns: [
      {
        _key: 'partners-closing-col',
        verticalAlign: 'top',
        content: [
          {
            _key: 'partners-closing-cta',
            _type: 'ctaSection',
            eyebrow: 'Next step',
            heading: 'Interested in Working Together?',
            size: 'medium',
            bodyParagraphs: [
              {
                _key: k(),
                _type: 'ctaBodyParagraph',
                emphasis: false,
                text: 'Whether you are a family looking for a pathway, a school needing academic support, or an organisation interested in collaboration, the best first step is a conversation.',
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
            ],
          },
        ],
      },
    ],
  },
]

const page = {
  _id: 'about-partners-page',
  _type: 'page',
  title: 'Partners',
  slug: {_type: 'slug', current: 'about/partners'},
  seo: {
    _type: 'seo',
    metaTitle: 'Partners | About iCollege Life',
    metaDescription:
      'Flexible education works best with the right ecosystem. iCollege builds around the student through recognised pathways, selected providers, local support, and meaningful collaborations.',
    noIndex: false,
  },
  pageBuilder: PARTNERS_SECTIONS,
}

async function main() {
  console.log('Seeding about partners page...')
  await client.createOrReplace(page)
  console.log('Published document: about-partners-page (/about/partners)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
