import { MotionValue, useSpring, useTransform } from 'framer-motion'

// Section-specific spring configs
export const springs = {
  hero: { type: 'spring' as const, stiffness: 80, damping: 15 },       // Floaty, dreamy
  pain: { type: 'spring' as const, stiffness: 200, damping: 30 },      // Heavy, weighted
  transform: { type: 'spring' as const, stiffness: 300, damping: 25 }, // Snappy, precise
  ecosystem: { type: 'spring' as const, stiffness: 150, damping: 20 }, // Flowing, organic
  cta: { type: 'spring' as const, stiffness: 250, damping: 20 },       // Energetic, bouncy
  magnetic: { type: 'spring' as const, stiffness: 400, damping: 28 },  // Responsive
}

// Map a mouse position (-0.5 to 0.5 range) to a rotation angle
export function mapMouseToRotation(
  value: number,
  maxDeg: number = 3
): number {
  return value * maxDeg * 2
}

// Map mouse position to parallax offset
export function mapMouseToOffset(
  value: number,
  maxPx: number = 20
): number {
  return -value * maxPx * 2
}

// Clamp a value between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

// Normalise mouse position to -0.5 .. 0.5
export function normaliseMousePos(
  clientX: number,
  clientY: number,
  width: number,
  height: number
): { x: number; y: number } {
  return {
    x: clientX / width - 0.5,
    y: clientY / height - 0.5,
  }
}

// CSS easing curves per section
export const easings = {
  hero: 'cubic-bezier(0.23, 1, 0.32, 1)',
  pain: 'cubic-bezier(0.77, 0, 0.175, 1)',
  transform: 'cubic-bezier(0.32, 0.72, 0, 1)',
  ecosystem: 'cubic-bezier(0.45, 0, 0.55, 1)',
  cta: 'cubic-bezier(0.22, 1, 0.36, 1)',
}

// Stagger delay helper
export function staggerDelay(index: number, base: number = 80): number {
  return index * base
}
