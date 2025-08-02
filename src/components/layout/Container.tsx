import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl', 
  lg: 'max-w-7xl',
  xl: 'max-w-[1200px]',
  full: 'max-w-none'
}

export default function Container({ children, className, size = 'xl' }: ContainerProps) {
  return (
    <div className={cn(
      'mx-auto px-8',
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  )
}