import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0B1020',
        carbon:   '#151B2E',
        ember:    '#E8742A',
        teal:     '#0E8C84',
        gold:     '#C6A35B',
        'warm-white': '#F3EFE7',
        stone:    '#9CA3AF',
        wire:     '#1E2640',
      },
      fontFamily: {
        sans:    ['DM Sans', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono:    ['Space Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      perspective: {
        hero:    '1200px',
        feature: '1200px',
        deep:    '1600px',
        shallow: '800px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dot-grid': 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        'ember-glow': 'radial-gradient(ellipse at center, rgba(232,116,42,0.2) 0%, transparent 70%)',
        'teal-glow':  'radial-gradient(ellipse at center, rgba(14,140,132,0.2) 0%, transparent 70%)',
      },
      backgroundSize: {
        'dot-grid': '32px 32px',
      },
      boxShadow: {
        'glow-ember': '0 0 40px rgba(232,116,42,0.35), 0 0 80px rgba(232,116,42,0.15)',
        'glow-ember-sm': '0 0 20px rgba(232,116,42,0.4)',
        'glow-teal': '0 0 40px rgba(14,140,132,0.35), 0 0 80px rgba(14,140,132,0.15)',
        'glow-teal-sm': '0 0 20px rgba(14,140,132,0.4)',
        'glow-gold': '0 0 40px rgba(198,163,91,0.3)',
        'card': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      animation: {
        'float':       'float 4s ease-in-out infinite',
        'float-slow':  'float-slow 6s ease-in-out infinite',
        'float-fast':  'float-fast 2.5s ease-in-out infinite',
        'pulse-glow':  'pulseGlow 2s ease-in-out infinite',
        'shimmer':     'shimmer 3s linear infinite',
        'breathing':   'breathing 3s ease-in-out infinite',
        'aurora':      'aurora-shift 12s ease-in-out infinite alternate',
        'scan':        'scan 4s linear infinite',
        'btn-sweep':   'btn-sweep 3s ease-in-out infinite',
        'pulse-dot':   'pulse-dot 2s ease-in-out infinite',
        'order-in':    'order-in 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'ticket-drop': 'ticket-drop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'fade-up':     'fade-up-in 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-12px) rotate(1deg)' },
          '66%':      { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.6', transform: 'scale(1.15)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        breathing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%':      { transform: 'scale(1.04)', opacity: '1' },
        },
        'aurora-shift': {
          '0%':   { filter: 'hue-rotate(0deg) brightness(1)' },
          '50%':  { filter: 'hue-rotate(8deg) brightness(1.05)' },
          '100%': { filter: 'hue-rotate(0deg) brightness(1)' },
        },
        scan: {
          '0%':   { top: '-2px', opacity: '0' },
          '5%':   { opacity: '1' },
          '95%':  { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
        'btn-sweep': {
          '0%':   { left: '-100%' },
          '40%':  { left: '150%' },
          '100%': { left: '150%' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.6', transform: 'scale(1.3)' },
        },
        'order-in': {
          '0%':   { transform: 'translateX(120%) scale(0.9)', opacity: '0' },
          '60%':  { transform: 'translateX(-4%) scale(1.01)', opacity: '1' },
          '100%': { transform: 'translateX(0%) scale(1)', opacity: '1' },
        },
        'ticket-drop': {
          '0%':   { transform: 'translateY(-100%) rotate(-2deg)', opacity: '0' },
          '60%':  { transform: 'translateY(4%) rotate(1deg)', opacity: '1' },
          '100%': { transform: 'translateY(0%) rotate(0deg)', opacity: '1' },
        },
        'fade-up-in': {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
