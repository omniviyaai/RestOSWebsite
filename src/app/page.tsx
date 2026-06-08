import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { PainSection } from '@/components/home/PainSection'
import { Transformation } from '@/components/home/Transformation'
import { Ecosystem } from '@/components/home/Ecosystem'
import { RevenueShowcase } from '@/components/home/RevenueShowcase'
import { ProductHighlights } from '@/components/home/ProductHighlights'
import { FoundingBanner } from '@/components/home/FoundingBanner'
import { TrustSection } from '@/components/home/TrustSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { HomeWrapper } from '@/components/home/HomeWrapper'

export default function HomePage() {
  return (
    <HomeWrapper>
      <Navbar />
      <main>
        <Hero />
        <PainSection />
        <Transformation />
        <Ecosystem />
        <RevenueShowcase />
        <ProductHighlights />
        <FoundingBanner />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
    </HomeWrapper>
  )
}
