'use client'
import { useState } from 'react'
import { PLANS, type BillingCycle } from '@/lib/pricing-content'
import { BillingToggle } from './BillingToggle'
import { PlanCard } from './PlanCard'
import { EnterpriseCard } from './EnterpriseCard'
import { HonestBar } from './HonestBar'
import { ComparisonTable } from './ComparisonTable'
import { PricingFAQ } from './PricingFAQ'
import { PricingCTA } from './PricingCTA'

export function PricingClient() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly')
  return (
    <>
      <div className="pt-20 pb-10 px-4 text-center max-w-2xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-widest text-ember block mb-4">Pricing</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-3">
          Honest pricing. <span className="text-ember">No surprises.</span>
        </h1>
        <p className="text-stone text-base">We never take a percentage of your orders. No hidden fees, no setup costs. Everything your restaurant needs — in one plan.</p>
      </div>

      <BillingToggle cycle={cycle} onChange={setCycle} />

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((plan) => <PlanCard key={plan.id} plan={plan} cycle={cycle} />)}
          <EnterpriseCard />
        </div>
      </div>

      <HonestBar />
      <ComparisonTable />
      <PricingFAQ />
      <PricingCTA />
    </>
  )
}
