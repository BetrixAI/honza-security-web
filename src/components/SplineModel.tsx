'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamický import Spline komponenty
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="security-spinner"></div>
    </div>
  )
})

interface SplineModelProps {
  scene: string
  className?: string
  fallback?: React.ReactNode
}

export default function SplineModel({ scene, className = '', fallback }: SplineModelProps) {
  const defaultFallback = (
    <div className={`w-full h-full flex items-center justify-center bg-dark-card rounded-lg ${className}`}>
      <div className="text-center space-y-4">
        <div className="security-spinner mx-auto"></div>
        <p className="text-gray-400 text-sm">Načítání 3D modelu...</p>
      </div>
    </div>
  )

  return (
    <div className={`relative ${className}`}>
      <Suspense fallback={fallback || defaultFallback}>
        <Spline 
          scene={scene}
          className="w-full h-full"
          onLoad={() => console.log('Spline model loaded')}
          onError={(error) => console.error('Spline model error:', error)}
        />
      </Suspense>
    </div>
  )
} 