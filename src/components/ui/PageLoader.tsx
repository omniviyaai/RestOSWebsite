'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionLogo } from '@/components/ui/MotionLogo'

interface PageLoaderProps {
  onDone: () => void
  onReady: () => void
}

export function PageLoader({ onDone, onReady }: PageLoaderProps) {
  const [visible, setVisible] = useState(true)
  const [flyTarget, setFlyTarget] = useState<{ x: number; y: number; scale: number } | null>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  // Responsive logo width: use 480 as SSR default, then measure viewport after hydration.
  // useState init runs during SSR where window is undefined, so it always gives 480 there.
  // React takes that server value as the client state — the window.innerWidth path is dead.
  // We use useEffect to measure post-hydration and update before animation starts.
  const [logoWidth, setLogoWidth] = useState(480)

  useEffect(() => {
    setLogoWidth(Math.min(480, Math.max(260, window.innerWidth * 0.85)))
  }, [])

  // Skip loader for users who prefer reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      onReady()
      onDone()
    }
  }, [onDone, onReady])

  const handleAnimationComplete = useCallback(() => {
    // 1. Reveal navbar
    onReady()

    // 2. Measure the navbar logo position
    requestAnimationFrame(() => {
      const navbarLogo = document.querySelector('[data-nav-logo]')
      const overlayLogo = logoRef.current

      if (navbarLogo && overlayLogo) {
        const navRect = navbarLogo.getBoundingClientRect()
        const overlayRect = overlayLogo.getBoundingClientRect()

        // Calculate the offset and scale to reach the navbar position
        const scale = navRect.width / overlayRect.width
        const x = navRect.left - overlayRect.left + navRect.width / 2 - overlayRect.width / 2
        const y = navRect.top - overlayRect.top + navRect.height / 2 - overlayRect.height / 2

        setFlyTarget({ x, y, scale })
      }
    })
  }, [onReady])

  const handleFlyComplete = useCallback(() => {
    // Wait a beat for the spring to settle, then fade out the overlay
    setTimeout(() => setVisible(false), 100)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loader-overlay"
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#0B1020' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo container — flies to navbar position after animation completes */}
          <motion.div
            ref={logoRef}
            animate={
              flyTarget
                ? {
                    x: flyTarget.x,
                    y: flyTarget.y,
                    scale: flyTarget.scale,
                  }
                : { x: 0, y: 0, scale: 1 }
            }
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 22,
              mass: 1.5,
            }}
            onAnimationComplete={flyTarget ? handleFlyComplete : undefined}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <MotionLogo
              width={logoWidth}
              onComplete={handleAnimationComplete}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
