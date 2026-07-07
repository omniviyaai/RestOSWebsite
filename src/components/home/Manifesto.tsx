'use client'

import { motion } from 'framer-motion'

const PRINCIPLES = [
  {
    number: '01',
    term: 'Fewer steps.',
    body: 'Less to learn, less that can go wrong. Complexity is a liability — we cut it out.',
    color: 'text-ember',
    glow: 'rgba(232,116,42,0.12)',
    border: 'border-ember/20',
    bg: 'bg-ember/5',
  },
  {
    number: '02',
    term: 'What actually matters.',
    body: 'We fix what costs you time and money, not what looks good in a demo.',
    color: 'text-teal',
    glow: 'rgba(14,140,132,0.12)',
    border: 'border-teal/20',
    bg: 'bg-teal/5',
  },
  {
    number: '03',
    term: 'Built on ground reality.',
    body: 'How restaurants really run, on devices you already own. No POS hardware. No proprietary kit.',
    color: 'text-gold',
    glow: 'rgba(198,163,91,0.12)',
    border: 'border-gold/20',
    bg: 'bg-gold/5',
  },
]

export function Manifesto() {
  return (
    <section className="bg-midnight py-20 md:py-32 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white text-balance leading-tight">
            We don&apos;t sell features.
            <br />
            <span className="text-ember">We solve what breaks your day.</span>
          </h2>
        </motion.div>

        {/* Principle cards with ambient glows */}
        <div className="relative">
          {/* Vertical timeline line */}
          <motion.div
            className="absolute left-9 sm:left-10 top-8 bottom-8 w-px pointer-events-none"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
            style={{
              originY: 0,
              background: 'linear-gradient(to bottom, rgba(232,116,42,0.3), rgba(14,140,132,0.3), rgba(198,163,91,0.3))',
            }}
          />

          <div className="space-y-5">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.term}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ type: 'spring', stiffness: 200, damping: 25, delay: i * 0.12 }}
                className="relative"
              >
                {/* Ambient glow */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 80% 80% at 20% 50%, ${p.glow}, transparent)` }}
                />

                <div className={`relative flex items-start gap-6 rounded-2xl border ${p.border} ${p.bg} backdrop-blur-sm p-6 sm:p-8`}>
                  {/* Number badge */}
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-midnight/60 border border-wire/40 z-10">
                    <span className={`font-mono text-xs font-bold ${p.color}`}>{p.number}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-display font-bold text-xl sm:text-2xl ${p.color} mb-2`}>
                      {p.term}
                    </p>
                    <p className="text-stone text-base sm:text-lg leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
