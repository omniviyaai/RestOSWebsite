'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRegion } from '@/lib/region-context'
import { TicketIcon, CardIcon, TrendDownIcon, MessageIcon, ExitPersonIcon } from '@/components/ui/Icons'

const rotations = [-1.5, 1.5, 0, -1, 1]

/* Per-statement accent: color of the ambient glow and SVG icon */
const ACCENTS = [
  { glow: 'rgba(232,116,42,0.14)', Icon: TicketIcon,      iconLabel: 'Paper KOT' },
  { glow: 'rgba(198,163,91,0.14)', Icon: CardIcon,        iconLabel: 'Payment' },
  { glow: 'rgba(232,116,42,0.12)', Icon: TrendDownIcon,   iconLabel: 'Under-billed' },
  { glow: 'rgba(14,140,132,0.12)', Icon: MessageIcon,     iconLabel: 'Group chat' },
  { glow: 'rgba(156,163,175,0.12)', Icon: ExitPersonIcon, iconLabel: 'Walked out' },
]

export function PainSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const region = useRegion()
  const painStatements = region.painStatements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0.3])

  return (
    <section
      ref={containerRef}
      className="relative bg-midnight py-24 md:py-40 overflow-hidden"
    >
      {/* Progressive darkening */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: bgOpacity }}
      />

      {/* Vertical tension line — hand-drawn feel */}
      <motion.div
        className="absolute left-1/2 top-0 w-px pointer-events-none"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        style={{
          height: '100%',
          originY: 0,
          background: 'linear-gradient(to bottom, transparent, rgba(232,116,42,0.15) 30%, rgba(232,116,42,0.08) 70%, transparent)',
        }}
      />

      {/* Noise overlay for tactile feel */}
      <div className="absolute inset-0 noise pointer-events-none opacity-30" />

      <div className="relative max-w-2xl mx-auto px-4 text-center" style={{ perspective: '1000px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white text-balance">
            Why restaurants switch to Omniviya
          </h2>
          <p className="text-stone/60 text-sm font-mono mt-3 tracking-wider">
            EVERY NIGHT. EVERY SERVICE.
          </p>
        </motion.div>

        {/* Pain statements */}
        {painStatements.map((statement, i) => {
          const count = painStatements.length
          const start = (i + 1) / (count + 2)
          const peak  = start + 0.08
          const end   = (i + 2) / (count + 2)

          return (
            <PainStatement
              key={i}
              text={statement}
              scrollProgress={scrollYProgress}
              start={start}
              peak={peak}
              end={end}
              index={i}
              count={count}
              rotation={rotations[i]}
              accent={ACCENTS[i] ?? ACCENTS[0]}
              />
          )
        })}

        {/* Closing break */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.2 }}
          className="mt-16 md:mt-24 pt-10 relative"
        >
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-40 bg-gradient-to-t from-teal/12 to-transparent pointer-events-none blur-3xl" />
          <p className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-warm-white text-balance">
            This is what running a restaurant feels like today.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-display font-medium text-ember italic mt-3">
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
  count,
  rotation,
  accent,
}: {
  text: string
  scrollProgress: MotionValue<number>
  start: number
  peak: number
  end: number
  index: number
  count: number
  rotation: number
  accent: { glow: string; Icon: React.ComponentType<{ className?: string; size?: number }>; iconLabel: string }
}) {
  const opacity   = useTransform(scrollProgress, [start, peak, end - 0.04, end], [0, 1, 1, 0.12])
  const y         = useTransform(scrollProgress, [start, peak], [28, 0])
  const rotateY   = useTransform(scrollProgress, [start, peak], [rotation * 2.5, 0])
  const scale     = useTransform(scrollProgress, [start, peak, end], [0.96, 1.02, 0.99])
  const glowOp    = useTransform(scrollProgress, [start, peak, end - 0.02, end], [0, 1, 0.8, 0])
  const borderW   = useTransform(scrollProgress, [start, peak], ['0%', '100%'])

  return (
    <div className="relative">
      {/* Ambient glow blob — shifts per statement */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none -mx-8"
        style={{
          opacity: glowOp,
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${accent.glow}, transparent)`,
        }}
      />

      <motion.div style={{ opacity, y, rotateY, scale }}>
        {/* Contextual micro-icon */}
        <motion.div
          className="flex items-center justify-center mb-3"
          style={{ opacity: glowOp }}
          aria-label={accent.iconLabel}
        >
          <accent.Icon size={28} className="text-warm-white/50" />
        </motion.div>

        <p className="text-lg sm:text-xl md:text-2xl text-warm-white font-display font-medium leading-relaxed py-8 text-balance">
          &ldquo;{text}&rdquo;
        </p>
      </motion.div>

      {/* Animated separator */}
      {index < count - 1 && (
        <motion.div
          className="h-px bg-wire/30 mx-auto"
          style={{ width: borderW }}
        />
      )}
    </div>
  )
}
