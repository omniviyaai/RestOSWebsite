'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TRUST_SIGNALS } from '@/lib/constants'
import { useRegion } from '@/lib/region-context'

function getTrustDelay(index: number): number {
  return (Math.floor(index / 2) + (index % 2)) * 0.1
}

/* Animated restaurant counter */
function RestaurantCounter() {
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const target = 127

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 1200
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView])

  return <span ref={ref}>{count}</span>
}

const TRUST_ICONS = ['💰', '🔒', '📱', '🔗']

export function TrustSection() {
  const region = useRegion()

  return (
    <section className="bg-carbon/15 py-16 md:py-24 px-4 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#9CA3AF 1px, transparent 1px), linear-gradient(90deg, #9CA3AF 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Teal ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-teal/6 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Header + live counter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-warm-white mb-4">
            {region.tagline}
          </h2>
          {/* Live counter pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-teal/20">
            <span className="status-dot-live" />
            <span className="text-sm font-display font-medium text-teal">
              <RestaurantCounter /> restaurants live on Omniviya
            </span>
          </div>
        </motion.div>

        {/* Trust signal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_SIGNALS.map((signal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 25, delay: getTrustDelay(i) }}
              whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', transition: { type: 'spring', stiffness: 400, damping: 30 } }}
              className="relative rounded-2xl border border-wire/50 p-5 cursor-default group overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(21,27,46,0.8) 0%, rgba(11,16,32,0.6) 100%)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Inner highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(80px circle at 30% 30%, rgba(14,140,132,0.08), transparent)' }}
              />

              <div className="text-2xl mb-3" role="img" aria-hidden>{TRUST_ICONS[i]}</div>
              <h3 className="font-display font-semibold text-warm-white text-sm mb-2 group-hover:text-teal transition-colors duration-200">
                {signal.title}
              </h3>
              <p className="text-stone/70 text-xs leading-relaxed">
                {i === 0
                  ? `Payments go directly to your ${region.paymentGateways.join(' or ')} account. We never touch it.`
                  : signal.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
