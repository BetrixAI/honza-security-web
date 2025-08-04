'use client'

import React from 'react'
import Container from '@/components/layout/Container'
import DashboardGrid from '@/components/layout/DashboardGrid'
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '@/components/card/Card'
import { Award, Trophy, Star, Download, ExternalLink, Calendar, CheckCircle } from 'lucide-react'

export default function CertificatesPage() {
  const certificates = [
    {
      id: '1',
      name: 'Security Awareness Základy',
      description: 'Úspěšné dokončení základního kurzu kybernetické bezpečnosti',
      earnedAt: '15. 7. 2024',
      validUntil: '15. 7. 2025',
      issuer: 'SecureHero Academy',
      level: 'Bronze',
      xpEarned: 500,
      status: 'active'
    },
    {
      id: '2',
      name: 'Phishing Detection Expert',
      description: 'Certifikace pro rozpoznávání a hlášení phishingových útoků',
      earnedAt: '28. 7. 2024',
      validUntil: '28. 7. 2025',
      issuer: 'SecureHero Academy',
      level: 'Silver',
      xpEarned: 750,
      status: 'active'
    },
    {
      id: '3',
      name: 'Advanced Threat Hunter',
      description: 'Pokročilá certifikace pro detekci a analýzu hrozeb',
      earnedAt: null,
      validUntil: null,
      issuer: 'SecureHero Academy',
      level: 'Gold',
      xpEarned: 1000,
      status: 'locked',
      requirement: 'Vyžaduje Level 10'
    }
  ]

  const badges = [
    { id: '1', name: 'První kroky', icon: '🚀', description: 'Dokončil první lekci', earned: true },
    { id: '2', name: 'Phishing Hunter', icon: '🎣', description: 'Úspěšně rozpoznal 10 phishingů', earned: true },
    { id: '3', name: 'Streak Master', icon: '⚡', description: '7 dní v řadě', earned: true },
    { id: '4', name: 'Security Expert', icon: '🛡️', description: 'Dosáhl Level 5', earned: true },
    { id: '5', name: 'Team Player', icon: '👥', description: 'Pomohl kolegovi', earned: false },
    { id: '6', name: 'Perfect Score', icon: '💯', description: '100% ve 3 testech', earned: false },
  ]

  const stats = {
    totalCertificates: certificates.filter(c => c.status === 'active').length,
    totalBadges: badges.filter(b => b.earned).length,
    totalXp: certificates.filter(c => c.status === 'active').reduce((sum, c) => sum + c.xpEarned, 0),
    validCertificates: certificates.filter(c => c.status === 'active').length
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bronze': return 'from-amber-600 to-amber-400'
      case 'Silver': return 'from-gray-500 to-gray-300'
      case 'Gold': return 'from-yellow-500 to-yellow-300'
      default: return 'from-brand-dark to-brand'
    }
  }

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-txt-primary mb-2">
            Certifikáty a odznaky
          </h1>
          <p className="text-txt-secondary">
            Vaše úspěchy a certifikace v oblasti kybernetické bezpečnosti
          </p>
        </div>

        {/* Stats Grid */}
        <DashboardGrid cols={4} gap="md">
          <Card className="hover:tilt-3d transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold text-txt-primary">{stats.totalCertificates}</div>
              <div className="text-sm text-txt-secondary">Aktivní certifikáty</div>
            </CardContent>
          </Card>

          <Card className="hover:tilt-3d transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-brand mx-auto mb-3" />
              <div className="text-2xl font-bold text-txt-primary">{stats.totalBadges}</div>
              <div className="text-sm text-txt-secondary">Získané odznaky</div>
            </CardContent>
          </Card>

          <Card className="hover:tilt-3d transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold text-txt-primary">{stats.totalXp}</div>
              <div className="text-sm text-txt-secondary">XP z certifikátů</div>
            </CardContent>
          </Card>

          <Card className="hover:tilt-3d transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-danger mx-auto mb-3" />
              <div className="text-2xl font-bold text-txt-primary">{stats.validCertificates}</div>
              <div className="text-sm text-txt-secondary">Platné certifikáty</div>
            </CardContent>
          </Card>
        </DashboardGrid>

        {/* Certificates */}
        <div>
          <h2 className="text-xl font-semibold text-txt-primary mb-6">Certifikáty</h2>
          <div className="space-y-4">
            {certificates.map(cert => (
              <Card key={cert.id} className={`group hover:scale-[1.005] transition-transform duration-200 ${
                cert.status === 'locked' ? 'opacity-60' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${getLevelColor(cert.level)}`}>
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-txt-primary flex items-center gap-2">
                            {cert.name}
                            {cert.status === 'locked' && (
                              <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">
                                Zamčeno
                              </span>
                            )}
                          </h3>
                          <p className="text-txt-secondary text-sm mt-1">{cert.description}</p>
                          {cert.status === 'locked' && cert.requirement && (
                            <p className="text-warning text-sm mt-1">{cert.requirement}</p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getLevelColor(cert.level)} text-white`}>
                          {cert.level}
                        </span>
                      </div>
                      
                      {cert.status === 'active' && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-txt-secondary">Získáno: </span>
                            <span className="text-txt-primary">{cert.earnedAt}</span>
                          </div>
                          <div>
                            <span className="text-txt-secondary">Platnost: </span>
                            <span className="text-txt-primary">{cert.validUntil}</span>
                          </div>
                          <div>
                            <span className="text-txt-secondary">Vydavatel: </span>
                            <span className="text-txt-primary">{cert.issuer}</span>
                          </div>
                          <div>
                            <span className="text-txt-secondary">XP: </span>
                            <span className="text-brand font-medium">+{cert.xpEarned}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {cert.status === 'active' && (
                      <div className="flex gap-2">
                        <button className="p-2 bg-bg-card-alt rounded-lg text-txt-secondary hover:text-brand transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-bg-card-alt rounded-lg text-txt-secondary hover:text-brand transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div>
          <h2 className="text-xl font-semibold text-txt-primary mb-6">Odznaky</h2>
          <DashboardGrid cols={6} gap="md">
            {badges.map(badge => (
              <Card key={badge.id} className={`text-center hover:scale-105 transition-transform duration-200 ${
                !badge.earned ? 'opacity-50' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h3 className="font-semibold text-txt-primary text-sm mb-1">{badge.name}</h3>
                  <p className="text-xs text-txt-secondary">{badge.description}</p>
                  {badge.earned && (
                    <CheckCircle className="w-4 h-4 text-success mx-auto mt-2" />
                  )}
                </CardContent>
              </Card>
            ))}
          </DashboardGrid>
        </div>
      </div>
    </Container>
  )
}
 
 
 