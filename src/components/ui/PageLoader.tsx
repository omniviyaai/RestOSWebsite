'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/ui/Logo'

type Phase = 'video' | 'logo' | 'exit'

interface PageLoaderProps {
  onDone: () => void
}

export function PageLoader({ onDone }: PageLoaderProps) {
  const [phase, setPhase] = useState<Phase>('video')

  // Respect prefers-reduced-motion — skip the loader entirely
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      onDone()
    }
  }, [onDone])

  const handleVideoEnd = useCallback(() => {
    // Show the React logo centred — seamless cross-fade from video's final frame
    setPhase('logo')
    // Brief moment so user can see the logo, then exit
    const t = setTimeout(() => setPhase('exit'), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {phase !== 'exit' && (
        <motion.div
          key="loader-overlay"
          className="fixed inset-0 z-[300] flex items-center justify-center bg-midnight"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* ── Video (plays Remotion-rendered animation) ─────────────────── */}
          <AnimatePresence>
            {phase === 'video' && (
              <motion.video
                key="loader-video"
                src="/logo-animation.mp4"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full max-w-[480px] select-none pointer-events-none"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          {/* ── Static logo (layoutId source for the FLIP to navbar) ───────── */}
          {phase === 'logo' && (
            <motion.div
              layoutId="restos-logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              <Logo variant="full" />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
