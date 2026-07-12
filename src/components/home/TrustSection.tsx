'use client'

import { motion } from 'framer-motion'
import { TRUST_SIGNALS } from '@/lib/constants'
import { useRegion } from '@/lib/region-context'
import { BankIcon, LockIcon, DevicesIcon, QrScanIcon } from '@/components/ui/Icons'

function getTrustDelay(index: number): number {
  return (Math.floor(index / 2) + (index % 2)) * 0.1
}

const TRUST_ICON_COMPONENTS = [BankIcon, LockIcon, DevicesIcon, QrScanIcon]

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
          {/* Live pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-teal/20">
            <span className="status-dot-live" />
            <span className="text-sm font-display font-medium text-teal">
              Restaurants live on Omniviya right now
            </span>
          </div>
        </motion.div>

        {/* Trust signal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_SIGNALS.map((signal, i) => {
            const TrustIcon = TRUST_ICON_COMPONENTS[i]
            return (
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

                <TrustIcon size={22} className="mb-3 text-teal" />
                <h3 className="font-display font-semibold text-warm-white text-sm mb-2 group-hover:text-teal transition-colors duration-200">
                  {signal.title}
                </h3>
                <p className="text-stone/70 text-xs leading-relaxed">
                  {i === 0
                    ? `Payments go directly to your ${region.paymentGateways.join(' or ')} account. We never touch it.`
                    : signal.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
