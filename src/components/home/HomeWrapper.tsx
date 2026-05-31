'use client'

import { useState, useCallback } from 'react'
import { PageLoader } from '@/components/ui/PageLoader'

interface HomeWrapperProps {
  children: React.ReactNode
}

export function HomeWrapper({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false)
  const [navReady, setNavReady] = useState(false)

  // Fires BEFORE overlay exit — makes navbar visible so FLIP detects both layoutIds
  const handleReady = useCallback(() => {
    setLoaderDone(true)
  }, [])

  // Fires AFTER overlay exit + FLIP completes
  const handleDone = useCallback(() => {
    setTimeout(() => setNavReady(true), 50)
  }, [])

  return (
    <>
      <PageLoader onReady={handleReady} onDone={handleDone} />

      {/* Page content — hidden during loader via opacity so layout is measurable */}
      <div
        style={{
          opacity: loaderDone ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        data-nav-ready={navReady ? 'true' : 'false'}
      >
        {children}
      </div>
    </>
  )
}
