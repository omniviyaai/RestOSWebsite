'use client'
import { useRegion } from '@/lib/region-context'
import { formatCurrency } from '@/lib/format'
import { priceFor } from '@/lib/pricing-content'

export function HonestBar() {
  const region = useRegion()
  const premiumAnnualSaving = priceFor(region.key, 'premium', 'annual').savingsPerYear
  const items = [
    { label: 'Commission on orders', val: '0%', teal: true },
    { label: 'Setup fee', val: 'None', teal: true },
    { label: 'Free trial', val: '14 days' },
    { label: 'Annual lock-in', val: 'None', teal: true },
    { label: 'Hidden add-ons', val: 'None', teal: true },
    { label: 'Hardware required', val: 'None', teal: true },
    { label: 'Premium annual saving', val: `${formatCurrency(region.key, premiumAnnualSaving)}/yr` },
  ]
  return (
    <div className="max-w-5xl mx-auto px-4 mt-8">
      <div className="bg-carbon border border-wire rounded-2xl px-6 py-5 flex flex-wrap gap-6 justify-center items-center">
        {items.map((it) => (
          <div key={it.label} className="text-center">
            <div className="text-[11px] text-stone/60 mb-0.5">{it.label}</div>
            <div className={`text-[15px] font-medium ${it.teal ? 'text-teal' : 'text-warm-white'}`}>{it.val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
