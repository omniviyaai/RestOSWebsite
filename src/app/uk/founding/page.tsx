import type { Metadata } from 'next'
import { FoundingPageContent } from '@/app/_founding/page'

export default function Page() {
  return <FoundingPageContent region="uk" />
}

export const metadata: Metadata = {
  title: 'Founding Partner Program — Be One of 10',
  description: 'Be one of the 10 UK restaurants that shape how Omniviya works. First 90 days completely free. Direct WhatsApp line to the founders.',
  openGraph: {
    title: 'Omniviya Founding Partner Program — 10 Spots Only',
    description: 'First 90 days free. Direct WhatsApp line to the founders. Shape the product roadmap.',
    url: 'https://omniviya.in/uk/founding',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya — Restaurant Operating System' }],
  },
  alternates: { canonical: 'https://omniviya.in/uk/founding' },
}
