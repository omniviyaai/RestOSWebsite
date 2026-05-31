import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { PainSection } from '@/components/home/PainSection'
import { Transformation } from '@/components/home/Transformation'
import { Ecosystem } from '@/components/home/Ecosystem'
import { ProductHighlights } from '@/components/home/ProductHighlights'
import { DemoVideo } from '@/components/home/DemoVideo'
import { FoundingBanner } from '@/components/home/FoundingBanner'
import { TrustSection } from '@/components/home/TrustSection'
import { FinalCTA } from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PainSection />
        <Transformation />
        <Ecosystem />
        <ProductHighlights />
        <DemoVideo />
        <FoundingBanner />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
