'use client'

import { createContext, useContext } from 'react'
import { motion, useScroll, MotionValue } from 'framer-motion'

const ScrollProgressContext = createContext<MotionValue<number> | null>(null)

export function ScrollProgressProvider({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll()
  return (
    <ScrollProgressContext.Provider value={scrollYProgress}>
      {children}
    </ScrollProgressContext.Provider>
  )
}

export function useScrollProgress(): MotionValue<number> {
  const ctx = useContext(ScrollProgressContext)
  if (!ctx) throw new Error('useScrollProgress must be inside ScrollProgressProvider')
  return ctx
}

// Thin progress bar at top of page
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-ember z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
