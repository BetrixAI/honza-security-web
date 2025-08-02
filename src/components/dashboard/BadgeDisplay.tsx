/**
 * Badge Display Component
 * Shows earned badges with animations and tooltips
 * Owner: Kubca - dashboard gamification
 */

'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Lock } from 'lucide-react'
import { PREDEFINED_BADGES } from '@/lib/gamification'

interface EarnedBadge {
  id: string
  earnedAt: Date
  seen: boolean
}

interface BadgeDisplayProps {
  earnedBadges: EarnedBadge[]
  maxDisplay?: number
  size?: 'sm' | 'md' | 'lg'
  showTooltips?: boolean
  className?: string
}

interface BadgeTooltipProps {
  badge: typeof PREDEFINED_BADGES[keyof typeof PREDEFINED_BADGES]
  earnedAt?: Date
  isLocked?: boolean
}

function BadgeTooltip({ badge, earnedAt, isLocked }: BadgeTooltipProps) {
  return (
    <div className="absolute z-50 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-48">
      <div className="text-sm">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-lg">{badge.icon}</span>
          <span className="font-medium text-white">{badge.id.replace('-', ' ').toUpperCase()}</span>
        </div>
        {isLocked ? (
          <p className="text-gray-400 text-xs">Požadavky dosud nesplněny</p>
        ) : (
          <p className="text-gray-300 text-xs">
            Získáno {earnedAt?.toLocaleDateString('cs-CZ')}
          </p>
        )}
      </div>
      {/* Tooltip arrow */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700" />
      </div>
    </div>
  )
}

export default function BadgeDisplay({ 
  earnedBadges,
  maxDisplay = 5,
  size = 'md',
  showTooltips = true,
  className = ''
}: BadgeDisplayProps) {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null)
  
  // Velikosti podle ETAPA 4 specifikace - 48px kruh
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  }
  
  const iconSize = sizeClasses[size]
  
  // Map earned badges to badge definitions
  const displayBadges = earnedBadges.slice(0, maxDisplay).map(earned => {
    const badgeDefinition = PREDEFINED_BADGES[earned.id as keyof typeof PREDEFINED_BADGES]
    return { ...earned, definition: badgeDefinition }
  }).filter(badge => badge.definition)
  
  // Show locked badges if we have space
  const allBadgeIds = Object.keys(PREDEFINED_BADGES)
  const earnedIds = earnedBadges.map(b => b.id)
  const lockedBadges = allBadgeIds
    .filter(id => !earnedIds.includes(id))
    .slice(0, Math.max(0, maxDisplay - displayBadges.length))
    .map(id => ({
      id,
      definition: PREDEFINED_BADGES[id as keyof typeof PREDEFINED_BADGES],
      isLocked: true
    }))

  if (displayBadges.length === 0 && lockedBadges.length === 0) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="text-center">
          <Award className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">Zatím žádné odznaky</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* Earned badges */}
      {displayBadges.map((badge, index) => (
        <div
          key={badge.id}
          className="relative"
          onMouseEnter={() => showTooltips && setHoveredBadge(badge.id)}
          onMouseLeave={() => setHoveredBadge(null)}
        >
          <motion.div
            className={`${iconSize} rounded-full flex items-center justify-center cursor-pointer relative overflow-hidden`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Conic gradient rim podle specifikace */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, var(--brand-light), var(--brand-dark), var(--brand-light))'
              }}
            />
            <div className={`absolute inset-1 rounded-full bg-bg-card-alt flex items-center justify-center`}>
              <span className="text-brand-light font-bold text-sm">
                {badge.definition.icon}
              </span>
            </div>
            
            {/* New badge indicator */}
            {!badge.seen && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-0 hover:opacity-100 transition-opacity" />
          </motion.div>
          
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltips && hoveredBadge === badge.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <BadgeTooltip 
                  badge={badge.definition} 
                  earnedAt={badge.earnedAt}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      
      {/* Locked badges */}
      {lockedBadges.map((badge, index) => (
        <div
          key={`locked-${badge.id}`}
          className="relative"
          onMouseEnter={() => showTooltips && setHoveredBadge(`locked-${badge.id}`)}
          onMouseLeave={() => setHoveredBadge(null)}
        >
          <motion.div
            className={`${iconSize} rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: (displayBadges.length + index) * 0.1,
              type: "spring"
            }}
          >
            <Lock className="w-3 h-3 text-gray-400" />
          </motion.div>
          
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltips && hoveredBadge === `locked-${badge.id}` && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <BadgeTooltip 
                  badge={badge.definition} 
                  isLocked={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      
      {/* Show more indicator */}
      {earnedBadges.length > maxDisplay && (
        <div className={`${iconSize} rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center`}>
          <span className="text-gray-400 text-xs font-bold">
            +{earnedBadges.length - maxDisplay}
          </span>
        </div>
      )}
    </div>
  )
}