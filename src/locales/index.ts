/**
 * Translations index - main i18n exports
 * Owner: Shared - i18n system core
 */

// Czech translations
import { cs } from './cs/common';
import { dashboard as dashboardCs } from './cs/dashboard';
import { landing as landingCs } from './cs/landing';
import { auth as authCs } from './cs/auth';
import { lessons as lessonsCs } from './cs/lessons';

// English translations  
import { en } from './en/common';
import { dashboard as dashboardEn } from './en/dashboard';
import { landing as landingEn } from './en/landing';
import { auth as authEn } from './en/auth';
import { lessons as lessonsEn } from './en/lessons';

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