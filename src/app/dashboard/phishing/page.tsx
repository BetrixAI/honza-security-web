'use client'

import React, { useState } from 'react'
import Container from '@/components/layout/Container'
import DashboardGrid from '@/components/layout/DashboardGrid'
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '@/components/card/Card'
import ProgressBar from '@/components/progress/ProgressBar'
import Button from '@/components/ui/Button'
import DonutChart from '@/components/chart/DonutChart'
import LaunchWizard from '@/components/wizard/LaunchWizard'
import { Mail, Target, TrendingUp, AlertTriangle, Play, Users, Calendar, CheckCircle, Eye, MoreHorizontal } from 'lucide-react'

export default function PhishingPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isLaunchWizardOpen, setIsLaunchWizardOpen] = useState(false)

  const campaigns = [
    {
      id: '1',
      name: 'Měsíční test - Falešné faktury',
      description: 'Test rozpoznání podvodných faktur od dodavatelů',
      status: 'active',
      participants: 45,
      successRate: 78,
      startDate: '1. 8. 2024',
      endDate: '31. 8. 2024'
    },
    {
      id: '2',
      name: 'COVID-19 phishing simulace',
      description: 'Simulace phishingových emailů zneužívajících COVID-19',
      status: 'completed',
      participants: 52,
      successRate: 85,
      startDate: '15. 7. 2024',
      endDate: '30. 7. 2024'
    },
    {
      id: '3',
      name: 'IT podpora - reset hesla',
      description: 'Test reakce na falešné požadavky od IT podpory',
      status: 'scheduled',
      participants: 38,
      successRate: 0,
      startDate: '1. 9. 2024',
      endDate: '15. 9. 2024'
    }
  ]

  const stats = {
    totalTests: 156,
    successRate: 82,
    avgResponseTime: '3.2',
    reportedEmails: 23
  }

  // ETAPA 8: Status badges podle specifikace
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-brand/20 text-brand border border-brand/40' // running pulsující
      case 'completed': return 'bg-success/20 text-success border border-success/40' // completed statický
      case 'scheduled': return 'border border-warning/60 text-warning bg-transparent' // scheduled outline
      default: return 'bg-bg-card-alt text-txt-secondary border border-border-subtle'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
      case 'completed': return <CheckCircle className="w-3 h-3" />
      case 'scheduled': return <Calendar className="w-3 h-3" />
      default: return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Probíhá'
      case 'completed': return 'Dokončeno'
      case 'scheduled': return 'Naplánováno'
      default: return 'Neznámý'
    }
  }

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-txt-primary mb-2">
            Phishing simulace
          </h1>
          <p className="text-txt-secondary">
            Testujte a zlepšujte schopnost rozpoznat phishingové útoky
          </p>
        </div>

        {/* Stats Grid */}
        <DashboardGrid cols={4} gap="md">
          <Card className="hover:tilt-3d transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 text-brand mx-auto mb-3" />
              <div className="text-2xl font-bold text-txt-primary">{stats.totalTests}</div>
              <div className="text-sm text-txt-secondary">Celkem testů</div>
            </CardContent>
          </Card>

          <Card className="hover:tilt-3d transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold text-txt-primary">{stats.successRate}%</div>
              <div className="text-sm text-txt-secondary">Úspěšnost</div>
            </CardContent>
          </Card>

          <Card className="hover:tilt-3d transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold text-txt-primary">{stats.avgResponseTime}s</div>
              <div className="text-sm text-txt-secondary">Průměrná odezva</div>
            </CardContent>
          </Card>

          <Card className="hover:tilt-3d transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-danger mx-auto mb-3" />
              <div className="text-2xl font-bold text-txt-primary">{stats.reportedEmails}</div>
              <div className="text-sm text-txt-secondary">Nahlášené emaily</div>
            </CardContent>
          </Card>
        </DashboardGrid>

        {/* Quick Actions s ETAPA 8 Launch Wizard */}
        <div className="flex gap-4">
          <Button 
            variant="primary"
            onClick={() => setIsLaunchWizardOpen(true)}
          >
            <Play className="w-4 h-4" />
            Spustit novou simulaci
          </Button>
          <Button variant="secondary">
            Zobrazit reporty
          </Button>
        </div>

        {/* ETAPA 8: Kampaň karty s donut charty a novými status badges */}
        <div>
          <h2 className="text-xl font-semibold text-txt-primary mb-6">Phishingové kampaně</h2>
          <div className="space-y-4">
            {campaigns.map(campaign => (
              <Card key={campaign.id} className="group hover:scale-[1.002] transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Donut chart s progress kruhy podle ETAPA 8 specifikace */}
                    <div className="flex-shrink-0">
                      <DonutChart 
                        value={campaign.status === 'scheduled' ? 0 : campaign.successRate}
                        size={80}
                        strokeWidth={8}
                        color={campaign.status === 'completed' ? '#3CCB7F' : 
                               campaign.status === 'active' ? '#2E8BFF' : '#9CA4B3'}
                        className="mb-2"
                      />
                      <div className="text-center">
                        <div className="text-xs text-txt-muted">Úspěšnost</div>
                        <div className="text-sm font-medium text-txt-primary">
                          {campaign.participants} účastníků
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-txt-primary group-hover:text-brand transition-colors">
                            {campaign.name}
                          </h3>
                          <p className="text-txt-secondary text-sm mt-1">{campaign.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusColor(campaign.status)}`}>
                            {getStatusIcon(campaign.status)}
                            {getStatusText(campaign.status)}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedCampaign(campaign)
                              setIsDetailModalOpen(true)
                            }}
                            className="p-2 text-txt-muted hover:text-brand transition-colors rounded-lg hover:bg-bg-card-alt"
                            title="Zobrazit detail"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-txt-secondary" />
                          <span className="text-txt-secondary">
                            {campaign.startDate} - {campaign.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-txt-secondary" />
                          <span className="text-txt-secondary">
                            Target: {campaign.participants} uživatelů
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-txt-secondary" />
                          <span className="text-txt-secondary">
                            Click rate: {Math.round(campaign.successRate * 0.8)}%
                          </span>
                        </div>
                      </div>
                      
                      {campaign.status === 'active' && (
                        <ProgressBar
                          value={65}
                          label="Postup kampaně"
                          showPercentage
                          size="sm"
                          variant="primary"
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ETAPA 8: Launch Wizard */}
        <LaunchWizard
          isOpen={isLaunchWizardOpen}
          onClose={() => setIsLaunchWizardOpen(false)}
          onComplete={(data) => {
            console.log('Campaign data:', data)
            // Zde by se volal API pro vytvoření kampaně
          }}
        />
      </div>
    </Container>
  )
}
 
 
 