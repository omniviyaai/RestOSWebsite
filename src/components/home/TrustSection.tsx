'use client'

import { motion } from 'framer-motion'
import { TRUST_SIGNALS } from '@/lib/constants'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function TrustSection() {
  return (
    <section className="bg-carbon/15 py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-warm-white">
            Built For India. Built To Last.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {TRUST_SIGNALS.map((signal, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center">
              <h3 className="font-display font-semibold text-warm-white text-sm mb-1.5">
                {signal.title}
              </h3>
              <p className="text-stone text-xs leading-relaxed">{signal.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
