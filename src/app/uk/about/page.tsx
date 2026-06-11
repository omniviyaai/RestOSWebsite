import type { Metadata } from 'next'
export { default } from '@/app/_about/page'

export const metadata: Metadata = {
  title: 'About — Omniviya',
  description: 'Omniviya is built by Omniviya — on a mission to give UK restaurants the technology they deserve.',
  openGraph: {
    title: 'About Omniviya — Restaurant Operating System',
    description: 'Omniviya — built for UK restaurants.',
    url: 'https://omniviya.in/uk/about',
  },
  alternates: { canonical: 'https://omniviya.in/uk/about' },
}
