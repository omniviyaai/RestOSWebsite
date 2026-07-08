import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { COMPARISONS, getComparison } from '@/lib/compare-data'

export async function generateStaticParams() {
  return COMPARISONS.map((c) => ({ competitor: c.slug }))
}

export async function generateMetadata({ params }: { params: { competitor: string } }): Promise<Metadata> {
  const data = getComparison(params.competitor)
  if (!data) return {}
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `https://omniviya.in/in/compare/${data.slug}` },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://omniviya.in/in/compare/${data.slug}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: data.title }],
    },
  }
}

const WINNER_STYLES = {
  us: { cell: 'text-teal', badge: 'text-teal' },
  them: { cell: 'text-stone/50', badge: 'text-stone/40' },
  tie: { cell: 'text-stone/60', badge: 'text-stone/40' },
}

export default function ComparisonPage({ params }: { params: { competitor: string } }) {
  const data = getComparison(params.competitor)
  if (!data) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    url: `https://omniviya.in/in/compare/${data.slug}`,
    author: { '@type': 'Organization', name: 'Omniviya' },
    publisher: { '@type': 'Organization', name: 'Omniviya', logo: { '@type': 'ImageObject', url: 'https://omniviya.in/og-image.png' } },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main className="min-h-screen bg-midnight">

        {/* Hero */}
        <section className="pt-32 pb-16 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-48 bg-ember/5 blur-3xl pointer-events-none" />
          <div className="max-w-3xl mx-auto relative">
            <div className="flex items-center gap-2 mb-8">
              <Link href="/in" className="text-xs text-stone/40 hover:text-stone/60 transition-colors font-mono">India</Link>
              <span className="text-stone/25 text-xs">/</span>
              <span className="text-xs text-stone/40 font-mono">Compare</span>
              <span className="text-stone/25 text-xs">/</span>
              <span className="text-xs text-stone/40 font-mono">{data.competitor}</span>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-ember/10 border border-ember/20 text-ember text-xs font-mono mb-6">
              Software comparison
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white mb-6 text-balance leading-snug">
              Omniviya vs {data.competitor}
            </h1>
            <p className="text-stone/60 text-base leading-relaxed max-w-2xl">
              {data.summary}
            </p>
          </div>
        </section>

        {/* Quick score */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Omniviya', wins: data.comparisonRows.filter(r => r.winner === 'us').length, color: 'teal', bg: 'rgba(14,140,132,0.06)', border: 'rgba(14,140,132,0.2)' },
              { label: data.competitor, wins: data.comparisonRows.filter(r => r.winner === 'them').length, color: 'stone', bg: 'rgba(120,113,108,0.05)', border: 'rgba(120,113,108,0.15)' },
            ].map((side) => (
              <div key={side.label}
                className="rounded-2xl border p-5 text-center relative overflow-hidden"
                style={{ background: side.bg, borderColor: side.border }}
              >
                <div className={`text-3xl font-display font-bold text-${side.color} mb-1`}>{side.wins}</div>
                <div className="text-xs text-stone/50 font-mono">{side.label} advantage</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-stone/30 mt-3 font-mono">
            {data.comparisonRows.filter(r => r.winner === 'tie').length} tie{data.comparisonRows.filter(r => r.winner === 'tie').length !== 1 ? 's' : ''}
          </p>
        </section>

        {/* Comparison table */}
        <section className="max-w-3xl mx-auto px-4 pb-20">
          <h2 className="text-lg sm:text-xl font-display font-bold text-warm-white mb-6">
            Feature-by-feature comparison
          </h2>
          <div
            className="rounded-2xl border border-wire/25 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(21,27,46,0.85) 0%, rgba(11,16,32,0.7) 100%)' }}
          >
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-wire/20 px-5 py-3">
              <div className="text-xs text-stone/35 font-mono uppercase tracking-wider">Feature</div>
              <div className="text-xs text-teal font-mono uppercase tracking-wider text-center">Omniviya</div>
              <div className="text-xs text-stone/35 font-mono uppercase tracking-wider text-center">{data.competitor}</div>
            </div>
            {data.comparisonRows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 px-5 py-3.5 border-b border-wire/10 last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.015]'}`}
              >
                <div className="text-xs sm:text-sm text-stone/65 pr-3">{row.feature}</div>
                <div className={`text-xs sm:text-sm text-center font-medium ${row.winner === 'us' ? WINNER_STYLES.us.cell : 'text-stone/55'}`}>
                  {row.winner === 'us' && <span className="mr-1">✓</span>}
                  {row.us}
                </div>
                <div className={`text-xs sm:text-sm text-center ${row.winner === 'them' ? 'text-stone/65 font-medium' : 'text-stone/40'}`}>
                  {row.winner === 'them' && <span className="mr-1">✓</span>}
                  {row.them}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-lg sm:text-xl font-display font-bold text-warm-white mb-5">Bottom line</h2>
          <p className="text-stone/65 leading-relaxed text-sm sm:text-base mb-8">{data.verdict}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-teal/20 p-5" style={{ background: 'rgba(14,140,132,0.05)' }}>
              <div className="text-xs font-mono text-teal mb-3 uppercase tracking-wider">{data.competitor} is better for</div>
              <p className="text-stone/65 text-sm">{data.bestFor}</p>
            </div>
            <div className="rounded-xl border border-ember/20 p-5" style={{ background: 'rgba(239,68,68,0.05)' }}>
              <div className="text-xs font-mono text-ember mb-3 uppercase tracking-wider">{data.competitor} is worse for</div>
              <p className="text-stone/65 text-sm">{data.worstFor}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 pb-24">
          <div
            className="rounded-2xl border border-ember/25 p-8 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(11,16,32,0.7) 100%)' }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
            <h2 className="text-xl font-display font-bold text-warm-white mb-3">
              Try Omniviya free — decide for yourself
            </h2>
            <p className="text-stone/50 text-sm mb-6">
              Free plan available. Setup takes under an hour. No hardware, no contract.
            </p>
            <a
              href="https://restos.omniviya.in/admin/register"
              className="inline-flex items-center gap-2 bg-ember text-white font-display font-semibold px-6 py-3 rounded-xl hover:bg-ember/90 transition-colors text-sm"
            >
              Start free →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
