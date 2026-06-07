'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FeatureCard3D } from './FeatureCard3D'
import { RegionAnalyticsDescription } from '@/components/ui/RegionContent'
import { counterUp } from '@/lib/animations'

const ANALYTICS_DATA = [
  { label: 'Best Seller', value: 'Biryani', sub: '342 orders this week' },
  { label: 'Peak Hour', value: '8-9 PM', sub: '42% of daily revenue' },
  { label: 'Avg Check', value: '&#8377;520', sub: '+8% vs last month' },
  { label: 'Revenue/Month', value: '&#8377;12.6L', sub: 'Dine-in: 68% | Takeaway: 32%' },
]

export function AnalyticsFeature() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const problemOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const solutionOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1])
  const solutionY = useTransform(scrollYProgress, [0.35, 0.6], [reduceMotion ? 0 : 20, 0])

  const problemHeadline = 'Guessing which dishes are profitable, overstaffing or understaffing during peak hours'
  const problemBullets = [
    'Guessing which dishes are actually profitable',
    'Overstaffing or understaffing during peak hours',
    'Not knowing where revenue comes from',
    'Making decisions based on assumptions instead of data',
  ]

  return (
    <FeatureCard3D id="analytics" className="bg-carbon/10">
      <div ref={sectionRef} className="relative min-h-[55dvh] flex items-center">
        <motion.div
          style={{ opacity: problemOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center max-w-lg mx-auto">
            <span className="text-5xl mb-4 block">&#129300;</span>
            <span className="text-[10px] font-mono tracking-widest text-ember/60 uppercase mb-2 block">
              The Problem
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-ember mb-4 text-balance">
              {problemHeadline}
            </h3>
            <ul className="space-y-2 text-left max-w-md mx-auto">
              {problemBullets.map((bullet, j) => (
                <li key={j} className="flex items-start gap-2 text-stone text-sm">
                  <span className="text-ember/50 mt-0.5 flex-shrink-0">&#10007;</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: solutionOpacity, y: solutionY }}
          className="w-full"
        >
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-5xl mb-3 block">&#128202;</span>
            <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-2 block">
              Analytics
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-teal mb-2 text-balance">
              Know What Makes Money
            </h3>
            <p className="text-stone text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
              <RegionAnalyticsDescription />
            </p>

            {/* Data cards */}
            <motion.div
              initial={reduceMotion ? undefined : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-2 gap-3 max-w-lg mx-auto"
            >
              {ANALYTICS_DATA.map((item, i) => (
                <motion.div
                  key={i}
                  variants={counterUp}
                  custom={i}
                  className="rounded-xl border border-wire bg-carbon p-4 text-center"
                  style={{ transformStyle: 'preserve-3d', translateZ: `${(i + 1) * 6}px` }}
                >
                  <div className="text-xs font-mono text-stone mb-1">{item.label}</div>
                  <div className="text-lg font-display font-bold text-warm-white" dangerouslySetInnerHTML={{ __html: item.value }} />
                  <div className="text-[10px] font-mono text-stone/60 mt-0.5">{item.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </FeatureCard3D>
  )
}
