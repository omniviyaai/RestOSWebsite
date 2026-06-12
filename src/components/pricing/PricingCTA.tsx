'use client'
import { useRegion } from '@/lib/region-context'
import { Button } from '@/components/ui/Button'

export function PricingCTA() {
  const region = useRegion()
  return (
    <section className="text-center px-4 mt-20 py-20 border-t border-wire">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white mb-3">
        Ready to get started?
      </h2>
      <p className="text-stone text-base mb-8">14-day free trial. No card required. Cancel anytime.</p>
      <div className="flex justify-center gap-3 flex-wrap">
        <Button href={`${region.appUrl}/register`} variant="primary" external>Start free trial</Button>
        <Button href={`/${region.key}/demo/`} variant="ghost">Book a demo</Button>
      </div>
    </section>
  )
}
