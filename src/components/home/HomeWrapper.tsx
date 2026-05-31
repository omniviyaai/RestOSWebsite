'use client'

import { useState } from 'react'
import { PageLoader } from '@/components/ui/PageLoader'

interface HomeWrapperProps {
  children: React.ReactNode
  navbarReady: boolean
}

// Exported so Navbar can read it without prop-drilling through server components
export let setNavbarReady: (v: boolean) => void = () => {}

export function HomeWrapper({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false)
  const [navReady, setNavReady] = useState(false)

  const handleDone = () => {
    setLoaderDone(true)
    // Small delay so the FLIP animation completes before the page fully appears
    setTimeout(() => setNavReady(true), 50)
  }

  return (
    <>
      <PageLoader onDone={handleDone} />

      {/* Page content — invisible during loader so navbar layoutId FLIP works */}
      <div
        style={{
          visibility: loaderDone ? 'visible' : 'hidden',
          // Keep opacity separate so children can have their own transitions
        }}
        data-nav-ready={navReady ? 'true' : 'false'}
      >
        {children}
      </div>
    </>
  )
}
