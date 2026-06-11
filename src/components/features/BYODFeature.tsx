'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { BYOD_CONTENT } from '@/lib/features-content'
import { useRegion } from '@/lib/region-context'
import { regionConfig } from '@/lib/region-config'
import { useRef } from 'react'

function PhoneDevice({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="2" width="26" height="52" rx="8" />
      <circle cx="16" cy="50" r="3" />
      <path d="M16 8v4" stroke="var(--color-teal)" />
    </svg>
  )
}

function TabletDevice({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="52" height="36" rx="4" />
      <circle cx="28" cy="34" r="3" />
      <path d="M28 6v4" stroke="var(--color-ember)" />
    </svg>
  )
}

function MonitorDevice({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="52" height="30" rx="2" />
      <rect x="24" y="32" width="8" height="6" rx="1" />
      <path d="M28 6v4" stroke="var(--color-ember)" />
    </svg>
  )
}

export function BYODFeature() {
  const sectionRef = useRef<HTMLElement>(null)
  const region = useRegion()
  const comparisons = regionConfig[region.key].byodComparisons

  const devices = [
    { Icon: PhoneDevice, label: 'Phone', delay: 0 },
    { Icon: TabletDevice, label: 'Tablet', delay: 0.2 },
    { Icon: MonitorDevice, label: 'TV / Monitor', delay: 0.4 },
  ]

  return (
    <section ref={sectionRef} className="bg-carbon/15 py-14 md:py-20 px-4 overflow-hidden relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-10"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-gold/80">BYOD</span>

          {/* Floating devices — flex layout, no overlap */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 mt-6 mb-8">
            {devices.map((device, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: device.delay, type: 'spring', stiffness: 200, damping: 20 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: device.delay, ease: 'easeInOut' }}
                >
                  <device.Icon className="w-10 h-[56px] md:w-12 md:h-[64px] text-warm-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
                </motion.div>
                <span className="text-[10px] font-mono text-stone/50 mt-2 whitespace-nowrap">{device.label}</span>
              </motion.div>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white text-balance leading-tight mb-4">
            {BYOD_CONTENT.headline}
          </h2>
          <p className="text-stone text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {BYOD_CONTENT.subtext}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="rounded-xl border border-wire overflow-hidden"
        >
          <div className="grid grid-cols-3 gap-0">
            <div className="p-3 bg-midnight/50">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone/40">Item</span>
            </div>
            <div className="p-3 bg-ember/[0.03]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ember/50">Old Way (Cost)</span>
            </div>
            <div className="p-3 bg-teal/[0.03]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal/60">With Omniviya</span>
            </div>
          </div>
          {comparisons.map((row, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`grid grid-cols-3 gap-0 border-t border-wire/30 ${
                i % 2 === 0 ? 'bg-midnight/20' : ''
              }`}
            >
              <div className="p-3 flex items-center">
                <span className="text-xs text-warm-white font-medium">{row.item}</span>
              </div>
              <div className="p-3 flex items-center bg-ember/[0.02]">
                <span className="text-xs text-stone/60">{row.oldWay}</span>
              </div>
              <div className="p-3 flex items-center bg-teal/[0.02]">
                <span className="text-xs text-teal font-medium">{row.newWay}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-stone/50 text-xs mt-6 font-mono"
        >
          No hardware lock-ins. No expensive setup costs. Easier staff training. Faster rollout.
        </motion.p>
      </div>
    </section>
  )
}
