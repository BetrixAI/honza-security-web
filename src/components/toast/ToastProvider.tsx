'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertTriangle, Info, Zap, AlertCircle } from 'lucide-react'

interface Toast {
  id: string
  type: 'success' | 'warning' | 'info' | 'error' | 'xp'
  title: string
  message?: string
  duration?: number
  xpAmount?: number
  dismissible?: boolean
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: React.ReactNode
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toastData: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    const toast: Toast = {
      id,
      duration: toastData.type === 'error' ? 6000 : 4000, // Error toasts longer
      dismissible: true,
      ...toastData,
    }

    setToasts(prev => [...prev, toast])

    // Auto-dismiss
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  // Debug listener pro XP toast testování (ETAPA 4)
  React.useEffect(() => {
    const handleDebugXP = (event: CustomEvent) => {
      addToast({
        type: 'xp',
        title: 'XP Získáno!',
        message: 'Gratulujeme k vašemu pokroku',
        xpAmount: event.detail.amount
      })
    }

    window.addEventListener('debugXP', handleDebugXP as EventListener)
    return () => window.removeEventListener('debugXP', handleDebugXP as EventListener)
  }, [addToast])

  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-danger" />
      case 'info':
        return <Info className="w-5 h-5 text-brand" />
      case 'xp':
        return (
          <Zap 
            className="w-5 h-5" 
            style={{
              background: 'linear-gradient(90deg, var(--brand-dark), var(--brand-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          />
        )
      default:
        return <Info className="w-5 h-5 text-brand" />
    }
  }

  const getToastStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'border-success/30 bg-bg-card shadow-lg'
      case 'warning':
        return 'border-warning/30 bg-bg-card shadow-lg'
      case 'error':
        return 'border-danger/30 bg-bg-card shadow-lg'
      case 'info':
        return 'border-brand/30 bg-bg-card shadow-lg'
      case 'xp':
        return 'border-brand-light/30 bg-gradient-to-r from-brand-dark/10 to-brand-light/10 backdrop-blur-[10px] shadow-glow-brand'
      default:
        return 'border-border-subtle bg-bg-card shadow-lg'
    }
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Toast Container - slide-in bottom-center */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 space-y-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`
                min-w-[320px] max-w-md border rounded-lg shadow-card p-4 pointer-events-auto backdrop-blur-lg
                ${getToastStyles(toast.type)}
              `}
            >
              <div className="flex items-start gap-3">
                {getToastIcon(toast.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-txt-primary font-medium text-sm">
                      {toast.title}
                      {toast.type === 'xp' && toast.xpAmount && (
                        <span className="ml-2 text-warning font-bold">
                          +{toast.xpAmount} XP
                        </span>
                      )}
                    </h4>
                    <button
                      onClick={() => removeToast(toast.id)}
                      className="text-txt-secondary hover:text-txt-primary transition-colors p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {toast.message && (
                    <p className="text-txt-secondary text-xs mt-1">
                      {toast.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
 
 
 