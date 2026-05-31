'use client'

import { motion } from 'framer-motion'
import { staggerContainer, scaleIn } from '@/lib/animations'

const nodes = [
  { id: 'customer', label: 'Customer Phone', desc: 'Scans QR, browses menu', accent: 'border-stone/40 bg-stone/5', labelColor: 'text-stone' },
  { id: 'menu', label: 'QR Menu', desc: 'Orders instantly, no app download', accent: 'border-ember/40 bg-ember/5', labelColor: 'text-ember' },
  { id: 'order', label: 'Live Order', desc: 'Confirmed in real time', accent: 'border-warm-white/30 bg-warm-white/5', labelColor: 'text-warm-white' },
  { id: 'kitchen', label: 'Kitchen Display', desc: 'Kitchen sees it immediately', accent: 'border-teal/40 bg-teal/5', labelColor: 'text-teal' },
  { id: 'waiter', label: 'Waiter App', desc: 'Floor team stays informed', accent: 'border-teal/40 bg-teal/5', labelColor: 'text-teal' },
  { id: 'payment', label: 'Payment', desc: 'UPI, card, or cash — all tracked', accent: 'border-gold/40 bg-gold/5', labelColor: 'text-gold' },
  { id: 'analytics', label: 'Analytics', desc: 'Revenue and trends, live', accent: 'border-ember/30 bg-ember/5', labelColor: 'text-ember' },
  { id: 'admin', label: 'You — Admin', desc: 'Full control, from anywhere', accent: 'border-warm-white/30 bg-warm-white/5', labelColor: 'text-warm-white' },
]

export function Ecosystem() {
  return (
    <section className="bg-carbon/20 py-20 md:py-28 px-4">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white text-balance leading-tight">
            Every Part of Your Restaurant.
            <br />
            <span className="text-teal">Finally Connected.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col items-center"
        >
          {nodes.map((node, i) => (
            <div key={node.id} className="flex flex-col items-center w-full">
              <motion.div
                variants={scaleIn}
                className={`w-full rounded-xl border ${node.accent} bg-carbon px-5 py-4 text-center`}
              >
                <p className={`font-display font-semibold text-sm sm:text-base ${node.labelColor}`}>
                  {node.label}
                </p>
                <p className="text-stone/70 text-xs mt-0.5">{node.desc}</p>
              </motion.div>

              {/* Connector (not after last) */}
              {i < nodes.length - 1 && (
                <motion.div
                  variants={scaleIn}
                  className="w-px h-7 bg-gradient-to-b from-teal/50 to-teal/0 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
