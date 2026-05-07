import {createClient} from '@sanity/client'

async function main() {
  const client = createClient({
    projectId: 'lpe9qgbt',
    dataset: 'production',
    token:
      'skqYBpxVdSPjNInBKcOcWptNJT1ve48t09BYiYetgzTVpIGEA8KYATWM7XtyU2A67iSwqwSJbAZRCNBw5JRGwjiLz7A3O3hwOjjORDX4HXoWXVzN2xRNcNrSYdY7esq4Y7xO8u2b17b5VGeFaZUL5VX6FmTRHsBW1p3Cn4c7U0MVlM0Rc5zv',
    apiVersion: '2025-03-20',
    useCdn: false,
  })

  const page = await client.fetch(`*[_id == "homePage"][0]{_id, pageBuilder}`)
  if (!page?._id || !Array.isArray(page.pageBuilder)) {
    throw new Error('homePage document not found or pageBuilder missing')
  }

  const hero = page.pageBuilder.find((b: {_type?: string; _key?: string}) => b?._type === 'heroSection')
  if (!hero?._key) {
    throw new Error('No heroSection block found in homePage.pageBuilder')
  }

  const key = hero._key

  const patch = {
    [`pageBuilder[_key=="${key}"].slides[0].tag`]: 'INTERNATIONAL ACADEMY · BARCELONA',
    [`pageBuilder[_key=="${key}"].slides[0].headline`]: 'Education for a Life Worth Living',
    [`pageBuilder[_key=="${key}"].slides[0].subtitle`]: 'iCollege Life prepares young people for both university and life - combining pre-university academic pathways with global development programmes for young adults navigating what comes next.',

    [`pageBuilder[_key=="${key}"].primaryButton.label`]: 'Book a Conversation',
    [`pageBuilder[_key=="${key}"].secondaryButton.label`]: 'Check Your Fit',

    [`pageBuilder[_key=="${key}"].pills`]: [
      'A Levels',
      'High School Diploma',
      'Global Development',
      'Personal Growth',
    ],

    [`pageBuilder[_key=="${key}"].prospectusLink`]: '/prospectus',
  }

  const result = await client.patch(page._id).set(patch).commit({autoGenerateArrayKeys: true})

  console.log('Updated hero text only for block:', key)
  console.log('Revision:', result._rev)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
