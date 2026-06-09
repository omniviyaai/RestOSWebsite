'use client'

import { motion } from 'framer-motion'

const PRINCIPLES = [
  { term: 'Fewer steps.', body: 'Less to learn, less that can go wrong.' },
  { term: 'What actually matters.', body: 'We fix what costs you time and money, not what looks good in a demo.' },
  { term: 'Built on ground reality.', body: 'How restaurants really run, on devices you already own.' },
]

export function Manifesto() {
  return (
    <section className="bg-midnight py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-[10px] sm:text-xs font-mono tracking-widest text-teal/80 uppercase block mb-5"
        >
          Our Approach
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.08 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white text-balance leading-tight mb-12 md:mb-16"
        >
          We don&apos;t sell features. We solve what breaks your day.
        </motion.h2>

        <div className="space-y-7 sm:space-y-8 max-w-xl mx-auto text-left">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.term}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 200, damping: 25, delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <span className="mt-2 w-2 h-2 rounded-full bg-teal flex-shrink-0" aria-hidden="true" />
              <p className="text-base sm:text-lg leading-relaxed">
                <span className="font-display font-semibold text-warm-white">{p.term}</span>{' '}
                <span className="text-stone">{p.body}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
