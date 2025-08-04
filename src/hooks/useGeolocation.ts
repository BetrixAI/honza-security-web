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
import type { IPGeolocationResponse, UserGeolocation, SupportedLocale } from '@/types'

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

  const db = getFirebaseFirestore()

  /**
   * Update user's geolocation in Firestore
   */
  const updateUserGeolocation = useCallback(async (
    geoData: UserGeolocation, 
    newLocale?: SupportedLocale
  ) => {
    if (!user?.uid || !db) return

    try {
      const userRef = doc(db, 'users', user.uid)
      const updateData: any = { geolocation: geoData }
      
      if (newLocale && newLocale !== user.locale) {
        updateData.locale = newLocale
      }

      await updateDoc(userRef, updateData)
      setGeolocation(geoData)
    } catch (err) {
      console.error('Failed to update user geolocation:', err)
      throw err
    }
  }, [user?.uid, user?.locale, db])

  /**
   * Detect user's location and automatically set locale
   */
  const detectAndSetLocale = useCallback(async () => {
    if (!user || isLoading) return

    // Skip if geolocation is fresh and locale was already auto-set
    if (user.geolocation && isGeolocationFresh(user.geolocation) && user.geolocation.autoLocaleSet) {
      setGeolocation(user.geolocation)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Get IP geolocation
      const geoData = await getIPGeolocation()
      
      if (!geoData) {
        throw new Error('Failed to detect location')
      }

      // Detect locale from country
      const detectedLocale = detectLocaleFromGeolocation(geoData)
      const shouldChangeLocale = detectedLocale !== user.locale

      // Create UserGeolocation object
      const userGeo = mapToUserGeolocation(geoData, shouldChangeLocale)

      // Update user in Firestore
      await updateUserGeolocation(
        userGeo, 
        shouldChangeLocale ? detectedLocale : undefined
      )

      console.log(`🌍 Location detected: ${geoData.city}, ${geoData.country_name}`)
      console.log(`🗣️ Locale: ${user.locale} → ${detectedLocale}${shouldChangeLocale ? ' (changed)' : ' (unchanged)'}`)

    } catch (err: any) {
      console.error('Geolocation detection failed:', err)
      setError(err.message || 'Failed to detect location')
    } finally {
      setIsLoading(false)
    }
  }, [user, isLoading, updateUserGeolocation])

  /**
   * Refresh geolocation data (force re-detection)
   */
  const refreshGeolocation = useCallback(async () => {
    if (!user || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const geoData = await getIPGeolocation()
      
      if (!geoData) {
        throw new Error('Failed to refresh location')
      }

      const userGeo = mapToUserGeolocation(geoData, false)
      await updateUserGeolocation(userGeo)

    } catch (err: any) {
      console.error('Geolocation refresh failed:', err)
      setError(err.message || 'Failed to refresh location')
    } finally {
      setIsLoading(false)
    }
  }, [user, isLoading, updateUserGeolocation])

  /**
   * Initialize geolocation on user load
   */
  useEffect(() => {
    if (user && !user.geolocation) {
      // Only auto-detect if user has no geolocation data
      detectAndSetLocale()
    } else if (user?.geolocation) {
      setGeolocation(user.geolocation)
    }
  }, [user, detectAndSetLocale])

  return {
    geolocation,
    isLoading,
    error,
    detectAndSetLocale,
    refreshGeolocation,
  }
}