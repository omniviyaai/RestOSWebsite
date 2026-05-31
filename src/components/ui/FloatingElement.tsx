'use client'

import { useRef } from 'react'
import { motion, useSpring, useAnimationFrame } from 'framer-motion'

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  amplitude?: number   // px up/down
  period?: number      // ms per cycle
  delay?: number       // ms phase offset
}

export function FloatingElement({
  children,
  className = '',
  amplitude = 6,
  period = 4000,
  delay = 0,
}: FloatingElementProps) {
  const y = useSpring(0, { stiffness: 40, damping: 10 })
  const startTime = useRef<number | null>(null)
  const hovered = useRef(false)

  useAnimationFrame((time) => {
    if (hovered.current) return
    if (startTime.current === null) startTime.current = time
    const elapsed = time - startTime.current + delay
    const value = Math.sin((elapsed / period) * Math.PI * 2) * amplitude
    y.set(value)
  })

  return (
    <motion.div
      style={{ y }}
      className={className}
      onHoverStart={() => { hovered.current = true; y.set(0) }}
      onHoverEnd={() => { hovered.current = false }}
    >
      {children}
    </motion.div>
  )
}
