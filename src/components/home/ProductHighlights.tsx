'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { staggerContainer, fadeUp } from '@/lib/animations'

const cards = [
  { icon: '📱', headline: 'Customers order themselves', subtext: 'Scan, browse, order, pay — all from their own phone. No waiter needed for every table.' },
  { icon: '🍳', headline: 'Kitchen never misses an order', subtext: 'Every KOT is digital, timestamped, color-coded. Nothing gets lost.' },
  { icon: '🛎️', headline: 'Your waiter always knows what\'s next', subtext: 'Table-by-table clarity. No shouting across the floor.' },
  { icon: '💰', headline: 'Every rupee tracked automatically', subtext: 'UPI, card, and cash — all in one place, in real time.' },
  { icon: '📊', headline: 'Manage from anywhere', subtext: 'Full admin dashboard on your phone or laptop. Check in from home.' },
  { icon: '📲', headline: 'No new hardware needed', subtext: 'Works on any phone, tablet, or TV you already own.' },
]

export function ProductHighlights() {
  return (
    <section className="bg-midnight py-20 md:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-warm-white">
            One System. Everything Inside.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
              className="rounded-xl bg-carbon border border-wire hover:border-ember/40 p-5 sm:p-6 transition-colors duration-200 cursor-default"
            >
              <div className="text-2xl mb-3" aria-hidden="true">{card.icon}</div>
              <h3 className="font-display font-semibold text-warm-white text-sm sm:text-base mb-1.5">
                {card.headline}
              </h3>
              <p className="text-stone text-xs sm:text-sm leading-relaxed">{card.subtext}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="text-center mt-8"
        >
          <Link
            href="/features"
            className="text-teal text-sm hover:text-teal/70 transition-colors duration-150 font-medium"
          >
            See the full product →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
