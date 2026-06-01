import type { Metadata } from 'next'
export { default } from '@/app/_pricing/page'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, honest pricing for Indian restaurants. 10 Founding Partner spots available — first 90 days completely free.',
  openGraph: {
    title: 'RestOS Pricing — Simple, Honest, No Hidden Fees',
    description: '10 Founding Partner spots. First 90 days completely free. Built for Indian restaurants.',
    url: 'https://restos.in/in/pricing',
  },
  alternates: { canonical: 'https://restos.in/in/pricing' },
}
