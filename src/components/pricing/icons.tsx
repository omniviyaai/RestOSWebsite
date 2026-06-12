export function Check({ className = 'w-4 h-4 text-teal' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5} className={className} aria-hidden="true">
      <polyline points="2,8 6,12 14,4" />
    </svg>
  )
}
export function Cross({ className = 'w-4 h-4 text-wire' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5} className={className} aria-hidden="true">
      <line x1="3" y1="3" x2="13" y2="13" /><line x1="13" y1="3" x2="3" y2="13" />
    </svg>
  )
}
