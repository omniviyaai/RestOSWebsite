'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import Link from 'next/link'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { normaliseMousePos } from '@/lib/parallax'
import { useRegion } from '@/lib/region-context'

const BASE_CARDS = [
  { icon: '📱', headline: 'Customers order themselves', subtext: 'Scan, browse, order, pay — all from their own phone. No waiter needed for every table.' },
  { icon: '🍳', headline: 'Kitchen never misses an order', subtext: 'Every KOT is digital, timestamped, color-coded. Nothing gets lost.' },
  { icon: '🛎️', headline: "Your waiter always knows what's next", subtext: 'Table-by-table clarity. No shouting across the floor.' },
  { icon: '📊', headline: 'Manage from anywhere', subtext: 'Full admin dashboard on your phone or laptop. Check in from home.' },
  { icon: '📲', headline: 'No new hardware needed', subtext: 'Works on any phone, tablet, or TV you already own.' },
]

type Card = { icon: string; headline: string; subtext: string }

function SpotlightCard({ card }: { card: Card }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(0, { stiffness: 80, damping: 15 })
  const rotateY = useSpring(0, { stiffness: 80, damping: 15 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const pos = normaliseMousePos(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height)
    rotateX.set(pos.y * -6)
    rotateY.set(pos.x * 6)
  }, [rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0); rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
      className="group relative rounded-xl bg-carbon border border-wire hover:border-ember/40 p-5 sm:p-6 cursor-default overflow-hidden"
    >
      {/* Spotlight on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{ background: 'radial-gradient(120px circle at 50% 40%, rgba(232,116,42,0.07), transparent 70%)' }}
      />
      <div className="relative">
        <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-200 origin-left">
          {card.icon}
        </div>
        <h3 className="font-display font-semibold text-warm-white text-sm sm:text-base mb-1.5">
          {card.headline}
        </h3>
        <p className="text-stone text-xs sm:text-sm leading-relaxed">{card.subtext}</p>
      </div>
    </motion.div>
  )
}

export function ProductHighlights() {
  const region = useRegion()
  const cards = [
    ...BASE_CARDS.slice(0, 3),
    { icon: '💰', headline: region.paymentHighlightHeadline, subtext: region.paymentHighlightSubtext },
    ...BASE_CARDS.slice(3),
  ]
  return (
    <section className="bg-midnight py-20 md:py-28 px-4" style={{ perspective: '1200px' }}>
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
            <SpotlightCard key={i} card={card} />
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
            href={`/${region.key}/features/`}
            className="text-teal text-sm hover:text-teal/70 transition-colors duration-150 font-medium"
          >
            See the full product →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
