import type { Metadata } from 'next'
export { default } from '@/app/_about/page'

export const metadata: Metadata = {
  title: 'About',
  description: 'Omniviya is on a mission to give Indian restaurants the technology they deserve.',
  openGraph: {
    title: 'About Omniviya — Restaurant Operating System',
    description: 'Omniviya — built for Indian restaurants.',
    url: 'https://omniviya.in/in/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya — Restaurant Operating System' }],
  },
  alternates: { canonical: 'https://omniviya.in/in/about' },
}
