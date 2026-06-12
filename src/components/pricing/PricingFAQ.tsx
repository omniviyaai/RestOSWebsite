'use client'
import { RegionPaymentFaqAnswer } from '@/components/ui/RegionContent'

const faqs = [
  { q: 'Is there a contract?', a: 'No. No lock-in, no minimum term. Stop at any time.' },
  { q: 'Do I need to buy new hardware?', a: 'No. Omniviya works on phones, tablets, and laptops you already own. Customers use their own phones.' },
  { q: 'Do you take a commission on orders?', a: 'Never. 0% on every order, on every plan. You keep all your revenue.' },
  { q: 'Is my data safe?', a: 'Yes. Your restaurant gets its own isolated database. No other restaurant can see your data. Everything is encrypted.' },
  { q: 'Does it work for takeaway-only restaurants?', a: 'Yes. Dine-in, takeaway, and cloud kitchen flows are all built in.' },
  { q: 'What payment methods are supported?', a: null },
] as const

export function PricingFAQ() {
  return (
    <section className="max-w-2xl mx-auto px-4 mt-20">
      <h2 className="text-xl sm:text-2xl font-display font-bold text-warm-white text-center mb-10">Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-wire/50 pb-6">
            <p className="font-display font-semibold text-warm-white text-sm mb-2">{faq.q}</p>
            <p className="text-stone text-sm leading-relaxed">{faq.a ?? <RegionPaymentFaqAnswer />}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
