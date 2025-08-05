'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, sendPasswordResetEmail, IdTokenResult } from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebaseClient'

// Typy pro AuthContext
interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  getIdToken: () => Promise<string | null>
  isAuthenticated: boolean
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

  // Inicializace Firebase Auth a sledování změn stavu
  useEffect(() => {
    const auth = getFirebaseAuth()
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
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
    })

    return () => unsubscribe()
  }, [])

  // Přihlášení
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const auth = getFirebaseAuth()
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  // Registrace
  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const auth = getFirebaseAuth()
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  }

  // Odhlášení
  const signOut = async (): Promise<void> => {
    try {
      const auth = getFirebaseAuth()
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  // Reset hesla
  const resetPassword = async (email: string): Promise<void> => {
    try {
      const auth = getFirebaseAuth()
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.error('Reset password error:', error)
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

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    getIdToken,
    isAuthenticated
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
  const { user, loading } = useAuth()
  
  useEffect(() => {
    if (!loading && !user) {
      // Přesměrování na přihlášení pokud není uživatel autentifikovaný
      window.location.href = '/auth'
    }
  }, [user, loading])
  
  return { user, loading }
}