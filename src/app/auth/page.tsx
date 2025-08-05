'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import GalaxyBackground from '@/components/GalaxyBackground'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Shield,
  ArrowRight,
  AlertCircle,
  ArrowLeft
} from 'lucide-react'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isResetPassword, setIsResetPassword] = useState(false)
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
  
  const { signIn, signUp, resetPassword, user, loading } = useAuth()
  const { t } = useLanguage()
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
      if (isResetPassword) {
        // Reset hesla
        await resetPassword(formData.email)
        // Zobrazit success zprávu
        alert(t('SUCCESS_RESET_EMAIL_SENT', 'auth'))
        setIsResetPassword(false)
      } else if (isLogin) {
        // Přihlášení
        await signIn(formData.email, formData.password)
      } else {
        // Registrace
        if (formData.password !== formData.confirmPassword) {
          throw new Error(t('ERROR_PASSWORD_MISMATCH', 'auth'))
        }
        
        if (formData.password.length < 6) {
          throw new Error(t('ERROR_PASSWORD_TOO_SHORT', 'auth'))
        }
        
        await signUp(formData.email, formData.password)
      }
      
      // Přesměrování se provede automaticky přes useEffect
    } catch (error: any) {
      console.error('Auth error:', error)
      
          // Překládat Firebase chybové zprávy
    let errorMessage = t('ERROR_UNEXPECTED', 'auth')
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = t('ERROR_USER_NOT_FOUND', 'auth')
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = t('ERROR_WRONG_PASSWORD', 'auth')
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = t('ERROR_INVALID_CREDENTIALS', 'auth')
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = t('ERROR_EMAIL_IN_USE', 'auth')
      } else if (error.code === 'auth/weak-password') {
        errorMessage = t('ERROR_WEAK_PASSWORD', 'auth')
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = t('ERROR_INVALID_EMAIL', 'auth')
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = t('ERROR_TOO_MANY_REQUESTS', 'auth')
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

  const handleCreateDemoAccount = async () => {
    const demoEmail = 'demo@securehero.com'
    const demoPassword = 'demo123456'
    
    try {
      setIsLoading(true)
      setError(null)
      
      await signUp(demoEmail, demoPassword)
      console.log('Demo účet vytvořen:', demoEmail)
    } catch (error: any) {
      console.error('Demo account creation error:', error)
      
      // Pokud účet už existuje, zkus se přihlásit
      if (error.code === 'auth/email-already-in-use') {
        try {
          await signIn(demoEmail, demoPassword)
          console.log('Přihlášen do demo účtu')
        } catch (signInError) {
          console.error('Demo sign in error:', signInError)
          setError('Demo účet nelze vytvořit ani přihlásit')
        }
      } else {
        setError('Demo účet nelze vytvořit: ' + error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Zobrazit loading během kontroly autentifikace
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">{t('AUTH_CHECKING', 'auth')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex overflow-hidden relative">
      {/* Tlačítko zpět - levý horní roh s textem */}
      <motion.button
        onClick={() => router.push('/')}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-6 left-6 z-50 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 shadow-2xl shadow-black/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5 text-white group-hover:text-blue-200 transition-colors duration-300" />
          <span className="text-white group-hover:text-blue-200 transition-colors duration-300 font-medium">
            {t('AUTH_BACK_BUTTON', 'auth')}
          </span>
        </div>
      </motion.button>

      {/* Levá polovina - Modré pozadí s animacemi */}
      <div className="flex-[2] relative overflow-hidden h-screen">
        {/* Animované pozadí */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        
        {/* Galaxie pozadí */}
        <GalaxyBackground />
        
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { x1: 15, y1: 25, x2: 85, y2: 75, duration: 8 },
            { x1: 75, y1: 15, x2: 25, y2: 85, duration: 12 },
            { x1: 45, y1: 80, x2: 65, y2: 20, duration: 10 },
            { x1: 90, y1: 60, x2: 10, y2: 40, duration: 14 },
            { x1: 20, y1: 45, x2: 80, y2: 55, duration: 9 },
            { x1: 60, y1: 90, x2: 40, y2: 10, duration: 11 }
          ].map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              initial={{ 
                x: particle.x1 + "%",
                y: particle.y1 + "%"
              }}
              animate={{
                x: [particle.x1 + "%", particle.x2 + "%"],
                y: [particle.y1 + "%", particle.y2 + "%"],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Logo uprostřed levé strany - pod animovaným pozadím */}
        <div className="absolute inset-0 flex items-center justify-center z-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Jemné rozplývání kolem ikony */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 to-white/15 rounded-full blur-3xl scale-150"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/10 to-white/10 rounded-full blur-2xl scale-125"></div>
            
            {/* Větší originální Shield ikona */}
            <div className="relative">
              <Shield className="w-48 h-48 text-white drop-shadow-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pravá část - Černé pozadí s přihlášením (menší) */}
      <div className="flex-[1.2] bg-black relative flex items-center justify-center p-8 h-screen">
        {/* Zajistí čisté černé pozadí bez prosáknutí animací */}
        <div className="absolute inset-0 bg-black z-0"></div>
        
        {/* Hezký plynulý přechod od černé do ztracena (100% → 0%) */}
        <div className="absolute inset-y-0 -left-40 w-56 bg-gradient-to-r from-transparent via-black/20 via-black/50 via-black/80 to-black z-30 pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isResetPassword ? t('AUTH_RESET_PASSWORD', 'auth') : isLogin ? t('AUTH_WELCOME_BACK', 'auth') : t('AUTH_START_JOURNEY', 'auth')}
            </h2>
            <p className="text-gray-400">
              {isResetPassword
                ? t('AUTH_RESET_SUBTITLE', 'auth')
                : isLogin 
                  ? t('AUTH_LOGIN_SUBTITLE', 'auth')
                  : t('AUTH_REGISTER_SUBTITLE', 'auth')
              }
            </p>
          </div>

          {/* Auth toggles */}
          {!isResetPassword && (
            <div className="flex bg-white/5 rounded-lg p-1 backdrop-blur-sm">
              <button
                onClick={() => {
                  setIsLogin(true)
                  setError(null)
                }}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                  isLogin 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t('AUTH_LOGIN_TAB', 'auth')}
              </button>
              <button
                onClick={() => {
                  setIsLogin(false)
                  setError(null)
                }}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t('AUTH_REGISTER_TAB', 'auth')}
              </button>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              
              {/* Registration specific fields */}
              {!isLogin && !isResetPassword && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('AUTH_FIRST_NAME', 'auth')}
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
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg 
                                   text-white placeholder-gray-400 focus:border-blue-500 
                                   focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                          placeholder={t('AUTH_FIRST_NAME', 'auth')}
                          required={!isLogin}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('AUTH_LAST_NAME', 'auth')}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg 
                                   text-white placeholder-gray-400 focus:border-blue-500 
                                   focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                          placeholder={t('AUTH_LAST_NAME', 'auth')}
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('AUTH_COMPANY', 'auth')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg 
                               text-white placeholder-gray-400 focus:border-blue-500 
                               focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                      placeholder={t('AUTH_COMPANY', 'auth')}
                    />
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('AUTH_EMAIL', 'auth')}
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
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg 
                             text-white placeholder-gray-400 focus:border-blue-500 
                             focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder={t('AUTH_EMAIL', 'auth')}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              {!isResetPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('AUTH_PASSWORD', 'auth')}
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
                      className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg 
                               text-white placeholder-gray-400 focus:border-blue-500 
                               focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm Password for registration */}
              {!isLogin && !isResetPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('AUTH_CONFIRM_PASSWORD', 'auth')}
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
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg 
                               text-white placeholder-gray-400 focus:border-blue-500 
                               focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                      placeholder="••••••••"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Remember me / Forgot password */}
              {isLogin && !isResetPassword && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600 
                               focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
                    />
                    <span className="ml-2 text-sm text-gray-400">{t('AUTH_REMEMBER_ME', 'auth')}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsResetPassword(true)}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    {t('AUTH_FORGOT_PASSWORD', 'auth')}
                  </button>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isResetPassword ? t('AUTH_RESET_BUTTON', 'auth') : isLogin ? t('AUTH_LOGIN_BUTTON', 'auth') : t('AUTH_REGISTER_BUTTON', 'auth')}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>

              {/* Back to login from reset password */}
              {isResetPassword && (
                <button
                  type="button"
                  onClick={() => {
                    setIsResetPassword(false)
                    setError(null)
                  }}
                  className="w-full text-gray-400 hover:text-white transition-colors duration-300 text-center py-2"
                >
                  {t('AUTH_BACK_TO_LOGIN', 'auth')}
                </button>
              )}
            </div>
          </form>

          {/* Demo Account Button */}
          {isLogin && (
            <div className="mt-4">
              <button
                type="button"
                onClick={handleCreateDemoAccount}
                disabled={isLoading}
                className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-gray-600 hover:border-gray-500"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  'Vytvořit/Použít Demo Účet'
                )}
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Email: demo@securehero.com | Heslo: demo123456
              </p>
            </div>
          )}

          {/* Terms */}
          {!isLogin && !isResetPassword && (
            <p className="text-xs text-gray-400 text-center">
              {t('TERMS_AGREEMENT')}{' '}
              <a href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                {t('TERMS_OF_USE')}
              </a>{' '}
              {t('TERMS_AND')}{' '}
              <a href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                {t('PRIVACY_POLICY')}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
} 