import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  variant?: 'primary' | 'subtle' | 'danger' | 'success' | 'warning' | 'alt'
  className?: string
  onClick?: () => void
  hover?: boolean
}

// Card varianty podle ETAPA 3 specifikace
const variantClasses = {
  // Nové varianty podle specifikace
  default: 'bg-[var(--bg-card)] border-[#2A324099] shadow-[var(--shadow-card)]',
  alt: 'bg-[var(--bg-card-alt)] border-[#2A32404D]',
  danger: 'bg-[#331616] border-[#FF6B6B66]',
  success: 'bg-[#113320] border-[#3CCB7F66]',
  
  // Legacy compatibility
  primary: 'bg-bg-card border-border-subtle/30 shadow-card',
  subtle: 'bg-bg-card-alt border-border-subtle/30',
  warning: 'bg-bg-card border-warning/20'
}

export default function Card({ 
  children, 
  variant = 'primary', 
  className,
  onClick,
  hover = true
}: CardProps) {
  const Component = onClick ? 'button' : 'div'
  
  return (
    <Component
      onClick={onClick}
      className={cn(
        'rounded-lg border shadow-card transition-all duration-200',
        variantClasses[variant],
        hover && 'hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.42)]',
        onClick && 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand/50',
        className
      )}
    >
      {children}
    </Component>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {children}
    </div>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('px-6 pb-6', className)}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
  level?: 'h1' | 'h2' | 'h3' | 'h4'
}

export function CardTitle({ children, className, level = 'h3' }: CardTitleProps) {
  const Component = level
  const sizeClass = {
    h1: 'text-2xl',
    h2: 'text-xl', 
    h3: 'text-lg',
    h4: 'text-base'
  }[level]
  
  return (
    <Component className={cn(
      'font-semibold text-txt-primary',
      sizeClass,
      className
    )}>
      {children}
    </Component>
  )
}

interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-txt-secondary text-sm mt-1', className)}>
      {children}
    </p>
  )
}
 