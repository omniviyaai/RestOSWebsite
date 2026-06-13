import type { Metadata } from 'next'
import { PricingPageContent } from '@/app/_pricing/page'

export default function Page() {
  return <PricingPageContent region="in" />
}

export const metadata: Metadata = {
  title: 'Pricing — Simple, Honest, No Hidden Fees',
  description: 'Simple, honest pricing for Indian restaurants. 10 Founding Partner spots available — first 90 days completely free.',
  openGraph: {
    title: 'Omniviya Pricing — Simple, Honest, No Hidden Fees',
    description: '10 Founding Partner spots. First 90 days completely free. Built for Indian restaurants.',
    url: 'https://omniviya.in/in/pricing',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya — Restaurant Operating System' }],
  },
  alternates: { canonical: 'https://omniviya.in/in/pricing' },
}
