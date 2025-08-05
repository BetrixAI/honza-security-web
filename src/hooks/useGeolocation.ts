/**
 * React hook for IP geolocation and automatic language detection
 * Integrates with AuthContext and automatically sets user locale
 * Owner: Shared - i18n integration
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { useAuth } from '@/contexts/AuthContext'
import { getFirebaseFirestore } from '@/lib/firebaseClient'
import { 
  getIPGeolocation, 
  detectLocaleFromGeolocation, 
  mapToUserGeolocation,
  isGeolocationFresh 
} from '@/lib/geolocation'
import type { IPGeolocationResponse, UserGeolocation } from '@/types'
import type { SupportedLocale } from '../../locales'

interface UseGeolocationReturn {
  geolocation: UserGeolocation | null
  isLoading: boolean
  error: string | null
  detectAndSetLocale: () => Promise<void>
  refreshGeolocation: () => Promise<void>
}

export function useGeolocation(): UseGeolocationReturn {
  const { user } = useAuth()
  const [geolocation, setGeolocation] = useState<UserGeolocation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Note: Firebase integration disabled for development
  // const db = getFirebaseFirestore()

  /**
   * Update user's geolocation in local state (Firestore disabled for demo)
   */
  const updateUserGeolocation = useCallback(async (
    geoData: UserGeolocation, 
    newLocale?: SupportedLocale
  ) => {
    // For demo purposes, just update local state
    setGeolocation(geoData)
    
    // If locale should change, trigger page redirect
    if (newLocale && typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      const newPath = newLocale === 'cs' ? 
        currentPath.replace(/^\/en/, '/cz') :
        currentPath.replace(/^\/cz/, '/en')
      
      if (newPath !== currentPath) {
        console.log(`🌍 Redirecting to: ${newPath} (locale: ${newLocale})`)
        window.location.href = newPath
      }
    }
  }, [])

  /**
   * Detect user's location and automatically set locale
   */
  const detectAndSetLocale = useCallback(async () => {
    if (isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      // Get IP geolocation
      const geoData = await getIPGeolocation()
      
      if (!geoData) {
        throw new Error('Failed to detect location - API returned no data')
      }

      console.log('🌍 Raw API response:', geoData)

      // Detect locale from country
      const detectedLocale = detectLocaleFromGeolocation(geoData)
      
      // Get current locale from URL
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
      const currentLocale = currentPath.startsWith('/en') ? 'en' : 
                           currentPath.startsWith('/cz') ? 'cs' : 
                           'cs' // default
                           
      const shouldChangeLocale = detectedLocale !== currentLocale

      // Create UserGeolocation object
      const userGeo = mapToUserGeolocation(geoData, shouldChangeLocale)

      // Update user geolocation
      await updateUserGeolocation(
        userGeo, 
        shouldChangeLocale ? detectedLocale : undefined
      )

      // Auto-redirect if locale should change
      if (shouldChangeLocale && typeof window !== 'undefined') {
        const currentPath = window.location.pathname
        const newPath = detectedLocale === 'cs' ? 
          currentPath.replace(/^\/en/, '/cz') :
          currentPath.replace(/^\/cz/, '/en')
        
        if (newPath !== currentPath) {
          console.log(`🔄 Auto-redirecting to: ${newPath}`)
          window.location.href = newPath
          return // Don't continue with the rest
        }
      }

      console.log(`🌍 Location detected: ${geoData.city}, ${geoData.country_name}`)
      console.log(`🗣️ Locale: ${currentLocale} → ${detectedLocale}${shouldChangeLocale ? ' (redirected)' : ' (unchanged)'}`)

    } catch (err: any) {
      console.error('Geolocation detection failed:', err)
      setError(err.message || 'Failed to detect location')
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, updateUserGeolocation])

  /**
   * Refresh geolocation data (force re-detection)
   */
  const refreshGeolocation = useCallback(async () => {
    if (isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const geoData = await getIPGeolocation()
      
      if (!geoData) {
        throw new Error('Failed to refresh location - API returned no data')
      }

      const userGeo = mapToUserGeolocation(geoData, false)
      await updateUserGeolocation(userGeo)

    } catch (err: any) {
      console.error('Geolocation refresh failed:', err)
      setError(err.message || 'Failed to refresh location')
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, updateUserGeolocation])

  /**
   * Initialize geolocation on component mount (disabled auto-detection)
   */
  useEffect(() => {
    // Auto-detection disabled for demo - user must click button
    // detectAndSetLocale()
  }, [])

  return {
    geolocation,
    isLoading,
    error,
    detectAndSetLocale,
    refreshGeolocation,
  }
}