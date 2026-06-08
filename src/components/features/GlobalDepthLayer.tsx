'use client'

import { useScroll, useTransform, motion } from 'framer-motion'

export function GlobalDepthLayer() {
  const { scrollYProgress } = useScroll()

  const y1 = useTransform(scrollYProgress, [0, 1], ['-2%', '8%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['-4%', '12%'])
  const rot1 = useTransform(scrollYProgress, [0, 1], [0, 15])
  const rot2 = useTransform(scrollYProgress, [0, 1], [0, -10])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0.3])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ perspective: '1200px' }}>
      <motion.div
        className="absolute top-[15%] -left-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full"
        style={{
          y: y1,
          rotate: rot1,
          opacity,
          background: 'radial-gradient(circle, rgba(232,116,42,0.06) 0%, transparent 70%)',
          transformStyle: 'preserve-3d',
          translateZ: '-50px',
        }}
      />
      <motion.div
        className="absolute top-[50%] -right-[5%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full"
        style={{
          y: y2,
          rotate: rot2,
          opacity,
          background: 'radial-gradient(circle, rgba(14,140,132,0.05) 0%, transparent 70%)',
          transformStyle: 'preserve-3d',
          translateZ: '-100px',
        }}
      />
      <motion.div
        className="absolute top-[75%] left-[20%] w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] rounded-full"
        style={{
          y: y3,
          opacity: useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.8, 0.4]),
          background: 'radial-gradient(circle, rgba(198,163,91,0.04) 0%, transparent 70%)',
          transformStyle: 'preserve-3d',
          translateZ: '-150px',
        }}
      />
    </div>
  )
}
