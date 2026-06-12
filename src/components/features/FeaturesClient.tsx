'use client'

import { FeaturesHero } from './FeaturesHero'
import { TimelineOverview } from './TimelineOverview'
import { OrderingFeature } from './OrderingFeature'
import { KitchenFeature } from './KitchenFeature'
import { PaymentFeature } from './PaymentFeature'
import { ManagementFeature } from './ManagementFeature'
import { AnalyticsFeature } from './AnalyticsFeature'
import { BYODFeature } from './BYODFeature'
import { useEffect } from 'react'
import { FeaturesCTA } from './FeaturesCTA'
import { FeaturesPricingCTA } from './FeaturesPricingCTA'
import { FAQAccordion } from './FAQAccordion'
import { GlobalDepthLayer } from './GlobalDepthLayer'

export function FeaturesClient() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <GlobalDepthLayer />
      <FeaturesHero />
      <TimelineOverview />
      <OrderingFeature />
      <KitchenFeature />
      <PaymentFeature />
      <ManagementFeature />
      <BYODFeature />
      <AnalyticsFeature />
      <FeaturesPricingCTA />
      <FAQAccordion />
      <FeaturesCTA />
    </>
  )
}
