/**
 * Custom translation hook for SecureHero
 * Owner: Shared - i18n system
 */

'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import type { SupportedLocale } from '../../locales'

// Import all translations
import { dashboardCs } from '../../locales/cs/dashboard'
import { dashboardEn } from '../../locales/en/dashboard'
import { cs as commonCs } from '../../locales/cs/common'
import { en as commonEn } from '../../locales/en/common'

// Translation collections
const translations = {
  cs: {
    common: commonCs,
    dashboard: dashboardCs,
  },
  en: {
    common: commonEn,
    dashboard: dashboardEn,
  }
} as const

type TranslationNamespace = keyof typeof translations['cs']
type TranslationKey<T extends TranslationNamespace> = keyof typeof translations['cs'][T]

export function useTranslation(namespace: TranslationNamespace = 'common') {
  const { user } = useAuth()
  const [locale, setLocale] = useState<SupportedLocale>('cs')
  
  useEffect(() => {
    // Get locale from user preference, URL, or browser
    if (user?.locale) {
      setLocale(user.locale)
    } else if (typeof window !== 'undefined') {
      // Check URL path for locale - support both /en and /cz prefixes
      const pathname = window.location.pathname
      if (pathname.startsWith('/en')) {
        setLocale('en')
      } else if (pathname.startsWith('/cz')) {
        setLocale('cs')
      } else {
        // Default fallback based on geolocation headers or browser
        const detectedCountry = document.querySelector('meta[name="detected-country"]')?.getAttribute('content')
        const czechCountries = ['CZ', 'SK']
        const shouldUseCzech = czechCountries.includes(detectedCountry || '')
        setLocale(shouldUseCzech ? 'cs' : 'en')
      }
    }
  }, [user?.locale])

  // Listen for URL changes to update locale
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleUrlChange = () => {
      const pathname = window.location.pathname
      if (pathname.startsWith('/en')) {
        setLocale('en')
      } else if (pathname.startsWith('/cz')) {
        setLocale('cs')
      }
    }

    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', handleUrlChange)
    
    // Also check on mount
    handleUrlChange()

    return () => {
      window.removeEventListener('popstate', handleUrlChange)
    }
  }, [])
  
  const t = <T extends TranslationNamespace>(
    key: TranslationKey<T>,
    targetNamespace?: T
  ): string => {
    const ns = targetNamespace || namespace
    const translation = translations[locale]?.[ns]?.[key as string]
    
    if (!translation) {
      console.warn(`Translation missing: ${locale}.${ns}.${key as string}`)
      return key as string
    }
    
    return translation as string
  }
  
  const changeLocale = (newLocale: SupportedLocale) => {
    if (typeof window === 'undefined') return

    setLocale(newLocale)
    
    // Update URL path
    const currentPath = window.location.pathname
    const newPath = newLocale === 'cs' ? 
      currentPath.replace(/^\/en/, '/cz') :
      currentPath.replace(/^\/cz/, '/en')
    
    if (newPath !== currentPath) {
      // Use router.push for client-side navigation
      window.history.pushState({}, '', newPath)
      
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('localeChanged', { 
        detail: { locale: newLocale } 
      }))
    }
    
    // TODO: Update user preference in Firestore
    console.log(`🌍 Locale changed to: ${newLocale}`)
  }
  
  return {
    t,
    locale,
    changeLocale,
    isReady: true
  }
}