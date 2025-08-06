'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from '@/hooks/useTranslation'
import { User, Mail, Building } from 'lucide-react'

interface UserProfileProps {
  compact?: boolean
  className?: string
}

export default function UserProfile({ 
  compact = false,
  className = ''
}: UserProfileProps) {
  const { user } = useAuth()
  const { t } = useTranslation('common')

  if (!user) {
    return null
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-lg bg-bg-card-alt ${className}`}>
        <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || user.email || ''}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-txt-primary truncate">
            {user.displayName || user.email?.split('@')[0] || t('USER')}
          </p>
          <p className="text-xs text-txt-muted truncate">
            {user.email}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-4 rounded-lg bg-bg-card-alt border border-border ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || user.email || ''}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-txt-primary truncate">
            {user.displayName || user.email?.split('@')[0] || t('USER')}
          </h3>
          <p className="text-sm text-txt-muted truncate">
            {user.email}
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-txt-muted" />
          <span className="text-txt-muted">{t('EMAIL')}:</span>
          <span className="text-txt-primary truncate">{user.email}</span>
        </div>
        
        {user.displayName && (
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-txt-muted" />
            <span className="text-txt-muted">{t('NAME')}:</span>
            <span className="text-txt-primary">{user.displayName}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm">
          <Building className="w-4 h-4 text-txt-muted" />
          <span className="text-txt-muted">{t('ACCOUNT_TYPE')}:</span>
          <span className="text-txt-primary">{t('FREE_ACCOUNT')}</span>
        </div>
      </div>
    </div>
  )
} 