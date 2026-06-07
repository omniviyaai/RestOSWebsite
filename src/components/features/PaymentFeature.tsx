'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FeatureCard3D } from './FeatureCard3D'
import { RegionPaymentFeature } from '@/components/ui/RegionContent'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function PaymentFeature() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const problemOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const problemY = useTransform(scrollYProgress, [0, 0.3], [0, reduceMotion ? 0 : -20])
  const solutionOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1])
  const solutionY = useTransform(scrollYProgress, [0.35, 0.6], [reduceMotion ? 0 : 20, 0])

  const problemHeadline = 'Waiting for the bill, queuing to pay, running card machines between tables'
  const problemBullets = [
    'Customers waiting for the bill after finishing their meal',
    'Queues forming at the payment counter during busy hours',
    'Staff running card machines between tables',
    'Lost revenue from customers who leave instead of waiting',
  ]

  return (
    <FeatureCard3D id="payment" className="bg-midnight">
      <div ref={sectionRef} className="relative min-h-[55dvh] flex items-center">
        <motion.div
          style={{ opacity: problemOpacity, y: problemY }}
          className="absolute inset-0 flex items-center"
        >
          <div className="max-w-md mx-auto">
            <span className="text-[10px] font-mono tracking-widest text-ember/60 uppercase mb-2 block text-center">
              The Problem
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-ember text-center mb-4 text-balance">
              {problemHeadline}
            </h3>
            <ul className="space-y-2 max-w-sm mx-auto">
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
          <motion.div
            variants={reduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-lg mx-auto"
          >
            <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-2 block">
              Payments
            </span>
            <RegionPaymentFeature />
          </motion.div>
        </motion.div>
      </div>
    </FeatureCard3D>
  )
}
