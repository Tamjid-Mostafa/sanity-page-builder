'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

export default function DraftModeToast() {
  const pathname = usePathname()

  useEffect(() => {
    // Check if draft mode is enabled by checking for the cookie or URL param
    const isDraftMode = document.cookie.includes('__prerender_bypass')
    
    if (isDraftMode) {
      toast.info('Preview Mode Active', {
        description: 'You are viewing unpublished content',
        duration: Infinity,
        action: {
          label: 'Exit',
          onClick: () => {
            window.location.href = '/api/draft-mode/disable'
          },
        },
      })
    }
  }, [pathname])

  return null
}
