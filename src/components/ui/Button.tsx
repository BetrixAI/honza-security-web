'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

// Button varianty podle ETAPA 3 specifikace
const variantClasses = {
  // Primary: pill, gradient brand-dark → brand-light, uppercase, shadow inside
  primary: `
    bg-gradient-to-r from-brand-dark to-brand-light text-white font-semibold uppercase
    rounded-full px-6 py-3 shadow-lg hover:opacity-90 transition-all duration-200
    border border-transparent
    shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
  `,
  
  // Secondary: border 1px brand-mid/50%, bg transparent → hover brand-mid/15%
  secondary: `
    border border-brand-mid/50 bg-transparent text-brand-mid font-semibold
    rounded-full px-6 py-3 hover:bg-brand-mid/15 transition-all duration-200
    shadow-none
  `,
  
  // Outline pro legacy compatibility
  outline: `
    border border-border-subtle bg-transparent text-txt-primary
    rounded-lg px-4 py-2 hover:bg-bg-card-alt transition-colors duration-200
  `
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

export default function Button({ 
  variant = 'primary', 
  size = 'md',
  children, 
  className,
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-brand-mid/60 focus:ring-offset-2 focus:ring-offset-bg-page',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}// Export také jednotlivé varianty pro snadné použití
export const PrimaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="primary" {...props} />
)

export const SecondaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="secondary" {...props} />
)