'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PAIN_STATEMENTS } from '@/lib/constants'

export function PainSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      ref={containerRef}
      className="relative bg-midnight py-24 md:py-40 overflow-hidden"
    >
      <div className="max-w-2xl mx-auto px-4 text-center">
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
            />
          )
        })}

        {/* Closing statement — revealed last */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.2 }}
          className="mt-16 md:mt-24 space-y-2 pt-10 border-t border-wire/20"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-warm-white text-balance">
            This is what running a restaurant feels like today.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-display font-medium text-ember italic">
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
}: {
  text: string
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
  start: number
  peak: number
  end: number
}) {
  const opacity = useTransform(
    scrollProgress,
    [start, peak, end - 0.04, end],
    [0, 1, 1, 0.2]
  )
  const y = useTransform(scrollProgress, [start, peak], [16, 0])

  return (
    <motion.p
      style={{ opacity, y }}
      className="text-lg sm:text-xl md:text-2xl text-stone/80 font-display font-medium leading-relaxed py-8 border-b border-wire/20 last:border-0 text-balance"
    >
      &ldquo;{text}&rdquo;
    </motion.p>
  )
}
