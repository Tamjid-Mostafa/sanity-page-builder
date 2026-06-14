import {getCliClient} from 'sanity/cli'
import {
  createKeyGenerator,
  createBlockHelpers,
  FIT_FORM_URL,
  DARK_SURFACE,
  MUTED_SURFACE,
  ON_DARK_TEXT,
  GRID_DEFAULTS,
  HERO_GRADIENT,
} from './seed-helpers.mjs'

const client = getCliClient({apiVersion: '2024-01-01'})
const k = createKeyGenerator()
const {block, faqAnswer, ctaButtons, academyFooterRow} = createBlockHelpers(k)

const admissionsProcessCards = [
  {
    title: 'Start with a conversation or fit check',
    description:
      'Families can begin by booking a conversation or completing our short Check Your Fit form.\n\nEither route helps us understand the student\'s situation before recommending next steps.',
    icon: 'message-circle',
    accentColor: 'primary',
  },
  {
    title: 'Student review & baseline',
    description:
      'We review the student\'s academic background, school reports, goals, and learning needs.\n\nWhere helpful, this may include English and maths checks, reading level assessment, a student interview, or a cognitive profile such as CAT4.\n\nThe aim is not to label the student. It is to understand how they learn and what support they need.',
    icon: 'user',
    accentColor: 'secondary',
  },
  {
    title: 'Pathway recommendation',
    description:
      'We then recommend the most suitable route, such as the Flex / Online Academy, University Pathway, Premier Pathway, US High School Diploma, GCSE/A-Level support, AP/SAT guidance, or student-athlete adaptation.\n\nWe explain what is included, what may be external, and what level of structure is needed.',
    icon: 'compass',
    accentColor: 'primary',
  },
  {
    title: 'Enrolment & setup',
    description:
      'Once the pathway is agreed, we confirm fees, start date, provider route, support plan, and next steps.\n\nBefore the student begins, we set up their weekly structure, mentoring rhythm, parent communication, and online or Barcelona-based support.\n\nStructure first. Then flexibility works.',
    icon: 'check-square',
    accentColor: 'secondary',
  },
]

const admissionsFaqItems = [
  {
    question: 'When can students join?',
    answer:
      'Students can usually join at different points in the year, depending on the pathway, provider, subjects, and goals. We will always be honest about what is realistic.',
  },
  {
    question: 'What documents do you need?',
    answer:
      'We may request school reports, transcripts, exam results, subject information, ID documents, learning support information, or training schedules for student-athletes.',
  },
  {
    question: 'Is baseline testing required?',
    answer:
      'Not always. For some students, reports and a conversation are enough. For others, English, maths, reading, CAT4-style profiling, or wider student development tools can help us plan better.',
  },
  {
    question: 'Is iCollege only for high-performing students?',
    answer:
      'No. iCollege supports a range of students. What matters most is fit, attitude, family alignment, and whether our model can genuinely help the student move forward.',
  },
]

const page = {
  _id: 'academy-admissions-page',
  _type: 'page',
  title: 'Admissions',
  slug: {_type: 'slug', current: 'academy/admissions'},
  seo: {
    _type: 'seo',
    metaTitle: 'Admissions | iCollege Academy | iCollege Life',
    metaDescription:
      'Admissions at iCollege Academy starts with understanding the student - flexible pathways with structure, recognition, and clear next steps. Book a conversation or check your fit.',
    noIndex: false,
  },
  pageBuilder: [
    {
      _key: 'admissions-hero',
      _type: 'heroSection',
      ...HERO_GRADIENT,
      maxWidth: 'default',
      badge: 'iCollege Academy - Admissions',
      heading: 'Start with the',
      headingHighlight: 'right fit.',
      subtitle:
        'iCollege Academy is for students who need a flexible academic pathway without losing structure, recognition, or future options.\n\nAdmissions begins by understanding the student: their current education, goals, learning profile, level of independence, family situation, and future ambitions.\n\nWe do not start with a timetable. We start by understanding the student.',
      pills: ['Flexible pathways', 'Structure & recognition', 'Barcelona & online'],
      buttons: ctaButtons('admissions-hero-cta-primary', 'admissions-hero-cta-secondary'),
    },
    {
      _key: 'admissions-who-icollege-for',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'admissions-who-icollege-for-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'admissions-who-icollege-for-copy',
              _type: 'richTextBlock',
              eyebrow: 'Admissions',
              content: [
                block('Who iCollege Is For', 'h2'),
                block(
                  'iCollege may be a strong fit for students who need flexibility, structure, mentoring, and a recognised academic route.',
                ),
                block(
                  'This includes student-athletes, globally mobile families, students preparing for university, and young people who have outgrown the traditional school model.',
                ),
                block('Flexible does not mean casual. Personal does not mean unstructured.', 'blockquote'),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'admissions-process',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {
        _type: 'blockStyles',
        background: {color: DARK_SURFACE},
        typography: {textColor: '#ffffff'},
        borderTop: {width: '1px', style: 'solid', color: 'rgba(255,255,255,0.1)'},
      },
      columns: [
        {
          _key: 'admissions-process-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'admissions-process-grid',
              _type: 'featureCardGrid',
              style: 'onDark',
              columns: '2',
              showStepNumbers: true,
              eyebrow: 'How it works',
              title: 'The Admissions Process',
              subtitle:
                'Admissions begins by understanding the student before recommending next steps.',
              cards: admissionsProcessCards.map((card) => ({
                _key: k(),
                _type: 'featureCard',
                title: card.title,
                description: card.description,
                accentColor: card.accentColor,
                accentApplyTo: ['icon', 'iconBg'],
                icon: {source: 'lucide', lucide: card.icon},
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'admissions-what-we-look-for',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {
        _type: 'blockStyles',
        background: {color: MUTED_SURFACE},
      },
      columns: [
        {
          _key: 'admissions-what-we-look-for-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'admissions-what-we-look-for-copy',
              _type: 'richTextBlock',
              eyebrow: 'Fit',
              content: [
                block('What We Look For', 'h2'),
                block('iCollege is selective about fit, not just grades.'),
                block(
                  'Students do not need to be perfect. They may need more confidence, direction, independence, or a fresh start. But they do need to be willing to engage.',
                ),
                block('We are flexible with pathways. We are serious about attitude.', 'normal', undefined, undefined, ['strong']),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'admissions-faqs',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'admissions-faqs-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'admissions-faqs-block',
              _type: 'faqBlock',
              variation: 'default',
              eyebrow: 'FAQs',
              title: 'Admissions FAQs',
              enableSchema: true,
              allowMultipleOpen: true,
              firstOpenByDefault: false,
              items: admissionsFaqItems.map((item) => ({
                _key: k(),
                _type: 'faqItem',
                question: item.question,
                answer: faqAnswer(item.answer),
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'admissions-final-cta',
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
          _key: 'admissions-final-cta-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'admissions-final-cta-block',
              _type: 'ctaSection',
              eyebrow: 'Next step',
              heading: 'Ready to start?',
              size: 'medium',
              blockStyles: {_type: 'blockStyles', ...ON_DARK_TEXT},
              bodyParagraphs: [
                {
                  _key: k(),
                  _type: 'ctaBodyParagraph',
                  emphasis: false,
                  text: 'The best first step is to book a conversation or complete the short fit check.',
                },
                {
                  _key: k(),
                  _type: 'ctaBodyParagraph',
                  emphasis: false,
                  text: "We will look at the student's current situation, academic goals, family needs, and future options before recommending a pathway.",
                },
              ],
              buttons: ctaButtons('admissions-final-cta-primary', 'admissions-final-cta-secondary'),
              trustItems: ['Fit first', 'Clear pathways', 'Small cohorts', 'Barcelona & online'],
            },
          ],
        },
      ],
    },
    academyFooterRow('admissions'),
  ],
}

async function main() {
  console.log('Seeding academy admissions page...')
  await client.createOrReplace(page)
  console.log('Published document: academy-admissions-page (/academy/admissions)')
  console.log(`Fit form URL: ${FIT_FORM_URL}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
