import {client} from '@/sanity/lib/client'
import type {ImageBlockData} from '@/types/sanity'

const imageProjection = /* groq */ `{
  asset-> {
    _id,
    url,
    metadata {
      lqip,
      dimensions { width, height }
    }
  },
  alt,
  hotspot,
  crop
}`

// Images live on the CMS athletes page (pageBuilder blocks), not separate mediaAsset docs.
const ATHLETES_IMAGES_QUERY = /* groq */ `
  *[_type == "page" && slug.current == "athletes" && !(_id in path("drafts.**"))][0] {
    "hero": pageBuilder[_type == "heroSection"][0].backgroundImage ${imageProjection},
    "classroom": pageBuilder[_key == "athletes-how-row"][0].columns[_key == "athletes-how-right"][0].content[_key == "athletes-how-classroom"][0].image ${imageProjection},
    "studyRoom": pageBuilder[_key == "athletes-how-row"][0].columns[_key == "athletes-how-right"][0].content[_key == "athletes-how-study"][0].image ${imageProjection},
    "tabletLearning": pageBuilder[_key == "athletes-how-row"][0].columns[_key == "athletes-how-right"][0].content[_key == "athletes-how-tablet"][0].image ${imageProjection},
    "tennis": pageBuilder[_key == "athletes-outcomes-row"][0].columns[_key == "athletes-outcomes-right"][0].content[_key == "athletes-outcomes-tennis"][0].image ${imageProjection},
    "founderPortrait": pageBuilder[_key == "athletes-about-row"][0].columns[_key == "athletes-about-right"][0].content[_key == "athletes-about-founder"][0].image ${imageProjection}
  }
`

export type AthletesImages = {
  hero: ImageBlockData['image']
  studyRoom: ImageBlockData['image']
  tabletLearning: ImageBlockData['image']
  classroom: ImageBlockData['image']
  tennis: ImageBlockData['image']
  founderPortrait: ImageBlockData['image']
}

export async function getAthletesImages(): Promise<AthletesImages> {
  return client.fetch<AthletesImages>(
    ATHLETES_IMAGES_QUERY,
    {},
    {next: {revalidate: 3600}},
  )
}
