'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FeatureCard3D } from './FeatureCard3D'
import { PaymentProblemIllus, PaymentSolutionIllus } from './FeatureIllustrations'
import { RegionPaymentFeature } from '@/components/ui/RegionContent'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function PaymentFeature() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const problemOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const problemY = useTransform(scrollYProgress, [0, 0.55], [0, reduceMotion ? 0 : -20])
  const solutionOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1])
  const solutionY = useTransform(scrollYProgress, [0.6, 0.9], [reduceMotion ? 0 : 20, 0])

  const problemHeadline = 'Waiting for the bill, queuing to pay, running card machines between tables'
  const problemBullets = [
    'Customers waiting for the bill after finishing their meal',
    'Queues forming at the payment counter during busy hours',
    'Staff running card machines between tables',
    'Lost revenue from customers who leave instead of waiting',
  ]

  return (
    <FeatureCard3D id="payment" className="bg-midnight">
      <div ref={sectionRef} className="relative min-h-[70dvh] md:min-h-[55dvh] flex items-center">
        <motion.div
          style={{ opacity: problemOpacity, y: problemY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-3xl mx-auto px-4">
            <div className="flex-shrink-0">
              <PaymentProblemIllus />
            </div>
            <div className="text-center md:text-left max-w-md">
              <span className="text-[10px] font-mono tracking-widest text-ember/60 uppercase mb-2 block md:text-left">
                The Problem
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-ember mb-4 text-balance">
                {problemHeadline}
              </h3>
              <ul className="space-y-2">
                {problemBullets.map((bullet, j) => (
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
              <PaymentSolutionIllus />
            </div>
            <div className="max-w-md">
              <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-2 block">
                Payments
              </span>
              <RegionPaymentFeature />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </FeatureCard3D>
  )
}
