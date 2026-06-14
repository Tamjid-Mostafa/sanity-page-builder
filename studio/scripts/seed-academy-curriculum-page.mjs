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
const {block, ctaButtons, academyFooterRow} = createBlockHelpers(k)

const overviewSupportBullets = [
  'Academic planning',
  'Weekly mentoring',
  'Progress tracking',
  'Parent reporting',
  'University guidance',
]

const pathwayCards = [
  {
    title: 'Online/Flex Pathway',
    subtitle: 'US High School Diploma pathway with structured online support.',
    description:
      'For students who need flexible education from anywhere, with mentoring, accountability, and direction.',
    bestFor: [
      'Globally mobile families',
      'Independent learners',
      'Students outside Barcelona',
      'Travelling students',
      'Families wanting online learning with structure',
    ],
    includes: [
      'HSD pathway planning',
      'Structured weekly study plan',
      'Live teacher sessions',
      'Mentoring and academic check-ins',
      'Progress tracking',
      'Parent updates',
      'University pathway guidance',
    ],
    note: 'AP/SAT/additional English support, optional tutor support and university guidance available as add-ons.',
    lucide: 'laptop',
    accentColor: 'primary',
  },
  {
    title: 'University Pathway (Online or Hybrid)',
    subtitle:
      'US High School Diploma pathway with possible in-person support through our Barcelona hub.',
    description:
      'For students who want online flexibility, but may also benefit from supervised study, mentoring, and face-to-face support.',
    bestFor: [
      'Barcelona-based students',
      'Students visiting Barcelona occasionally',
      'Students needing more supervised study',
      'Students wanting greater university prep',
      'Students who benefit from additional mentoring',
    ],
    includes: [
      'Everything in Online/Flex',
      'In-person teaching',
      'AP and SAT support',
      'Supervised study blocks',
      'In-person mentoring',
      'Hub-based facilities use',
    ],
    note: 'Optional support for 1-to-1 tutoring is available as an add-on.',
    lucide: 'building-2',
    accentColor: 'secondary',
  },
  {
    title: 'Premier Pathway (Online or Hybrid)',
    subtitle: 'Higher-touch personal support and pathway focus.',
    description:
      'For families who want a more managed, personalised pathway with greater support and mentoring.',
    bestFor: [
      'Families wanting a more managed pathway',
      'Students aiming for competitive university options',
      'High achievers needing challenge and direction',
      'Students with complex academic histories',
      'Students needing a customised route',
    ],
    includes: [
      'Everything in the University pathway',
      'Weekly 1-to-1 tutoring support',
      'Possible GCSE/A-Level support where appropriate',
      'Regular parent updates',
      'Tutor coordination',
      'English support where needed',
      'Life direction and mentoring support',
    ],
    note: 'A premium alternative to traditional school: similar investment, far greater personalisation.',
    lucide: 'crown',
    accentColor: 'primary',
  },
]

const comparisonRows = [
  {
    pathway: 'Flex / Online Academy',
    bestFor: 'Students who need a flexible recognised academic pathway from anywhere',
    delivery: 'Online',
    support:
      'Mentoring, structure, progress tracking, and parent updates, live teaching',
    guidance: 'Light guidance included; deeper support available as an add-on',
  },
  {
    pathway: 'University Pathway',
    bestFor: 'Students aiming for university who need more structure and academic planning',
    delivery: 'Online or Barcelona hub',
    support:
      'More guided weekly support, supervised study where relevant, mentoring, parent updates, and in-person teaching',
    guidance: 'Included as part of the pathway with AP/SAT guidance where relevant',
  },
  {
    pathway: 'Premier Pathway',
    bestFor:
      'Students needing a highly personalised route, closer 1-to-1 support, or a more complex academic plan',
    delivery: 'Online or Barcelona hub',
    support:
      'Highest-touch support, 1-to-1 tutoring, closer mentoring, stronger parent communication',
    guidance:
      'Everything is included in the university pathway, but with deeper, more personalised support',
  },
]

const customSupportItems = [
  'GCSEs',
  'A-Levels',
  'English language development',
  'Spanish language support',
  'Subject-specific tuition',
  'University application preparation',
  'Catch-up or confidence-building support',
]

const supportSystemCards = [
  {
    title: 'Pathway Design',
    description:
      'We help families choose the right academic route based on the student’s goals, academic history, lifestyle, and future options.',
    lucide: 'git-branch',
    accentColor: 'primary',
  },
  {
    title: 'Structure and Accountability',
    description:
      'Students receive a clear weekly rhythm, expectations, and check-ins to help them stay on track.',
    lucide: 'calendar-check',
    accentColor: 'secondary',
  },
  {
    title: 'Mentoring and Direction',
    description:
      'We support students in developing confidence, independence, motivation, study habits, and decision-making skills.',
    lucide: 'users',
    accentColor: 'primary',
  },
  {
    title: 'Parent Communication',
    description:
      'Families receive updates so they understand progress, challenges, and next steps.',
    lucide: 'message-square',
    accentColor: 'secondary',
  },
  {
    title: 'Future Pathway Thinking',
    description:
      'Students are guided with university and life options in mind, whether they are aiming for the US, UK, Europe, or elsewhere.',
    lucide: 'route',
    accentColor: 'primary',
  },
]

function featureCard(card) {
  return {
    _key: k(),
    _type: 'featureCard',
    title: card.title,
    subtitle: card.subtitle,
    description: card.description,
    bestFor: card.bestFor,
    includes: card.includes,
    note: card.note,
    accentColor: card.accentColor,
    accentApplyTo: ['icon', 'iconBg'],
    icon: {source: 'lucide', lucide: card.lucide},
  }
}

const listCardStyles = {
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

const mutedCardStyles = {
  _type: 'blockStyles',
  background: {color: '#f4f4f5'},
  border: {width: '1px', style: 'solid', color: '#e5e5e5'},
  borderRadius: {
    topLeft: '16px',
    topRight: '16px',
    bottomLeft: '16px',
    bottomRight: '16px',
  },
  padding: {
    top: '32px',
    right: '32px',
    bottom: '32px',
    left: '32px',
    topMd: '40px',
    rightMd: '40px',
    bottomMd: '40px',
    leftMd: '40px',
  },
}

const page = {
  _id: 'academy-curriculum-page',
  _type: 'page',
  title: 'Curriculum & Qualifications',
  slug: {_type: 'slug', current: 'academy/curriculum-and-qualifications'},
  seo: {
    _type: 'seo',
    metaTitle: 'Curriculum & Qualifications | iCollege Academy | iCollege Life',
    metaDescription:
      'Flexible US High School Diploma pathways with structure and support — Online/Flex, University, and Premier options, plus custom GCSE, A-Level, and language support.',
    noIndex: false,
  },
  pageBuilder: [
    {
      _key: 'curriculum-hero',
      _type: 'heroSection',
      ...HERO_GRADIENT,
      badge: 'iCollege Academy Programmes',
      heading: 'Flexible US High School Diploma Pathways With',
      headingHighlight: 'Structure and Support',
      subtitle:
        'Most iCollege Academy students follow an accredited US High School Diploma pathway, supported by AP/SAT preparation, mentoring, accountability, and university guidance.\n\nStudents can study online or access in-person support through our Barcelona hub.\n\nFor students needing a more customised route, we can also support GCSEs, A-Levels, additional English and 1-to-1 subject-specific tuition where appropriate.',
      pills: [
        'US High School Diploma',
        'Online/Flex',
        'Barcelona Hybrid',
        'Athlete Pathway',
        'Premier Support',
      ],
      buttons: ctaButtons('curriculum-hero-cta-primary', 'curriculum-hero-cta-secondary'),
    },
    {
      _key: 'curriculum-choosing-header',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'curriculum-choosing-header-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'curriculum-choosing-heading',
              _type: 'richTextBlock',
              eyebrow: 'Overview',
              content: [
                block('One Main Academic Engine. Different Levels of Support.', 'h2'),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'curriculum-choosing-pathway',
      _type: 'gridRow',
      layout: '50-50',
      ...GRID_DEFAULTS,
      gap: 'xl',
      columns: [
        {
          _key: 'curriculum-choosing-left',
          verticalAlign: 'top',
          content: [
            {
              _key: 'curriculum-choosing-copy',
              _type: 'richTextBlock',
              content: [
                block(
                  'The US High School Diploma is our main flexible academic pathway because it works well for students who need structure, transparency, and flexibility.',
                ),
                block(
                  'It is especially suitable for students who are training seriously, moving internationally, travelling regularly, or seeking a more personalised route to learn at their own pace.',
                ),
                block('iCollege provides the support families need:', 'normal', undefined, undefined, [
                  'strong',
                ]),
              ],
            },
          ],
        },
        {
          _key: 'curriculum-choosing-right',
          verticalAlign: 'top',
          content: [
            {
              _key: 'curriculum-choosing-list',
              _type: 'richTextBlock',
              blockStyles: listCardStyles,
              content: overviewSupportBullets.map((item) => block(item, 'normal', 'bullet', 1)),
            },
          ],
        },
      ],
    },
    {
      _key: 'curriculum-pathways',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {
        _type: 'blockStyles',
        background: {color: DARK_SURFACE},
      },
      columns: [
        {
          _key: 'curriculum-pathways-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'curriculum-pathways-grid',
              _type: 'featureCardGrid',
              style: 'pathwayDetail',
              columns: '3',
              eyebrow: 'Programmes',
              title: 'Choose the Right Level of Support',
              cards: pathwayCards.map(featureCard),
              blockStyles: {
                _type: 'blockStyles',
                typography: {textColor: '#ffffff'},
              },
            },
          ],
        },
      ],
    },
    {
      _key: 'curriculum-comparison',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      columns: [
        {
          _key: 'curriculum-comparison-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'curriculum-comparison-copy',
              _type: 'richTextBlock',
              eyebrow: 'Compare',
              content: [block('Pathways at a Glance', 'h2')],
            },
            {
              _key: 'curriculum-comparison-table',
              _type: 'dataTable',
              headers: [
                {_key: k(), text: 'Pathway'},
                {_key: k(), text: 'Best for'},
                {_key: k(), text: 'Delivery'},
                {_key: k(), text: 'Support level'},
                {_key: k(), text: 'University guidance'},
              ],
              rows: comparisonRows.map((row) => ({
                _key: k(),
                cells: [
                  {_key: k(), text: row.pathway},
                  {_key: k(), text: row.bestFor},
                  {_key: k(), text: row.delivery},
                  {_key: k(), text: row.support},
                  {_key: k(), text: row.guidance},
                ],
              })),
              striped: false,
              compact: false,
            },
          ],
        },
      ],
    },
    {
      _key: 'curriculum-providers-header',
      _type: 'gridRow',
      layout: 'full',
      ...GRID_DEFAULTS,
      blockStyles: {
        _type: 'blockStyles',
        background: {color: MUTED_SURFACE},
      },
      columns: [
        {
          _key: 'curriculum-providers-header-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'curriculum-providers-copy',
              _type: 'richTextBlock',
              eyebrow: 'Beyond the diploma',
              content: [
                block('Custom Academic Support', 'h2'),
                block(
                  "While the US High School Diploma is our main pathway, some students need additional or alternative academic support. Depending on the student's goals, iCollege can support:",
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'curriculum-providers',
      _type: 'gridRow',
      layout: '66-33',
      ...GRID_DEFAULTS,
      blockStyles: {
        _type: 'blockStyles',
        background: {color: MUTED_SURFACE},
      },
      gap: 'xl',
      columns: [
        {
          _key: 'curriculum-providers-left',
          verticalAlign: 'top',
          content: [
            {
              _key: 'curriculum-providers-list',
              _type: 'richTextBlock',
              blockStyles: listCardStyles,
              content: customSupportItems.map((item) => block(item, 'normal', 'bullet', 1)),
            },
          ],
        },
        {
          _key: 'curriculum-providers-right',
          verticalAlign: 'top',
          content: [
            {
              _key: 'curriculum-providers-callout',
              _type: 'featureCardGrid',
              style: 'callout',
              columns: '1',
              cards: [
                {
                  _key: k(),
                  _type: 'featureCard',
                  description:
                    "Support is shaped around each student's goals — whether that means exam routes, language development, subject confidence, or university applications.",
                  accentColor: 'secondary',
                  accentApplyTo: ['icon', 'iconBg'],
                  icon: {source: 'lucide', lucide: 'book-open'},
                },
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'curriculum-flexible-athlete',
      _type: 'gridRow',
      layout: '50-50',
      ...GRID_DEFAULTS,
      gap: 'xl',
      blockStyles: {
        _type: 'blockStyles',
        borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
      },
      columns: [
        {
          _key: 'curriculum-flexible-left',
          verticalAlign: 'center',
          content: [
            {
              _key: 'curriculum-flexible-copy',
              _type: 'richTextBlock',
              leadingIcon: 'dumbbell',
              eyebrow: 'Specialist pathway',
              content: [
                block('Student-Athletes', 'h2'),
                block(
                  'Student-athletes can follow any of the Academy pathways above. The difference is not the qualification itself; it is how the structure is built around training, competition, travel, and long-term university goals.',
                ),
                block('Flexible around sport. Serious about the future.', 'blockquote'),
              ],
            },
            {
              _key: 'curriculum-flexible-athlete-link',
              _type: 'callToAction',
              action: 'link',
              label: 'Explore Student-Athlete Pathways',
              variant: 'primary',
              link: [{_key: k(), _type: 'pageSlug', slug: 'athletes'}],
            },
          ],
        },
        {
          _key: 'curriculum-flexible-right',
          verticalAlign: 'center',
          content: [
            {
              _key: 'curriculum-flexible-card',
              _type: 'richTextBlock',
              eyebrow: 'Same programmes',
              eyebrowTone: 'muted',
              blockStyles: mutedCardStyles,
              content: [
                block(
                  'Choose Online/Flex, University, or Premier support — then we align timetables, check-ins, and academic intensity with training and competition calendars.',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'curriculum-how-students-learn',
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
          _key: 'curriculum-how-students-learn-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'curriculum-how-students-learn-grid',
              _type: 'featureCardGrid',
              style: 'onDark',
              columns: '3',
              gridLayout: '3-2',
              showStepNumbers: true,
              eyebrow: 'Every programme',
              title: 'What Every Programme Includes',
              subtitle:
                'The iCollege Support System\n\nEvery iCollege Academy programme is built around the same core support system.',
              cards: supportSystemCards.map(featureCard),
              blockStyles: {_type: 'blockStyles', ...ON_DARK_TEXT},
            },
          ],
        },
      ],
    },
    {
      _key: 'curriculum-final-cta',
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
          _key: 'curriculum-final-cta-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'curriculum-final-cta-block',
              _type: 'ctaSection',
              eyebrow: 'Next step',
              heading: 'Start With the Right Programme',
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
                  text: 'We will help you understand whether iCollege Academy is the right fit, whether the US High School Diploma pathway makes sense, and what level of support your child may need.',
                },
                {
                  _key: k(),
                  _type: 'ctaBodyParagraph',
                  emphasis: true,
                  text: 'If iCollege is not the right fit, we will tell you honestly and help with other options.',
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
              trustItems: ['US HSD', 'Online/Flex', 'Barcelona hybrid', 'AP/SAT', 'Mentoring'],
            },
          ],
        },
      ],
    },
    academyFooterRow('curriculum'),
  ],
}

async function main() {
  console.log('Seeding academy curriculum page…')
  await client.createOrReplace(page)
  console.log('Published document: academy-curriculum-page (/academy/curriculum-and-qualifications)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
