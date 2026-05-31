'use client'

import { useState } from 'react'

interface LiteYoutubeProps {
  videoId: string
  title?: string
}

export function LiteYoutube({
  videoId,
  title = 'RestOS Product Demo',
}: LiteYoutubeProps) {
  const [activated, setActivated] = useState(false)
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

  if (activated) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer block"
      aria-label={`Play ${title}`}
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-midnight/40 group-hover:bg-midnight/20 transition-colors duration-200" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-ember flex items-center justify-center shadow-xl shadow-ember/40 group-hover:scale-110 transition-transform duration-200">
          <svg
            className="w-6 h-6 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  )
}
