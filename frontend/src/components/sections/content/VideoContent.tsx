import {stegaClean} from 'next-sanity'

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match?.[1]) return match[1]
  }

  return null
}

interface YouTubeVideoData {
  _type: 'youtubeVideo'
  url?: string
  caption?: string
}

interface ExternalVideoData {
  _type: 'externalVideo'
  url?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  caption?: string
}

type VideoData = YouTubeVideoData | ExternalVideoData

export function VideoContent({data}: {data: Record<string, unknown>}) {
  const videoData = data as unknown as VideoData

  if (stegaClean(videoData._type) === 'youtubeVideo') {
    return <YouTubePlayer data={videoData as YouTubeVideoData} />
  }

  return <ExternalPlayer data={videoData as ExternalVideoData} />
}

function YouTubePlayer({data}: {data: YouTubeVideoData}) {
  const url = data.url
  if (!url) return null

  const videoId = extractYouTubeId(url)
  if (!videoId) return null

  return (
    <figure>
      <div className="relative w-full overflow-hidden rounded-lg" style={{paddingBottom: '56.25%'}}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {data.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {data.caption}
        </figcaption>
      )}
    </figure>
  )
}

function ExternalPlayer({data}: {data: ExternalVideoData}) {
  const url = data.url
  if (!url) return null

  return (
    <figure>
      <video
        className="w-full rounded-lg"
        controls
        autoPlay={data.autoplay ?? false}
        loop={data.loop ?? false}
        muted={data.muted ?? false}
        playsInline
      >
        <source src={url} />
        Your browser does not support the video tag.
      </video>
      {data.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {data.caption}
        </figcaption>
      )}
    </figure>
  )
}
