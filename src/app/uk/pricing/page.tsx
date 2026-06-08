import type { Metadata } from 'next'
import { PricingPageContent } from '@/app/_pricing/page'

export default function Page() {
  return <PricingPageContent region="uk" />
}

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, honest pricing for UK restaurants. Get started with RestOS today — no lock-in, no hidden fees.',
  openGraph: {
    title: 'RestOS Pricing — Simple, Honest, No Hidden Fees',
    description: 'Simple pricing for UK restaurants. No lock-in, no hidden fees.',
    url: 'https://restos.in/uk/pricing',
  },
  alternates: { canonical: 'https://restos.in/uk/pricing' },
}
