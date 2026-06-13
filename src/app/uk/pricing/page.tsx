import type { Metadata } from 'next'
import { PricingPageContent } from '@/app/_pricing/page'

export default function Page() {
  return <PricingPageContent region="uk" />
}

export const metadata: Metadata = {
  title: 'Pricing — Simple, Honest, No Hidden Fees',
  description: 'Simple, honest pricing for UK restaurants. Get started with Omniviya today — no lock-in, no hidden fees.',
  openGraph: {
    title: 'Omniviya Pricing — Simple, Honest, No Hidden Fees',
    description: 'Simple pricing for UK restaurants. No lock-in, no hidden fees.',
    url: 'https://omniviya.in/uk/pricing',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya — Restaurant Operating System' }],
  },
  alternates: { canonical: 'https://omniviya.in/uk/pricing' },
}
