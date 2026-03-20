import {stegaClean} from 'next-sanity'

interface AlertNoticeData {
  type?: 'info' | 'success' | 'warning' | 'error' | 'tip'
  title?: string
  message?: string
  dismissible?: boolean
}

const ALERT_CONFIG: Record<
  string,
  {border: string; bg: string; icon: string; titleColor: string; messageColor: string}
> = {
  info: {
    border: 'border-l-blue-500',
    bg: 'bg-blue-50',
    icon: '\u2139\uFE0F',
    titleColor: 'text-blue-800',
    messageColor: 'text-blue-700',
  },
  success: {
    border: 'border-l-green-500',
    bg: 'bg-green-50',
    icon: '\u2705',
    titleColor: 'text-green-800',
    messageColor: 'text-green-700',
  },
  warning: {
    border: 'border-l-amber-500',
    bg: 'bg-amber-50',
    icon: '\u26A0\uFE0F',
    titleColor: 'text-amber-800',
    messageColor: 'text-amber-700',
  },
  error: {
    border: 'border-l-red-500',
    bg: 'bg-red-50',
    icon: '\u274C',
    titleColor: 'text-red-800',
    messageColor: 'text-red-700',
  },
  tip: {
    border: 'border-l-purple-500',
    bg: 'bg-purple-50',
    icon: '\uD83D\uDCA1',
    titleColor: 'text-purple-800',
    messageColor: 'text-purple-700',
  },
}

export function AlertNoticeContent({data}: {data: Record<string, unknown>}) {
  const {type, title, message} = data as unknown as AlertNoticeData

  if (!title && !message) return null

  const cleanType = stegaClean(type)
  const alertType = cleanType && cleanType in ALERT_CONFIG ? cleanType : 'info'
  const config = ALERT_CONFIG[alertType]

  return (
    <div
      className={`my-4 rounded-r-lg border-l-4 p-4 ${config.border} ${config.bg}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span className="shrink-0 text-lg leading-none" aria-hidden="true">
          {config.icon}
        </span>

        <div className="min-w-0 flex-1">
          {title && (
            <p className={`text-sm font-bold ${config.titleColor}`}>
              {title}
            </p>
          )}
          {message && (
            <p className={`mt-1 text-sm ${config.messageColor}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
