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
import { CookieConsentBanner } from './CookieConsentBanner'
import { FAQAccordion } from './FAQAccordion'
import { GlobalDepthLayer } from './GlobalDepthLayer'

export function FeaturesClient() {
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
      <FAQAccordion />
      <FeaturesCTA />
      <CookieConsentBanner />
    </>
  )
}
