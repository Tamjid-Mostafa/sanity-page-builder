import {createClient} from '@sanity/client'
import {Readable} from 'node:stream'

type AssetDoc = {
  _id: string
  _type: 'sanity.imageAsset' | 'sanity.fileAsset'
  url?: string
  originalFilename?: string
  mimeType?: string
  sha1hash?: string
  size?: number
}

const required = (name: string) => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing env var: ${name}`)
  }
  return value
}

const source = {
  projectId: required('SOURCE_SANITY_PROJECT_ID'),
  dataset: required('SOURCE_SANITY_DATASET'),
  token: required('SOURCE_SANITY_TOKEN'),
}

const target = {
  projectId: required('TARGET_SANITY_PROJECT_ID'),
  dataset: required('TARGET_SANITY_DATASET'),
  token: required('TARGET_SANITY_TOKEN'),
}

const pageSize = Number(process.env.ASSET_PAGE_SIZE || 200)
const dryRun = process.env.DRY_RUN === 'true'
// Skip files larger than this (default 100 MB). Set MAX_FILE_BYTES=0 to disable.
const maxFileBytes = Number(process.env.MAX_FILE_BYTES ?? 100 * 1024 * 1024)

const sourceClient = createClient({
  ...source,
  apiVersion: '2025-03-20',
  useCdn: false,
})

const targetClient = createClient({
  ...target,
  apiVersion: '2025-03-20',
  useCdn: false,
})

async function fetchAssets(client: ReturnType<typeof createClient>) {
  const results: AssetDoc[] = []
  let start = 0

  while (true) {
    const end = start + pageSize
    const batch = await client.fetch<AssetDoc[]>(
      `*[_type in ["sanity.imageAsset", "sanity.fileAsset"]] | order(_createdAt asc) [$start...$end] {
        _id,
        _type,
        url,
        originalFilename,
        mimeType,
        sha1hash,
        size
      }`,
      {start, end},
    )

    if (!batch.length) break
    results.push(...batch)
    start = end
    console.log(`Fetched ${results.length} assets...`)
  }

  return results
}

async function uploadAsset(asset: AssetDoc) {
  if (!asset.url) return {status: 'skipped', reason: 'missing-url'} as const

  if (maxFileBytes > 0 && asset.size && asset.size > maxFileBytes) {
    return {status: 'skipped', reason: `too-large-${asset.size}`} as const
  }

  const response = await fetch(asset.url)
  if (!response.ok) {
    return {
      status: 'failed',
      reason: `download-failed-${response.status}`,
    } as const
  }

  if (!response.body) {
    return {status: 'failed', reason: 'missing-response-body'} as const
  }

  const stream = Readable.fromWeb(response.body as globalThis.ReadableStream)
  const kind = asset._type === 'sanity.imageAsset' ? 'image' : 'file'

  if (dryRun) {
    return {status: 'dry-run'} as const
  }

  await targetClient.assets.upload(kind, stream, {
    filename: asset.originalFilename || `${asset._id}.${kind}`,
    contentType: asset.mimeType,
    source: {name: 'asset-migration', id: asset._id},
  })

  return {status: 'uploaded'} as const
}

async function main() {
  console.log('Loading source assets...')
  const sourceAssets = await fetchAssets(sourceClient)

  console.log('Loading target assets...')
  const targetAssets = await fetchAssets(targetClient)
  const targetHashes = new Set(
    targetAssets.map((a) => a.sha1hash).filter(Boolean) as string[],
  )

  const toCopy = sourceAssets.filter((a) => !a.sha1hash || !targetHashes.has(a.sha1hash))

  console.log(`Source assets: ${sourceAssets.length}`)
  console.log(`Target assets: ${targetAssets.length}`)
  console.log(`To copy: ${toCopy.length}${dryRun ? ' (dry-run)' : ''}`)

  let uploaded = 0
  let skipped = 0
  let failed = 0

  for (const asset of toCopy) {
    try {
      const result = await uploadAsset(asset)
      if (result.status === 'uploaded' || result.status === 'dry-run') {
        uploaded += 1
        console.log(`Uploaded: ${asset.originalFilename || asset._id}`)
      } else if (result.status === 'skipped') {
        skipped += 1
        console.log(`Skipped ${asset.originalFilename || asset._id}: ${result.reason}`)
      } else {
        failed += 1
        console.error(`Failed ${asset._id}: ${result.reason}`)
      }
    } catch (error) {
      failed += 1
      console.error(`Failed ${asset._id}:`, error)
    }
  }

  console.log('Done.')
  console.log(`Uploaded: ${uploaded}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Failed: ${failed}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
