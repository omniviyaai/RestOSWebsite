'use client'

import { FeaturesHero } from './FeaturesHero'
import { TimelineOverview } from './TimelineOverview'
import { OrderingFeature } from './OrderingFeature'
import { KitchenFeature } from './KitchenFeature'
import { PaymentFeature } from './PaymentFeature'
import { ManagementFeature } from './ManagementFeature'
import { AnalyticsFeature } from './AnalyticsFeature'
import { BYODFeature } from './BYODFeature'
import { FeaturesCTA } from './FeaturesCTA'

export function FeaturesClient() {
  return (
    <>
      <FeaturesHero />
      <TimelineOverview />
      <OrderingFeature />
      <KitchenFeature />
      <PaymentFeature />
      <ManagementFeature />
      <AnalyticsFeature />
      <BYODFeature />
      <FeaturesCTA />
    </>
  )
}
