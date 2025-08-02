/**
 * Skeleton loading komponenta pro ETAPA 9 - Micro-animace & Polish
 * Shimmer efekty pro loading states
 * Owner: Kubca - loading states
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  lines?: number
  animate?: boolean
}

export default function Skeleton({ 
  width = '100%', 
  height = '1rem',
  className = '',
  variant = 'rectangular',
  lines = 1,
  animate = true
}: SkeletonProps) {
  const baseClasses = `bg-gradient-to-r from-bg-card-alt via-border-subtle to-bg-card-alt bg-[length:200%_100%] ${
    animate ? 'animate-shimmer' : ''
  }`

  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'rounded h-4'
      case 'circular':
        return 'rounded-full'
      case 'rectangular':
        return 'rounded'
      case 'card':
        return 'rounded-lg'
      default:
        return 'rounded'
    }
  }

  const skeletonStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{
              ...skeletonStyle,
              width: i === lines - 1 ? '75%' : skeletonStyle.width
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={skeletonStyle}
    />
  )
}

// Předpřipravené skeleton komponenty
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`p-6 space-y-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" height={16} />
          <Skeleton variant="text" width="40%" height={14} />
        </div>
      </div>
      <Skeleton variant="text" lines={3} />
      <div className="flex justify-between">
        <Skeleton width={80} height={32} className="rounded-full" />
        <Skeleton width={120} height={32} className="rounded-full" />
      </div>
    </div>
  )
}

export function SkeletonChart({ className = '' }: { className?: string }) {
  return (
    <div className={`p-6 space-y-4 ${className}`}>
      <Skeleton variant="text" width="40%" height={20} />
      <div className="flex items-end justify-between h-32 space-x-2">
        {Array.from({ length: 7 }, (_, i) => (
          <Skeleton 
            key={i} 
            width={24} 
            height={Math.random() * 80 + 20}
            className="rounded-t"
          />
        ))}
      </div>
      <div className="flex justify-between">
        <Skeleton width={60} height={12} />
        <Skeleton width={80} height={12} />
      </div>
    </div>
  )
}

export function SkeletonTable({ rows = 5, className = '' }: { rows?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 p-4 border-b border-border-subtle">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} variant="text" width="70%" height={14} />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-4">
          {Array.from({ length: 4 }, (_, j) => (
            <Skeleton key={j} variant="text" width={j === 0 ? "90%" : "60%"} height={14} />
          ))}
        </div>
      ))}
    </div>
  )
}