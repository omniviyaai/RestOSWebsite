'use client'

import { motion } from 'framer-motion'

const spring = { type: 'spring' as const, stiffness: 200, damping: 20 }
const ember = '#c46b51'
const emberAccent = '#e8896e'
const teal = '#4a9e8e'
const tealAccent = '#6cc8b5'
const stone = '#8a8a8a'
const carbon = '#2a2a2a'
const warmWhite = '#f0efe7'
const warmWhiteDim = '#c8c5ba'

// ─── Ordering ──────────────────────────────────────────────────────────────────

export function OrderingProblemIllus() {
  return (
    <svg viewBox="0 0 160 160" className="w-28 h-28 md:w-36 md:h-36">
      <motion.rect
        x="42" y="18" width="76" height="124" rx="14"
        fill="none" stroke={warmWhite} strokeWidth="2"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
      />
      <motion.circle
        cx="80" cy="62" r="18"
        fill="none" stroke={ember} strokeWidth="2"
        strokeDasharray="100 20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
        style={{ originX: '80px', originY: '62px' }}
      />
      {[0, 1, 2].map(i => (
        <motion.circle
          key={i}
          cx={66 + i * 14} cy="102" r="3.5"
          fill={emberAccent}
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
        />
      ))}
    </svg>
  )
}

export function OrderingSolutionIllus() {
  return (
    <svg viewBox="0 0 180 160" className="w-32 h-28 md:w-40 md:h-36">
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
      >
        <rect x="10" y="38" width="48" height="48" rx="4" fill="none" stroke={warmWhite} strokeWidth="1.5" />
        <rect x="16" y="44" width="8" height="8" rx="1" fill={warmWhiteDim} />
        <rect x="32" y="44" width="8" height="8" rx="1" fill={warmWhiteDim} />
        <rect x="24" y="56" width="8" height="8" rx="1" fill={warmWhiteDim} />
        <rect x="40" y="56" width="8" height="8" rx="1" fill={warmWhiteDim} />
        <rect x="16" y="68" width="8" height="8" rx="1" fill={warmWhiteDim} />
        <rect x="32" y="68" width="8" height="8" rx="1" fill={warmWhiteDim} />
        <motion.rect
          x="10" y="38" width="48" height="2" rx="1"
          fill={tealAccent}
          animate={{ y: [0, 46, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        />
      </motion.g>
      <motion.path
        d="M62 62 L82 62"
        stroke={warmWhite} strokeWidth="2" strokeDasharray="4 3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />
      <motion.rect
        x="82" y="18" width="60" height="96" rx="12"
        fill="none" stroke={warmWhite} strokeWidth="2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, ...spring }}
      />
      <motion.path
        d="M94 64 l8 8 l14 -16"
        fill="none" stroke={tealAccent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      <motion.circle
        cx="94" cy="72" r="2"
        fill={tealAccent}
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.5, delay: 1.2 }}
      />
    </svg>
  )
}

// ─── Kitchen ───────────────────────────────────────────────────────────────────

const tickets = [
  { x: 20, y: 15, r: -12, dx: 0, dy: 0 },
  { x: 60, y: 30, r: 8, dx: 0, dy: 0 },
  { x: 100, y: 20, r: -5, dx: 0, dy: 0 },
  { x: 40, y: 50, r: 15, dx: 0, dy: 0 },
  { x: 80, y: 55, r: -8, dx: 0, dy: 0 },
]

export function KitchenProblemIllus() {
  return (
    <svg viewBox="0 0 160 160" className="w-28 h-28 md:w-36 md:h-36">
      {tickets.map((t, i) => (
        <motion.g
          key={i}
          animate={{
            x: [t.dx, t.dx + (i % 2 === 0 ? 4 : -3), t.dx],
            y: [t.dy, t.dy + (i < 2 ? 3 : -2), t.dy],
            rotate: [t.r, t.r + (i % 2 === 0 ? 6 : -4), t.r],
          }}
          transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut' }}
          style={{ originX: `${t.x + 20}px`, originY: `${t.y + 14}px` }}
        >
          <rect x={t.x} y={t.y} width="40" height="28" rx="2" fill="none" stroke={warmWhite} strokeWidth="1.5" />
          <line x1={t.x + 6} y1={t.y + 8} x2={t.x + 34} y2={t.y + 8} stroke={warmWhite} strokeWidth="1" opacity={0.5} />
          <line x1={t.x + 6} y1={t.y + 14} x2={t.x + 30} y2={t.y + 14} stroke={warmWhite} strokeWidth="1" opacity={0.5} />
          {i % 2 === 0 && (
            <motion.g
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
            >
              <line x1={t.x + 12} y1={t.y + 6} x2={t.x + 28} y2={t.y + 22} stroke={emberAccent} strokeWidth="2" strokeLinecap="round" />
              <line x1={t.x + 28} y1={t.y + 6} x2={t.x + 12} y2={t.y + 22} stroke={emberAccent} strokeWidth="2" strokeLinecap="round" />
            </motion.g>
          )}
        </motion.g>
      ))}
    </svg>
  )
}

export function KitchenSolutionIllus() {
  return (
    <svg viewBox="0 0 160 160" className="w-28 h-28 md:w-36 md:h-36">
      <motion.rect
        x="20" y="15" width="120" height="130" rx="8"
        fill="none" stroke={warmWhite} strokeWidth="2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
      />
      <motion.line x1="32" y1="45" x2="128" y2="45" stroke={warmWhite} strokeWidth="1" opacity={0.3} />
      {[
        { label: '#1242 · Table 4', status: 'Confirmed' },
        { label: '#1243 · Table 7', status: 'Preparing' },
        { label: '#1244 · Table 2', status: 'Ready' },
      ].map((order, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.2, ...spring }}
        >
          <rect x="32" y={52 + i * 24} width="96" height="20" rx="4" fill={warmWhite} opacity={0.08} />
          <text x="40" y={65 + i * 24} fill={warmWhite} fontSize="8" fontFamily="monospace">{order.label}</text>
          <motion.circle
            cx={118} cy={62 + i * 24} r="4"
            fill={tealAccent}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 1.2, 1] }}
            transition={{ delay: 0.6 + i * 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          />
          <motion.circle
            cx={118} cy={62 + i * 24} r="4"
            fill={tealAccent}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1 + i * 0.3, ease: 'easeInOut' }}
            style={{ transformOrigin: 'center' }}
          />
        </motion.g>
      ))}
      <motion.rect
        x="32" y="124" width="96" height="10" rx="3"
        fill={teal} opacity={0.15}
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
    </svg>
  )
}

// ─── Payment ───────────────────────────────────────────────────────────────────

export function PaymentProblemIllus() {
  return (
    <svg viewBox="0 0 160 160" className="w-28 h-28 md:w-36 md:h-36">
      <motion.rect
        x="25" y="40" width="110" height="80" rx="10"
        fill="none" stroke={warmWhite} strokeWidth="2"
        animate={{ x: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      />
      <motion.rect
        x="90" y="65" width="35" height="20" rx="3"
        fill="none" stroke={warmWhite} strokeWidth="1.5"
        animate={{ x: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      />
      <motion.rect
        x="30" y="44" width="50" height="8" rx="2"
        fill={ember} opacity={0.2}
        animate={{ x: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      />
      <motion.path
        d="M45 140 Q80 130 115 140"
        fill="none" stroke={emberAccent} strokeWidth="1.5"
        strokeDasharray="4 3"
        animate={{ pathLength: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
      {[0, 1, 2].map(i => (
        <motion.circle
          key={i}
          cx={60 + i * 20} cy="152" r="1.5"
          fill={emberAccent}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
        />
      ))}
    </svg>
  )
}

export function PaymentSolutionIllus() {
  return (
    <svg viewBox="0 0 160 160" className="w-28 h-28 md:w-36 md:h-36">
      <motion.rect
        x="35" y="25" width="90" height="110" rx="12"
        fill="none" stroke={warmWhite} strokeWidth="2"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
      />
      <motion.circle
        cx="75" cy="60" r="18"
        fill="none" stroke={tealAccent} strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1, opacity: [1, 0.8, 1] }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      />
      <motion.path
        d="M64 60 l8 8 l14 -14"
        fill="none" stroke={tealAccent} strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      />
      <motion.text
        x="75" y="110" textAnchor="middle"
        fill={tealAccent} fontSize="9" fontFamily="monospace" fontWeight="bold"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, ...spring }}
      >
        PAID
      </motion.text>
      <motion.circle
        cx="75" cy="60" r="22"
        fill="none" stroke={tealAccent} strokeWidth="1"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1.2, ease: 'easeInOut' }}
        style={{ originX: '75px', originY: '60px' }}
      />
    </svg>
  )
}

// ─── Management ────────────────────────────────────────────────────────────────

export function ManagementProblemIllus() {
  return (
    <svg viewBox="0 0 160 160" className="w-28 h-28 md:w-36 md:h-36">
      {[
        { x: 25, y: 20, r: -6 },
        { x: 45, y: 35, r: 4 },
        { x: 35, y: 50, r: -3 },
      ].map((win, i) => (
        <motion.g
          key={i}
          animate={{
            rotate: [win.r, win.r + (i % 2 === 0 ? 3 : -2), win.r],
            x: [0, i % 2 === 0 ? 3 : -2, 0],
          }}
          transition={{ repeat: Infinity, duration: 4 + i, ease: 'easeInOut' }}
          style={{ originX: `${win.x + 45}px`, originY: `${win.y + 35}px` }}
        >
          <rect x={win.x} y={win.y} width="90" height="70" rx="6" fill="none" stroke={warmWhite} strokeWidth="1.5" opacity={0.6 - i * 0.15} />
          <rect x={win.x + 4} y={win.y + 4} width="82" height="8" rx="2" fill={warmWhite} opacity={0.1} />
          <line x1={win.x + 10} y1={win.y + 20} x2={win.x + 80} y2={win.y + 20} stroke={warmWhite} strokeWidth="1" opacity={0.4} />
          <line x1={win.x + 10} y1={win.y + 28} x2={win.x + 65} y2={win.y + 28} stroke={warmWhite} strokeWidth="1" opacity={0.4} />
          <line x1={win.x + 10} y1={win.y + 36} x2={win.x + 70} y2={win.y + 36} stroke={warmWhite} strokeWidth="1" opacity={0.4} />
          <line x1={win.x + 10} y1={win.y + 44} x2={win.x + 55} y2={win.y + 44} stroke={warmWhite} strokeWidth="1" opacity={0.4} />
        </motion.g>
      ))}
    </svg>
  )
}

export function ManagementSolutionIllus() {
  return (
    <svg viewBox="0 0 160 160" className="w-28 h-28 md:w-36 md:h-36">
      <motion.rect
        x="20" y="15" width="120" height="130" rx="8"
        fill="none" stroke={warmWhite} strokeWidth="2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
      />
      <rect x="28" y="22" width="104" height="10" rx="3" fill={warmWhite} opacity={0.08} />
      <circle cx="36" cy="27" r="3" fill={tealAccent} />
      <circle cx="46" cy="27" r="3" fill={teal} />
      <motion.rect
        x="28" y="42" width="48" height="16" rx="3"
        fill={warmWhite} opacity={0.1}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
        style={{ originX: '28px' }}
      />
      <motion.rect
        x="28" y="62" width="64" height="16" rx="3"
        fill={warmWhite} opacity={0.1}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        style={{ originX: '28px' }}
      />
      <motion.rect
        x="28" y="82" width="40" height="16" rx="3"
        fill={warmWhite} opacity={0.1}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
        style={{ originX: '28px' }}
      />
      {[
        { x: 100, y: 42, v: 38 },
        { x: 118, y: 42, v: 52 },
        { x: 100, y: 62, v: 42 },
        { x: 118, y: 62, v: 28 },
      ].map((bar, i) => (
        <motion.rect
          key={i}
          x={bar.x} y={bar.y + (40 - bar.v)}
          width="12" height={bar.v} rx="2"
          fill={tealAccent} opacity={0.3 + i * 0.12}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
          style={{ originY: `${bar.y + 40}px` }}
        />
      ))}
      <motion.rect
        x="100" y="105" width="30" height="4" rx="2"
        fill={tealAccent} opacity={0.3}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      />
    </svg>
  )
}

// ─── Analytics ─────────────────────────────────────────────────────────────────

export function AnalyticsProblemIllus() {
  return (
    <svg viewBox="0 0 160 160" className="w-28 h-28 md:w-36 md:h-36">
      {[
        { x: 40, y: 40, r: -10, d: 0 },
        { x: 75, y: 30, r: 5, d: 0.3 },
        { x: 105, y: 50, r: -15, d: 0.6 },
      ].map((q, i) => (
        <motion.text
          key={i}
          x={q.x} y={q.y}
          fill={warmWhite} opacity={0.7 - i * 0.15}
          fontSize={24 + (i === 1 ? 8 : 0)}
          fontFamily="sans-serif"
          textAnchor="middle"
          fontWeight="bold"
          animate={{
            y: [q.y, q.y + (i % 2 === 0 ? -4 : 4), q.y],
            rotate: [q.r, q.r + (i === 0 ? 8 : -6), q.r],
          }}
          transition={{ repeat: Infinity, duration: 3 + i, delay: q.d, ease: 'easeInOut' }}
          style={{ originX: `${q.x}px`, originY: `${q.y}px` }}
        >
          ?
        </motion.text>
      ))}
      <motion.path
        d="M30 120 Q80 100 130 120"
        fill="none" stroke={emberAccent} strokeWidth="2"
        animate={{ d: ['M30 120 Q80 100 130 120', 'M30 120 Q80 130 130 120'] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      />
    </svg>
  )
}

export function AnalyticsSolutionIllus() {
  return (
    <svg viewBox="0 0 160 160" className="w-28 h-28 md:w-36 md:h-36">
      <motion.line
        x1="20" y1="100" x2="140" y2="100"
        stroke={warmWhite} strokeWidth="1" opacity={0.2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      />
      {[
        { x: 25, h: 48 },
        { x: 50, h: 72 },
        { x: 75, h: 40 },
        { x: 100, h: 60 },
        { x: 125, h: 32 },
      ].map((bar, i) => (
        <motion.rect
          key={i}
          x={bar.x} y={100 - bar.h}
          width="18" height={bar.h} rx="3"
          fill={tealAccent} opacity={0.3 + i * 0.12}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
          style={{ originY: '100px' }}
        />
      ))}
      {[
        { x: 25, h: 48 },
        { x: 50, h: 72 },
        { x: 75, h: 40 },
        { x: 100, h: 60 },
        { x: 125, h: 32 },
      ].map((bar, i) => (
        <motion.rect
          key={`pulse-${i}`}
          x={bar.x} y={100 - bar.h}
          width="18" height={bar.h} rx="3"
          fill={tealAccent}
          animate={{ opacity: [0.1, 0.35, 0.1] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 0.8 + i * 0.15, ease: 'easeInOut' }}
        />
      ))}
      {[0, 1, 2].map(i => (
        <motion.circle
          key={i}
          cx={28 + i * 52} cy={108 + i * 8}
          r="3"
          fill={tealAccent}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: [1, 1.4, 1] }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}
      <motion.path
        d="M25 90 Q50 85 75 95 Q100 80 125 90"
        fill="none" stroke={tealAccent} strokeWidth="1.5"
        strokeDasharray="4 3"
        animate={{ pathLength: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
    </svg>
  )
}
