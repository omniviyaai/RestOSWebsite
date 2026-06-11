import type { Metadata } from 'next'
import { FeaturesPageContent } from '@/app/_features/page'

export default function Page() {
  return <FeaturesPageContent region="in" />
}

export const metadata: Metadata = {
  title: 'Features',
  description: 'Every Omniviya feature for Indian restaurants: QR code ordering, kitchen display system, UPI payments, waiter app, reservations, and analytics.',
  openGraph: {
    title: 'Omniviya Features — QR Ordering, KDS, Payments & Analytics',
    description: 'QR code ordering, kitchen display, waiter app, payments, and analytics — all connected for Indian restaurants.',
    url: 'https://omniviya.in/in/features',
  },
  alternates: { canonical: 'https://omniviya.in/in/features' },
}
