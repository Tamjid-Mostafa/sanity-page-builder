import {stegaClean} from 'next-sanity'

const SIZE_CLASSES: Record<string, {value: string; label: string}> = {
  small: {
    value: 'text-3xl md:text-4xl',
    label: 'text-sm',
  },
  medium: {
    value: 'text-4xl md:text-5xl',
    label: 'text-base',
  },
  large: {
    value: 'text-5xl md:text-7xl',
    label: 'text-lg',
  },
}

export function StatMetricContent({data}: {data: Record<string, unknown>}) {
  const prefix = data.prefix as string | undefined
  const value = data.value as string | undefined
  const suffix = data.suffix as string | undefined
  const label = data.label as string | undefined
  const size = (data.size as string) || 'medium'

  if (!value) return null

  const sizeClasses = SIZE_CLASSES[stegaClean(size)] || SIZE_CLASSES.medium

  return (
    <div className="text-center">
      <div className={`font-bold tracking-tight text-foreground ${sizeClasses.value}`}>
        {prefix && <span className="text-muted">{prefix}</span>}
        {value}
        {suffix && <span className="text-muted">{suffix}</span>}
      </div>
      {label && (
        <p className={`mt-2 font-medium text-muted ${sizeClasses.label}`}>
          {label}
        </p>
      )}
    </div>
  )
}
