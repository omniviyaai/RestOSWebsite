import type { Metadata } from 'next'
import { FeaturesPageContent } from '@/app/_features/page'

export default function Page() {
  return <FeaturesPageContent region="uk" />
}

export const metadata: Metadata = {
  title: 'Features — QR Ordering, KDS, Payments & Analytics',
  description: 'Every Omniviya feature for UK restaurants: QR code ordering, kitchen display system, waiter app, payments, and analytics.',
  openGraph: {
    title: 'Omniviya Features — QR Ordering, KDS, Payments & Analytics',
    description: 'QR code ordering, kitchen display, waiter app, payments, and analytics — all connected for UK restaurants.',
    url: 'https://omniviya.in/uk/features',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya — Restaurant Operating System' }],
  },
  alternates: { canonical: 'https://omniviya.in/uk/features' },
}
