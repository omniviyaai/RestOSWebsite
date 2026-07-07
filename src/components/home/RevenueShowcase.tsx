'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRegion } from '@/lib/region-context'
import { formatCurrency } from '@/lib/format'

/* Count-up hook — animates a number from 0 to target when inView */
function useCountUp(target: number, duration = 1400, started = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!started) return
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, started])
  return value
}

/* Tiny sparkline — decorative path suggesting upward trend */
function Sparkline({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 24" fill="none" className="w-16 h-6 opacity-40" aria-hidden>
      <polyline
        points="0,20 10,16 22,18 32,10 44,12 54,4 64,6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ACCENT_COLORS = ['#E8742A', '#0E8C84', '#C6A35B', '#0E8C84']

export function RevenueShowcase() {
  const region = useRegion()
  const s      = region.exampleStats
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const revenueCount  = useCountUp(s.revenue,       1600, inView)
  const avgOrderCount = useCountUp(s.avgOrder,       1200, inView)
  const orderCount    = useCountUp(s.ordersToday,    1000, inView)

  const stats = [
    {
      label:    'Revenue today',
      value:    formatCurrency(region.key, revenueCount),
      raw:      revenueCount,
      target:   s.revenue,
      live:     true,
    },
    {
      label:    'Average order',
      value:    formatCurrency(region.key, avgOrderCount),
      raw:      avgOrderCount,
      target:   s.avgOrder,
      live:     false,
    },
    {
      label:    'Orders today',
      value:    String(orderCount),
      raw:      orderCount,
      target:   s.ordersToday,
      live:     true,
    },
    {
      label:    `${region.taxTerm}-ready reports`,
      value:    'Auto',
      raw:      null,
      target:   null,
      live:     false,
    },
  ]

  return (
    <section className="bg-midnight py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="status-dot-live" />
            <span className="text-xs font-mono uppercase tracking-widest text-teal/80">Live Dashboard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white mt-2 text-balance leading-tight">
            Every {region.paymentCurrencyTerm}, tracked in real time.
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 24 }}
              whileHover={{
                y: -4,
                boxShadow: `0 0 24px ${ACCENT_COLORS[i]}22`,
                borderColor: `${ACCENT_COLORS[i]}40`,
                transition: { type: 'spring', stiffness: 400, damping: 30 },
              }}
              className="relative rounded-2xl border border-wire/60 overflow-hidden cursor-default"
              style={{
                background: `linear-gradient(135deg, rgba(21,27,46,0.9) 0%, rgba(11,16,32,0.8) 100%)`,
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Accent glow corner */}
              <div
                className="absolute top-0 right-0 w-16 h-16 blur-xl opacity-30 pointer-events-none"
                style={{ background: ACCENT_COLORS[i] }}
              />

              <div className="relative p-5 sm:p-6">
                {stat.live && (
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="status-dot-live scale-75" />
                    <span className="text-[9px] font-mono text-green-400/70 uppercase tracking-wider">Live</span>
                  </div>
                )}

                <p
                  className="text-2xl sm:text-3xl font-display font-bold tabular-nums leading-none"
                  style={{ color: ACCENT_COLORS[i] }}
                >
                  {stat.value}
                </p>
                <p className="text-stone text-xs sm:text-sm mt-2 leading-snug">{stat.label}</p>

                {/* Sparkline — bottom of card */}
                <div className="mt-3">
                  <Sparkline color={ACCENT_COLORS[i]} />
                </div>
              </div>

              {/* Bottom highlight bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-30"
                style={{ background: `linear-gradient(to right, transparent, ${ACCENT_COLORS[i]}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        <p className="text-center text-stone/40 text-xs mt-6 font-mono">
          Sample figures shown in {region.currencyCode}. {region.taxTerm} calculated automatically on every order.
        </p>
      </div>
    </section>
  )
}
