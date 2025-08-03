/**
 * IP Geolocation service using ipgeolocation.io API
 * Automatic language detection and user location tracking
 * Owner: Shared - i18n and analytics system
 */

import type { IPGeolocationResponse, UserGeolocation, SupportedLocale } from '@/types';
import { serverTimestamp } from 'firebase/firestore';

const IPGEOLOCATION_API_KEY = process.env.NEXT_PUBLIC_IPGEOLOCATION_API_KEY;
const IPGEOLOCATION_BASE_URL = 'https://api.ipgeolocation.io';

/**
 * Fetch geolocation data for current IP address
 * @param ip Optional IP address, if not provided uses client IP
 * @returns Geolocation response from ipgeolocation.io API
 */
export async function getIPGeolocation(ip?: string): Promise<IPGeolocationResponse | null> {
  try {
    if (!IPGEOLOCATION_API_KEY) {
      console.warn('IP Geolocation API key not configured');
      return null;
    }

    const params = new URLSearchParams({
      apiKey: IPGEOLOCATION_API_KEY,
      fields: 'geo,time_zone,currency',
    });

    if (ip) {
      params.append('ip', ip);
    }

    const url = `${IPGEOLOCATION_BASE_URL}/ipgeo?${params.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`IP Geolocation API error: ${response.status} ${response.statusText}`);
    }

    const data: IPGeolocationResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to get IP geolocation:', error);
    return null;
  }
}

/**
 * Detect user's locale based on IP geolocation
 * Czech Republic, Slovakia -> 'cs'
 * All other countries -> 'en'
 */
export function detectLocaleFromGeolocation(geoData: IPGeolocationResponse): SupportedLocale {
  const czechCountries = ['CZ', 'SK']; // Czech Republic, Slovakia
  
  if (czechCountries.includes(geoData.country_code2)) {
    return 'cs';
  }
  
  return 'en';
}

/**
 * Convert API response to UserGeolocation format for Firestore
 */
export function mapToUserGeolocation(
  geoData: IPGeolocationResponse, 
  autoLocaleSet = false
): UserGeolocation {
  return {
    country: geoData.country_name,
    countryCode: geoData.country_code2,
    city: geoData.city,
    region: geoData.state_prov,
    ip: geoData.ip,
    timezone: geoData.time_zone.name,
    currency: geoData.currency.code,
    language: geoData.languages.split(',')[0] || 'en',
    detectedAt: serverTimestamp() as any,
    autoLocaleSet,
  };
}

/**
 * Check if geolocation data is fresh (less than 24 hours old)
 */
export function isGeolocationFresh(geolocation: UserGeolocation): boolean {
  if (!geolocation.detectedAt) return false;
  
  const detectedTime = geolocation.detectedAt as any;
  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  // Handle Firestore timestamp
  const detectedDate = detectedTime.toDate ? detectedTime.toDate() : new Date(detectedTime);
  
  return detectedDate > dayAgo;
}

/**
 * Get country flag emoji from country code
 */
export function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌍';
  
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  
  return String.fromCodePoint(...codePoints);
}

/**
 * Format geolocation for display in admin panel
 */
export function formatGeolocationDisplay(geolocation: UserGeolocation): {
  location: string;
  flag: string;
  timezone: string;
  lastDetected: string;
} {
  const flag = getCountryFlag(geolocation.countryCode);
  const location = `${geolocation.city}, ${geolocation.country}`;
  
  const detectedTime = geolocation.detectedAt as any;
  const detectedDate = detectedTime?.toDate ? detectedTime.toDate() : new Date(detectedTime);
  const lastDetected = detectedDate?.toLocaleDateString() || 'Unknown';
  
  return {
    location,
    flag,
    timezone: geolocation.timezone,
    lastDetected,
  };
}