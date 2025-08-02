'use client'

import React from 'react'
import Container from '@/components/layout/Container'
import DashboardGrid from '@/components/layout/DashboardGrid'
import GamificationCard from '@/components/dashboard/GamificationCard'
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '@/components/card/Card'
import Button from '@/components/ui/Button'
import PageTransition, { StaggeredList } from '@/components/transitions/PageTransition'
import { AnimatedCard, ScrollReveal } from '@/components/animations/HoverAnimations'
import { Shield, CheckCircle, Mail, Trophy, Eye, Plus, ChevronRight, Play, Award, BookOpen, 
TrendingUp, Zap, Activity, Star, Clock, Users, AlertTriangle, CheckCircle2, Flame, Sparkles, Target, Crown } from 'lucide-react'
import ProgressBar from '@/components/progress/ProgressBar'

export default function DashboardPage() {
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
      <Container className="dashboard-container">
        <div className="space-y-8">
          {/* ① Gamifikace (full-width card, h=96px) */}
          <ScrollReveal direction="up" delay={0}>
            <GamificationCard />
          </ScrollReveal>

          {/* ② KPI-grid podle ETAPA 3 specifikace - nové Card varianty */}
          <ScrollReveal direction="up" delay={0.1}>
            <DashboardGrid cols={4} gap="lg">
              {/* 🚀 COSMIC Security Score */}
              <AnimatedCard variant="lift">
                <Card variant="default" className="h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-light/10 to-brand-dark/5"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light/5 rounded-full -translate-y-8 translate-x-8"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="relative">
                        <div className="p-4 bg-gradient-to-br from-brand-light to-brand-dark rounded-xl shadow-lg">
                          <Shield className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-success text-sm font-medium">
                          <TrendingUp className="w-4 h-4" />
                          +2%
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-black bg-gradient-to-r from-brand-light to-brand-dark bg-clip-text text-transparent">
                          {stats.securityScore}%
                        </p>
                        <Flame className="w-5 h-5 text-warning animate-pulse" />
                      </div>
                      <p className="text-txt-muted text-sm font-semibold">Security Score</p>
                      <ProgressBar value={stats.securityScore} variant="primary" size="sm" showPercentage={false} />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* 🏆 COSMIC Training Card */}
              <AnimatedCard variant="glow">
                <Card variant="alt" className="h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-success/5"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-success/10 rounded-full translate-y-6 -translate-x-6"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="relative">
                        <div className="p-4 bg-gradient-to-br from-success to-success/80 rounded-xl shadow-lg">
                          <CheckCircle2 className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-brand-light rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-success text-sm font-medium">
                          <Plus className="w-4 h-4" />
                          3 nové
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-black text-success">
                          {stats.coursesCompleted}
                        </p>
                        <Trophy className="w-5 h-5 text-warning animate-bounce" />
                      </div>
                      <p className="text-txt-muted text-sm font-semibold">Completed Training</p>
                      <div className="flex items-center gap-2 text-xs text-success">
                        <Activity className="w-3 h-3" />
                        <span>Z minulého týdne</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* 🎯 COSMIC Phishing Card */}
              <AnimatedCard variant="tilt">
                <Card variant="default" className="h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-warning/10 to-danger/5"></div>
                  <div className="absolute top-0 left-0 w-20 h-20 bg-warning/10 rounded-full -translate-y-4 -translate-x-4"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="relative">
                        <div className="p-4 bg-gradient-to-br from-warning to-danger rounded-xl shadow-lg">
                          <Target className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-danger rounded-full flex items-center justify-center">
                          <Zap className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-success text-sm font-medium">
                          <TrendingUp className="w-4 h-4" />
                          +5%
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-black text-warning">
                          {stats.phishingDetected}
                        </p>
                        <AlertTriangle className="w-5 h-5 text-danger animate-pulse" />
                      </div>
                      <p className="text-txt-muted text-sm font-semibold">Phishing Success</p>
                      <div className="flex items-center gap-2 text-xs text-success">
                        <Shield className="w-3 h-3" />
                        <span>Úspěšnost roste</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* 👑 COSMIC Level Card */}
              <AnimatedCard variant="scale">
                <Card variant="alt" className="h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-brand-light/5"></div>
                  <div className="absolute bottom-0 right-0 w-28 h-28 bg-accent-cyan/5 rounded-full translate-y-8 translate-x-8"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="relative">
                        <div className="p-4 bg-gradient-to-br from-accent-cyan to-brand-light rounded-xl shadow-lg">
                          <Trophy className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                          <Crown className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-accent-cyan text-sm font-medium">
                          <Star className="w-4 h-4" />
                          Expert
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-black text-accent-cyan">
                          5
                        </p>
                        <Sparkles className="w-5 h-5 text-warning animate-spin" style={{ animationDuration: '3s' }} />
                      </div>
                      <p className="text-txt-muted text-sm font-semibold">Level</p>
                      <div className="space-y-1">
                        <ProgressBar value={70} variant="primary" size="sm" showPercentage={false} />
                        <div className="flex items-center gap-2 text-xs text-accent-cyan">
                          <Zap className="w-3 h-3" />
                          <span>350 XP do Level 6</span>
                        </div>
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
              {/* 🌟 COSMIC Timeline */}
              <AnimatedCard variant="lift">
                <Card className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-light/5 to-brand-dark/5"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-brand-light to-brand-dark rounded-lg">
                          <Activity className="w-5 h-5 text-white" />
                        </div>
                        <CardTitle level="h3" className="bg-gradient-to-r from-brand-light to-brand-dark bg-clip-text text-transparent">
                          Nedávná aktivita
                        </CardTitle>
                      </div>
                      <Button variant="primary" size="sm" className="shadow-lg">
                        <Eye className="w-3 h-3" />
                        Zobrazit vše
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    {/* COSMIC Timeline s vylepšenými efekty */}
                    <div className="space-y-0 relative">
                      {/* Vertikální brand-bar s glow efektem */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-light to-brand-dark opacity-80 shadow-lg shadow-brand-light/20"></div>
                      
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="relative flex items-start gap-4 py-4 group hover:bg-bg-card-alt/30 rounded-lg transition-all duration-300">
                          {/* COSMIC Timeline dot s animacemi */}
                          <div className="relative z-10 flex-shrink-0 mt-1">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-brand-light to-brand-dark border-2 border-bg-card shadow-lg ml-[16px] group-hover:scale-110 transition-transform duration-300">
                              <div className="absolute inset-0 rounded-full bg-brand-light/30 animate-ping group-hover:animate-pulse"></div>
                            </div>
                          </div>
                          
                          {/* Enhanced Content */}
                          <div className="flex-1 min-w-0 pb-2">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 rounded-lg ${
                                activity.color === 'text-success' ? 'bg-success/20' :
                                activity.color === 'text-warning' ? 'bg-warning/20' :
                                activity.color === 'text-brand-light' ? 'bg-brand-light/20' :
                                'bg-danger/20'
                              } group-hover:scale-110 transition-transform duration-300`}>
                                <activity.icon className={`w-4 h-4 ${activity.color}`} />
                              </div>
                              <p className="text-txt-primary text-sm font-medium group-hover:text-brand-light transition-colors duration-300">{activity.text}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-txt-muted" />
                              <p className="text-txt-muted text-xs">Před {activity.time}</p>
                              <div className="flex-1"></div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ChevronRight className="w-4 h-4 text-brand-light" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* 🎓 COSMIC Doporučené kurzy */}
              <AnimatedCard variant="glow">
                <Card className="self-start relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-brand-light/5"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-success to-brand-light rounded-lg">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <CardTitle level="h3" className="bg-gradient-to-r from-success to-brand-light bg-clip-text text-transparent">
                          Doporučené kurzy
                        </CardTitle>
                      </div>
                      <Button variant="primary" size="sm" className="shadow-lg">
                        <Plus className="w-3 h-3" />
                        Prozkoumat
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-4">
                      {recommendedCourses.map((course, index) => (
                        <div key={course.id} className="p-4 rounded-xl bg-gradient-to-r from-bg-card-alt to-bg-card-alt/50 hover:from-bg-card-alt/80 hover:to-bg-card-alt/30 transition-all duration-300 cursor-pointer group border border-border-subtle/30 hover:border-brand-light/40 shadow-lg hover:shadow-xl">
                          <div className="flex items-start gap-4">
                            {/* COSMIC Course Icon */}
                            <div className="relative">
                              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-dark to-brand-light flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <BookOpen className="w-7 h-7 text-white drop-shadow-lg" />
                              </div>
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                                <Star className="w-2.5 h-2.5 text-white" />
                              </div>
                              {/* Pulsing ring effect */}
                              <div className="absolute inset-0 rounded-xl bg-brand-light/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              <div>
                                <h4 className="text-txt-primary font-semibold group-hover:text-brand-light transition-colors duration-300 text-base">
                                  {course.title}
                                </h4>
                                <p className="text-txt-muted text-sm mt-1 group-hover:text-txt-primary transition-colors duration-300">
                                  {course.description}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-xs text-txt-muted">
                                  <Clock className="w-3 h-3" />
                                  <span>{course.duration}</span>
                                </div>
                                <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                                  course.level === 'Začátečník' ? 'bg-success/20 text-success border border-success/30' :
                                  course.level === 'Pokročilý' ? 'bg-warning/20 text-warning border border-warning/30' :
                                  'bg-danger/20 text-danger border border-danger/30'
                                }`}>
                                  {course.level}
                                </span>
                                <div className="flex items-center gap-1 text-xs text-brand-light font-medium">
                                  <Zap className="w-3 h-3" />
                                  <span>+{25 + index * 5} XP</span>
                                </div>
                              </div>
                              
                              {/* Progress bar for recommended courses */}
                              <div className="space-y-1">
                                <ProgressBar 
                                  value={Math.floor(Math.random() * 60) + 20} 
                                  variant="primary" 
                                  size="sm" 
                                  showPercentage={false}
                                  className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-txt-muted">Pokrok</span>
                                  <span className="text-brand-light font-medium">
                                    {Math.floor(Math.random() * 60) + 20}% dokončeno
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-center gap-2">
                              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                <ChevronRight className="w-5 h-5 text-brand-light" />
                              </div>
                              <div className="w-2 h-2 rounded-full bg-brand-light/40 group-hover:bg-brand-light group-hover:animate-pulse transition-all duration-300"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>
          </ScrollReveal>

          {/* 🌌 COSMIC ADVANCED STATS SECTION */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              {/* Real-time Threat Map */}
              <AnimatedCard variant="lift">
                <Card className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-danger/10 to-warning/5"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-danger/5 rounded-full -translate-y-8 translate-x-8"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-danger to-warning rounded-xl shadow-lg">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle level="h4" className="text-danger">Hrozby dnes</CardTitle>
                        <CardDescription>Real-time monitoring</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-txt-muted">Blokované útoky</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-danger rounded-full animate-pulse"></div>
                          <span className="text-xl font-bold text-danger">247</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-txt-muted">Phishing pokusy</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                          <span className="text-xl font-bold text-warning">31</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-txt-muted">Bezpečné skenování</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                          <span className="text-xl font-bold text-success">1,204</span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-danger/10 rounded-lg border border-danger/20">
                        <div className="flex items-center gap-2 text-danger text-sm font-medium">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Vysoká aktivita detekována</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* Team Performance */}
              <AnimatedCard variant="glow">
                <Card className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-light/10 to-accent-cyan/5"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-light/10 rounded-full translate-y-6 -translate-x-6"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-brand-light to-accent-cyan rounded-xl shadow-lg">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle level="h4" className="text-brand-light">Týmová výkonnost</CardTitle>
                        <CardDescription>Celková úroveň</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-black text-brand-light mb-2">92%</div>
                        <div className="text-sm text-txt-muted">Celkové skóre týmu</div>
                        <ProgressBar value={92} variant="primary" size="md" showPercentage={false} className="mt-3" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="text-center p-3 bg-success/10 rounded-lg">
                          <div className="text-lg font-bold text-success">156</div>
                          <div className="text-xs text-txt-muted">Aktivních uživatelů</div>
                        </div>
                        <div className="text-center p-3 bg-brand-light/10 rounded-lg">
                          <div className="text-lg font-bold text-brand-light">28</div>
                          <div className="text-xs text-txt-muted">Nových certifikátů</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-success text-sm font-medium">
                        <TrendingUp className="w-4 h-4" />
                        <span>+15% za poslední měsíc</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>

              {/* Quick Actions */}
              <AnimatedCard variant="scale">
                <Card className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-brand-dark/5"></div>
                  <div className="absolute top-0 left-0 w-20 h-20 bg-accent-cyan/10 rounded-full -translate-y-4 -translate-x-4"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-accent-cyan to-brand-dark rounded-xl shadow-lg">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle level="h4" className="text-accent-cyan">Rychlé akce</CardTitle>
                        <CardDescription>Nejčastěji používané</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-3">
                      <Button variant="primary" className="w-full justify-start shadow-lg">
                        <Play className="w-4 h-4 mr-2" />
                        Spustit nové školení
                      </Button>
                      <Button variant="secondary" className="w-full justify-start">
                        <Target className="w-4 h-4 mr-2" />
                        Phishing test
                      </Button>
                      <Button variant="secondary" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Skenovat soubor
                      </Button>
                      <Button variant="secondary" className="w-full justify-start">
                        <Award className="w-4 h-4 mr-2" />
                        Zobrazit certifikáty
                      </Button>
                      <div className="mt-4 p-3 bg-accent-cyan/10 rounded-lg border border-accent-cyan/20">
                        <div className="flex items-center gap-2 text-accent-cyan text-sm font-medium">
                          <Sparkles className="w-4 h-4" />
                          <span>Tip: Zkus nové funkce AI asistenta!</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>
          </ScrollReveal>

          {/* 🚀 COSMIC ACHIEVEMENTS SHOWCASE */}
          <ScrollReveal direction="up" delay={0.4}>
            <div className="mt-12">
              <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-warning/10 via-brand-light/10 to-accent-cyan/10"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-brand-light/5 rounded-full -translate-y-48"></div>
                <CardHeader className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-4 bg-gradient-to-br from-warning to-brand-light rounded-xl shadow-lg">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle level="h2" className="bg-gradient-to-r from-warning to-brand-light bg-clip-text text-transparent">
                        Nedávná úspěchy
                      </CardTitle>
                      <CardDescription>Vaše nejnovější achievementy</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { icon: Flame, title: "Security Expert", desc: "Dokončeno 50+ školení", color: "text-warning", bg: "bg-warning/20" },
                      { icon: Target, title: "Phishing Hunter", desc: "100% úspěšnost v testech", color: "text-danger", bg: "bg-danger/20" },
                      { icon: Crown, title: "Team Leader", desc: "Nejvyšší skóre týmu", color: "text-accent-cyan", bg: "bg-accent-cyan/20" }
                    ].map((achievement, index) => (
                      <div key={index} className="group">
                        <div className="p-6 rounded-xl bg-bg-card-alt/50 border border-border-subtle/30 hover:border-brand-light/40 transition-all duration-300 cursor-pointer hover:scale-105">
                          <div className="flex flex-col items-center text-center space-y-4">
                            <div className={`p-4 ${achievement.bg} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                              <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                            </div>
                            <div>
                              <h4 className="font-bold text-txt-primary text-lg group-hover:text-brand-light transition-colors duration-300">
                                {achievement.title}
                              </h4>
                              <p className="text-txt-muted text-sm mt-1">{achievement.desc}</p>
                            </div>
                            <div className="flex items-center gap-1 text-warning text-sm font-medium">
                              <Star className="w-4 h-4" />
                              <span>Získáno dnes</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </PageTransition>
  )
}