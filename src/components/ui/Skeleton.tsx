import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  lines?: number
}

export default function Skeleton({ 
  className, 
  variant = 'rectangular',
  width,
  height,
  lines = 1 
}: SkeletonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded'
      case 'circular':
        return 'rounded-full'
      case 'rectangular':
      default:
        return 'rounded-lg'
    }
  }

  const style = {
    width: width,
    height: height
  }

  // Shimmer 1.2s as per spec
  const shimmerClasses = `
    relative overflow-hidden bg-bg-card-alt
    before:absolute before:inset-0 before:-translate-x-full 
    before:bg-gradient-to-r before:from-transparent before:via-txt-secondary/10 before:to-transparent
    before:animate-shimmer
  `

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              shimmerClasses,
              getVariantClasses(),
              index === lines - 1 && 'w-3/4' // Last line shorter
            )}
            style={style}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        shimmerClasses,
        getVariantClasses(),
        className
      )}
      style={style}
    />
  )
}
 
 
 