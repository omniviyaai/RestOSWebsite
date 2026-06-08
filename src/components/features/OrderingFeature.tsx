'use client'

import { motion } from 'framer-motion'
import { FeatureCard3D } from './FeatureCard3D'
import { OrderingProblemIllus, OrderingSolutionIllus } from './FeatureIllustrations'
import { FEATURE_SECTIONS } from '@/lib/features-content'
import { SequentialBulletHighlight } from './SequentialBulletHighlight'

export function OrderingFeature() {
  const feature = FEATURE_SECTIONS[0]

  return (
    <FeatureCard3D id="ordering" className="bg-midnight">
      <div className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-teal/80">ORDERING</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white mt-2 text-balance leading-tight">
              Customer Ordering Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
            {/* OLD WAY — static */}
            <div className="rounded-xl border border-ember/20 bg-ember/[0.04] p-5 md:p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-5 h-5 rounded-full bg-ember/80 text-midnight text-[11px] font-bold flex items-center justify-center flex-shrink-0">&#10007;</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ember/70">Old Way</span>
              </div>
              <div className="mb-4 opacity-50 flex justify-center md:justify-start">
                <OrderingProblemIllus />
              </div>
              <h3 className="text-base sm:text-lg font-display font-semibold text-ember/90 mb-3 text-balance">
                {feature.problem.headline}
              </h3>
              <ul className="space-y-2">
                {feature.problem.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-2 text-stone/70 text-xs sm:text-sm">
                    <span className="text-ember/30 mt-0.5 flex-shrink-0">&#10007;</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* NEW WAY with RestOS — animated */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 }}
              className="rounded-xl border border-teal/20 bg-teal/[0.03] p-5 md:p-6 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-5 h-5 rounded-full bg-teal text-midnight text-[11px] font-bold flex items-center justify-center flex-shrink-0">&#10003;</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-teal/70">New Way with RestOS</span>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
                className="mb-4 flex justify-center md:justify-start"
              >
                <OrderingSolutionIllus />
              </motion.div>
              <h3 className="text-base sm:text-lg font-display font-semibold text-teal mb-2 text-balance">
                {feature.solution.headline}
              </h3>
              <p className="text-stone/80 text-xs sm:text-sm leading-relaxed mb-3">
                {feature.solution.description}
              </p>
              <SequentialBulletHighlight
                bullets={feature.solution.bullets}
                intervalMs={1000}
                className="space-y-2"
                activeClassName="text-warm-white"
                inactiveClassName="text-stone/70"
                bulletIconActive="&#10003;"
                bulletIconInactive="&#10003;"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </FeatureCard3D>
  )
}
