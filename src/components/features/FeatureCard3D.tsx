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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const _scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4])
  const scrollScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.92, 1, 1, 0.92])

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

  const perspectivePx = perspective === 'deep' ? '1600px' : '1200px'

  return (
    <section
      ref={sectionRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative py-20 md:py-28 px-4 overflow-hidden ${className}`}
      style={{ perspective: perspectivePx }}
    >
      <motion.div
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          scale: reduceMotion ? 1 : scrollScale,
          opacity: scrollOpacity,
          transformStyle: 'preserve-3d',
        }}
        className="max-w-5xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  )
}
