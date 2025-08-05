'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, SupportedLocale, getTranslation } from '../../locales/index'

interface LanguageContextType {
  language: SupportedLocale
  setLanguage: (lang: SupportedLocale) => void
  t: (key: string, namespace?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLocale>('cs')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as SupportedLocale
    if (savedLanguage && ['cs', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: SupportedLocale) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string, namespace: string = 'landing'): string => {
    return getTranslation(language, namespace as any, key)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}