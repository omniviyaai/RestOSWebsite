'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FeatureCard3D } from './FeatureCard3D'
import { ManagementProblemIllus, ManagementSolutionIllus } from './FeatureIllustrations'
import { FEATURE_SECTIONS } from '@/lib/features-content'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function ManagementFeature() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const feature = FEATURE_SECTIONS[2]
  const problemOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const solutionOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1])
  const solutionY = useTransform(scrollYProgress, [0.6, 0.9], [reduceMotion ? 0 : 20, 0])

  return (
    <FeatureCard3D id="management" perspective="deep">
      <div ref={sectionRef} className="relative min-h-[75dvh] md:min-h-[55dvh] flex items-center">
        <motion.div
          style={{ opacity: problemOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-3xl mx-auto px-4">
            <div className="flex-shrink-0">
              <ManagementProblemIllus />
            </div>
            <div className="text-center md:text-left max-w-md">
              <span className="text-[10px] font-mono tracking-widest text-ember/60 uppercase mb-2 block md:text-left">
                The Problem
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-amber-300/80 mb-4 text-balance">
                {feature.problem.headline}
              </h3>
              <ul className="space-y-2">
                {feature.problem.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-2 text-stone text-sm">
                    <span className="text-ember/50 mt-0.5 flex-shrink-0">&#10007;</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: solutionOpacity, y: solutionY }}
          className="w-full"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-5xl mx-auto px-4">
            <div className="flex flex-col items-center lg:items-start gap-4 flex-1">
              <ManagementSolutionIllus />
              <motion.div
                variants={reduceMotion ? {} : staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                <span className="text-5xl mb-3 block">{feature.solution.icon}</span>
                <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-2 block">
                  {feature.category}
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
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.2 }}
              className="w-72 rounded-xl border border-wire bg-carbon p-4 shadow-2xl shadow-ember/5 flex-shrink-0"
              style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-wire">
                <span className="text-xs font-mono text-stone">Today</span>
                <span className="text-xs font-mono text-teal">&#9650; +12%</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone">Revenue</span>
                  <span className="text-warm-white font-mono font-bold">&#8377;42,580</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone">Orders</span>
                  <span className="text-warm-white font-mono">84</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone">Avg Order</span>
                  <span className="text-warm-white font-mono">&#8377;506</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone">Tables</span>
                  <span className="text-teal font-mono">12/18</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </FeatureCard3D>
  )
}
