'use client'
import { useRegion } from '@/lib/region-context'
import { Check, Cross } from './icons'
import { COMPARISON, resolveRowLabel } from '@/lib/pricing-content'

function Cell({ on }: { on: boolean }) {
  return (
    <span className="inline-flex justify-center">
      {on ? <Check /> : <Cross />}
      <span className="sr-only">{on ? 'Included' : 'Not included'}</span>
    </span>
  )
}

export function ComparisonTable() {
  const region = useRegion()
  return (
    <section className="max-w-5xl mx-auto px-4 mt-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-warm-white mb-2">Everything, side by side</h2>
        <p className="text-sm text-stone">Every feature across all three plans — no small print.</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-wire">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr>
              <th scope="col" className="text-left p-3.5 min-w-[200px] bg-carbon border-b border-wire text-stone font-medium text-xs">Feature</th>
              <th scope="col" className="p-3.5 bg-carbon border-b border-wire text-stone font-medium text-xs">Free</th>
              <th scope="col" className="p-3.5 bg-carbon border-b border-wire text-ember font-medium text-xs">Premium</th>
              <th scope="col" className="p-3.5 bg-carbon border-b border-wire text-ember font-medium text-xs">Elite</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((sec) => (
              <FragmentSection key={sec.section} section={sec.section} rows={sec.rows} region={region} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function FragmentSection({ section, rows, region }: { section: string; rows: typeof COMPARISON[number]['rows']; region: ReturnType<typeof useRegion> }) {
  return (
    <>
      <tr>
        <th colSpan={4} scope="colgroup" className="bg-white/[0.025] border-b border-wire px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-stone/60 text-left">{section}</th>
      </tr>
      {rows.map((row) => (
        <tr key={row.feature}>
          <td className="text-left p-3 border-b border-white/[0.04] text-warm-white">{resolveRowLabel(region, row)}</td>
          <td className="text-center p-3 border-b border-white/[0.04]"><Cell on={row.free} /></td>
          <td className="text-center p-3 border-b border-white/[0.04] bg-ember/[0.04]"><Cell on={row.premium} /></td>
          <td className="text-center p-3 border-b border-white/[0.04] bg-ember/[0.04]"><Cell on={row.elite} /></td>
        </tr>
      ))}
    </>
  )
}
