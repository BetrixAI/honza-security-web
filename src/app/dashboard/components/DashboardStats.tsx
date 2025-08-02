'use client'

import React from 'react'
import { Shield, CheckCircle, Mail, Award, TrendingUp, Trophy, Target, Star, Zap } from 'lucide-react'
import XPProgressBar from '@/components/dashboard/XPProgressBar'
import BadgeDisplay from '@/components/dashboard/BadgeDisplay'
import { useUserXP, useUserBadges } from '@/hooks/useGameification'
import { useTranslation } from '@/hooks/useTranslation'
import DashboardGrid from '@/components/layout/DashboardGrid'
import Card, { CardHeader, CardContent } from '@/components/card/Card'

interface DashboardStatsProps {
  stats: {
    securityScore: number
    coursesCompleted: number
    phishingDetected: number
    certificationsEarned: number
  }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const { userXP, userLevel, levelProgress, isLoading: xpLoading } = useUserXP()
  const { badges, isLoading: badgesLoading } = useUserBadges()
  const { t } = useTranslation('dashboard')
  
  return (
    <div className="space-y-8">
      {/* XP Progress Section */}
      <div className="security-card">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-400" />
          {t('GAMIFICATION_SYSTEM')}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {!xpLoading ? (
              <XPProgressBar currentXp={userXP} size="lg" />
            ) : (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </div>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-3">{t('BADGES_TITLE')}</h4>
            {!badgesLoading ? (
              <BadgeDisplay 
                earnedBadges={badges.map(b => ({
                  id: b.badgeId,
                  earnedAt: b.earnedAt.toDate(),
                  seen: b.seen
                }))}
                maxDisplay={8}
                size="md"
              />
            ) : (
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <DashboardGrid cols={4} gap="md">
        {/* Security Score */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Shield className="w-5 h-5 text-brand" />
              <span className="text-sm text-txt-secondary">{t('SECURITY_SCORE')}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-txt-primary">{stats.securityScore}%</div>
          </CardContent>
        </Card>

        {/* Courses Completed */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm text-txt-secondary">{t('COURSES_COMPLETED')}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-txt-primary">{stats.coursesCompleted}</div>
          </CardContent>
        </Card>

        {/* Phishing Detected */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Mail className="w-5 h-5 text-warning" />
              <span className="text-sm text-txt-secondary">{t('PHISHING_DETECTED')}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-txt-primary">{stats.phishingDetected}</div>
          </CardContent>
        </Card>

        {/* Current Level */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Trophy className="w-5 h-5 text-brand" />
              <span className="text-sm text-txt-secondary">{t('LEVEL_CURRENT')}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-txt-primary">{userLevel}</div>
          </CardContent>
        </Card>
      </DashboardGrid>
    </div>
  )
}