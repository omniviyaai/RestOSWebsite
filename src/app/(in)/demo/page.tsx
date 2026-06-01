import type { Metadata } from 'next'
export { default } from '@/app/demo/page'

export const metadata: Metadata = {
  title: 'Book a Free Demo — RestOS',
  description: 'See RestOS running in your Indian restaurant. Book a free 20-minute demo with the founding team.',
  openGraph: {
    title: 'Book a Free Demo — RestOS Restaurant Operating System',
    description: 'Free 20-minute demo with the founding team. See RestOS live.',
    url: 'https://restos.in/in/demo',
  },
  alternates: { canonical: 'https://restos.in/in/demo' },
}
