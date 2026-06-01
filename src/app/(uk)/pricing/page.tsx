import type { Metadata } from 'next'
export { default } from '@/app/pricing/page'

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
