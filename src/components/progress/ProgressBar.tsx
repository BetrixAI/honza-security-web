'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'success' | 'warning' | 'danger'
  className?: string
  animated?: boolean
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3', 
  lg: 'h-4'
}

// Varianty podle ETAPA 4 specifikace
const variantClasses = {
  primary: 'bg-gradient-to-r from-accent-cyan to-brand-light',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger'
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = false,
  size = 'md',
  variant = 'primary',
  className,
  animated = true
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-txt-primary">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm text-txt-secondary">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className={cn(
        'w-full bg-bg-card-alt rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <motion.div
          className={cn(
            'h-full rounded-full transition-colors duration-200',
            variantClasses[variant]
          )}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={animated ? {
            duration: 0.6,
            ease: 'easeOut'
          } : undefined}
        />
      </div>
      
      {/* Value display for detailed progress */}
      {max !== 100 && (
        <div className="flex justify-between text-xs text-txt-secondary mt-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  )
}
 