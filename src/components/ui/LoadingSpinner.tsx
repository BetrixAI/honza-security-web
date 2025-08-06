'use client'

import React from 'react'
import { useTranslation } from '@/hooks/useTranslation'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LoadingSpinner({ 
  message, 
  size = 'md',
  className = ''
}: LoadingSpinnerProps) {
  const { t } = useTranslation('common')
  
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12', 
    lg: 'h-16 w-16'
  }
  
  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-brand ${sizeClasses[size]} mb-4`}></div>
      {message && (
        <p className={`text-txt-muted ${textSizes[size]}`}>
          {message}
        </p>
      )}
    </div>
  )
}

// Fullscreen loading spinner pro dashboard
export function DashboardLoadingSpinner() {
  const { t } = useTranslation('common')
  
  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center">
      <LoadingSpinner 
        message={t('CHECKING_AUTHENTICATION')} 
        size="lg"
      />
    </div>
  )
} 