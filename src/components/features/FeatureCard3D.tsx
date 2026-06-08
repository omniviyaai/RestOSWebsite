'use client'

import { useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { normaliseMousePos, springs } from '@/lib/parallax'

interface FeatureCard3DProps {
  children: React.ReactNode
  className?: string
  id?: string
  perspective?: 'shallow' | 'deep'
  tiltIntensity?: number
}

export function FeatureCard3D({
  children,
  className = '',
  id,
  perspective = 'shallow',
  tiltIntensity = 2,
}: FeatureCard3DProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const rotateX = useSpring(0, springs.ecosystem)
  const rotateY = useSpring(0, springs.ecosystem)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const pos = normaliseMousePos(
      e.clientX - rect.left,
      e.clientY - rect.top,
      rect.width,
      rect.height
    )
    rotateX.set(pos.y * -tiltIntensity)
    rotateY.set(pos.x * tiltIntensity)
  }, [rotateX, rotateY, tiltIntensity, reduceMotion])

  const handleMouseLeave = useCallback(() => {
    if (reduceMotion) return
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY, reduceMotion])

  const perspectiveClass = perspective === 'deep' ? 'perspective-deep' : 'perspective-feature'

  return (
    <section
      ref={sectionRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${perspectiveClass} ${className}`}
    >
      <motion.div
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </section>
  )
}
