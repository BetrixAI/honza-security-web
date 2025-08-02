'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Shield,
  ArrowRight,
  Chrome,
  Github,
  AlertCircle
} from 'lucide-react'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { signIn, signUp, user, loading } = useAuth()
  const router = useRouter()

  // Přesměrování pokud je uživatel již přihlášen
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      if (isLogin) {
        // Přihlášení
        await signIn(formData.email, formData.password)
      } else {
        // Registrace
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Hesla se neshodují')
        }
        
        if (formData.password.length < 6) {
          throw new Error('Heslo musí mít alespoň 6 znaků')
        }
        
        await signUp(formData.email, formData.password)
      }
      
      // Přesměrování se provede automaticky přes useEffect
    } catch (error: any) {
      console.error('Auth error:', error)
      
      // Překládat Firebase chybové zprávy
      let errorMessage = 'Nastala neočekávaná chyba'
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Uživatel s tímto emailem neexistuje'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Nesprávné heslo'
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email je již používán jiným účtem'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Heslo je příliš slabé'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Neplatný email'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialAuth = (provider: string) => {
    // TODO: Implementovat Firebase social auth
    console.log('Social auth with:', provider)
  }

  // Zobrazit loading během kontroly autentifikace
  if (loading) {
    return (
      <Layout showFooter={false}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="security-spinner w-8 h-8 mx-auto mb-4"></div>
            <p className="text-gray-400">Ověřuji přihlášení...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Animované pozadí */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 security-gradient-blue rounded-full opacity-5 blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 security-gradient-red rounded-full opacity-5 blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="relative z-10 max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 security-gradient-blue rounded-xl flex items-center justify-center security-glow-blue">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Vítejte zpět' : 'Začněte svou cestu'}
            </h2>
            <p className="text-gray-400">
              {isLogin 
                ? 'Přihlaste se do svého účtu SecurityShield' 
                : 'Vytvořte si účet a začněte chránit svou firmu'
              }
            </p>
          </div>

          {/* Auth toggles */}
          <div className="flex bg-dark-surface rounded-lg p-1">
            <button
              onClick={() => {
                setIsLogin(true)
                setError(null)
              }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                isLogin 
                  ? 'bg-security-blue-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Přihlášení
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError(null)
              }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                !isLogin 
                  ? 'bg-security-blue-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Registrace
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="security-card">
              
              {/* Registration specific fields */}
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Jméno
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-dark-border rounded-lg 
                                   text-white placeholder-gray-400 focus:border-security-blue-600 
                                   focus:ring-2 focus:ring-security-blue-600/20 transition-all duration-300"
                          placeholder="Jan"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Příjmení
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg 
                                   text-white placeholder-gray-400 focus:border-security-blue-600 
                                   focus:ring-2 focus:ring-security-blue-600/20 transition-all duration-300"
                          placeholder="Novák"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Společnost
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg 
                               text-white placeholder-gray-400 focus:border-security-blue-600 
                               focus:ring-2 focus:ring-security-blue-600/20 transition-all duration-300"
                      placeholder="Vaše společnost"
                    />
                  </div>
                </>
              )}

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-dark-border rounded-lg 
                             text-white placeholder-gray-400 focus:border-security-blue-600 
                             focus:ring-2 focus:ring-security-blue-600/20 transition-all duration-300"
                    placeholder="vas@email.cz"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Heslo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-dark-surface border border-dark-border rounded-lg 
                             text-white placeholder-gray-400 focus:border-security-blue-600 
                             focus:ring-2 focus:ring-security-blue-600/20 transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-security-blue-400 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password for registration */}
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Potvrdit heslo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-dark-border rounded-lg 
                               text-white placeholder-gray-400 focus:border-security-blue-600 
                               focus:ring-2 focus:ring-security-blue-600/20 transition-all duration-300"
                      placeholder="••••••••"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Remember me / Forgot password */}
              {isLogin && (
                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-dark-border bg-dark-surface text-security-blue-600 
                               focus:ring-security-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg"
                    />
                    <span className="ml-2 text-sm text-gray-400">Zapamatovat si mě</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-security-blue-400 hover:text-security-blue-300 transition-colors duration-300"
                  >
                    Zapomenuté heslo?
                  </button>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-security-primary group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="security-spinner w-5 h-5 mx-auto"></div>
                ) : (
                  <>
                    {isLogin ? 'Přihlásit se' : 'Vytvořit účet'}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social auth */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-bg text-gray-400">Nebo pokračujte s</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialAuth('google')}
                className="w-full inline-flex justify-center py-3 px-4 border border-dark-border 
                         rounded-lg bg-dark-surface text-gray-300 hover:bg-dark-card 
                         hover:border-security-blue-600 transition-all duration-300 group"
              >
                <Chrome className="w-5 h-5 group-hover:text-security-blue-400 transition-colors duration-300" />
                <span className="ml-2">Google</span>
              </button>

              <button
                onClick={() => handleSocialAuth('github')}
                className="w-full inline-flex justify-center py-3 px-4 border border-dark-border 
                         rounded-lg bg-dark-surface text-gray-300 hover:bg-dark-card 
                         hover:border-security-blue-600 transition-all duration-300 group"
              >
                <Github className="w-5 h-5 group-hover:text-security-blue-400 transition-colors duration-300" />
                <span className="ml-2">GitHub</span>
              </button>
            </div>
          </div>

          {/* Terms */}
          {!isLogin && (
            <p className="text-xs text-gray-400 text-center">
              Registrací souhlasíte s našimi{' '}
              <a href="/terms" className="text-security-blue-400 hover:text-security-blue-300 transition-colors duration-300">
                podmínkami použití
              </a>{' '}
              a{' '}
              <a href="/privacy" className="text-security-blue-400 hover:text-security-blue-300 transition-colors duration-300">
                zásadami ochrany soukromí
              </a>
            </p>
          )}
        </div>
      </div>
    </Layout>
  )
} 