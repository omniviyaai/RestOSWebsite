'use client'

import { motion } from 'framer-motion'
import { TIMELINE_CONTENT } from '@/lib/features-content'

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  )
}

function WaiterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

const icons: Record<string, typeof PhoneIcon> = {
  phone: PhoneIcon,
  waiter: WaiterIcon,
  monitor: MonitorIcon,
  chart: ChartIcon,
}

const bgColors = [
  'bg-stone/10 text-stone',
  'bg-ember/10 text-ember',
  'bg-teal/10 text-teal',
  'bg-gold/10 text-gold',
]

export function TimelineOverview() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section aria-label="How Omniviya connects your team" className="bg-carbon/15 py-14 md:py-20 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white text-balance leading-tight">
            {TIMELINE_CONTENT.headline}
          </h2>
          <p className="text-stone text-sm sm:text-base mt-4 max-w-lg mx-auto">
            {TIMELINE_CONTENT.subtext}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIMELINE_CONTENT.nodes.map((node, i) => {
            const IconComponent = icons[node.icon]

            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                whileFocus={{ scale: 1.03 }}
                onClick={() => scrollToSection(node.id)}
                className="rounded-xl border border-wire/40 bg-carbon px-5 py-6 text-left cursor-pointer flex flex-col gap-3"
              >
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${bgColors[i]}`}>
                  <IconComponent className="w-5 h-5" />
                </span>
                <div>
                  <p className={`font-display font-semibold text-sm sm:text-base ${node.color}`}>
                    {node.label}
                  </p>
                  <p className="text-stone/60 text-xs mt-1">{node.desc}</p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
