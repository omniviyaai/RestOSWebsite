'use client'

import { useRegion } from '@/lib/region-context'

export function RegionPaymentFeature() {
  const region = useRegion()
  return (
    <>
      <h3 className="font-display font-bold text-warm-white text-xl sm:text-2xl mb-3">
        {region.paymentFeatureHeadline}
      </h3>
      <p className="text-stone text-sm sm:text-base leading-relaxed mb-4">
        {region.paymentFeatureDescription}
      </p>
      <ul className="space-y-2">
        {region.paymentFeatureBullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-stone text-sm">
            <span className="text-teal mt-0.5 flex-shrink-0">✓</span>
            {b}
          </li>
        ))}
      </ul>
    </>
  )
}

export function RegionAnalyticsDescription() {
  const region = useRegion()
  return <>{region.analyticsDescription}</>
}

export function RegionPaymentFaqAnswer() {
  const region = useRegion()
  return <>{region.paymentFaqAnswer}</>
}

export function RegionAboutMission() {
  const region = useRegion()
  return (
    <>
      <div className="mb-14">
        <span className="text-[10px] font-mono tracking-widest text-teal uppercase block mb-4">
          Our Mission
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-6 text-balance leading-tight">
          {region.missionHeadline}
        </h1>
        <p className="text-stone text-sm sm:text-base leading-relaxed">
          {region.missionBody}
        </p>
      </div>

      <div className="mb-14">
        <h2 className="font-display font-bold text-warm-white text-lg sm:text-xl mb-4">What We Built</h2>
        <p className="text-stone text-sm sm:text-base leading-relaxed mb-4">
          RestOS is a complete restaurant operating system — QR ordering, kitchen display,
          waiter app, payments, reservations, analytics — all connected, all in real time,
          all on devices you already own.
        </p>
        <p className="text-stone text-sm sm:text-base leading-relaxed">
          {region.whatWeBuiltBody}
        </p>
      </div>

      <div className="rounded-xl border border-wire bg-carbon p-5 sm:p-6 mb-14">
        <h3 className="font-display font-semibold text-warm-white text-base mb-3">About Omniviya</h3>
        <p className="text-stone text-sm leading-relaxed">
          {region.aboutCompanyText}
        </p>
      </div>
    </>
  )
}

export function RegionFoundingMission() {
  const region = useRegion()
  return <>{region.foundingMissionText}</>
}
