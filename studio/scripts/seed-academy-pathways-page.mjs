import {getCliClient} from 'sanity/cli'
import {
  FIT_FORM_URL,
  GRID_DEFAULTS,
  HERO_GRADIENT,
  CARD_BLOCK_STYLES,
  DARK_SURFACE,
  createKeyGenerator,
  createBlockHelpers,
} from './seed-helpers.mjs'

const client = getCliClient({apiVersion: '2024-01-01'})
const k = createKeyGenerator()
const {block, faqAnswer, ctaButtons, academyFooterRow} = createBlockHelpers(k)

const pathwayLedPoints = [
  'Which qualification route makes sense',
  'How previous schooling may fit',
  'What universities may expect',
  'What support does the student need',
  'How to keep future options open',
]

const whyChooseHsd = [
  'Flexible and modular',
  'Suitable for online or hybrid study',
  'Works well around training, travel, and relocation',
  'Can recognise previous learning where provider rules allow',
  'Can support progression towards US, UK, Spanish and wider universities',
  'Can be strengthened with AP, SAT, or subject support where needed',
]

const hsdSubjectAreas = [
  'English / Language Arts',
  'Mathematics',
  'Science',
  'Social Studies / History',
  'World Languages',
  'Arts / Humanities',
  'Physical Education / Health',
  'Electives',
]

const gcseAppropriateWhen = [
  'Are already halfway through',
  'Want to focus narrowly in depth',
  'Need support in specific subjects',
  'Are preparing for external exams',
  'Require a UK pathway for a particular goal',
  'Are enrolled in a Premier or customised support plan',
]

const gcseSubjects = [
  'English',
  'Mathematics',
  'Business',
  'History',
  'Spanish',
  'Sciences',
  'Computer Science',
  'Economics',
  'Psychology',
  'Art / Design-related guidance where feasible',
]

const strengtheningCards = [
  {
    title: 'AP/SAT Preparation',
    description:
      'For students aiming at US universities, competitive international options, or stronger academic profiles.',
    accentColor: 'primary',
  },
  {
    title: 'English/IELTS Support',
    description: 'For international students needing stronger academic English or university readiness.',
    accentColor: 'secondary',
  },
  {
    title: 'Subject Tuition',
    description:
      'For students needing support in maths, English, sciences, humanities, business, languages, exam preparation, or catch-up.',
    accentColor: 'primary',
  },
]

const comparisonHeaders = ['Pathway', 'Best for', 'Possible next steps']
const comparisonRows = [
  [
    'US High School Diploma',
    'Most Academy students need flexibility',
    'US, UK, Europe, private universities, foundation routes, global pathways',
  ],
  [
    'HSD + AP/SAT',
    'Students aiming for stronger academic profiles',
    'US universities, selective UK courses, international universities',
  ],
  [
    'English/IELTS Support',
    'International students needing academic English',
    'English-taught degrees, UK/EU/US applications, foundation programmes',
  ],
  [
    'GCSE/A-Level Support',
    'Selected British curriculum or subject-specific cases',
    'UK/world universities, curriculum continuity, and external exams',
  ],
  [
    'Subject Tuition',
    'Students with gaps or specific academic needs',
    'Stronger grades, confidence, exam readiness, pathway support',
  ],
  [
    'iCollege Global',
    'Older students exploring life, study, work, or direction',
    'Gap year, internships, entrepreneurship, life design, further study',
  ],
]

const pathwayFaqs = [
  {
    q: 'Is the US High School Diploma recognised?',
    a: 'Yes. Students can follow recognised US High School Diploma pathways through trusted providers. iCollege helps families understand how the pathway works and how it may support future university options.',
  },
  {
    q: 'Can students follow this pathway to university?',
    a: 'Yes, but requirements vary by country, university, course, and student profile. Some students may need AP, SAT, IELTS, or specific subject preparation, or additional preparation.',
  },
  {
    q: 'Do you still support GCSEs and A-Levels?',
    a: 'Yes, but usually as part of a customised route, Premier pathway, or subject support plan. The US High School Diploma is the main route for most Academy students.',
  },
  {
    q: 'Can previous schooling count?',
    a: 'In some cases, previous academic work may inform credit transfer or pathway planning. This depends on the provider, transcript, subjects, age, and academic history.',
  },
  {
    q: 'How do we know which pathway is right?',
    a: 'Start with a conversation. For more complex cases, the Academic Pathway Review at /academy/fees#programme-fees gives families a clearer recommendation before committing.',
  },
  {
    q: 'Can students continue with iCollege after finishing the Academy pathway?',
    a: 'Yes, in some cases, older students may continue through iCollege Global, short programmes, internships, mentoring, life-design support, entrepreneurship experiences, or university preparation, depending on their goals.',
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
  _id: 'academy-pathways-page',
  _type: 'page',
  title: 'Qualifications and Pathways',
  slug: {_type: 'slug', current: 'academy/pathways-and-outcomes'},
  seo: {
    _type: 'seo',
    metaTitle: 'Qualifications & Pathways | iCollege Academy',
    metaDescription:
      'Flexible qualifications and serious future options with iCollege Academy pathway-led planning and university progression routes.',
    noIndex: false,
  },
  pageBuilder: [
    {
      _key: 'pathways-hero',
      _type: 'heroSection',
      ...HERO_GRADIENT,
      badge: 'Qualifications & Pathways',
      heading: 'Flexible Qualifications.',
      headingHighlight: 'Serious Future Options.',
      subtitle:
        'The US High School Diploma is the main academic pathway for most iCollege Academy students.\n\nIt offers a flexible, internationally recognised route for students who need recognised academic qualifications without being locked into a traditional school timetable.',
      pills: ['US High School Diploma', 'AP/SAT', 'GCSE/A-Level Support', 'IELTS', 'University Pathways'],
      buttons: ctaButtons('pathways-hero-primary', 'pathways-hero-secondary'),
    },
    {
      _key: 'pathways-led',
      _type: 'gridRow',
      layout: '50-50',
      ...GRID_DEFAULTS,
      gap: 'xl',
      blockStyles: {_type: 'blockStyles', borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'}},
      columns: [
        {
          _key: 'pathways-led-left',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-led-copy',
              _type: 'richTextBlock',
              eyebrow: 'Approach',
              content: [
                block('Pathway-Led, Not One-Size-Fits-All', 'h2'),
                block(
                  'Every student arrives with a different academic history, goal, timetable, and level of independence. iCollege helps families understand:',
                ),
              ],
            },
          ],
        },
        {
          _key: 'pathways-led-right',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-led-list',
              _type: 'richTextBlock',
              blockStyles: CARD_BLOCK_STYLES,
              content: [
                ...pathwayLedPoints.map((item) => block(item, 'normal', 'bullet', 1)),
                block('Choose the right pathway, then build the right structure around it.'),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'pathways-main-route',
      _type: 'gridRow',
      layout: '50-50',
      ...GRID_DEFAULTS,
      gap: 'xl',
      blockStyles: {_type: 'blockStyles', background: {color: '#efefef'}},
      columns: [
        {
          _key: 'pathways-main-left',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-main-copy',
              _type: 'richTextBlock',
              eyebrow: 'Main route',
              content: [
                block('Main Route: US High School Diploma', 'h2'),
                block(
                  'The US High School Diploma is our main flexible academic pathway. It is especially suitable for student-athletes, globally mobile families, independent learners, and students who need a more personalised route and who can work at their own pace.',
                ),
                block('Why families choose it', 'h3'),
                ...whyChooseHsd.map((item) => block(item, 'normal', 'bullet', 1)),
              ],
            },
          ],
        },
        {
          _key: 'pathways-main-right',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-main-box',
              _type: 'richTextBlock',
              blockStyles: CARD_BLOCK_STYLES,
              content: [
                block('How the US High School Diploma Works', 'h3'),
                block(
                  'The US High School Diploma is usually credit-based. Students complete credits across required subject areas, which may include:',
                ),
                ...hsdSubjectAreas.map((item) => block(item, 'normal', 'bullet', 1)),
                block(
                  'The provider may review previous school credits and may count toward the diploma, provided they are accepted.',
                ),
                block('iCollege\'s role', 'h3'),
                block(
                  'Students do not simply enrol in an online programme and manage on their own with distance support.',
                ),
                block(
                  'iCollege provides pathway planning, mentoring, accountability, parent reporting, tutor coordination, live teaching and university guidance. The qualification provides the route. iCollege provides the structure.',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'pathways-gcse',
      _type: 'gridRow',
      layout: '50-50',
      ...GRID_DEFAULTS,
      gap: 'xl',
      columns: [
        {
          _key: 'pathways-gcse-left',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-gcse-copy',
              _type: 'richTextBlock',
              eyebrow: 'UK curriculum',
              content: [
                block('GCSE and A-Level Support', 'h2'),
                block(
                  'GCSEs and A-Levels are not usually the default route for new Academy students. However, they may be appropriate for students who:',
                ),
                ...gcseAppropriateWhen.map((item) => block(item, 'normal', 'bullet', 1)),
                block(
                  'iCollege can support selected subjects where appropriate, usually through tutoring, exam preparation, academic planning, or a personalised pathway.',
                ),
                block(
                  'Availability depends on the student\'s goals, exam board, teacher availability, coursework requirements, and exam centre arrangements.',
                ),
                block(
                  'GCSEs and A-Levels remain available where useful, but they sit inside a wider pathway rather than defining the whole model.',
                  'blockquote',
                ),
              ],
            },
          ],
        },
        {
          _key: 'pathways-gcse-right',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-gcse-subjects',
              _type: 'richTextBlock',
              blockStyles: CARD_BLOCK_STYLES,
              content: [
                block('Subjects may include areas such as:', 'h3'),
                ...gcseSubjects.map((item) => block(item, 'normal', 'bullet', 1)),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'pathways-strengthening',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'pathways-strengthening-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-strengthening-grid',
              _type: 'featureCardGrid',
              eyebrow: 'Add-ons',
              title: 'Strengthening the Pathway',
              subtitle:
                "Some students need additional support or profile-building alongside the High School Diploma. These supports are added where they strengthen the student's overall pathway.",
              style: 'bordered',
              columns: '3',
              cards: strengtheningCards.map((card) => ({
                _key: k(),
                _type: 'featureCard',
                title: card.title,
                description: card.description,
                accentColor: card.accentColor,
                accentApplyTo: ['title'],
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'pathways-regional-intro',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'pathways-regional-intro-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-regional-intro-copy',
              _type: 'richTextBlock',
              eyebrow: 'Destinations',
              content: [
                block('University & Future Pathways', 'h2'),
                block(
                  'iCollege Academy is designed with future options in mind. The US High School Diploma can support progression towards a range of university routes, especially when strengthened with the right subjects, AP/SAT preparation, English/IELTS support, or additional academic evidence where needed.',
                ),
                block(
                  'Every country, university, and course has different entry requirements, so pathway planning matters.',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'pathways-regional-us-uk',
      _type: 'gridRow',
      layout: '50-50',
      ...GRID_DEFAULTS,
      gap: 'xl',
      columns: [
        {
          _key: 'pathways-us-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-us-copy',
              _type: 'richTextBlock',
              content: [
                block('United States', 'h3'),
                block(
                  'The US High School Diploma is a natural route for students considering US universities. US admissions are often based on more than one final exam result. Universities may consider the student\'s transcript, GPA, course choices, essays, recommendations, activities, test scores (where required), and wider overall profile.',
                ),
                block('iCollege can support'),
                ...[
                  'HSD pathway planning',
                  'GPA and transcript awareness',
                  'AP/SAT planning where useful',
                  'Academic profile building',
                  'Essays and application strategy',
                  'Sports scholarship considerations where relevant',
                ].map((item) => block(item, 'normal', 'bullet', 1)),
              ],
            },
          ],
        },
        {
          _key: 'pathways-uk-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-uk-copy',
              _type: 'richTextBlock',
              blockStyles: CARD_BLOCK_STYLES,
              content: [
                block('United Kingdom', 'h3'),
                block(
                  'Most UK undergraduate applications go through UCAS. UK universities are usually course-specific. Entry requirements vary by university and course, and may include particular qualifications, subjects, grades, or additional evidence. UCAS makes clear that each course and university sets its own requirements.',
                ),
                block(
                  'For students applying with a US High School Diploma, universities may ask for AP scores and specific subject scores, English language evidence, or a foundation route.',
                ),
                block('iCollege can support'),
                ...[
                  'UCAS pathway planning',
                  'AP planning where needed',
                  'Course and university research',
                  'Personal statement/application support',
                  'English/IELTS preparation',
                  'Foundation route planning, where appropriate',
                ].map((item) => block(item, 'normal', 'bullet', 1)),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'pathways-regional-spain-europe',
      _type: 'gridRow',
      layout: '50-50',
      ...GRID_DEFAULTS,
      gap: 'xl',
      columns: [
        {
          _key: 'pathways-spain-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-spain-copy',
              _type: 'richTextBlock',
              content: [
                block('Spain', 'h3'),
                block(
                  'Spanish university entry depends on the university, degree, language of study, and whether the student applies to public or private universities. For many international students applying to Spanish universities, UNEDasiss is important. UNEDasiss assesses international academic transcripts and conducts exams required for undergraduate entry in Spain. Its accreditation is a digital certificate that helps international students apply for undergraduate programmes at most Spanish universities and may include transcript assessment and PCE results.',
                ),
                block(
                  'Some students may need an admission grade, PCE exams, subject recognition, or language evidence, depending on the university and degree. UNEDasiss notes that access requirements depend on the student\'s origin system and the university\'s admission requirements.',
                ),
                block('iCollege can support'),
                ...[
                  'Public vs private university route planning',
                  'UNEDasiss awareness and preparation',
                  'PCE subject planning where relevant',
                  'Spanish or English-language pathway considerations',
                  'Private university application preparation',
                  'Deciding whether Spain is the right target route',
                ].map((item) => block(item, 'normal', 'bullet', 1)),
              ],
            },
          ],
        },
        {
          _key: 'pathways-europe-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-europe-copy',
              _type: 'richTextBlock',
              blockStyles: CARD_BLOCK_STYLES,
              content: [
                block('Wider Europe', 'h3'),
                block(
                  'European universities vary widely by country and institution. Some accept international qualifications directly. Others may require specific subjects, entrance exams, language certificates, foundation years, or additional academic evidence.',
                ),
                block('iCollege can support'),
                ...[
                  'Country and university research',
                  'English-taught degree route planning',
                  'Language requirement awareness',
                  'Qualification comparison',
                  'Foundation or pathway programme options',
                  'Realistic route mapping',
                ].map((item) => block(item, 'normal', 'bullet', 1)),
                block('Beyond University', 'h3'),
                block(
                  'Not every student needs to go straight to university. Some students may benefit from a gap year, an internship, a sports pathway, a creative project, an entrepreneurship experience, a foundation programme, or an iCollege Global experience before or alongside further study.',
                ),
                block(
                  'The aim is not just to complete a qualification. It is to help students move forward with clarity, confidence, and credible options.',
                  'blockquote',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'pathways-comparison',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {_type: 'blockStyles', background: {color: '#efefef'}},
      columns: [
        {
          _key: 'pathways-comparison-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-comparison-copy',
              _type: 'richTextBlock',
              eyebrow: 'Compare',
              content: [block('Pathway Comparison', 'h2')],
            },
            buildDataTable(comparisonHeaders, comparisonRows, 'Pathway Comparison'),
          ],
        },
      ],
    },
    {
      _key: 'pathways-agency',
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
          _key: 'pathways-agency-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-agency-copy',
              _type: 'richTextBlock',
              blockStyles: {_type: 'blockStyles', typography: {textAlign: 'center', textColor: '#ffffff'}},
              content: [
                block('How we work'),
                block("What Is iCollege's Role?", 'h2'),
                block(
                  'iCollege Life is a modern education company, not a traditional school. Students follow recognised qualification routes through trusted academic providers. iCollege provides the structure, mentoring, progress tracking, parent communication, teacher and tutor coordination, and pathway guidance around those routes.',
                ),
                block('Recognised pathways. Personal structure. Clear direction.'),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'pathways-faq',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'pathways-faq-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-faq-block',
              _type: 'faqBlock',
              eyebrow: 'FAQs',
              title: 'Questions Parents Often Ask',
              variation: 'default',
              enableSchema: true,
              items: pathwayFaqs.map((item) => ({
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
      _key: 'pathways-final-cta',
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
          _key: 'pathways-final-cta-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'pathways-final-cta-block',
              _type: 'ctaSection',
              eyebrow: 'Next step',
              heading: 'Build the Right Pathway From the Start',
              size: 'medium',
              bodyParagraphs: [
                {
                  _key: k(),
                  _type: 'ctaBodyParagraph',
                  emphasis: false,
                  text: 'Choosing the right qualification route matters. iCollege helps families understand the options, avoid unnecessary complexity, and build a flexible academic pathway with serious future outcomes.',
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
                  link: [{_key: k(), _type: 'linkExternal', url: FIT_FORM_URL, openInNewTab: true}],
                  variant: 'outline',
                },
              ],
            },
          ],
        },
      ],
    },
    academyFooterRow('academy-pathways'),
  ],
}

async function main() {
  console.log('Seeding academy pathways page…')
  await client.createOrReplace(page)
  console.log('Published document: academy-pathways-page (/academy/pathways-and-outcomes)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
