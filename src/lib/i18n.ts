/**
 * i18n utilities and React hook
 * Owner: Shared - internationalization system
 */

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  translations, 
  type SupportedLocale, 
  type TranslationNamespaces,
  getTranslation,
  getLocaleFromPath,
  addLocaleToPath,
  defaultLocale,
  czechLocale
} from '@/locales';

// Client-side locale detection
export function detectClientLocale(): SupportedLocale {
  // 1. Check URL path first
  if (typeof window !== 'undefined') {
    const pathLocale = getLocaleFromPath(window.location.pathname);
    if (pathLocale) return pathLocale;
  }
  
  // 2. Check browser language
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'cs') return czechLocale;
  }
  
  // 3. Default to English
  return defaultLocale;
}

// React hook for translations
export function useTranslation(namespace: TranslationNamespaces = 'common') {
  const router = useRouter();
  const [locale, setLocale] = useState<SupportedLocale>(defaultLocale);
  
  useEffect(() => {
    const detectedLocale = getLocaleFromPath(window.location.pathname);
    setLocale(detectedLocale);
  }, []);
  
  const t = (key: string, interpolations?: Record<string, string>): string => {
    let translation = getTranslation(locale, namespace, key);
    
    // Handle interpolations like {xp}, {level}, etc.
    if (interpolations) {
      Object.entries(interpolations).forEach(([placeholder, value]) => {
        translation = translation.replace(`{${placeholder}}`, value);
      });
    }
    
    return translation;
  };
  
  const changeLocale = (newLocale: SupportedLocale) => {
    const newPath = addLocaleToPath(window.location.pathname, newLocale);
    router.push(newPath);
  };
  
  return {
    t,
    locale,
    changeLocale,
    isLoading: false, // Could add loading state for dynamic imports
  };
}

// Server-side translation helper
export function getServerTranslation(
  locale: SupportedLocale,
  namespace: TranslationNamespaces,
  key: string,
  interpolations?: Record<string, string>
): string {
  let translation = getTranslation(locale, namespace, key);
  
  if (interpolations) {
    Object.entries(interpolations).forEach(([placeholder, value]) => {
      translation = translation.replace(`{${placeholder}}`, value);
    });
  }
  
  return translation;
}

// Helper for conditional locale content
export function getLocalizedContent<T>(
  content: Record<SupportedLocale, T>,
  locale: SupportedLocale
): T {
  return content[locale] || content[defaultLocale];
}

// Date formatting with locale
export function formatDate(
  date: Date,
  locale: SupportedLocale,
  options?: Intl.DateTimeFormatOptions
): string {
  const localeMap = {
    cs: 'cs-CZ',
    en: 'en-US',
  };
  
  return new Intl.DateTimeFormat(localeMap[locale], options).format(date);
}

// Number formatting with locale
export function formatNumber(
  number: number,
  locale: SupportedLocale,
  options?: Intl.NumberFormatOptions
): string {
  const localeMap = {
    cs: 'cs-CZ', 
    en: 'en-US',
  };
  
  return new Intl.NumberFormat(localeMap[locale], options).format(number);
}

// Currency formatting
export function formatCurrency(
  amount: number,
  locale: SupportedLocale,
  currency: string = 'USD'
): string {
  const currencyMap = {
    cs: 'CZK',
    en: 'USD',
  };
  
  const localeMap = {
    cs: 'cs-CZ',
    en: 'en-US', 
  };
  
  return new Intl.NumberFormat(localeMap[locale], {
    style: 'currency',
    currency: currency === 'auto' ? currencyMap[locale] : currency,
  }).format(amount);
}

// Relative time formatting (e.g., "2 hours ago")
export function formatRelativeTime(
  date: Date,
  locale: SupportedLocale
): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  const localeMap = {
    cs: 'cs-CZ',
    en: 'en-US',
  };
  
  const rtf = new Intl.RelativeTimeFormat(localeMap[locale], { numeric: 'auto' });
  
  if (diffDay > 0) return rtf.format(-diffDay, 'day');
  if (diffHour > 0) return rtf.format(-diffHour, 'hour');
  if (diffMin > 0) return rtf.format(-diffMin, 'minute');
  return rtf.format(-diffSec, 'second');
}

// Get all available translations for a namespace (useful for dropdowns)
export function getAllTranslations(
  namespace: TranslationNamespaces,
  locale: SupportedLocale
): Record<string, string> {
  return translations[locale][namespace] as Record<string, string>;
}

// Validate if translation key exists
export function hasTranslation(
  namespace: TranslationNamespaces,
  key: string,
  locale: SupportedLocale
): boolean {
  const namespaceTranslations = translations[locale][namespace] as Record<string, string>;
  return key in namespaceTranslations;
}

// Get browser locale preference with fallback
export function getBrowserLocale(): SupportedLocale {
  if (typeof navigator === 'undefined') return defaultLocale;
  
  const languages = navigator.languages || [navigator.language];
  
  for (const lang of languages) {
    const code = lang.split('-')[0];
    if (code === 'cs') return czechLocale;
    if (code === 'en') return defaultLocale;
  }
  
  return defaultLocale;
}

// Middleware helper for IP-based redirection
export function shouldRedirectToCzech(
  request: Request,
  country?: string
): boolean {
  // If country is Czech Republic, redirect to /cz
  // This would be called from middleware.ts
  return country === 'CZ' || country === 'Czech Republic';
}

export default useTranslation;