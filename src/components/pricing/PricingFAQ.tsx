'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RegionPaymentFaqAnswer } from '@/components/ui/RegionContent'

const faqs: { q: string; a: string | null }[] = [
  { q: 'Is there a contract?', a: 'No. No lock-in, no minimum term. Stop at any time.' },
  { q: 'Do I need to buy new hardware?', a: 'No. Omniviya works on phones, tablets, and laptops you already own. Customers use their own phones.' },
  { q: 'Do you take a commission on orders?', a: 'Never. 0% on every order, on every plan. You keep all your revenue.' },
  { q: 'Is my data safe?', a: 'Yes. Your restaurant gets its own isolated database. No other restaurant can see your data. Everything is encrypted.' },
  { q: 'Does it work for takeaway-only restaurants?', a: 'Yes. Dine-in, takeaway, and cloud kitchen flows are all built in.' },
  { q: 'What payment methods are supported?', a: null },
]

function AccordionItem({ q, a, isOpen, onClick }: {
  q: string
  a: string | null
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <div className="border-b border-wire/20 last:border-0">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="w-full flex items-start gap-3 py-4 sm:py-5 text-left group"
      >
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1 shrink-0 text-stone/40 group-hover:text-stone/60 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.span>
        <span className="text-sm sm:text-base text-warm-white/80 group-hover:text-warm-white transition-colors font-medium leading-relaxed">
          {q}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-4 sm:pb-5 pl-7">
              <p className="text-stone/60 text-xs sm:text-sm leading-relaxed">
                {a ?? <RegionPaymentFaqAnswer />}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="max-w-2xl mx-auto px-4 mt-20">
      <h2 className="text-xl sm:text-2xl font-display font-bold text-warm-white text-center mb-10">Frequently asked questions about Omniviya pricing</h2>
      <div className="bg-carbon/50 border border-wire/20 rounded-2xl p-1 sm:p-2">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            q={faq.q}
            a={faq.a}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  )
}
