'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FeatureCard3D } from './FeatureCard3D'
import { OrderingProblemIllus, OrderingSolutionIllus } from './FeatureIllustrations'
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
  const problemOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const problemY = useTransform(scrollYProgress, [0, 0.55], [0, reduceMotion ? 0 : -24])
  const solutionOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1])
  const solutionY = useTransform(scrollYProgress, [0.6, 0.9], [reduceMotion ? 0 : 28, 0])

  return (
    <FeatureCard3D id="ordering">
      <div ref={sectionRef} className="relative min-h-[75dvh] md:min-h-[60dvh] flex items-center">
        <motion.div
          style={{ opacity: problemOpacity, y: problemY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-3xl mx-auto px-4">
            <div className="flex-shrink-0">
              <OrderingProblemIllus />
            </div>
            <div className="text-center md:text-left max-w-md">
              <span className="text-[10px] font-mono tracking-widest text-ember/60 uppercase mb-2 block md:text-left">
                The Problem
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-ember mb-4 text-balance">
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
          <motion.div
            variants={reduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-3xl mx-auto px-4"
          >
            <div className="flex-shrink-0">
              <OrderingSolutionIllus />
            </div>
            <div className="text-center md:text-left max-w-md">
              <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-2 block md:text-left">
                {feature.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-teal mb-2 text-balance">
                {feature.solution.headline}
              </h3>
              <p className="text-stone text-sm sm:text-base leading-relaxed mb-4">
                {feature.solution.description}
              </p>
              <motion.ul variants={staggerContainer} className="space-y-2">
                {feature.solution.bullets.map((bullet, j) => (
                  <motion.li key={j} variants={fadeUp} className="flex items-start gap-2 text-stone text-sm">
                    <span className="text-teal mt-0.5 flex-shrink-0">&#10003;</span>
                    {bullet}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </FeatureCard3D>
  )
}
