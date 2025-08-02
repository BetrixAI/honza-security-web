/**
 * Donut Chart komponenta pro ETAPA 8 - Phishing simulation
 * Owner: Kubca - dashboard charts
 */

'use client'

import React from 'react'

interface DonutChartProps {
  value: number // 0-100
  size?: number
  strokeWidth?: number
  className?: string
  showPercentage?: boolean
  color?: string
}

export default function DonutChart({ 
  value, 
  size = 80, 
  strokeWidth = 8, 
  className = '',
  showPercentage = true,
  color = 'var(--brand-mid)'
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(42, 50, 64, 0.3)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      
      {/* Center text */}
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-txt-primary">
            {value}%
          </span>
        </div>
      )}
    </div>
  )
}