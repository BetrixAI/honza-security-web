'use client'

import React from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import Button from './Button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface AuthErrorProps {
  error?: string
  onRetry?: () => void
  className?: string
}

export default function AuthError({ 
  error, 
  onRetry,
  className = ''
}: AuthErrorProps) {
  const { t } = useTranslation('common')
  
  return (
    <div className={`min-h-screen bg-bg-page flex items-center justify-center ${className}`}>
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-danger/10 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-danger" />
        </div>
        
        <h2 className="text-2xl font-bold text-txt-primary mb-4">
          {t('AUTHENTICATION_ERROR')}
        </h2>
        
        {error && (
          <p className="text-txt-muted mb-6">
            {error}
          </p>
        )}
        
        <p className="text-txt-muted mb-8">
          {t('AUTHENTICATION_ERROR_DESCRIPTION')}
        </p>
        
        <div className="space-y-4">
          {onRetry && (
            <Button 
              onClick={onRetry}
              variant="primary"
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {t('RETRY')}
            </Button>
          )}
          
          <Button 
            onClick={() => window.location.href = '/auth'}
            variant="secondary"
            className="w-full"
          >
            {t('GO_TO_LOGIN')}
          </Button>
        </div>
      </div>
    </div>
  )
} 