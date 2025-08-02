/**
 * Translations index - main i18n exports
 * Owner: Shared - i18n system core
 */

// Czech translations
import { cs } from './cs/common';
import { dashboardCs } from './cs/dashboard';
import { landingCs } from './cs/landing';
import { authCs } from './cs/auth';
import { lessonsCs } from './cs/lessons';

// English translations  
import { en } from './en/common';
import { dashboardEn } from './en/dashboard';
import { landingEn } from './en/landing';
import { authEn } from './en/auth';
import { lessonsEn } from './en/lessons';

// Combined translation objects
export const translations = {
  cs: {
    common: cs,
    dashboard: dashboardCs,
    landing: landingCs,
    auth: authCs,
    lessons: lessonsCs,
  },
  en: {
    common: en,
    dashboard: dashboardEn,
    landing: landingEn,
    auth: authEn,
    lessons: lessonsEn,
  },
};

// Supported locales
export const supportedLocales = ['cs', 'en'] as const;
export type SupportedLocale = typeof supportedLocales[number];

// Default locale
export const defaultLocale: SupportedLocale = 'en';

// Locale for Czech users
export const czechLocale: SupportedLocale = 'cs';

// Type-safe translation keys
export type TranslationNamespaces = keyof typeof translations.en;

// Helper to get translation with fallback
export function getTranslation(
  locale: SupportedLocale,
  namespace: TranslationNamespaces,
  key: string
): string {
  const translation = translations[locale]?.[namespace]?.[key as keyof typeof translations[typeof locale][typeof namespace]];
  
  // Fallback to English if Czech translation missing
  if (!translation && locale === 'cs') {
    return translations.en[namespace]?.[key as keyof typeof translations.en[typeof namespace]] as string || key;
  }
  
  return translation as string || key;
}

// Helper to detect locale from URL
export function getLocaleFromPath(pathname: string): SupportedLocale {
  if (pathname.startsWith('/cz')) {
    return 'cs';
  }
  return 'en';
}

// Helper to add/remove locale from URL
export function addLocaleToPath(pathname: string, locale: SupportedLocale): string {
  // Remove existing locale prefix
  const cleanPath = pathname.replace(/^\/(cs|en)/, '');
  
  if (locale === 'cs') {
    return `/cz${cleanPath}`;
  }
  
  return cleanPath || '/';
}

export default translations;