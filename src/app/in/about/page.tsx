import type { Metadata } from 'next'
export { default } from '@/app/_about/page'

export const metadata: Metadata = {
  title: 'About — RestOS by Omniviya',
  description: 'RestOS is built by Omniviya — on a mission to give Indian restaurants the technology they deserve.',
  openGraph: {
    title: 'About RestOS — Restaurant Operating System by Omniviya',
    description: 'RestOS by Omniviya — built for Indian restaurants.',
    url: 'https://restos.in/in/about',
  },
  alternates: { canonical: 'https://restos.in/in/about' },
}
