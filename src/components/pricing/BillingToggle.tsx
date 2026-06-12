'use client'
import type { BillingCycle } from '@/lib/pricing-content'
import { BILLING_CYCLES } from '@/lib/pricing-content'

export function BillingToggle({ cycle, onChange }: { cycle: BillingCycle; onChange: (c: BillingCycle) => void }) {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
      <div className="flex bg-carbon border border-wire rounded-xl p-1 gap-1">
        {BILLING_CYCLES.map((c) => (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            className={`text-sm font-display font-medium px-5 py-2 rounded-lg transition-colors min-h-[40px] ${
              cycle === c.id ? 'bg-ember text-white' : 'text-stone hover:text-warm-white'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      {cycle !== 'monthly' && (
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-teal/15 text-teal border border-teal/30">
          Save up to 17%
        </span>
      )}
    </div>
  )
}
