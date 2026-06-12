import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Omniviya — Restaurant Operating System'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0B1020',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Radial glow */}
        <div style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,116,42,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }} />

        {/* Mortar & Pestle icon — matches icon.svg design */}
        <svg viewBox="0 0 100 100" width="150" height="150" style={{ marginBottom: 40 }}>
          <path d="M12 42 Q12 90 50 93 Q88 90 88 42 Z" fill="#151B2E" stroke="#E8742A" strokeWidth="1.5" />
          <path d="M22 46 Q22 82 50 85 Q78 82 78 46 Z" fill="#0B1020" />
          <line x1="12" y1="42" x2="88" y2="42" stroke="#E8742A" strokeWidth="1.5" />
          <rect x="32" y="91" width="36" height="6" rx="3" fill="#E8742A" />
          <g transform="rotate(35, 68, 42)">
            <ellipse cx="68" cy="78" rx="8" ry="7" fill="#F3EFE7" />
            <path d="M60 78 L63 18 L73 18 L76 78 Z" fill="#F3EFE7" />
            <ellipse cx="68" cy="18" rx="5.5" ry="5" fill="#F3EFE7" />
          </g>
        </svg>

        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ color: '#E8742A', fontSize: 80, fontWeight: 700, letterSpacing: 8 }}>OMNI</span>
          <span style={{ color: '#F3EFE7', fontWeight: 300, fontSize: 80, letterSpacing: 8 }}>VIYA</span>
        </div>

        {/* Tagline */}
        <p style={{ color: '#6B7280', fontSize: 24, marginTop: 16, letterSpacing: 5, textTransform: 'uppercase' }}>
          Restaurant Operating System
        </p>

        {/* Domain */}
        <p style={{ position: 'absolute', bottom: 44, color: '#374151', fontSize: 20, letterSpacing: 2 }}>
          restaurants.omniviya.in
        </p>
      </div>
    ),
    { ...size }
  )
}
