import type { Metadata } from 'next'
import { PricingPageContent } from '@/app/_pricing/page'

export default function Page() {
  return <PricingPageContent region="in" />
}

export const metadata: Metadata = {
  title: 'Restaurant Management Software Pricing India — Free, ₹1,199 & ₹2,499/mo',
  description:
    'Omniviya pricing for Indian restaurants. Free plan available. Premium ₹1,199/month, Elite ₹2,499/month. 0% platform fee. No setup cost. 14-day free trial.',
  openGraph: {
    title: 'Omniviya Pricing — Restaurant Software Free to ₹2,499/mo India',
    description: 'Free plan + paid tiers from ₹1,199/month. 0% platform fee. No hardware. No setup cost.',
    url: 'https://omniviya.in/in/pricing',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya — Restaurant Management Software Pricing India' }],
  },
  alternates: { canonical: 'https://omniviya.in/in/pricing' },
}
