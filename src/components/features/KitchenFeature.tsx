'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FeatureCard3D } from './FeatureCard3D'
import { FEATURE_SECTIONS } from '@/lib/features-content'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function KitchenFeature() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const feature = FEATURE_SECTIONS[1]
  const problemOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const problemX = useTransform(scrollYProgress, [0, 0.35], [0, reduceMotion ? 0 : -30])
  const solutionOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1])
  const solutionX = useTransform(scrollYProgress, [0.4, 0.65], [reduceMotion ? 0 : 30, 0])

  return (
    <FeatureCard3D id="kitchen" perspective="deep" className="bg-carbon/10">
      <div ref={sectionRef} className="relative min-h-[60dvh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
          {/* Problem Side */}
          <motion.div
            style={{ opacity: problemOpacity, x: problemX }}
            className="text-center lg:text-right"
          >
            <span className="text-5xl mb-3 block">{feature.problem.icon}</span>
            <span className="text-[10px] font-mono tracking-widest text-ember/60 uppercase mb-2 block">
              Before RestOS
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-ember mb-3 text-balance">
              {feature.problem.headline}
            </h3>
            <ul className="space-y-2 inline-block text-left">
              {feature.problem.bullets.map((bullet, j) => (
                <li key={j} className="flex items-start gap-2 text-stone text-sm">
                  <span className="text-ember/50 mt-0.5 flex-shrink-0">&#10007;</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            style={{ opacity: solutionOpacity, x: solutionX }}
          >
            <motion.div
              variants={reduceMotion ? {} : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <span className="text-5xl mb-3 block">{feature.solution.icon}</span>
              <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-2 block">
                After RestOS
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-teal mb-2 text-balance">
                {feature.solution.headline}
              </h3>
              <p className="text-stone text-sm sm:text-base leading-relaxed mb-4">
                {feature.solution.description}
              </p>
              <motion.ul variants={staggerContainer} className="space-y-1.5">
                {feature.solution.bullets.map((bullet, j) => (
                  <motion.li key={j} variants={fadeUp} className="flex items-start gap-2 text-stone text-sm">
                    <span className="text-teal mt-0.5 flex-shrink-0">&#10003;</span>
                    {bullet}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Status badge decoration */}
        <motion.div
          className="absolute top-4 right-4 lg:right-8 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono"
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [1, 0]) }}
        >
          Order #1042 · 12 min
        </motion.div>
        <motion.div
          className="absolute top-4 left-4 lg:left-8 px-3 py-1 rounded-full border border-teal/30 bg-teal/10 text-teal text-xs font-mono"
          style={{ opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1]) }}
        >
          Order #1042 · Confirmed
        </motion.div>
      </div>
    </FeatureCard3D>
  )
}
