'use client'

import {useEffect, useRef} from 'react'

interface LottieAnimationData {
  url?: string
  autoplay?: boolean
  loop?: boolean
  speed?: number
  caption?: string
}

export function LottieAnimationContent({data}: {data: Record<string, unknown>}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const {url, autoplay, loop, speed, caption} = data as unknown as LottieAnimationData

  useEffect(() => {
    if (!url || !containerRef.current) return

    // Attempt to load lottie-web dynamically for real animation support.
    // If lottie-web is not installed, the placeholder UI remains visible.
    let animation: {destroy: () => void; setSpeed?: (s: number) => void} | null = null

    // eslint-disable-next-line @typescript-eslint/no-require-imports -- dynamic import for optional dependency
    import(/* webpackIgnore: true */ 'lottie-web')
      .then((lottie: {default: {loadAnimation: (config: Record<string, unknown>) => {destroy: () => void; setSpeed?: (s: number) => void}}}) => {
        if (!containerRef.current) return

        // Clear placeholder content when lottie loads successfully
        containerRef.current.innerHTML = ''

        animation = lottie.default.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: loop !== false,
          autoplay: autoplay !== false,
          path: url,
        })

        if (typeof speed === 'number' && speed > 0 && animation.setSpeed) {
          animation.setSpeed(speed)
        }
      })
      .catch(() => {
        // lottie-web is not installed; placeholder remains
      })

    return () => {
      animation?.destroy()
    }
  }, [url, autoplay, loop, speed])

  if (!url) return null

  return (
    <div className="my-4">
      <div
        ref={containerRef}
        className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-border bg-card"
      >
        {/* Placeholder shown until lottie-web loads (or permanently if not installed) */}
        <div className="text-center text-sm text-muted">
          <p className="mb-2">Lottie Animation</p>
          <p className="text-xs opacity-60">Install lottie-web to enable</p>
        </div>
      </div>
      {caption && (
        <p className="mt-2 text-center text-sm text-muted">{caption}</p>
      )}
    </div>
  )
}
