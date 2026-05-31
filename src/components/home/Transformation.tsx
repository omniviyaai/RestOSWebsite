'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'

const rows = [
  { before: 'Paper KOTs getting lost', after: 'Kitchen sees every order on screen, live' },
  { before: 'Waiter shouts across the floor', after: 'Silent, digital, instant' },
  { before: 'Owner finds out at closing', after: 'Owner sees revenue live from anywhere' },
  { before: 'Customer waits to flag a waiter', after: 'Customer orders from their own phone' },
  { before: 'Billing mistakes and arguments', after: 'Every order tracked, every rupee accounted' },
]

export function Transformation() {
  return (
    <section className="bg-midnight py-20 md:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Column headers */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center text-xs font-mono tracking-widest text-stone/50 uppercase"
          >
            Before
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-center text-xs font-mono tracking-widest text-teal uppercase"
          >
            After RestOS
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-2"
        >
          {rows.map((row, i) => (
            <motion.div key={i} variants={fadeUp} className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="rounded-xl bg-carbon/40 border border-wire/30 p-3 sm:p-5">
                <p className="text-stone/70 text-xs sm:text-sm leading-snug">{row.before}</p>
              </div>
              <div className="rounded-xl bg-teal/8 border border-teal/25 p-3 sm:p-5">
                <p className="text-warm-white text-xs sm:text-sm leading-snug">{row.after}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
