'use client'

import {useState} from 'react'
import type {PortableTextBlock} from '@portabletext/types'
import {PortableTextRenderer} from '../../shared/PortableTextRenderer'

interface Tab {
  _key: string
  label?: string
  content?: PortableTextBlock[]
}

export function TabbedContent({data}: {data: Record<string, unknown>}) {
  const tabs = (data.tabs as Tab[] | undefined) || []
  const [activeIndex, setActiveIndex] = useState(0)

  if (tabs.length === 0) return null

  const activeTab = tabs[activeIndex]

  return (
    <div>
      <div className="flex border-b border-border" role="tablist">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={tab._key}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab._key}`}
              className={`
                px-4 py-2.5 text-sm font-medium transition-colors duration-200
                ${isActive
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted hover:text-foreground'}
              `}
              onClick={() => setActiveIndex(index)}
            >
              {tab.label || `Tab ${index + 1}`}
            </button>
          )
        })}
      </div>
      <div
        id={`tabpanel-${activeTab?._key}`}
        role="tabpanel"
        className="pt-6"
      >
        {activeTab?.content && activeTab.content.length > 0 ? (
          <div className="prose prose-slate max-w-none">
            <PortableTextRenderer value={activeTab.content} />
          </div>
        ) : (
          <p className="text-sm text-muted">No content for this tab.</p>
        )}
      </div>
    </div>
  )
}
