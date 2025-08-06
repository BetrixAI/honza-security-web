'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, sendPasswordResetEmail, IdTokenResult } from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebaseClient'

// Typy pro AuthContext
interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  getIdToken: () => Promise<string | null>
  isAuthenticated: boolean
  clearError: () => void
}

// Vytvoření Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// AuthProvider Props
interface AuthProviderProps {
  children: ReactNode
}

// AuthProvider komponenta
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Inicializace Firebase Auth a sledování změn stavu
  useEffect(() => {
    const auth = getFirebaseAuth()
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setError(null) // Clear any previous errors
      
      // Pokud je uživatel přihlášen, nastavíme token do cookies
      if (user) {
        try {
          const idToken = await user.getIdToken()
          
          // Nastavení cookie s tokenem (httpOnly pomocí API route)
          await fetch('/api/auth/set-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
          })
        } catch (error) {
          console.error('Error setting auth token:', error)
          setError('Chyba při nastavení autentifikace')
        }
      } else {
        // Vymazání cookie při odhlášení
        try {
          await fetch('/api/auth/clear-token', {
            method: 'POST',
          })
        } catch (error) {
          console.error('Error clearing auth token:', error)
        }
      }
      
      setLoading(false)
    }, (error) => {
      console.error('Auth state change error:', error)
      setError('Chyba při kontrole přihlášení')
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Přihlášení
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setError(null)
      const auth = getFirebaseAuth()
      console.log('🔐 Attempting sign in with:', { email, authDomain: auth.config.authDomain })
      await signInWithEmailAndPassword(auth, email, password)
      console.log('✅ Sign in successful')
    } catch (error: any) {
      console.error('❌ Sign in error:', error)
      setError(error.message || 'Chyba při přihlášení')
      throw error
    }
  }

  // Registrace
  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      setError(null)
      const auth = getFirebaseAuth()
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      console.error('Sign up error:', error)
      setError(error.message || 'Chyba při registraci')
      throw error
    }
  }

  // Odhlášení
  const signOut = async (): Promise<void> => {
    try {
      setError(null)
      const auth = getFirebaseAuth()
      await firebaseSignOut(auth)
    } catch (error: any) {
      console.error('Sign out error:', error)
      setError(error.message || 'Chyba při odhlášení')
      throw error
    }
  }

  // Reset hesla
  const resetPassword = async (email: string): Promise<void> => {
    try {
      setError(null)
      const auth = getFirebaseAuth()
      await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
      console.error('Reset password error:', error)
      setError(error.message || 'Chyba při resetování hesla')
      throw error
    }
  }

  // Získání ID tokenu
  const getIdToken = async (): Promise<string | null> => {
    if (!user) return null
    
    try {
      return await user.getIdToken()
    } catch (error) {
      console.error('Error getting ID token:', error)
      return null
    }
  }

  // Kontrola zda je uživatel autentifikovaný
  const isAuthenticated = user !== null

  // Vymazání chyby
  const clearError = () => setError(null)

  const value: AuthContextType = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    getIdToken,
    isAuthenticated,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook pro použití AuthContext
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

// Pomocný hook pro kontrolu autentifikace
export function useRequireAuth() {
  const { user, loading, error } = useAuth()
  
  useEffect(() => {
    if (!loading && !user) {
      // Přesměrování na přihlášení pokud není uživatel autentifikovaný
      window.location.href = '/auth'
    }
  }, [user, loading])
  
  return { user, loading, error }
}