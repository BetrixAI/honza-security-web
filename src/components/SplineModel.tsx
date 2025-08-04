'use client'

import { Suspense, useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'

export default function SplineModel() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading 3D model...</div>
      </div>
    )
  }

  return (
    <Suspense fallback={
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading 3D model...</div>
      </div>
    }>
      <div className="absolute inset-0 w-full h-full">
        <Spline 
          scene={process.env.NEXT_PUBLIC_SPLINE_HERO_MODEL_URL || ''} 
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'auto'
          }}
        />
      </div>
    </Suspense>
  )
}