import type { Metadata } from 'next'
export { default } from '@/app/_features/page'

export const metadata: Metadata = {
  title: 'Features',
  description: 'Every RestOS feature for Indian restaurants: QR code ordering, kitchen display system, UPI payments, waiter app, reservations, and analytics.',
  openGraph: {
    title: 'RestOS Features — QR Ordering, KDS, Payments & Analytics',
    description: 'QR code ordering, kitchen display, waiter app, payments, and analytics — all connected for Indian restaurants.',
    url: 'https://restos.in/in/features',
  },
  alternates: { canonical: 'https://restos.in/in/features' },
}
