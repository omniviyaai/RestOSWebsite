'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ConsentPreferences = {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'restos-cookie-consent'

const defaultPreferences: ConsentPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
}

function loadConsent(): { hasConsented: boolean; preferences: ConsentPreferences } | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveConsent(state: { hasConsented: boolean; preferences: ConsentPreferences }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  document.cookie = `cookie-consent=${encodeURIComponent(JSON.stringify(state.preferences))}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
}

type BannerView = 'banner' | 'settings' | null

export function CookieConsentBanner() {
  const [view, setView] = useState<BannerView>(null)
  const [pendingPrefs, setPendingPrefs] = useState<ConsentPreferences>(defaultPreferences)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = loadConsent()
    if (!saved) {
      setView('banner')
    } else {
      setPendingPrefs(saved.preferences)
    }
  }, [])

  const acceptAll = useCallback(() => {
    const prefs: ConsentPreferences = { essential: true, analytics: true, marketing: true }
    saveConsent({ hasConsented: true, preferences: prefs })
    setPendingPrefs(prefs)
    setView(null)
  }, [])

  const acceptEssential = useCallback(() => {
    saveConsent({ hasConsented: true, preferences: defaultPreferences })
    setPendingPrefs(defaultPreferences)
    setView(null)
  }, [])

  const savePreferences = useCallback(() => {
    saveConsent({ hasConsented: true, preferences: pendingPrefs })
    setView(null)
  }, [pendingPrefs])

  if (!mounted) return null

  return (
    <>
      <AnimatePresence>
        {view === 'banner' && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4"
          >
            <div className="max-w-2xl mx-auto bg-carbon/95 backdrop-blur-xl border border-wire/40 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-midnight/60">
              <p className="text-warm-white/75 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                This site uses a region cookie to show you the right prices and features. We also use analytics cookies to understand how the site is used. You can choose what to accept.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-end">
                <button
                  onClick={acceptEssential}
                  className="px-4 py-2.5 text-xs sm:text-sm text-stone/60 hover:text-warm-white transition-colors rounded-xl border border-wire/30 min-h-[40px]"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setView('settings')}
                  className="px-4 py-2.5 text-xs sm:text-sm text-warm-white hover:text-ember transition-colors rounded-xl border border-wire/50 min-h-[40px]"
                >
                  Cookie Settings
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 text-xs sm:text-sm font-medium text-midnight bg-ember hover:bg-ember/90 active:bg-ember/80 transition-colors rounded-xl min-h-[40px]"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {view === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-midnight/80 backdrop-blur-sm"
            onClick={() => setView(null)}
          >
            <motion.div
              initial={{ y: 100, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 100, scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-carbon border border-wire/30 rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-base sm:text-lg font-display font-bold text-warm-white mb-1">Cookie Preferences</h3>
              <p className="text-stone/50 text-xs sm:text-sm mb-4 sm:mb-5">Manage which cookies we use on this website.</p>

              <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
                <div className="flex items-center justify-between p-3 bg-midnight/50 rounded-xl border border-wire/15">
                  <div>
                    <span className="text-warm-white text-xs sm:text-sm font-medium block">Essential</span>
                    <span className="text-stone/40 text-[11px] sm:text-xs">Region routing and core functionality</span>
                  </div>
                  <div className="w-5 h-5 rounded bg-ember/30 flex items-center justify-center">
                    <span className="text-ember text-xs">&#10003;</span>
                  </div>
                </div>
                <label className="flex items-center justify-between p-3 bg-midnight/50 rounded-xl border border-wire/15 cursor-pointer hover:border-wire/40 transition-colors">
                  <div>
                    <span className="text-warm-white text-xs sm:text-sm font-medium block">Analytics</span>
                    <span className="text-stone/40 text-[11px] sm:text-xs">Page views, usage patterns, performance</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={pendingPrefs.analytics}
                    onChange={(e) => setPendingPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                    className="accent-ember w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between p-3 bg-midnight/50 rounded-xl border border-wire/15 cursor-pointer hover:border-wire/40 transition-colors">
                  <div>
                    <span className="text-warm-white text-xs sm:text-sm font-medium block">Marketing</span>
                    <span className="text-stone/40 text-[11px] sm:text-xs">Personalised content and promotions</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={pendingPrefs.marketing}
                    onChange={(e) => setPendingPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                    className="accent-ember w-4 h-4"
                  />
                </label>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setView(null)}
                  className="px-4 py-2.5 text-xs sm:text-sm text-stone/50 hover:text-warm-white transition-colors rounded-xl border border-wire/30 min-h-[40px]"
                >
                  Cancel
                </button>
                <button
                  onClick={savePreferences}
                  className="px-5 py-2.5 text-xs sm:text-sm font-medium text-midnight bg-ember hover:bg-ember/90 active:bg-ember/80 transition-colors rounded-xl min-h-[40px]"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
