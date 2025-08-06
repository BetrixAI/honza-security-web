/**
 * Language switcher component for dashboard
 * Owner: Shared - i18n system
 */

'use client'

import React from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { Globe, ChevronDown } from 'lucide-react'
import clsx from 'clsx'

interface LanguageSwitcherProps {
  isCollapsed?: boolean
}

export default function LanguageSwitcher({ isCollapsed = false }: LanguageSwitcherProps) {
  const { locale, changeLocale } = useTranslation()

  const languages = [
    { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ]

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  return (
    <div className="relative group">
      <button
        onClick={() => {
          const newLocale = locale === 'cs' ? 'en' : 'cs'
          changeLocale(newLocale)
          console.log('Language switched to:', newLocale)
        }}
        className={clsx(
          'flex items-center gap-2 rounded-lg transition-all duration-300',
          'bg-bg-card-alt/50 hover:bg-bg-card-alt border border-border-subtle/40',
          'hover:border-brand-mid/40 hover:shadow-lg',
          'text-txt-primary hover:text-brand-light',
          isCollapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2'
        )}
        aria-label={`Switch to ${locale === 'cs' ? 'English' : 'Čeština'}`}
        title={isCollapsed ? `Switch to ${locale === 'cs' ? 'English' : 'Čeština'}` : undefined}
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentLanguage.flag}</span>
        {!isCollapsed && (
          <span className="text-sm font-medium">
            {currentLanguage.code.toUpperCase()}
          </span>
        )}
        {!isCollapsed && (
          <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
        )}
      </button>

      {/* Tooltip - only show when not collapsed */}
      {!isCollapsed && (
        <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-bg-card border border-border-subtle rounded-md text-xs text-txt-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
          Switch to {locale === 'cs' ? 'English' : 'Čeština'}
        </div>
      )}
    </div>
  )
} 