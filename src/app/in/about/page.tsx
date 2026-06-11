import type { Metadata } from 'next'
export { default } from '@/app/_about/page'

export const metadata: Metadata = {
  title: 'About — Omniviya',
  description: 'Omniviya is built by Omniviya — on a mission to give Indian restaurants the technology they deserve.',
  openGraph: {
    title: 'About Omniviya — Restaurant Operating System',
    description: 'Omniviya — built for Indian restaurants.',
    url: 'https://omniviya.in/in/about',
  },
  alternates: { canonical: 'https://omniviya.in/in/about' },
}
