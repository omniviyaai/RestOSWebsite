'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { transformBefore, transformAfter } from '@/lib/animations'
import { useRegion } from '@/lib/region-context'

const BASE_ROWS = [
  { before: 'Paper KOTs getting lost', after: 'Kitchen sees every order on screen, live' },
  { before: 'Waiter shouts across the floor', after: 'Silent, digital, instant' },
  { before: 'Owner finds out at closing', after: 'Owner sees revenue live from anywhere' },
  { before: 'Customer waits to flag a waiter', after: 'Customer orders from their own phone' },
]

/* Blinking cursor component for "live" feel */
function Cursor() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setVisible(v => !v), 600)
    return () => clearInterval(t)
  }, [])
  return (
    <span
      className="inline-block w-px h-3 bg-teal ml-0.5 align-middle"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.1s' }}
      aria-hidden
    />
  )
}

export function Transformation() {
  const region = useRegion()
  const rows = [
    ...BASE_ROWS,
    { before: 'Billing mistakes and arguments', after: region.billingAfterText },
  ]

  return (
    <section className="bg-midnight py-20 md:py-28 px-4 overflow-hidden" style={{ perspective: '1200px' }}>
      <div className="max-w-4xl mx-auto">
        {/* Section headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-warm-white text-balance">
            Same floor. Fewer fires.
          </p>
          <p className="text-stone/50 text-sm font-mono mt-2 tracking-wider">
            EVERY CHANGE SHIPS IN MINUTES, NOT MONTHS
          </p>
        </motion.div>

        {/* Column headers */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="text-center text-xs font-mono tracking-widest text-stone/50 uppercase"
          >
            Before
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-teal uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            After Omniviya
          </motion.p>
        </div>

        <div className="space-y-2">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Before card — recessed, stone-tinted */}
              <motion.div
                variants={transformBefore}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ scale: 1.01, x: 2, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
                className="rounded-xl bg-carbon/30 border border-wire/30 p-3 sm:p-5 cursor-default relative overflow-hidden"
                style={{ rotateY: -1, transformStyle: 'preserve-3d' }}
              >
                {/* Subtle red-stone tint top-left */}
                <div className="absolute top-0 left-0 w-12 h-12 bg-red-900/10 rounded-br-full blur-lg pointer-events-none" />
                <p className="text-stone/60 text-xs sm:text-sm leading-snug line-clamp-3">{row.before}</p>
              </motion.div>

              {/* After card — glass with teal glow + live cursor */}
              <motion.div
                variants={transformAfter}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{
                  scale: 1.02,
                  x: -2,
                  boxShadow: '0 0 30px rgba(14,140,132,0.2)',
                  transition: { type: 'spring', stiffness: 400, damping: 30 },
                }}
                className="rounded-xl border border-teal/25 p-3 sm:p-5 cursor-default relative overflow-hidden"
                style={{
                  rotateY: 1,
                  transformStyle: 'preserve-3d',
                  background: 'linear-gradient(135deg, rgba(14,140,132,0.08) 0%, rgba(14,140,132,0.04) 100%)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Teal glow top-right */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal/10 rounded-bl-full blur-xl pointer-events-none" />
                <p className="text-warm-white text-xs sm:text-sm leading-snug">
                  {row.after}
                  {i === 0 && <Cursor />}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
