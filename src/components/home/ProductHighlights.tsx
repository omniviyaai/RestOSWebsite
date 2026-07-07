'use client'

import { useRef, useCallback, type ReactNode } from 'react'
import { motion, useSpring } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { normaliseMousePos } from '@/lib/parallax'
import { useRegion } from '@/lib/region-context'
import { Button } from '@/components/ui/Button'
import { PhoneIcon, KitchenIcon, BellIcon, CurrencyGlyphIcon, ChartIcon, DevicesIcon } from './HighlightIcons'

interface Card {
  icon: ReactNode
  headline: string
  subtext: string
}

const BASE_CARDS: Card[] = [
  { icon: <PhoneIcon className="w-7 h-7 text-teal" />, headline: 'Customers order themselves', subtext: 'Scan, browse, order, pay — all from their own phone. No waiter needed for every table.' },
  { icon: <KitchenIcon className="w-7 h-7 text-ember" />, headline: 'Kitchen never misses an order', subtext: 'Every KOT is digital, timestamped, color-coded. Nothing gets lost.' },
  { icon: <BellIcon className="w-7 h-7 text-gold" />, headline: "Your waiter always knows what's next", subtext: 'Table-by-table clarity. No shouting across the floor.' },
  { icon: <ChartIcon className="w-7 h-7 text-teal" />, headline: 'Manage from anywhere', subtext: 'Full admin dashboard on your phone or laptop. Check in from home.' },
  { icon: <DevicesIcon className="w-7 h-7 text-warm-white/80" />, headline: 'No new hardware needed', subtext: 'Works on any phone, tablet, or TV you already own.' },
]

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
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        background: 'linear-gradient(135deg, rgba(21,27,46,0.9) 0%, rgba(11,16,32,0.7) 100%)',
        backdropFilter: 'blur(16px)',
      }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', transition: { type: 'spring', stiffness: 400, damping: 30 } }}
      className="group relative rounded-2xl border border-wire/60 hover:border-ember/30 p-5 sm:p-6 cursor-default overflow-hidden"
    >
      {/* Hover gradient spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{ background: 'radial-gradient(120px circle at 30% 40%, rgba(232,116,42,0.08), transparent 70%)' }}
      />

      {/* Top highlight edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative">
        {/* Icon with glow on hover */}
        <div className="mb-4 relative inline-flex">
          <div className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-300 origin-left">
            {card.icon}
          </div>
        </div>
        <h3 className="font-display font-semibold text-warm-white text-sm sm:text-base mb-2">
          {card.headline}
        </h3>
        <p className="text-stone/80 text-xs sm:text-sm leading-relaxed">{card.subtext}</p>
      </div>

      {/* Bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-ember/0 group-hover:bg-ember/20 transition-colors duration-500" />
    </motion.div>
  )
}

export function ProductHighlights() {
  const region = useRegion()
  const cards: Card[] = [
    ...BASE_CARDS.slice(0, 3),
    { icon: <CurrencyGlyphIcon symbol={region.currency} className="w-7 h-7 text-ember" />, headline: region.paymentHighlightHeadline, subtext: region.paymentHighlightSubtext },
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
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
          className="text-center mt-10"
        >
          <Button href={`/${region.key}/features/`} variant="primary" className="text-base px-8 py-4 min-h-[52px]">
            Explore All Features
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
