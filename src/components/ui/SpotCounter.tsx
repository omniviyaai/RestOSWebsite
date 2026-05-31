import { FOUNDING_SPOTS_TAKEN, FOUNDING_SPOTS_TOTAL } from '@/lib/constants'

export function SpotCounter() {
  const remaining = FOUNDING_SPOTS_TOTAL - FOUNDING_SPOTS_TAKEN

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1.5">
        {Array.from({ length: FOUNDING_SPOTS_TAKEN }).map((_, i) => (
          <div key={`filled-${i}`} className="w-3 h-3 rounded-full bg-gold" />
        ))}
        {Array.from({ length: remaining }).map((_, i) => (
          <div key={`empty-${i}`} className="w-3 h-3 rounded-full bg-wire" />
        ))}
      </div>
      <p className="text-stone text-sm font-mono">
        <span className="text-gold font-semibold">{remaining}</span> of {FOUNDING_SPOTS_TOTAL} spots remaining
      </p>
    </div>
  )
}
