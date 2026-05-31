'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { normaliseMousePos, mapMouseToRotation, springs } from '@/lib/parallax'

interface PerspectiveContainerProps {
  children: React.ReactNode
  className?: string
  perspective?: number
  maxRotation?: number
  disabled?: boolean
}

export function PerspectiveContainer({
  children,
  className = '',
  perspective = 1200,
  maxRotation = 2,
  disabled = false,
}: PerspectiveContainerProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rotateX = useSpring(0, springs.hero)
  const rotateY = useSpring(0, springs.hero)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const pos = normaliseMousePos(
        e.clientX - rect.left,
        e.clientY - rect.top,
        rect.width,
        rect.height
      )
      rotateX.set(mapMouseToRotation(-pos.y, maxRotation))
      rotateY.set(mapMouseToRotation(pos.x, maxRotation))
    },
    [disabled, maxRotation, rotateX, rotateY]
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: `${perspective}px` }}
      className={className}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
