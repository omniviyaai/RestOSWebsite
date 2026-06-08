import type { Metadata } from 'next'
import { FeaturesPageContent } from '@/app/_features/page'

export default function Page() {
  return <FeaturesPageContent region="uk" />
}

export const metadata: Metadata = {
  title: 'Features',
  description: 'Every RestOS feature for UK restaurants: QR code ordering, kitchen display system, waiter app, payments, and analytics.',
  openGraph: {
    title: 'RestOS Features — QR Ordering, KDS, Payments & Analytics',
    description: 'QR code ordering, kitchen display, waiter app, payments, and analytics — all connected for UK restaurants.',
    url: 'https://restos.in/uk/features',
  },
  alternates: { canonical: 'https://restos.in/uk/features' },
}
