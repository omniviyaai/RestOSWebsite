interface LogoProps {
  variant?: 'full' | 'compact'
  className?: string
  width?: number
}

// full  → mortar + pestle + "OMNI/VIYA" wordmark + "RESTAURANT OPERATING SYSTEM" tagline
// compact → mortar + pestle + "OMNI/VIYA" wordmark only (navbar use)
export function Logo({ variant = 'full', className = '', width }: LogoProps) {
  if (variant === 'compact') {
    return (
      <svg
        width={width ?? 180}
        viewBox="0 0 360 104"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Omniviya"
        role="img"
      >
        {/* MORTAR */}
        <path d="M8 34 Q8 96 52 100 Q96 96 96 34 Z" fill="#151B2E" stroke="#E8742A" strokeWidth="1.5" />
        <path d="M18 38 Q18 86 52 90 Q86 86 86 38 Z" fill="#0B1020" />
        <line x1="8" y1="34" x2="96" y2="34" stroke="#E8742A" strokeWidth="1.5" />
        <rect x="28" y="99" width="48" height="7" rx="3.5" fill="#E8742A" />

        {/* PESTLE */}
        <g transform="rotate(35, 72, 34)">
          <ellipse cx="72" cy="82" rx="10" ry="9" fill="#F3EFE7" />
          <path d="M62 82 L65 14 L79 14 L82 82 Z" fill="#F3EFE7" />
          <ellipse cx="72" cy="14" rx="7" ry="6" fill="#F3EFE7" />
        </g>

        {/* WORDMARK — "OMNIVIYA" only, no tagline */}
        <text
          x="108"
          y="68"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="36"
          letterSpacing="-1"
          fill="#F3EFE7"
        >
          <tspan fontWeight="700">OMNI</tspan>
          <tspan fill="#E8742A" fontWeight="700">VIYA</tspan>
        </text>
      </svg>
    )
  }

  return (
    <svg
        width={width ?? 240}
        viewBox="0 0 360 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Omniviya — Restaurant Operating System"
        role="img"
      >
        {/* MORTAR */}
        <path d="M8 34 Q8 96 52 100 Q96 96 96 34 Z" fill="#151B2E" stroke="#E8742A" strokeWidth="1.5" />
        <path d="M18 38 Q18 86 52 90 Q86 86 86 38 Z" fill="#0B1020" />
        <line x1="8" y1="34" x2="96" y2="34" stroke="#E8742A" strokeWidth="1.5" />
        <rect x="28" y="99" width="48" height="7" rx="3.5" fill="#E8742A" />

        {/* PESTLE */}
        <g transform="rotate(35, 72, 34)">
          <ellipse cx="72" cy="82" rx="10" ry="9" fill="#F3EFE7" />
          <path d="M62 82 L65 14 L79 14 L82 82 Z" fill="#F3EFE7" />
          <ellipse cx="72" cy="14" rx="7" ry="6" fill="#F3EFE7" />
        </g>

        {/* WORDMARK */}
        <text
          x="108"
          y="68"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="36"
          letterSpacing="-1"
          fill="#F3EFE7"
        >
          <tspan fontWeight="700">OMNI</tspan>
          <tspan fill="#E8742A" fontWeight="700">VIYA</tspan>
        </text>

        {/* TAGLINE */}
        <text
          x="119"
          y="88"
          fontFamily="Space Mono, monospace"
          fontSize="9.5"
          fill="#9CA3AF"
          letterSpacing="2.5"
        >
          RESTAURANT OPERATING SYSTEM
        </text>
    </svg>
  )
}
