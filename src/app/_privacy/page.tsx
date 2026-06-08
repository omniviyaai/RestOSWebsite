import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LegalContent } from '@/components/ui/LegalContent'

/** Shared privacy policy page. Region-aware copy is read from context via LegalContent. */
export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-midnight min-h-screen">
        <LegalContent doc="privacyDoc" />
      </main>
      <Footer />
    </>
  )
}
