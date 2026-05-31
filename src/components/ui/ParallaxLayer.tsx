'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface ParallaxLayerProps {
  children: React.ReactNode
  speed?: number        // 0 = static, 1 = normal scroll, 0.5 = half speed
  direction?: 'up' | 'down'
  className?: string
}

export function ParallaxLayer({
  children,
  speed = 0.3,
  direction = 'up',
  className = '',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const factor = direction === 'up' ? -1 : 1
  const rawY = useTransform(scrollYProgress, [0, 1], [0, factor * 120 * speed])
  const y = useSpring(rawY, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full">
        {children}
      </motion.div>
    </div>
  )
}
