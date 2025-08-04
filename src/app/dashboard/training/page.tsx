'use client'

import React from 'react'
import Container from '@/components/layout/Container'
import DashboardGrid from '@/components/layout/DashboardGrid'
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '@/components/card/Card'
import ProgressBar from '@/components/progress/ProgressBar'
import { useTranslation } from '@/hooks/useTranslation'
import { BookOpen, Clock, Trophy, TrendingUp, Play, CheckCircle } from 'lucide-react'

export default function TrainingPage() {
  const { t } = useTranslation('dashboard')
  
  const courses = [
    {
      id: '1',
      title: t('CYBERSEC_BASICS_TITLE'),
      description: t('CYBERSEC_BASICS_DESC'),
      progress: 75,
      duration: '45 min',
      level: t('BEGINNER'),
      xp: 100
    },
    {
      id: '2', 
      title: t('PHISHING_TITLE'),
      description: t('PHISHING_DESC'),
      progress: 30,
      duration: '60 min',
      level: t('INTERMEDIATE'),
      xp: 150
    },
    {
      id: '3',
      title: t('PASSWORD_TITLE'),
      description: t('PASSWORD_DESC'),
      progress: 0,
      duration: '30 min',
      level: t('BEGINNER'),
      xp: 80
    }
  ]

  const stats = {
    completed: 12,
    inProgress: 3,
    totalXp: 1250,
    streak: 7
  }

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-txt-primary mb-2">
            {t('TRAINING_AND_COURSES')}
          </h1>
          <p className="text-txt-secondary">
            {t('EXPAND_CYBERSEC_KNOWLEDGE')}
          </p>
        </div>

        {/* Stats Grid */}
        <DashboardGrid cols={4} gap="md">
          <Card className="hover:tilt-3d transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-success mx-auto mb-3" />
                          <div className="text-2xl font-bold text-txt-primary">{stats.completed}</div>
            <div className="text-sm text-txt-secondary">{t('COMPLETED_COURSES')}</div>
            </CardContent>
          </Card>

          <Card className="hover:tilt-3d transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-warning mx-auto mb-3" />
                          <div className="text-2xl font-bold text-txt-primary">{stats.inProgress}</div>
            <div className="text-sm text-txt-secondary">{t('IN_PROGRESS')}</div>
            </CardContent>
          </Card>

          <Card className="hover:tilt-3d transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-brand mx-auto mb-3" />
                          <div className="text-2xl font-bold text-txt-primary">{stats.totalXp}</div>
            <div className="text-sm text-txt-secondary">{t('TOTAL_XP')}</div>
            </CardContent>
          </Card>

          <Card className="hover:tilt-3d transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-danger mx-auto mb-3" />
                          <div className="text-2xl font-bold text-txt-primary">{stats.streak} {t('STREAK_DAYS')}</div>
            <div className="text-sm text-txt-secondary">{t('STREAK')}</div>
            </CardContent>
          </Card>
        </DashboardGrid>

        {/* Courses */}
        <div>
          <h2 className="text-xl font-semibold text-txt-primary mb-6">{t('YOUR_COURSES')}</h2>
          <div className="space-y-4">
            {courses.map(course => (
              <Card key={course.id} className="group hover:scale-[1.01] transition-transform duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-brand/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-brand" />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-txt-primary group-hover:text-brand transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-txt-secondary text-sm mt-1">{course.description}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-txt-secondary flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                course.level === t('BEGINNER') ? 'bg-success/20 text-success' :
                      course.level === t('INTERMEDIATE') ? 'bg-warning/20 text-warning' :
                          'bg-danger/20 text-danger'
                        }`}>
                          {course.level}
                        </span>
                        <span className="text-brand font-medium">+{course.xp} XP</span>
                      </div>
                      
                      <ProgressBar
                        value={course.progress}
                        showPercentage
                        size="sm"
                        variant="primary"
                      />
                    </div>

                    <button className="p-3 bg-brand/10 rounded-lg text-brand hover:bg-brand/20 transition-colors">
                      <Play className="w-5 h-5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
 
 
 