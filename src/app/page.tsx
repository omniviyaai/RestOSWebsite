import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { PainSection } from '@/components/home/PainSection'
import { Manifesto } from '@/components/home/Manifesto'
import { Transformation } from '@/components/home/Transformation'
import { Ecosystem } from '@/components/home/Ecosystem'
import { RevenueShowcase } from '@/components/home/RevenueShowcase'
import { ProductHighlights } from '@/components/home/ProductHighlights'
import { FoundingBanner } from '@/components/home/FoundingBanner'
import { TrustSection } from '@/components/home/TrustSection'
import { HomeFAQ } from '@/components/home/HomeFAQ'
import { FinalCTA } from '@/components/home/FinalCTA'
import { HomeWrapper } from '@/components/home/HomeWrapper'

/* Home page metadata — page-specific, overrides layout defaults */
export const metadata: Metadata = {
  title: 'Restaurant Management Software India — QR Ordering, Kitchen Display, UPI Payments | Omniviya',
  description:
    'Omniviya is restaurant management software for Indian restaurants. QR code ordering, digital kitchen display, UPI & card payments, waiter app, and real-time analytics. No POS hardware needed. Start free.',
  alternates: { canonical: 'https://omniviya.in/in' },
  openGraph: {
    title: 'Restaurant Management Software India — Omniviya',
    description:
      'QR code ordering, kitchen display system, UPI payments, and real-time analytics for Indian restaurants. No hardware. No setup fee. 0% platform fee.',
    url: 'https://omniviya.in/in',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya — Restaurant Management Software India' }],
  },
}

/* SoftwareApplication schema for home page — helps GEO and rich results */
const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Omniviya',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  url: 'https://omniviya.in',
  description:
    'Restaurant management software for Indian and UK restaurants. QR ordering, kitchen display system, digital payments, waiter app, and real-time analytics. No POS hardware required.',
  offers: [
    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'INR' },
    { '@type': 'Offer', name: 'Premium', price: '1199', priceCurrency: 'INR', billingIncrement: 'month' },
    { '@type': 'Offer', name: 'Elite', price: '2499', priceCurrency: 'INR', billingIncrement: 'month' },
  ],
  featureList: [
    'QR code menu ordering',
    'Kitchen Display System (KDS)',
    'UPI and card payments via Razorpay and Cashfree',
    'Waiter app',
    'Real-time analytics dashboard',
    'Multi-branch management',
    'Table management',
    'GST-ready billing and reports',
  ],
  publisher: {
    '@type': 'Organization',
    '@id': 'https://omniviya.in/#organization',
    name: 'Omniviya',
  },
}

export default function HomePage() {
  return (
    <HomeWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Navbar />
      <main>
        <Hero />
        <PainSection />
        <Manifesto />
        <Transformation />
        <Ecosystem />
        <RevenueShowcase />
        <ProductHighlights />
        <FoundingBanner />
        <TrustSection />
        <HomeFAQ />
        <FinalCTA />
      </main>
      <Footer />
    </HomeWrapper>
  )
}
