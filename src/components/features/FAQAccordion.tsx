'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getFaqContent } from '@/lib/features-content'
import { useRegion } from '@/lib/region-context'

function AccordionItem({ q, a, isOpen, onClick }: {
  q: string
  a: string
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
              <p className="text-stone/60 text-xs sm:text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const region = useRegion()
  const faq = getFaqContent(region.key)

  return (
    <section aria-label="Frequently asked questions" className="relative py-14 sm:py-24 px-4 overflow-hidden bg-midnight">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-carbon/30 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white mb-2 text-balance"
        >
          {faq.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-stone/50 text-sm sm:text-base mb-8 sm:mb-10"
        >
          Clear answers about how Omniviya works, what it costs, and what you need to get started.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-carbon/50 border border-wire/20 rounded-2xl p-1 sm:p-2"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {faq.questions.map((item, index) => {
            const answer = item.a
            return (
            <div key={index} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <div itemProp="name" className="hidden">{item.q}</div>
              <AccordionItem
                q={item.q}
                a={answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer" className="hidden">
                <div itemProp="text">{answer}</div>
              </div>
            </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
