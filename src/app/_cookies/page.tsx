import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LegalContent } from '@/components/ui/LegalContent'

/** Shared cookie policy page. Region-aware copy is read from context via LegalContent. */
export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-midnight min-h-screen">
        <LegalContent doc="cookieDoc" />
      </main>
      <Footer />
    </>
  )
}
