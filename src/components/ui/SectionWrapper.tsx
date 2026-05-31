'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  delay?: number
}

export function SectionWrapper({
  children,
  className = '',
  id,
  delay = 0,
}: SectionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={`px-4 md:px-8 lg:px-16 py-16 md:py-24 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  )
}
