'use client'

import React from 'react'
import { Shield } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo ikona s gradientem a glow efektem */}
      <div className="relative">
        <div className={`${sizeClasses[size]} relative z-10`}>
          <div className="absolute inset-0 security-gradient-blue rounded-lg opacity-20 blur-sm"></div>
          <div className="relative bg-dark-card rounded-lg p-2 border border-security-blue-600 security-glow-blue">
            <Shield className="w-full h-full text-security-blue-400" />
          </div>
        </div>
      </div>

      {/* Text loga */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold gradient-text-blue leading-none`}>
            SecurityShield
          </span>
          <span className="text-xs text-gray-400 -mt-1">
            Security Awareness Platform
          </span>
        </div>
      )}
    </div>
  )
} 