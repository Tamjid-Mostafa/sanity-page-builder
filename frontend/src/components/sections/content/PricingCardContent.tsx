interface Feature {
  text?: string
  included?: boolean
}

interface PricingCardData {
  badge?: string
  title?: string
  price?: string
  priceSubtext?: string
  features?: Feature[]
  isHighlighted?: boolean
  ctaLabel?: string
  ctaLink?: Array<{href?: string}>
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-muted opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export function PricingCardContent({data}: {data: Record<string, unknown>}) {
  const {
    badge,
    title,
    price,
    priceSubtext,
    features,
    isHighlighted,
    ctaLabel,
    ctaLink,
  } = data as unknown as PricingCardData

  if (!title && !price) return null

  const href = ctaLink?.[0]?.href
  const highlightBorder = isHighlighted
    ? 'border-primary shadow-lg shadow-primary/10'
    : 'border-border'

  return (
    <div
      className={`relative my-4 flex flex-col rounded-2xl border-2 bg-card p-6 ${highlightBorder}`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          {badge}
        </span>
      )}

      {title && (
        <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
      )}

      {price && (
        <div className="mt-4">
          <span className="text-4xl font-bold tracking-tight text-card-foreground">
            {price}
          </span>
          {priceSubtext && (
            <span className="ml-1 text-sm text-muted">{priceSubtext}</span>
          )}
        </div>
      )}

      {features && features.length > 0 && (
        <ul className="mt-6 flex flex-col gap-3" role="list">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              {feature.included ? <CheckIcon /> : <XIcon />}
              <span
                className={`text-sm ${
                  feature.included ? 'text-card-foreground' : 'text-muted line-through'
                }`}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      )}

      {ctaLabel && (
        <div className="mt-8 pt-2">
          {href ? (
            <a
              href={href}
              className={`block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors ${
                isHighlighted
                  ? 'bg-primary text-primary-foreground hover:opacity-90'
                  : 'bg-foreground/5 text-card-foreground hover:bg-foreground/10'
              }`}
            >
              {ctaLabel}
            </a>
          ) : (
            <span
              className={`block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold ${
                isHighlighted
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-foreground/5 text-card-foreground'
              }`}
            >
              {ctaLabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
