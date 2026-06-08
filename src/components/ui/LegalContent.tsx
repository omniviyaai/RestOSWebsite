'use client'

import { useRegion } from '@/lib/region-context'

/** Renders a region-aware legal document (privacy or cookie policy) from region-config. */
export function LegalContent({ doc }: { doc: 'privacyDoc' | 'cookieDoc' }) {
  const region = useRegion()
  const d = region[doc]

  return (
    <div className="max-w-2xl mx-auto px-4 pt-28 pb-24">
      <h1 className="text-3xl sm:text-4xl font-display font-bold text-warm-white mb-2">{d.title}</h1>
      <p className="text-stone/50 text-xs font-mono mb-6">
        Last updated {d.updated} · Applies to visitors in {region.geoPlaceName}
      </p>
      <p className="text-stone text-sm leading-relaxed mb-10">{d.intro}</p>

      {d.sections.map((s) => (
        <section key={s.heading} className="mb-8">
          <h2 className="font-display font-semibold text-warm-white text-lg mb-2">{s.heading}</h2>
          <p className="text-stone text-sm leading-relaxed">{s.body}</p>
        </section>
      ))}

      <p className="text-stone/40 text-xs mt-10 border-t border-wire/40 pt-6">
        This page is governed by {region.legalFramework}. Questions? Email hello@omniviya.in.
      </p>
    </div>
  )
}
