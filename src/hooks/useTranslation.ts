/**
 * Custom translation hook for SecureHero
 * Owner: Shared - i18n system
 */

'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import type { SupportedLocale } from '@/locales'

// Import all translations
import { dashboard as dashboardCs } from '@/locales/cs/dashboard'
import { dashboard as dashboardEn } from '@/locales/en/dashboard'
import { cs as commonCs } from '@/locales/cs/common'
import { en as commonEn } from '@/locales/en/common'
import { landing as landingCs } from '@/locales/cs/landing'
import { landing as landingEn } from '@/locales/en/landing'
import { auth as authCs } from '@/locales/cs/auth'
import { auth as authEn } from '@/locales/en/auth'
import { lessons as lessonsCs } from '@/locales/cs/lessons'
import { lessons as lessonsEn } from '@/locales/en/lessons'

// Translation collections
const translations = {
  cs: {
    common: commonCs,
    dashboard: dashboardCs,
    landing: landingCs,
    auth: authCs,
    lessons: lessonsCs,
  },
  en: {
    common: commonEn,
    dashboard: dashboardEn,
    landing: landingEn,
    auth: authEn,
    lessons: lessonsEn,
  }
} as const

type TranslationNamespace = keyof typeof translations['cs']

export function useTranslation(namespace: TranslationNamespace = 'common') {
  const { user } = useAuth()
  const [locale, setLocale] = useState<SupportedLocale>('cs')
  
  useEffect(() => {
    // Get locale from URL, localStorage, or default to Czech
    if (typeof window !== 'undefined') {
      // Check URL path for locale
      const pathLocale = window.location.pathname.startsWith('/en') ? 'en' : 'cs'
      
      // Check localStorage for saved preference
      const savedLocale = localStorage.getItem('language') as SupportedLocale
      
      if (savedLocale && ['cs', 'en'].includes(savedLocale)) {
        setLocale(savedLocale)
      } else {
        setLocale(pathLocale)
      }
    }
  }, [user])

  useEffect(() => {
    // Listen for locale changes from other components
    const handleLocaleChange = (event: CustomEvent) => {
      setLocale(event.detail.locale)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('localeChanged', handleLocaleChange as EventListener)
      return () => {
        window.removeEventListener('localeChanged', handleLocaleChange as EventListener)
      }
    }
  }, [])
  
  const t = (
    key: string,
    targetNamespace?: TranslationNamespace
  ): string => {
    const ns = targetNamespace || namespace
    const translation = (translations[locale]?.[ns] as any)?.[key]
    
    if (!translation) {
      console.warn(`Translation missing: ${locale}.${ns}.${key}`)
      return key
    }
    
    return translation as string
  }
  
  const changeLocale = (newLocale: SupportedLocale) => {
    setLocale(newLocale)
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLocale)
      
      // Update URL path
      const currentPath = window.location.pathname
      const newPath = newLocale === 'cs' 
        ? currentPath.replace('/en', '') || '/cz'
        : currentPath.replace('/cz', '') || '/en'
      
      // Update URL without page reload
      window.history.pushState({}, '', newPath)
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('localeChanged', { detail: { locale: newLocale } }))
    }
    // TODO: Update user preference in Firestore
  }
  
  return {
    t,
    locale,
    changeLocale,
    isReady: true
  }
}