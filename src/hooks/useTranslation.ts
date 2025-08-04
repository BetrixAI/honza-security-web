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
import { commonCs } from '../../locales/cs/common'
import { commonEn } from '../../locales/en/common'

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
      // Check URL path for locale
      const pathLocale = window.location.pathname.startsWith('/en') ? 'en' : 'cs'
      setLocale(pathLocale)
    }
  }, [user?.locale])
  
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
    setLocale(newLocale)
    // TODO: Update user preference in Firestore
    // TODO: Update URL path
  }
  
  return {
    t,
    locale,
    changeLocale,
    isReady: true
  }
}