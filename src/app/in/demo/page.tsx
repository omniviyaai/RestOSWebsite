import type { Metadata } from 'next'
export { default } from '@/app/_demo/page'

export const metadata: Metadata = {
  title: 'Book a Free Demo — Omniviya',
  description: 'See Omniviya running in your Indian restaurant. Book a free 20-minute demo with the founding team.',
  openGraph: {
    title: 'Book a Free Demo — Omniviya Restaurant Operating System',
    description: 'Free 20-minute demo with the founding team. See Omniviya live.',
    url: 'https://omniviya.in/in/demo',
  },
  alternates: { canonical: 'https://omniviya.in/in/demo' },
}
