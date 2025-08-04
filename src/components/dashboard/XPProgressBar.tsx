/**
 * XP Progress Bar Component
 * Shows current level, XP progress to next level, and level indicator
 * Owner: Kubca - dashboard XP system
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Zap } from 'lucide-react'
import { getLevelProgress } from '@/lib/gamification'

interface XPProgressBarProps {
  currentXp: number
  className?: string
  showDetails?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function XPProgressBar({ 
  currentXp, 
  className = '', 
  showDetails = true,
  size = 'md' 
}: XPProgressBarProps) {
  const progress = getLevelProgress(currentXp)
  
  const sizeClasses = {
    sm: {
      container: 'h-2',
      text: 'text-xs',
      icon: 'w-3 h-3'
    },
    md: {
      container: 'h-3',
      text: 'text-sm', 
      icon: 'w-4 h-4'
    },
    lg: {
      container: 'h-4',
      text: 'text-base',
      icon: 'w-5 h-5'
    }
  }

  const classes = sizeClasses[size]

  return (
    <div className={`space-y-2 ${className}`}>
      {showDetails && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className={`${classes.icon} text-yellow-400`} />
            <span className={`${classes.text} font-medium text-white`}>
              Level {progress.currentLevel}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className={`${classes.icon} text-blue-400`} />
            <span className={`${classes.text} text-gray-300`}>
              {currentXp.toLocaleString()} XP
            </span>
          </div>
        </div>
      )}
      
      <div className="relative">
        {/* Background bar */}
        <div className={`w-full ${classes.container} bg-gray-800 rounded-full overflow-hidden`}>
          {/* Progress fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress.progressPercent, 100)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </motion.div>
        </div>
        
        {/* Progress percentage text */}
        {size !== 'sm' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-white drop-shadow-lg">
              {Math.round(progress.progressPercent)}%
            </span>
          </div>
        )}
      </div>
      
      {showDetails && (
        <div className="flex items-center justify-between">
          <span className={`${classes.text} text-gray-400`}>
            {progress.xpToNext.toLocaleString()} XP do Level {progress.currentLevel + 1}
          </span>
          <span className={`${classes.text} text-gray-500`}>
            {progress.nextLevelXp.toLocaleString()} XP
          </span>
        </div>
      )}
    </div>
  )
}