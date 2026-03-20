'use client'

import {useState, useEffect} from 'react'

interface TimeRemaining {
  readonly days: number
  readonly hours: number
  readonly minutes: number
  readonly seconds: number
  readonly isExpired: boolean
}

function computeTimeRemaining(targetDate: string): TimeRemaining {
  const difference = new Date(targetDate).getTime() - Date.now()

  if (difference <= 0) {
    return {days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true}
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  }
}

function TimeUnit({value, label}: {value: number; label: string}) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-2xl font-bold tabular-nums text-primary sm:h-20 sm:w-20 sm:text-3xl">
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-2 text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
    </div>
  )
}

export function CountdownTimerContent({data}: {data: Record<string, unknown>}) {
  const title = data.title as string | undefined
  const targetDate = data.targetDate as string | undefined
  const expiredMessage = (data.expiredMessage as string) || 'This event has ended.'
  const showDays = (data.showDays as boolean) ?? true
  const showHours = (data.showHours as boolean) ?? true
  const showMinutes = (data.showMinutes as boolean) ?? true
  const showSeconds = (data.showSeconds as boolean) ?? true

  const [time, setTime] = useState<TimeRemaining>(() =>
    targetDate ? computeTimeRemaining(targetDate) : {days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true},
  )

  useEffect(() => {
    if (!targetDate) return

    setTime(computeTimeRemaining(targetDate))

    const interval = setInterval(() => {
      const next = computeTimeRemaining(targetDate)
      setTime(next)
      if (next.isExpired) clearInterval(interval)
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  if (!targetDate) return null

  return (
    <div className="text-center">
      {title && (
        <h3 className="mb-6 text-xl font-semibold text-foreground">
          {title}
        </h3>
      )}
      {time.isExpired ? (
        <p className="text-lg text-muted">{expiredMessage}</p>
      ) : (
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {showDays && <TimeUnit value={time.days} label="Days" />}
          {showDays && (showHours || showMinutes || showSeconds) && (
            <span className="text-2xl font-bold text-muted">:</span>
          )}
          {showHours && <TimeUnit value={time.hours} label="Hours" />}
          {showHours && (showMinutes || showSeconds) && (
            <span className="text-2xl font-bold text-muted">:</span>
          )}
          {showMinutes && <TimeUnit value={time.minutes} label="Minutes" />}
          {showMinutes && showSeconds && (
            <span className="text-2xl font-bold text-muted">:</span>
          )}
          {showSeconds && <TimeUnit value={time.seconds} label="Seconds" />}
        </div>
      )}
    </div>
  )
}
