'use client'

import React from 'react'
import Container from '@/components/layout/Container'
import DashboardGrid from '@/components/layout/DashboardGrid'
import GamificationCard from '@/components/dashboard/GamificationCard'
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '@/components/card/Card'
import Button from '@/components/ui/Button'
import PageTransition, { StaggeredList } from '@/components/transitions/PageTransition'
import { AnimatedCard, ScrollReveal } from '@/components/animations/HoverAnimations'
import { Shield, CheckCircle, Mail, Trophy, Eye, Plus, ChevronRight, Play, Award, BookOpen } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import GeolocationTester from '@/components/debug/GeolocationTester'

export default function DashboardPage() {
  const { t } = useTranslation('dashboard')
  // Mock data
  const stats = {
    securityScore: 85,
    coursesCompleted: 12,
    phishingDetected: 23,
    certificationsEarned: 3
  }

  const recentActivities = [
    { icon: CheckCircle, text: 'Dokončil jste "Základy phishingu"', time: '2 hodiny', color: 'text-success' },
    { icon: Mail, text: 'Nahlásili jste podezřelý email', time: '1 den', color: 'text-warning' },
    { icon: Award, text: 'Získali jste certifikát "Email Security"', time: '3 dny', color: 'text-brand' },
    { icon: Play, text: 'Spustili jste kurz "Pokročilé sociální inženýrství"', time: '5 dní', color: 'text-brand' }
  ]

  const recommendedCourses = [
    {
      id: '1',
      title: 'Bezpečnost hesel a autentifikace',
      description: 'Best practices pro vytváření a správu bezpečných hesel',
      duration: '30 min',
      level: 'Začátečník',
    },
    {
      id: '2',
      title: 'Malware a ransomware',
      description: 'Jak rozpoznat a předcházet malwarovým útokům',
      duration: '50 min',
      level: 'Pokročilý',
    }
  ]

  return (
    <PageTransition>
      <Container>
        <div className="space-y-8">
          {/* ① Gamifikace (full-width card, h=96px) */}
          <ScrollReveal direction="up" delay={0}>
            <GamificationCard />
          </ScrollReveal>

          {/* ② KPI-grid podle ETAPA 3 specifikace - nové Card varianty */}
          <ScrollReveal direction="up" delay={0.1}>
            <DashboardGrid cols={4} gap="lg">
              {/* Security Score */}
              <AnimatedCard variant="lift">
                <Card variant="default" className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Shield className="w-8 h-8 text-brand-mid flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-txt-primary">{stats.securityScore}%</div>
                        <div className="text-sm text-txt-muted">{t('SECURITY_SCORE')}</div>
                        <div className="text-xs text-success mt-1">+2% {t('THIS_MONTH')}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* Completed Training */}
              <AnimatedCard variant="glow">
                <Card variant="alt" className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-8 h-8 text-success flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-txt-primary">{stats.coursesCompleted}</div>
                        <div className="text-sm text-txt-muted">{t('COMPLETED_TRAINING')}</div>
                        <div className="text-xs text-success mt-1">+3 {t('LAST_WEEK')}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* Phishing Success */}
              <AnimatedCard variant="tilt">
                <Card variant="default" className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Mail className="w-8 h-8 text-warning flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-txt-primary">{stats.phishingDetected}</div>
                        <div className="text-sm text-txt-muted">{t('PHISHING_SUCCESS')}</div>
                        <div className="text-xs text-success mt-1">+5% {t('SUCCESS_RATE')}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* Level */}
              <AnimatedCard variant="scale">
                <Card variant="alt" className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Trophy className="w-8 h-8 text-brand-light flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-txt-primary">5</div>
                        <div className="text-sm text-txt-muted">{t('LEVEL')}</div>
                        <div className="text-xs text-brand-light mt-1">350 {t('NEXT_LEVEL_XP')}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </DashboardGrid>
          </ScrollReveal>

          {/* ③ 2-kolon-grid gap-32 */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Nedávná aktivita (timeline) */}
              <AnimatedCard variant="lift">
                <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle level="h3">{t('RECENT_ACTIVITY')}</CardTitle>
                <Button variant="primary" size="sm">
                  <Eye className="w-3 h-3" />
                  {t('VIEW_ALL')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Timeline podle ETAPA 5 specifikace s vertikální brand-bar */}
              <div className="space-y-0 relative">
                {/* Vertikální brand-bar 2px - přesně vycentrovaná s tečkami */}
                <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-light to-brand-dark opacity-60"></div>
                
                {recentActivities.map((activity, index) => (
                  <div key={index} className="relative flex items-start gap-4 py-3 hover:bg-bg-card-alt/30 transition-all duration-300 cursor-pointer group rounded-lg px-2 -mx-2">
                    {/* Timeline dot s hover radar efektem */}
                    <div className="relative z-10 w-3 h-3 rounded-full bg-brand-light border-2 border-bg-card flex-shrink-0 mt-1 group-hover:scale-110 transition-all duration-300">
                      {/* Větší radar efekt při hover na celou položku */}
                      <div className="absolute -inset-2 rounded-full bg-brand-light opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
                      <div className="absolute -inset-1 rounded-full bg-brand-light opacity-0 group-hover:opacity-30 group-hover:animate-pulse"></div>
                      <div className="absolute -inset-3 rounded-full bg-brand-light opacity-0 group-hover:opacity-10 group-hover:animate-ping" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <activity.icon className={`w-4 h-4 ${activity.color} group-hover:scale-110 transition-transform duration-300`} />
                        <p className="text-txt-primary text-sm font-medium group-hover:text-brand-light transition-colors duration-300">{activity.text}</p>
                      </div>
                      <p className="text-txt-muted text-xs group-hover:text-txt-primary transition-colors duration-300">Před {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
                </Card>
              </AnimatedCard>

              {/* Doporučené kroky (recommendations feed) */}
              <AnimatedCard variant="glow">
                <Card className="self-start">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle level="h3">{t('RECOMMENDED_COURSES')}</CardTitle>
                <Button variant="primary" size="sm">
                  <Plus className="w-3 h-3" />
                  {t('EXPLORE')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedCourses.map((course) => (
                  <div key={course.id} className="p-4 rounded-lg bg-bg-card-alt hover:bg-bg-card-alt/80 transition-colors cursor-pointer group">
                    <div className="flex items-start gap-4">
                      {/* Mini-thumbnail podle ETAPA 5 specifikace - opravené */}
                      <div className="w-12 h-12 rounded-lg flex-shrink-0 relative bg-gradient-to-br from-brand-dark to-brand-light flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-txt-primary font-medium group-hover:text-brand transition-colors">{course.title}</h4>
                        <p className="text-txt-muted text-sm mt-1">{course.description}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs text-txt-muted">{course.duration}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            course.level === 'Začátečník' ? 'bg-success/20 text-success' :
                            course.level === 'Pokročilý' ? 'bg-warning/20 text-warning' :
                            'bg-danger/20 text-danger'
                          }`}>
                            {course.level}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-txt-muted group-hover:text-brand-light transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
                </Card>
              </AnimatedCard>
            </div>
          </ScrollReveal>

          {/* Development: Geolocation Tester */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="mt-8">
              <GeolocationTester />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </PageTransition>
  )
}