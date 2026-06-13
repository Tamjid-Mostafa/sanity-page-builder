import {createReadStream} from 'node:fs'
import {fileURLToPath} from 'node:url'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const k = () => Math.random().toString(36).slice(2, 11)

const span = (text, marks = []) => ({_key: k(), _type: 'span', marks, text})

const block = (text, style = 'normal', listItem, level) => {
  const node = {
    _key: k(),
    _type: 'block',
    style,
    markDefs: [],
    children: [span(text)],
  }
  if (listItem) {
    node.listItem = listItem
    node.level = level ?? 1
  }
  return node
}

const FIT_FORM_URL = 'https://forms.gle/UnMumWXLvgjEgU2LA'
const DARK_SURFACE = '#383838'
const ON_DARK_TEXT = {typography: {textColor: '#ffffff'}}

const supportIncludes = [
  'Subject teaching',
  'One-to-one tutoring',
  'Exam preparation',
  'English language development',
  'AP/SAT guidance',
  'University pathway support',
  'Mentoring and coaching',
  'Supervised study',
  'Parent communication',
]

const learningNeeds = [
  'Structure',
  'Rhythm',
  'Motivation',
  'Feedback',
  'Human support',
]

const growthPriorities = [
  'Quality',
  'Stability',
  'Confidence',
  'Safety',
  'Trust',
]

const stevenBio = [
  'Steven founded iCollege Life to create a more flexible, personal, and serious approach to education for internationally minded students.',
  'He is a UK-qualified teacher, former ATP Tour-ranked tennis player, qualified professional tennis coach, mentor, and education entrepreneur. He studied internationally, graduating from the University of California, Los Angeles, before completing a master\'s degree at Birkbeck, University of London, and a PGCE at the Institute of Education, University College London.',
  'Steven has worked in education for many years, including teaching and leadership roles in international and state schools. This experience gives him a deep understanding of academic pathways and standards, parent expectations, student support, and the realities of education.',
  'Steven\'s background brings together elite sport, academic education, coaching, personal development, and years of working closely with young people. He has travelled widely when he was younger, representing Great Britain as a junior player, studied in different systems, and understands the importance of building an education around the person rather than just the system.',
  'As someone who has dyslexia, Steven understands personally that capable young people do not always fit neatly into standard systems.',
  'He is also a Design Your Life-certified coach and a Highlands Ability Battery-trained consultant, bringing tools for self-understanding, direction, and better decision-making into the iCollege model.',
  'His role is to shape iCollege\'s vision, guide families, build partnerships, and ensure each student\'s pathway connects academic progress to a broader sense of direction.',
]

const page = {
  _id: 'leadership-page',
  _type: 'page',
  title: 'Founder & Approach',
  slug: {_type: 'slug', current: 'about/leadership'},
  seo: {
    _type: 'seo',
    metaTitle: 'Founder & Approach | About | iCollege Life',
    metaDescription:
      'iCollege Life is intentionally human-led: flexible academic pathways with structure, standards, and future options. Meet Steven Lockwood and how we build support around each student.',
    noIndex: false,
  },
  pageBuilder: [
    {
      _key: 'leadership-hero',
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
      minHeight: '70vh',
      badge: 'About iCollege Life',
      heading: 'Founder &',
      headingHighlight: 'Approach',
      subtitle:
        'Students need flexible academic pathways without losing structure, standards, or future options.\n\nWe are intentionally human-led. Students are not passed through an anonymous online system. Families work with real people who understand the student, the pathway, and the bigger goal.\n\nPersonal enough to know the student. Serious enough to protect the future.',
      buttons: [
        {
          _key: 'leadership-hero-cta-primary',
          _type: 'callToAction',
          action: 'calendly',
          label: 'Book a Conversation',
          variant: 'primary',
        },
        {
          _key: 'leadership-hero-cta-secondary',
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
      _key: 'leadership-founder-intro',
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
          _key: 'leadership-founder-intro-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'leadership-founder-intro-copy',
              _type: 'richTextBlock',
              eyebrow: 'Founder',
              content: [
                block('Steven Lockwood', 'h2'),
                block('Founder & Director, iCollege Life', 'normal'),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'leadership-founder-split',
      _type: 'gridRow',
      layout: '50-50',
      maxWidth: 'default',
      containerAlign: 'left',
      paddingY: 'none',
      gap: 'xl',
      columns: [
        {
          _key: 'leadership-founder-image-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'leadership-founder-photo',
              _type: 'imageBlock',
              display: 'portrait',
              image: {
                _type: 'image',
                alt: 'Steven Lockwood, Founder and Director of iCollege Life',
                asset: {_type: 'reference', _ref: 'pending'},
              },
            },
            {
              _key: 'leadership-founder-caption',
              _type: 'richTextBlock',
              content: [
                block('Steven Lockwood', 'normal'),
                block('Founder & Director, iCollege Life', 'normal'),
              ],
            },
          ],
        },
        {
          _key: 'leadership-founder-bio-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'leadership-founder-bio',
              _type: 'richTextBlock',
              content: [
                ...stevenBio.map((paragraph) => block(paragraph)),
                block('Education for a life worth living.', 'blockquote'),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'leadership-support-row',
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
          _key: 'leadership-support-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'leadership-support-intro',
              _type: 'richTextBlock',
              eyebrow: 'How we support',
              content: [
                block('A Carefully Built Support Network', 'h2'),
                block(
                  'iCollege works with selected teachers, tutors, mentors, academic specialists, and external providers depending on each student\'s pathway.',
                ),
                block(
                  'Flexible education only works when someone is paying attention. Every student has a different story: academic history, personality, family situation, goals, timetable, learning style, and level of independence.',
                ),
                block(
                  'iCollege does not simply place students into courses and hope they manage. We help families choose the right pathway, build the right structure, and adjust support for the student, with clear communication with families about what\'s required.',
                ),
              ],
            },
            {
              _key: 'leadership-support-list',
              _type: 'richTextBlock',
              eyebrow: 'This support may include',
              content: supportIncludes.map((item) => block(item, 'normal', 'bullet', 1)),
            },
            {
              _key: 'leadership-support-close',
              _type: 'richTextBlock',
              content: [
                block(
                  'The right support depends on the student\'s age, goals, academic needs, personality, and future direction.',
                ),
                block('The pathway comes first. The support is built around it.', 'blockquote'),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'leadership-learning-row',
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
          _key: 'leadership-learning-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'leadership-learning-intro',
              _type: 'richTextBlock',
              eyebrow: 'Learning design',
              blockStyles: {_type: 'blockStyles', ...ON_DARK_TEXT},
              content: [
                block('Human Support Around Modern Learning', 'h2'),
                block(
                  'Online qualifications can be powerful, but many students need more than access to courses. They need:',
                ),
              ],
            },
            {
              _key: 'leadership-learning-needs',
              _type: 'tagPills',
              items: learningNeeds,
            },
            {
              _key: 'leadership-learning-close',
              _type: 'richTextBlock',
              blockStyles: {_type: 'blockStyles', ...ON_DARK_TEXT},
              content: [
                block(
                  'At iCollege, students are known, monitored, challenged, and encouraged. Parents are kept informed, so they are not left guessing about progress. Technology can support learning. People make it work.',
                ),
              ],
            },
          ],
        },
      ],
    },
    {
      _key: 'leadership-growth-row',
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
          _key: 'leadership-growth-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'leadership-growth-intro',
              _type: 'richTextBlock',
              eyebrow: 'Long term',
              content: [
                block('Built to Grow Carefully', 'h2'),
                block(
                  'We are building a serious education company around flexible academic pathways, mentoring, parent clarity, and long-term student development.',
                ),
                block('As iCollege grows, the goal is to protect what matters most:'),
              ],
            },
            {
              _key: 'leadership-growth-grid',
              _type: 'featureCardGrid',
              style: 'bordered',
              columns: '2',
              cards: growthPriorities.map((title) => ({
                _key: k(),
                _type: 'featureCard',
                title,
                accentColor: 'primary',
                accentApplyTo: ['iconBg'],
              })),
            },
          ],
        },
      ],
    },
    {
      _key: 'leadership-closing-row',
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
          _key: 'leadership-closing-col',
          verticalAlign: 'top',
          content: [
            {
              _key: 'leadership-closing-cta',
              _type: 'ctaSection',
              eyebrow: 'Get started',
              heading: 'Work With Us',
              size: 'large',
              blockStyles: {
                _type: 'blockStyles',
                typography: {textColor: '#ffffff'},
              },
              bodyParagraphs: [
                {
                  _key: k(),
                  _type: 'ctaBodyParagraph',
                  emphasis: false,
                  text: 'The best way to understand whether iCollege is the right fit is to begin with a conversation.',
                },
                {
                  _key: k(),
                  _type: 'ctaBodyParagraph',
                  emphasis: false,
                  text: 'We will look at the student\'s current situation, academic goals, personality, family needs, and future options before recommending a pathway.',
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
            },
          ],
        },
      ],
    },
  ],
}

async function uploadStevenPhoto() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url))
  const imagePath = path.resolve(scriptDir, '../../frontend/public/steven.jpeg')
  console.log('Uploading Steven Lockwood photo…')
  const stream = createReadStream(imagePath)
  const asset = await client.assets.upload('image', stream, {
    filename: 'steven-lockwood.jpg',
    contentType: 'image/jpeg',
  })
  return asset._id
}

async function main() {
  console.log('Seeding leadership page…')
  const stevenRef = await uploadStevenPhoto()
  const document = structuredClone(page)
  const founderPhoto = document.pageBuilder
    .find((section) => section._key === 'leadership-founder-split')
    ?.columns?.find((col) => col._key === 'leadership-founder-image-col')
    ?.content?.find((block) => block._key === 'leadership-founder-photo')

  if (founderPhoto?.image?.asset) {
    founderPhoto.image.asset._ref = stevenRef
  }

  await client.createOrReplace(document)
  console.log('Published document: leadership-page (/about/leadership)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
