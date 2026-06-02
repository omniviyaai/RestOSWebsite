'use client'

import { motion } from 'framer-motion'
import { transformBefore, transformAfter } from '@/lib/animations'
import { useRegion } from '@/lib/region-context'

const BASE_ROWS = [
  { before: 'Paper KOTs getting lost', after: 'Kitchen sees every order on screen, live' },
  { before: 'Waiter shouts across the floor', after: 'Silent, digital, instant' },
  { before: 'Owner finds out at closing', after: 'Owner sees revenue live from anywhere' },
  { before: 'Customer waits to flag a waiter', after: 'Customer orders from their own phone' },
]

export function Transformation() {
  const region = useRegion()
  const rows = [
    ...BASE_ROWS,
    { before: 'Billing mistakes and arguments', after: region.billingAfterText },
  ]
  return (
    <section className="bg-midnight py-20 md:py-28 px-4 overflow-hidden" style={{ perspective: '1200px' }}>
      <div className="max-w-4xl mx-auto">
        {/* Column headers */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="text-center text-xs font-mono tracking-widest text-stone/70 uppercase"
          >
            Before
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 }}
            className="text-center text-xs font-mono tracking-widest text-teal uppercase"
          >
            After RestOS
          </motion.p>
        </div>

        <div className="space-y-2">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Before card — slides from left, slightly recessed */}
              <motion.div
                variants={transformBefore}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ scale: 1.01, x: 2, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
                className="rounded-xl bg-carbon/40 border border-wire/30 p-3 sm:p-5 cursor-default"
                style={{ rotateY: -1, transformStyle: 'preserve-3d' }}
              >
                <p className="text-stone/80 text-xs sm:text-sm leading-snug">{row.before}</p>
              </motion.div>

              {/* After card — slides from right, slightly elevated with teal glow */}
              <motion.div
                variants={transformAfter}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{
                  scale: 1.02,
                  x: -2,
                  boxShadow: '0 0 30px rgba(14,140,132,0.15)',
                  transition: { type: 'spring', stiffness: 400, damping: 30 },
                }}
                className="rounded-xl bg-teal/8 border border-teal/25 p-3 sm:p-5 cursor-default"
                style={{ rotateY: 1, transformStyle: 'preserve-3d' }}
              >
                <p className="text-warm-white text-xs sm:text-sm leading-snug">{row.after}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
