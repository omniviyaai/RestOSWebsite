'use client'

import { motion } from 'framer-motion'
import { TRUST_SIGNALS } from '@/lib/constants'

function getTrustDelay(index: number): number {
  return (Math.floor(index / 2) + (index % 2)) * 0.1
}

export function TrustSection() {
  return (
    <section className="bg-carbon/15 py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Geometric grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#9CA3AF 1px, transparent 1px), linear-gradient(90deg, #9CA3AF 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-4xl mx-auto relative">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_SIGNALS.map((signal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 25, delay: getTrustDelay(i) }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
              className="text-center group"
              style={{ perspective: '400px' }}
            >
              <h3 className="font-display font-semibold text-warm-white text-sm mb-1.5 group-hover:text-ember transition-colors duration-200">
                {signal.title}
              </h3>
              <p className="text-stone text-xs leading-relaxed">{signal.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
