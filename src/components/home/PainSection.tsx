'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { PAIN_STATEMENTS } from '@/lib/constants'

// Each statement gets a unique directional entry
const rotations = [-1.5, 1.5, 0, -1, 1]

export function PainSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Background darkens as user scrolls through pain
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.4])

  return (
    <section
      ref={containerRef}
      className="relative bg-midnight py-24 md:py-40 overflow-hidden"
    >
      {/* Progressive darkening overlay */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: bgOpacity }}
      />

      {/* Vertical tension line */}
      <motion.div
        className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-transparent via-ember/20 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        style={{ height: '100%', originY: 0 }}
      />

      <div className="relative max-w-2xl mx-auto px-4 text-center" style={{ perspective: '1000px' }}>
        {PAIN_STATEMENTS.map((statement, i) => {
          const count = PAIN_STATEMENTS.length
          const start = i / (count + 1)
          const peak = start + 0.08
          const end = (i + 1) / (count + 1)

          return (
            <PainStatement
              key={i}
              text={statement}
              scrollProgress={scrollYProgress}
              start={start}
              peak={peak}
              end={end}
              index={i}
              rotation={rotations[i]}
            />
          )
        })}

        {/* Closing — light break */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.2 }}
          className="mt-16 md:mt-24 pt-10 relative"
        >
          {/* Light break gradient */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-t from-teal/10 to-transparent pointer-events-none blur-2xl" />
          <p className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-warm-white text-balance">
            This is what running a restaurant feels like today.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-display font-medium text-ember italic mt-2">
            There is a better way.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function PainStatement({
  text,
  scrollProgress,
  start,
  peak,
  end,
  index,
  rotation,
}: {
  text: string
  scrollProgress: MotionValue<number>
  start: number
  peak: number
  end: number
  index: number
  rotation: number
}) {
  const opacity = useTransform(
    scrollProgress,
    [start, peak, end - 0.04, end],
    [0, 1, 1, 0.15]
  )
  const y = useTransform(scrollProgress, [start, peak], [24, 0])
  const rotateY = useTransform(scrollProgress, [start, peak], [rotation * 2, 0])

  // Border width animates in
  const borderWidth = useTransform(scrollProgress, [start, peak], ['0%', '100%'])

  return (
    <div className="relative">
      <motion.p
        style={{ opacity, y, rotateY }}
        className="text-lg sm:text-xl md:text-2xl text-warm-white font-display font-medium leading-relaxed py-10 text-balance"
      >
        &ldquo;{text}&rdquo;
      </motion.p>
      {/* Animated border line */}
      {index < PAIN_STATEMENTS.length - 1 && (
        <motion.div
          className="h-px bg-wire/40 mx-auto"
          style={{ width: borderWidth }}
        />
      )}
    </div>
  )
}
