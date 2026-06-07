'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FeatureCard3D } from './FeatureCard3D'
import { FEATURE_SECTIONS } from '@/lib/features-content'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function OrderingFeature() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const feature = FEATURE_SECTIONS[0]
  const problemOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const problemY = useTransform(scrollYProgress, [0, 0.35], [0, reduceMotion ? 0 : -20])
  const solutionOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1])
  const solutionY = useTransform(scrollYProgress, [0.4, 0.65], [reduceMotion ? 0 : 24, 0])

  return (
    <FeatureCard3D id="ordering">
      <div ref={sectionRef} className="relative min-h-[60dvh] flex items-center">
        {/* Problem Phase */}
        <motion.div
          style={{ opacity: problemOpacity, y: problemY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center max-w-lg mx-auto">
            <span className="text-5xl mb-4 block">{feature.problem.icon}</span>
            <span className="text-[10px] font-mono tracking-widest text-ember/60 uppercase mb-2 block">
              The Problem
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-ember mb-4 text-balance">
              {feature.problem.headline}
            </h3>
            <ul className="space-y-2 text-left max-w-md mx-auto">
              {feature.problem.bullets.map((bullet, j) => (
                <li key={j} className="flex items-start gap-2 text-stone text-sm">
                  <span className="text-ember/50 mt-0.5 flex-shrink-0">&#10007;</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Solution Phase */}
        <motion.div
          style={{ opacity: solutionOpacity, y: solutionY }}
          className="w-full"
        >
          <motion.div
            variants={reduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center max-w-lg mx-auto"
          >
            <span className="text-5xl mb-4 block">{feature.solution.icon}</span>
            <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-2 block">
              {feature.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-teal mb-2 text-balance">
              {feature.solution.headline}
            </h3>
            <p className="text-stone text-sm sm:text-base leading-relaxed mb-6">
              {feature.solution.description}
            </p>
            <motion.ul variants={staggerContainer} className="space-y-2 text-left max-w-md mx-auto">
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
    </FeatureCard3D>
  )
}
