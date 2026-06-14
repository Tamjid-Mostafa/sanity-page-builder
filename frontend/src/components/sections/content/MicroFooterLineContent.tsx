import Link from 'next/link'
import {stegaClean} from 'next-sanity'

type MicroFooterLineData = {
  variant?: 'global' | 'academy' | null
}

export function MicroFooterLineContent({data}: {data: MicroFooterLineData}) {
  const variant = stegaClean(data.variant) || 'global'
  const brand =
    variant === 'academy' ? 'iCollege Academy' : 'iCollege Global'

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="max-w-md text-sm font-light leading-relaxed text-foreground">
        {brand} is part of{' '}
        <Link
          href="/"
          className="font-semibold text-foreground transition-colors duration-200 hover:text-primary"
        >
          iCollege Life
        </Link>{' '}
        — helping young people design smarter lives, academically and beyond.
      </p>
      <div className="h-px w-12 rounded-full bg-border" aria-hidden />
    </div>
  )
}
