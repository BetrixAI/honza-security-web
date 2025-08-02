import { cookies } from 'next/headers'
import { DecodedIdToken } from 'firebase-admin/auth'
import { getAdminAuthSafely, isServer } from './firebaseAdmin'

/**
 * Ověří Firebase authentication token z cookies na serveru
 * @returns DecodedIdToken | null
 */
export async function getServerUser(): Promise<DecodedIdToken | null> {
  // Kontrola zda běžíme na serveru
  if (!isServer()) {
    console.warn('getServerUser() should only be called on server side')
    return null
  }

  try {
    // Získání cookies z Next.js
    const cookieStore = await cookies()
    const authToken = cookieStore.get('firebase-auth-token')

    if (!authToken?.value) {
      return null
    }

    // Získání Firebase Admin Auth instance
    const adminAuth = getAdminAuthSafely()
    if (!adminAuth) {
      console.error('Firebase Admin Auth is not available')
      return null
    }

    // Ověření ID tokenu
    const decodedToken = await adminAuth.verifyIdToken(authToken.value)
    
    // Kontrola zda token není expirovaný
    const now = Date.now() / 1000
    if (decodedToken.exp < now) {
      console.warn('Firebase token is expired')
      return null
    }

    return decodedToken
  } catch (error) {
    console.error('Error verifying Firebase token:', error)
    return null
  }
}

/**
 * Kontrola zda je uživatel autentifikovaný na serveru
 * @returns boolean
 */
export async function isUserAuthenticated(): Promise<boolean> {
  const user = await getServerUser()
  return user !== null
}

/**
 * Získání user ID z server-side tokenu
 * @returns string | null
 */
export async function getServerUserId(): Promise<string | null> {
  const user = await getServerUser()
  return user?.uid || null
}

/**
 * Získání user emailu z server-side tokenu
 * @returns string | null
 */
export async function getServerUserEmail(): Promise<string | null> {
  const user = await getServerUser()
  return user?.email || null
}

/**
 * Middleware helper pro kontrolu autentifikace
 * @param requiredAuth - zda je požadovaná autentifikace
 * @returns { user: DecodedIdToken | null, isAuthenticated: boolean }
 */
export async function checkAuthentication(requiredAuth: boolean = false) {
  const user = await getServerUser()
  const isAuthenticated = user !== null

  if (requiredAuth && !isAuthenticated) {
    throw new Error('Authentication required')
  }

  return {
    user,
    isAuthenticated,
    userId: user?.uid || null,
    userEmail: user?.email || null
  }
}