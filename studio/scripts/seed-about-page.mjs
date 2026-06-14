import {createReadStream} from 'node:fs'
import {fileURLToPath} from 'node:url'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {
  createKeyGenerator,
  createBlockHelpers,
  FIT_FORM_URL,
  DARK_SURFACE,
  MUTED_SURFACE,
  ON_DARK_TEXT,
  CARD_BLOCK_STYLES,
  DARK_CALLOUT_STYLES,
  GRID_DEFAULTS,
  HERO_GRADIENT,
} from './seed-helpers.mjs'

const client = getCliClient({apiVersion: '2024-01-01'})
const k = createKeyGenerator()
const {block, ctaButtons} = createBlockHelpers(k)

const HUB_BANNER_URL =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80'

const ABOUT_SECTIONS = [
  {
    _key: 'about-hero',
    _type: 'heroSection',
    ...HERO_GRADIENT,
    maxWidth: 'default',
    minHeight: '70vh',
    badge: 'About',
    heading: 'Why iCollege',
    headingHighlight: 'Exists',
    subtitle:
      'The modern world gives young people more opportunities than ever to study globally, train seriously, build projects, travel, create, and design different kinds of lives.\n\nBut opportunity needs structure, direction, and credible academic foundations.\n\nWe exist for students whose lives or goals do not fit neatly into a standard school model.',
    buttons: ctaButtons('about-hero-cta-primary', 'about-hero-cta-secondary'),
  },
  {
    _key: 'about-why-exists-row',
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
        _key: 'about-why-exists-left',
        verticalAlign: 'top',
        content: [
          {
            _key: 'about-why-exists-copy',
            _type: 'richTextBlock',
            eyebrow: 'A changing world',
            content: [
              block('A Changing World Needs a Different Kind of Education', 'h2'),
              block(
                'Academic results still matter. Recognised qualifications still matter. University options still matter. But they are no longer enough on their own. Young people also need:',
              ),
              block('To understand themselves', 'normal', 'bullet', 1),
              block('Manage their time', 'normal', 'bullet', 1),
              block('Communicate clearly', 'normal', 'bullet', 1),
              block('Adapt to change', 'normal', 'bullet', 1),
              block('Take responsibility for their future', 'normal', 'bullet', 1),
              block('Develop in the digital age', 'normal', 'bullet', 1),
            ],
          },
        ],
      },
      {
        _key: 'about-why-exists-right',
        verticalAlign: 'top',
        content: [
          {
            _key: 'about-why-exists-callout',
            _type: 'richTextBlock',
            content: [block('Flexible academics. Real direction. Serious future options.', 'blockquote')],
            blockStyles: DARK_CALLOUT_STYLES,
          },
        ],
      },
    ],
  },
  {
    _key: 'about-why-exists-banner',
    _type: 'heroSection',
    layout: 'fullWidth',
    alignment: 'left',
    verticalAlign: 'center',
    maxWidth: 'default',
    backgroundType: 'image',
    hubOverlay: true,
    minHeight: '70vh',
    backgroundImage: {
      _type: 'image',
      alt: 'Students collaborating',
      asset: {_type: 'reference', _ref: 'pending-about-banner-image'},
    },
    heading: 'Flexible academics.',
    headingHighlight: 'Real direction.',
    subtitle: 'Serious future options.',
  },
  {
    _key: 'about-founder-row',
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
        _key: 'about-founder-image-col',
        verticalAlign: 'top',
        content: [
          {
            _key: 'about-founder-photo',
            _type: 'imageBlock',
            display: 'portrait',
            image: {
              _type: 'image',
              alt: 'Steven Lockwood, Founder of iCollege Life',
              asset: {_type: 'reference', _ref: 'pending-steven-photo'},
            },
          },
          {
            _key: 'about-founder-caption',
            _type: 'richTextBlock',
            content: [
              block('Steven Lockwood', 'normal', undefined, undefined, ['strong']),
              block('Founder, iCollege Life'),
            ],
            blockStyles: {
              _type: 'blockStyles',
              background: {color: DARK_SURFACE},
              typography: {textColor: '#ffffff'},
              borderRadius: {
                topLeft: '16px',
                topRight: '16px',
                bottomLeft: '16px',
                bottomRight: '16px',
              },
              padding: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px',
              },
            },
          },
        ],
      },
      {
        _key: 'about-founder-copy-col',
        verticalAlign: 'top',
        content: [
          {
            _key: 'about-founder-copy',
            _type: 'richTextBlock',
            eyebrow: 'From the founder',
            content: [
              block('Why I Built iCollege Life', 'h2'),
              block(
                'I have spent most of my life around education, coaching, and young people as they try to find their path.',
              ),
              block(
                'As a former athlete, teacher, coach, and mentor, I have seen the same problem again and again: capable young people are told to work hard, get good grades, and follow the rules. But they are not always given the structure, guidance, or space to understand who they are becoming and what types of lives they want to live.',
              ),
              block(
                'Some need more flexibility. Some need more challenge. Some need more confidence. Some need help connecting academic choices with a bigger life direction.',
              ),
              block('That is why I built iCollege Life.'),
              block(
                'Not as a shortcut. But as a more personal, flexible, and modern approach to education, one that protects academic progress while helping students build lives worth living.',
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    _key: 'about-beliefs-row',
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
        _key: 'about-beliefs-col',
        verticalAlign: 'top',
        content: [
          {
            _key: 'about-beliefs-copy',
            _type: 'richTextBlock',
            eyebrow: 'What we believe',
            blockStyles: {_type: 'blockStyles', ...ON_DARK_TEXT},
            content: [
              block('What We Believe', 'h2'),
              block(
                'We believe academic education should support the life a young person is trying to build, not dominate it.',
              ),
              block(
                'Too often, school dictates the day, while sport, creativity, travel, entrepreneurship, health, and real-world experience are pushed to the edges. We think education should work differently.',
              ),
              block(
                "Qualifications matter, and there is real beauty in academia. But academic learning should sit within a wider life, with study built intelligently around a student's goals, energy, and strengths, which makes it more relatable.",
              ),
              block(
                'We aim to combine flexibility with structure, accountability, and serious academic pathways. Education should support your life — not put it on hold.',
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    _key: 'about-built-with-care-row',
    _type: 'gridRow',
    layout: 'full',
    ...GRID_DEFAULTS,
    blockStyles: {
      _type: 'blockStyles',
      borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
      background: {color: MUTED_SURFACE},
    },
    columns: [
      {
        _key: 'about-built-with-care-col',
        verticalAlign: 'top',
        content: [
          {
            _key: 'about-built-with-care-copy',
            _type: 'richTextBlock',
            eyebrow: 'How we show up',
            content: [
              block('Built With Care', 'h2'),
              block(
                'iCollege Life is not trying to be a traditional school, a tutoring agency, or a one-size-fits-all online programme.',
              ),
              block(
                'We are building a modern education company for internationally minded students and families who want flexibility without losing seriousness, structure, or great future options.',
              ),
            ],
          },
          {
            _key: 'about-built-with-care-pills',
            _type: 'tagPills',
            items: ['Clear expectations.', 'Honest feedback.', 'Long-term development.'],
          },
        ],
      },
    ],
  },
  {
    _key: 'about-human-led-row',
    _type: 'gridRow',
    layout: '50-50',
    ...GRID_DEFAULTS,
    gap: 'xl',
    blockStyles: {
      _type: 'blockStyles',
      background: {color: DARK_SURFACE},
      typography: {textColor: '#ffffff'},
      borderTop: {width: '1px', style: 'solid', color: 'rgba(255,255,255,0.1)'},
    },
    columns: [
      {
        _key: 'about-human-led-copy-col',
        verticalAlign: 'top',
        content: [
          {
            _key: 'about-human-led-intro',
            _type: 'richTextBlock',
            eyebrow: 'Our approach',
            blockStyles: {_type: 'blockStyles', ...ON_DARK_TEXT},
            content: [
              block('Human-Led, Technology-Supported', 'h2'),
              block(
                'Technology can improve learning, planning, and communication. But it cannot replace human experience, mentoring, trust, or care.',
              ),
              block(
                'At iCollege, students are supported by real educators and mentors, with modern tools used carefully to add structure, clarity, and insight.',
              ),
              block('Technology is a tool. People remain at the centre.', 'blockquote'),
            ],
          },
        ],
      },
      {
        _key: 'about-human-led-cards-col',
        verticalAlign: 'top',
        content: [
          {
            _key: 'about-human-led-cards',
            _type: 'featureCardGrid',
            style: 'onDark',
            columns: '1',
            blockStyles: CARD_BLOCK_STYLES,
            cards: [
              {
                _key: k(),
                _type: 'featureCard',
                title: 'Real educators and mentors at the centre',
                accentColor: 'primary',
                accentApplyTo: ['iconBg'],
                icon: {source: 'lucide', lucide: 'user'},
              },
              {
                _key: k(),
                _type: 'featureCard',
                title: 'Trust, care, and human experience that technology cannot replace',
                accentColor: 'secondary',
                accentApplyTo: ['iconBg'],
                icon: {source: 'lucide', lucide: 'heart-handshake'},
              },
              {
                _key: k(),
                _type: 'featureCard',
                title: 'Modern tools used carefully for structure, clarity, and insight',
                accentColor: 'primary',
                accentApplyTo: ['iconBg'],
                icon: {source: 'lucide', lucide: 'cpu'},
              },
            ],
          },
        ],
      },
    ],
  },
  {
    _key: 'about-closing-row',
    _type: 'gridRow',
    layout: 'full',
    maxWidth: 'default',
    containerAlign: 'center',
    paddingY: 'compact',
    blockStyles: {
      _type: 'blockStyles',
      borderTop: {width: '1px', style: 'solid', color: '#e0e0e0'},
      typography: {textAlign: 'center'},
    },
    columns: [
      {
        _key: 'about-closing-col',
        verticalAlign: 'top',
        content: [
          {
            _key: 'about-closing-cta',
            _type: 'ctaSection',
            heading: 'Education With Intention',
            size: 'medium',
            bodyParagraphs: [
              {
                _key: k(),
                _type: 'ctaBodyParagraph',
                emphasis: false,
                text: 'At its core, iCollege Life helps students learn well, think clearly, and take ownership of their future in a changing world.',
              },
              {
                _key: k(),
                _type: 'ctaBodyParagraph',
                emphasis: true,
                text: 'Education for a life worth living.',
              },
            ],
            buttons: ctaButtons('about-closing-cta-primary', 'about-closing-cta-secondary'),
          },
        ],
      },
    ],
  },
]

const page = {
  _id: 'about-page',
  _type: 'page',
  title: 'Why iCollege Exists',
  slug: {_type: 'slug', current: 'about'},
  seo: {
    _type: 'seo',
    metaTitle: 'Why iCollege Exists | About | iCollege Life',
    metaDescription:
      'The modern world gives young people more opportunities than ever-but opportunity needs structure, direction, and credible academic foundations. iCollege Life exists for students whose lives or goals do not fit neatly into a standard school model.',
    noIndex: false,
  },
  pageBuilder: ABOUT_SECTIONS,
}

async function uploadStevenPhoto() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url))
  const imagePath = path.resolve(scriptDir, '../../frontend/public/steven.jpeg')
  console.log('Uploading Steven Lockwood photo...')
  const stream = createReadStream(imagePath)
  const asset = await client.assets.upload('image', stream, {
    filename: 'steven-lockwood.jpg',
    contentType: 'image/jpeg',
  })
  return asset._id
}

async function uploadHubBanner() {
  console.log('Uploading about page banner image...')
  const response = await fetch(HUB_BANNER_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch about banner image: ${response.status}`)
  }
  const buffer = Buffer.from(await response.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, {
    filename: 'about-hub-banner.jpg',
  })
  return asset._id
}

async function main() {
  console.log('Seeding about page...')
  const [stevenRef, bannerRef] = await Promise.all([uploadStevenPhoto(), uploadHubBanner()])
  const document = structuredClone(page)

  const founderPhoto = document.pageBuilder
    .find((section) => section._key === 'about-founder-row')
    ?.columns?.find((col) => col._key === 'about-founder-image-col')
    ?.content?.find((contentBlock) => contentBlock._key === 'about-founder-photo')

  const bannerSection = document.pageBuilder.find(
    (section) => section._key === 'about-why-exists-banner',
  )

  if (founderPhoto?.image?.asset) {
    founderPhoto.image.asset._ref = stevenRef
  }
  if (bannerSection?.backgroundImage?.asset) {
    bannerSection.backgroundImage.asset._ref = bannerRef
  }

  await client.createOrReplace(document)
  console.log('Published document: about-page (/about)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
