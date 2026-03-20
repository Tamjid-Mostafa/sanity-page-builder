import {stegaClean} from 'next-sanity'

interface MapEmbedData {
  embedUrl?: string
  height?: string
  caption?: string
}

export function MapEmbedContent({data}: {data: Record<string, unknown>}) {
  const {embedUrl, height, caption} = data as unknown as MapEmbedData

  if (!embedUrl) return null

  const resolvedHeight = stegaClean(height) || '400px'

  return (
    <figure className="my-4">
      <div className="overflow-hidden rounded-xl border border-border">
        <iframe
          src={embedUrl}
          style={{height: resolvedHeight}}
          className="w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title="Map embed"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
