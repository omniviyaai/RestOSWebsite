'use client'

import { motion } from 'framer-motion'
import { useRegion } from '@/lib/region-context'
import { WhatsAppIcon } from './WhatsAppIcon'

export function WhatsAppFloatingBadge() {
  const region = useRegion()
  const url = `https://wa.me/${region.whatsappNumber}?text=${encodeURIComponent('Hi, I want to know more about RestOS')}`

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-[100] w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 1.5 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <WhatsAppIcon className="w-7 h-7 text-white relative z-10" />
    </motion.a>
  )
}
