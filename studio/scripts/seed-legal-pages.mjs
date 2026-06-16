import {getCliClient} from 'sanity/cli'
import {createKeyGenerator, createBlockHelpers} from './seed-helpers.mjs'

const client = getCliClient({apiVersion: '2024-01-01'})
const k = createKeyGenerator()
const {legalHero, legalContentRow, legalClosingRow} = createBlockHelpers(k)

const PRIVACY_SECTIONS = [
  {
    title: 'Who we are',
    paragraphs: [
      'iCollege Life is an education organisation based in Barcelona, working with students, families, and partners internationally.',
      'iCollege Life is operated by iCollege Education Ltd, which acts as the data controller for personal data collected through our website, enquiries, admissions, and programmes.',
    ],
  },
  {
    title: 'Information we collect',
    paragraphs: [
      'We collect only the information needed for educational, administrative, communication, safeguarding, or service improvement purposes.',
      'This may include:',
    ],
    bullets: [
      'Contact and enquiry details',
      'Admissions and enrolment information',
      'Academic records, reports, and transcripts',
      'Assessment information, such as CAT4, English, maths, reading, or Highlands Ability Battery results, where used',
      'Information relevant to student support, wellbeing, or safeguarding',
      'Website usage and analytics data',
    ],
  },
  {
    title: 'How we use personal data',
    paragraphs: ['We use personal data to:'],
    bullets: [
      'Respond to enquiries',
      'Manage admissions and enrolment',
      'Deliver educational support and programmes',
      'Communicate with students, parents, and partners',
      'Support student progress, wellbeing, and safeguarding',
      'Provide assessment, mentoring, and pathway guidance',
      'Improve our services, systems, and website',
    ],
    afterBullets: [
      'We do not sell personal data.',
      'We do not use personal data for automated decision-making.',
    ],
  },
  {
    title: 'Assessments and student insight tools',
    paragraphs: [
      "Where appropriate, iCollege may use assessments or profiling tools to understand better a student's starting point, learning profile, strengths, needs, and pathway options.",
      'This may include academic baselines, CAT4-style cognitive profiling, English or maths checks, reading assessments, or tools such as the Highlands Ability Battery.',
      'Assessment data is handled confidentially and used only to support responsible educational planning, mentoring, placement, or guidance.',
    ],
  },
  {
    title: 'Legal basis for processing',
    paragraphs: [
      'We process personal data only where we have a lawful basis to do so.',
      'This may include:',
    ],
    bullets: [
      'Consent',
      'Performance of a contract',
      'Legal obligations, including safeguarding responsibilities',
      'Legitimate interests connected to education, administration, communication, and service improvement',
    ],
    afterBullets: [
      'The GDPR requires personal data to be processed lawfully, fairly, transparently, and only for appropriate purposes.',
    ],
  },
  {
    title: 'Sharing personal data',
    paragraphs: ['We may share information only where necessary and appropriate with:'],
    bullets: [
      'Educators, mentors, tutors, or staff involved in student support',
      'Trusted academic providers, assessment providers, or pathway partners',
      'IT, administration, communication, or website service providers',
      'Safeguarding, legal, or regulatory authorities where required',
    ],
    afterBullets: ['All partners and providers are expected to use appropriate data protection standards.'],
  },
  {
    title: 'Children and young people',
    paragraphs: [
      'We take particular care when handling data relating to children and young people.',
      'Such information is used only where necessary for education, support, communication, safeguarding, legal obligations, or agreed programme delivery.',
    ],
  },
  {
    title: 'Storage and security',
    paragraphs: [
      'Personal data is stored using trusted systems and accessed only by authorised individuals.',
      'We use reasonable organisational and technical measures to protect personal data from unauthorised access, loss, misuse, or disclosure.',
      'Data is kept only for as long as necessary for the purpose it was collected, or as required for legal, safeguarding, contractual, or administrative reasons.',
    ],
  },
  {
    title: 'International data transfers',
    paragraphs: [
      'Because iCollege works with international students, families, providers, and partners, personal data may sometimes be processed outside the country where it was collected.',
      'Where this happens, we use appropriate safeguards to help keep personal data protected. EU rules include safeguards for international transfers, such as adequacy decisions or standard contractual clauses, where relevant.',
    ],
  },
  {
    title: 'Your rights',
    paragraphs: ['Depending on the circumstances, individuals may have the right to:'],
    bullets: [
      'Access their personal data',
      'Correct inaccurate or incomplete data',
      'Request deletion of personal data',
      'Restrict or object to processing',
      'Withdraw consent where processing is based on consent',
      'Request a copy or transfer of their data where applicable',
    ],
    afterBullets: [
      'The ICO summarises these rights as including access, rectification, erasure, restriction, objection, and related rights.',
      'To make a request, contact us using the details below.',
    ],
  },
  {
    title: 'Cookies',
    paragraphs: [
      'Our website may use cookies or similar technologies to support functionality, analytics, and website improvement.',
    ],
    inlineLink: {href: '/cookies', label: 'Read our Cookie Policy'},
  },
  {
    title: 'Contact',
    paragraphs: ['For questions about this Privacy Policy or how personal data is handled, please contact:'],
    contactEmail: 'info@icollege.life',
  },
  {
    title: 'Updates',
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in law, technology, services, or organisational practice.',
      'The latest version will always be available on this page.',
    ],
  },
]

const TERMS_SECTIONS = [
  {
    title: 'Enrolment',
    paragraphs: [
      'Enrolment is subject to our admissions process and confirmation that iCollege is a suitable fit for the student.',
      'Places may be limited and depend on suitability, availability, pathway requirements, and cohort balance.',
    ],
  },
  {
    title: 'Fees & Payment',
    paragraphs: [
      'Programme fees are agreed in advance and confirmed in writing.',
      'Fees may vary depending on the programme, duration, qualification route, delivery model, and level of support.',
      'A deposit or enrolment fee may be required to secure a place. Agreed payment schedules must be followed.',
      'Any discount or payment adjustment is discretionary and must be confirmed in writing.',
    ],
  },
  {
    title: 'What Fees Include',
    paragraphs: [
      'Fees include only the services confirmed in the relevant programme agreement or written offer.',
      'Unless clearly stated, fees do not include:',
    ],
    bullets: [
      'external examination or awarding body fees',
      'qualification provider fees',
      'accommodation, travel, visas, insurance, or personal expenses',
      'optional tutoring, activities, trips, or experiences',
      'university application, transcript, AP, SAT, or testing fees',
    ],
    afterBullets: ['Additional costs will be communicated where relevant.'],
  },
  {
    title: 'Assessments',
    paragraphs: [
      'Students may be asked to complete academic or developmental assessments as part of the admissions or programme delivery process.',
      'This may include English, maths, reading, CAT4-style profiling, or tools such as the Highlands Ability Battery.',
      'These tools support understanding, planning, and placement. They are not simple pass/fail tests.',
    ],
  },
  {
    title: 'Attendance, Engagement & Conduct',
    paragraphs: [
      'Students are expected to attend scheduled sessions, engage constructively, communicate appropriately, and act responsibly.',
      'Missed sessions due to absence, late cancellation, or non-attendance are not automatically refundable or rescheduled.',
      'iCollege may review or pause enrolment if expectations around attendance, engagement, conduct, payment, safeguarding, or safety are not met.',
    ],
  },
  {
    title: 'Programme Delivery',
    paragraphs: [
      'iCollege may make reasonable changes to timetables, formats, staffing, locations, or delivery methods where necessary.',
      'Any changes will be made with student support and programme continuity in mind.',
    ],
  },
  {
    title: 'Withdrawal & Refunds',
    paragraphs: [
      'Withdrawal and refund terms are confirmed at enrolment and may vary by programme.',
      'Unless otherwise agreed in writing, deposits or enrolment fees are non-refundable once onboarding or planning has begun.',
      'Fees are generally non-refundable once a programme has started.',
      'Families should raise concerns early so that support, adjustments, or alternatives can be considered.',
    ],
  },
  {
    title: 'Safeguarding & Welfare',
    paragraphs: [
      'iCollege is committed to safeguarding and promoting student welfare.',
      'Participation is subject to appropriate conduct, professional boundaries, communication expectations, and safeguarding responsibilities.',
    ],
    inlineLink: {href: '/safeguarding', label: 'Read our Safeguarding Statement'},
  },
  {
    title: 'Data Protection',
    paragraphs: [
      'Personal data is handled in line with applicable data protection laws and our Privacy Policy.',
    ],
    inlineLink: {href: '/privacy', label: 'Read our Privacy Policy'},
  },
  {
    title: 'External Providers & Partners',
    paragraphs: [
      'Some pathways may involve external qualification providers, assessment providers, tutors, venues, partner organisations, or third-party services.',
      'External providers may have their own terms, fees, deadlines, policies, and requirements.',
    ],
  },
  {
    title: 'Disruption Beyond Our Control',
    paragraphs: [
      'iCollege is not responsible for disruptions caused by events beyond its reasonable control, including travel disruptions, public health measures, technology failures, venue issues, regulatory changes, or partner-related changes.',
      'Where possible, reasonable alternatives or adjustments will be considered.',
    ],
  },
  {
    title: 'Resolving Concerns',
    paragraphs: [
      'iCollege aims to resolve concerns through clear communication and good-faith discussion.',
      'Families are encouraged to raise concerns early so they can be addressed constructively.',
    ],
  },
  {
    title: 'Updates',
    paragraphs: [
      'These Terms & Conditions may be updated from time to time.',
      'The latest version will be available on this page.',
    ],
  },
]

const COOKIES_SECTIONS = [
  {
    title: 'What are cookies?',
    paragraphs: [
      'Cookies are small text files placed on your device when you visit a website. They help websites work properly, remember preferences, and understand how visitors use the site.',
    ],
  },
  {
    title: 'How we use cookies',
    paragraphs: ['iCollege Life may use cookies to:'],
    bullets: [
      'Keep the website working correctly',
      'Improve the user experience',
      'Understand how visitors use the website',
      'Monitor basic performance and analytics',
    ],
    afterBullets: [
      'We do not use cookies to collect sensitive personal information or track users across unrelated websites.',
      'Where required by law, non-essential cookies are used only with your consent.',
    ],
  },
  {
    title: 'Types of cookies we use',
    subsections: [
      {
        title: 'Essential cookies',
        body: 'Required for the website to function properly. These cannot usually be disabled.',
      },
      {
        title: 'Analytics cookies',
        body: 'Help us understand how visitors use the website, including which pages they visit and how the site performs.',
      },
      {
        title: 'Functional cookies',
        body: 'Remember preferences or settings where relevant.',
      },
    ],
  },
  {
    title: 'Managing cookies',
    paragraphs: [
      'When you visit our website, you may be asked to accept or manage cookies through a cookie banner.',
      'You can also control or turn off cookies through your browser settings. Some parts of the website may not work properly if essential cookies are disabled.',
    ],
  },
  {
    title: 'Third-party cookies',
    paragraphs: [
      'Some cookies may be set by third-party tools used on our website, such as analytics services, forms, booking tools, or embedded content.',
      'These providers are responsible for their own cookie and privacy practices.',
    ],
  },
  {
    title: 'Updates',
    paragraphs: [
      'We may update this Cookie Policy from time to time to reflect changes in technology, law, or website functionality.',
      'The latest version will always be available on this page.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: ['For questions about this Cookie Policy, please contact:'],
    contactEmail: 'info@icollege.life',
  },
]

const SAFEGUARDING_SECTIONS = [
  {
    title: 'Our safeguarding approach',
    paragraphs: [
      'Learning at iCollege may take place online, in person, through our Barcelona hub, or in partnership with other organisations.',
      'In all settings, we aim to ensure that expectations, supervision, communication, and boundaries are clear, age-appropriate, and professionally managed.',
      'Safeguarding includes:',
    ],
    bullets: [
      'Maintaining appropriate professional boundaries',
      'Supporting student wellbeing and welfare',
      'Communicating clearly with families',
      'Responding promptly to concerns',
      'Agreeing responsibilities with partners where relevant',
      'Ensuring staff and collaborators understand their duty of care',
    ],
  },
  {
    title: 'Staff and collaborators',
    paragraphs: [
      'All staff, tutors, mentors, and collaborators working with students are expected to act professionally, responsibly, and in the best interests of learners.',
      'Where external providers or partner organisations are involved, safeguarding expectations and responsibilities should be understood in advance.',
    ],
  },
  {
    title: 'Reporting concerns',
    paragraphs: [
      'Any safeguarding or welfare concern should be raised immediately with the appropriate member of iCollege staff.',
      'Concerns can also be reported directly to iCollege Life using the contact details below.',
      'Safeguarding concerns will be taken seriously, handled with care and confidentiality, and escalated where appropriate.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'For safeguarding concerns or questions relating to student welfare, please contact:',
    ],
    contactEmail: 'info@icollege.life',
  },
  {
    title: 'Final statement',
    paragraphs: [
      'Safeguarding at iCollege Life is not about restriction or control.',
      'It is about creating learning environments where students can grow with confidence, security, independence, and care.',
      'iCollege Life follows safeguarding principles consistent with recognised educational practice and international student support standards.',
    ],
  },
]

const pages = [
  {
    _id: 'privacy-page',
    title: 'Privacy Policy',
    slug: 'privacy',
    seo: {
      _type: 'seo',
      metaTitle: 'Privacy Policy | iCollege Life',
      metaDescription:
        'How iCollege Life collects, uses, and protects personal data for students, families, partners, and website visitors — including GDPR rights and contact details.',
      noIndex: false,
    },
    hero: {
      key: 'privacy-hero',
      heading: 'Privacy Policy',
      subtitle: 'Clear information. Responsible handling. Respect for trust.',
      intro: [
        'iCollege Life is committed to protecting the personal data of students, families, partners, and website visitors.',
        'This Privacy Policy explains what information we collect, why we use it, how we protect it, and what rights individuals have under applicable data protection laws, including the EU GDPR and UK GDPR where relevant.',
      ],
    },
    sections: PRIVACY_SECTIONS,
    microLine: 'We handle personal data carefully, responsibly, and only where needed.',
  },
  {
    _id: 'terms-page',
    title: 'Terms & Conditions',
    slug: 'terms',
    seo: {
      _type: 'seo',
      metaTitle: 'Terms & Conditions | iCollege Life',
      metaDescription:
        'How iCollege Life offers programmes, services, and educational support — including enrolment, fees, attendance, refunds, safeguarding, and resolving concerns.',
      noIndex: false,
    },
    hero: {
      key: 'terms-hero',
      heading: 'Terms & Conditions',
      subtitle: 'Clear expectations. Fair agreements. Calm delivery.',
      intro: [
        'These Terms & Conditions explain how iCollege Life offers programmes, services, and educational support.',
        'They are intended to create clarity between iCollege Life, students, families, and partners.',
        'iCollege Life is operated by iCollege Education Ltd.',
      ],
    },
    sections: TERMS_SECTIONS,
    microLine: 'Clear expectations help us support students calmly, fairly, and responsibly.',
  },
  {
    _id: 'cookies-page',
    title: 'Cookie Policy',
    slug: 'cookies',
    seo: {
      _type: 'seo',
      metaTitle: 'Cookie Policy | iCollege Life',
      metaDescription:
        'How iCollege Life uses cookies and similar technologies on our website — essential, analytics, and functional cookies, plus how to manage your preferences.',
      noIndex: false,
    },
    hero: {
      key: 'cookies-hero',
      heading: 'Cookie Policy',
      subtitle: 'Simple technology. Transparent use.',
      intro: [
        'This Cookie Policy explains how iCollege Life uses cookies and similar technologies on our website.',
      ],
    },
    sections: COOKIES_SECTIONS,
    microLine: 'We use cookies responsibly to improve your website experience.',
  },
  {
    _id: 'safeguarding-page',
    title: 'Safeguarding Statement',
    slug: 'safeguarding',
    seo: {
      _type: 'seo',
      metaTitle: 'Safeguarding Statement | iCollege Life',
      metaDescription:
        'How iCollege Life safeguards and promotes the welfare of students through professional boundaries, supervision, open communication, and duty of care.',
      noIndex: false,
    },
    hero: {
      key: 'safeguarding-hero',
      heading: 'Safeguarding Statement',
      subtitle: 'Care, responsibility, and trust.',
      intro: [
        'iCollege Life is committed to safeguarding and promoting the welfare of all students, especially children and young people.',
        'Working with young people is a position of trust. We take that responsibility seriously.',
        'Safeguarding at iCollege is built into our day-to-day practice through clear expectations, professional boundaries, appropriate supervision, open communication, and respect for each student as an individual.',
        'Students are treated as developing young adults: trusted appropriately, guided carefully, and supported as they build independence, confidence, and responsibility.',
      ],
    },
    sections: SAFEGUARDING_SECTIONS,
    microLine: 'We take student welfare, professional boundaries, and safeguarding seriously.',
  },
]

async function seed() {
  for (const page of pages) {
    const doc = {
      _id: page._id,
      _type: 'page',
      title: page.title,
      slug: {_type: 'slug', current: page.slug},
      seo: page.seo,
      pageBuilder: [
        legalHero(page.hero),
        legalContentRow(page.slug, page.sections),
        legalClosingRow(page.slug, page.microLine),
      ],
    }

    console.log(`Seeding ${page.slug}…`)
    await client.createOrReplace(doc)
  }

  console.log('Legal pages seeded.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
