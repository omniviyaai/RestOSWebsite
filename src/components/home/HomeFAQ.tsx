'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* FAQ data — answers open with a ≤40-word direct answer for featured snippets */
const FAQS = [
  {
    q: 'What is restaurant management software?',
    a: 'Restaurant management software is a digital system that handles orders, kitchen communication, payments, and analytics for a restaurant — replacing paper KOTs, manual billing, and disconnected POS hardware. Omniviya does all of this through QR codes and devices you already own, with no upfront hardware cost.',
  },
  {
    q: 'Does Omniviya replace a traditional POS system?',
    a: 'Yes. Omniviya replaces traditional POS terminals — which cost ₹30,000–₹1,00,000 each — with a cloud-based system that runs on any phone, tablet, or TV. Customers order from their own phones via QR code, and payments go directly to your bank account.',
  },
  {
    q: 'How does QR code ordering work for restaurants?',
    a: 'Each table gets a unique QR code. Customers scan it with their phone camera, see your live digital menu, place their order, and pay — no app download needed. The order appears instantly on the kitchen display and the waiter app.',
  },
  {
    q: 'How long does it take to set up restaurant management software?',
    a: 'Omniviya takes hours to set up, not weeks. Upload your menu, print QR codes, and you are live. No hardware installation, no technician required. Most restaurants are fully operational within a single day.',
  },
  {
    q: 'Is Omniviya free to use?',
    a: 'Omniviya has a free plan with no monthly fee, no setup cost, and 0% platform fee on every order — forever. Paid plans (₹1,199–₹2,499/month) unlock advanced analytics, loyalty programs, and priority support.',
  },
  {
    q: 'Does Omniviya work for cloud kitchens and takeaway restaurants?',
    a: 'Yes. Omniviya is built for dine-in, takeaway, and cloud kitchen operations. Cloud kitchens use it for order aggregation and kitchen display. Takeaway counters use it for self-ordering and digital billing.',
  },
  {
    q: 'What UPI and payment methods does Omniviya support?',
    a: 'Omniviya supports UPI (GPay, PhonePe, Paytm), credit cards, debit cards, and cash — through Razorpay or Cashfree. Payments go directly to your bank account. Omniviya never holds your money and charges 0% platform fee.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-midnight py-20 md:py-28 px-4" aria-label="Frequently asked questions">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white text-balance">
            Frequently asked questions about restaurant management software
          </h2>
          <p className="text-stone/70 mt-3 text-sm">
            Everything restaurant owners ask before switching to Omniviya.
          </p>
        </motion.div>

        <div className="space-y-1">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ type: 'spring', stiffness: 200, damping: 25, delay: i * 0.05 }}
              className="border border-wire/30 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(21,27,46,0.8) 0%, rgba(11,16,32,0.6) 100%)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left group"
              >
                <h3 className="text-sm sm:text-base font-display font-medium text-warm-white/90 group-hover:text-warm-white transition-colors leading-snug">
                  {faq.q}
                </h3>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 mt-0.5 text-stone/40 group-hover:text-ember transition-colors"
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-stone/70 text-xs sm:text-sm leading-relaxed border-t border-wire/20 pt-3">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
