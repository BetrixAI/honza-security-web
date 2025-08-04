'use client'

import React from 'react'
import Container from '@/components/layout/Container'
import DashboardGrid from '@/components/layout/DashboardGrid'
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '@/components/card/Card'
import { FileText, Download, TrendingUp, BarChart3, PieChart, Calendar, Filter } from 'lucide-react'

export default function ReportsPage() {
  const reports = [
    {
      id: '1',
      name: 'Měsíční security report',
      description: 'Souhrnný report bezpečnostního stavu za srpen 2024',
      type: 'monthly',
      generatedAt: '1. 8. 2024',
      status: 'ready',
      format: 'PDF',
      size: '2.3 MB'
    },
    {
      id: '2',
      name: 'Phishing analýza Q2',
      description: 'Detailní analýza phishingových kampaní za 2. čtvrtletí',
      type: 'quarterly',
      generatedAt: '30. 6. 2024',
      status: 'ready',
      format: 'PDF + Excel',
      size: '4.1 MB'
    },
    {
      id: '3',
      name: 'Compliance audit 2024',
      description: 'Audit dodržování bezpečnostních standardů',
      type: 'annual',
      generatedAt: null,
      status: 'generating',
      format: 'PDF',
      size: null
    },
    {
      id: '4',
      name: 'Uživatelská aktivita',
      description: 'Report aktivity uživatelů v security tréninku',
      type: 'custom',
      generatedAt: '25. 7. 2024',
      status: 'ready',
      format: 'Excel',
      size: '1.8 MB'
    }
  ]

  const metrics = [
    { label: 'Vygenerované reporty', value: 24, change: '+15%', trend: 'up' },
    { label: 'Průměrná velikost', value: '3.2 MB', change: '-8%', trend: 'down' },
    { label: 'Export formáty', value: 4, change: '+1', trend: 'up' },
    { label: 'Automatické reporty', value: 12, change: '0%', trend: 'neutral' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-success/20 text-success'
      case 'generating': return 'bg-warning/20 text-warning'
      case 'error': return 'bg-danger/20 text-danger'
      default: return 'bg-bg-card-alt text-txt-secondary'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready': return 'Připraven'
      case 'generating': return 'Generuje se'
      case 'error': return 'Chyba'
      default: return 'Neznámý'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'monthly': return 'bg-brand/20 text-brand'
      case 'quarterly': return 'bg-warning/20 text-warning'
      case 'annual': return 'bg-danger/20 text-danger'
      case 'custom': return 'bg-success/20 text-success'
      default: return 'bg-bg-card-alt text-txt-secondary'
    }
  }

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-success" />
    if (trend === 'down') return <TrendingUp className="w-4 h-4 text-danger rotate-180" />
    return <div className="w-4 h-4" />
  }

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-txt-primary mb-2">
            Reporty a analýzy
          </h1>
          <p className="text-txt-secondary">
            Compliance reporty, bezpečnostní analýzy a statistiky pro management
          </p>
        </div>

        {/* Metrics Grid */}
        <DashboardGrid cols={4} gap="md">
          {metrics.map((metric, index) => (
            <Card key={index} className="hover:tilt-3d transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-txt-primary">{metric.value}</div>
                  {getTrendIcon(metric.trend)}
                </div>
                <div className="text-sm text-txt-secondary mb-1">{metric.label}</div>
                <div className={`text-xs font-medium ${
                  metric.trend === 'up' ? 'text-success' :
                  metric.trend === 'down' ? 'text-danger' : 'text-txt-secondary'
                }`}>
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </DashboardGrid>

        {/* Quick Actions */}
        <div className="flex gap-4 flex-wrap">
          <button className="px-6 py-3 bg-gradient-to-r from-brand-dark to-brand text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Nový custom report
          </button>
          <button className="px-4 py-3 bg-bg-card-alt border border-border-subtle text-txt-primary rounded-lg hover:bg-bg-card transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtrovat
          </button>
          <button className="px-4 py-3 bg-bg-card-alt border border-border-subtle text-txt-primary rounded-lg hover:bg-bg-card transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Naplánovat
          </button>
        </div>

        {/* Reports List */}
        <div>
          <h2 className="text-xl font-semibold text-txt-primary mb-6">Dostupné reporty</h2>
          <div className="space-y-4">
            {reports.map(report => (
              <Card key={report.id} className="group hover:scale-[1.005] transition-transform duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-brand/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-brand" />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-txt-primary group-hover:text-brand transition-colors">
                            {report.name}
                          </h3>
                          <p className="text-txt-secondary text-sm mt-1">{report.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {getStatusText(report.status)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                            {report.type}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-txt-secondary">Vygenerováno: </span>
                          <span className="text-txt-primary">
                            {report.generatedAt || 'Generuje se...'}
                          </span>
                        </div>
                        <div>
                          <span className="text-txt-secondary">Formát: </span>
                          <span className="text-txt-primary">{report.format}</span>
                        </div>
                        <div>
                          <span className="text-txt-secondary">Velikost: </span>
                          <span className="text-txt-primary">{report.size || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {report.status === 'ready' && (
                            <button className="p-2 bg-brand/10 rounded-lg text-brand hover:bg-brand/20 transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-2 bg-bg-card-alt rounded-lg text-txt-secondary hover:text-brand transition-colors">
                            <BarChart3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Report Templates */}
        <div>
          <h2 className="text-xl font-semibold text-txt-primary mb-6">Šablony reportů</h2>
          <DashboardGrid cols={3} gap="md">
            <Card className="hover:scale-105 transition-transform duration-200 cursor-pointer">
              <CardContent className="p-6 text-center">
                <PieChart className="w-12 h-12 text-brand mx-auto mb-4" />
                <h3 className="font-semibold text-txt-primary mb-2">Security Overview</h3>
                <p className="text-sm text-txt-secondary">Celkový přehled bezpečnostního stavu</p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 transition-transform duration-200 cursor-pointer">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="font-semibold text-txt-primary mb-2">Training Progress</h3>
                <p className="text-sm text-txt-secondary">Postup v bezpečnostním tréninku</p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 transition-transform duration-200 cursor-pointer">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-warning mx-auto mb-4" />
                <h3 className="font-semibold text-txt-primary mb-2">Threat Analysis</h3>
                <p className="text-sm text-txt-secondary">Analýza bezpečnostních hrozeb</p>
              </CardContent>
            </Card>
          </DashboardGrid>
        </div>
      </div>
    </Container>
  )
}
 
 
 