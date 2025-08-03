'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Star, Trophy, Zap } from 'lucide-react'
import Card, { CardContent } from '@/components/card/Card'
import ProgressBar from '@/components/progress/ProgressBar'
import { useGameification } from '@/hooks/useGameification'

interface Badge {
  id: string
  name: string
  icon: string
  description: string
  earnedAt?: Date
}

interface GamificationCardProps {
  className?: string
}

export default function GamificationCard({ className }: GamificationCardProps) {
  const { level, xp, nextLevelXp, badges } = useGameification()
  
  // Výpočet progress do dalšího levelu
  const currentLevelXp = Math.pow(level - 1, 2) * 25
  const progressToNext = xp - currentLevelXp
  const xpToNext = nextLevelXp - currentLevelXp
  
  // Mock badges pro ukázku
  const recentBadges: Badge[] = [
    { id: '1', name: 'First Steps', icon: '🚀', description: 'Dokončil první lekci' },
    { id: '2', name: 'Phishing Hunter', icon: '🎣', description: 'Úspěšně rozpoznal phishing' },
    { id: '3', name: 'Security Expert', icon: '🛡️', description: 'Dosáhl level 5' },
  ]

  return (
    <Card className={`overflow-hidden ${className}`} variant="primary">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Level Badge - XL size */}
          <div className="flex flex-col items-center lg:items-start">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-emboss relative"
                style={{
                  filter: 'drop-shadow(0 0 12px #42A5FF88)'
                }}
              >
                {/* Gradient ring */}
                <div className="absolute inset-0 rounded-full" 
                     style={{background: 'conic-gradient(from 0deg, var(--brand-dark) 0%, var(--brand-light) 50%, var(--brand-dark) 100%)'}} />
                <div className="absolute inset-1 bg-bg-card rounded-full" />
                <Trophy className="w-10 h-10 text-brand-light relative z-10" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-bg-card shadow-emboss">
                <span className="text-white font-bold text-sm">{level}</span>
              </div>
            </motion.div>
            <div className="text-center lg:text-left mt-3">
              <h3 className="text-txt-primary font-semibold">Level {level}</h3>
              <p className="text-txt-secondary text-sm">Security Expert</p>
            </div>
          </div>
          
          {/* XP Progress Bar - 100% width */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-txt-primary font-medium">Experience Points</span>
                <span className="text-txt-secondary text-sm">{xp} XP</span>
              </div>
              <ProgressBar
                value={progressToNext}
                max={xpToNext}
                variant="primary"
                size="lg"
                animated={true}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-txt-secondary">
                <span>Level {level}</span>
                <span>{xpToNext - progressToNext} XP do Level {level + 1}</span>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="flex gap-4 text-center">
              <div className="flex-1">
                <div className="text-lg font-bold text-txt-primary">{xp}</div>
                <div className="text-xs text-txt-secondary">Celkem XP</div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-success">{badges.length}</div>
                <div className="text-xs text-txt-secondary">Odznaky</div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-warning">7</div>
                <div className="text-xs text-txt-secondary">Série</div>
              </div>
            </div>
          </div>
          
          {/* Recent badges chips row podle ETAPA 5 specifikace */}
          <div className="lg:w-80 space-y-3">
            <h4 className="text-txt-primary font-medium text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-light" />
              Nedávné odznaky
            </h4>
            <div className="flex flex-wrap gap-2">
              {recentBadges.slice(0, 4).map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  className="group relative"
                >
                  {/* Chip style badge podle specifikace */}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-card-alt rounded-full border border-brand-light/20 hover:border-brand-light/40 transition-all duration-200 cursor-pointer hover:bg-brand-light/5">
                    <span className="text-sm">{badge.icon}</span>
                    <span className="text-xs font-medium text-txt-primary">{badge.name}</span>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-bg-card border border-border-subtle rounded-lg p-2 text-xs whitespace-nowrap shadow-lg backdrop-blur-sm">
                      <div className="text-txt-primary font-medium">{badge.name}</div>
                      <div className="text-txt-muted">{badge.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* More badges indicator */}
              {badges.length > 4 && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-bg-card-alt rounded-full border border-border-subtle text-txt-muted">
                  <span className="text-xs">+{badges.length - 4} dalších</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
 
 