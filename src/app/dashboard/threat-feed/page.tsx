'use client'

import React, { useState, useEffect } from 'react'
import Container from '@/components/layout/Container'
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '@/components/card/Card'
import Button from '@/components/ui/Button'
import { AlertTriangle, Shield, TrendingUp, AlertCircle, ExternalLink, Clock, Search, RotateCw } from 'lucide-react'

export default function ThreatFeedPage() {
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const threats = [
    {
      id: '1',
      title: 'Nová ransomware kampaň zaměřená na české firmy',
      description: 'Skupina LockBit 3.0 cílí na malé a střední podniky pomocí spear-phishing emailů',
      severity: 'critical',
      timestamp: '2 hodiny',
      source: 'NÚKIB',
      category: 'Ransomware'
    },
    {
      id: '2',
      title: 'Kritická zranitelnost v Microsoft Exchange',
      description: 'CVE-2024-1234 umožňuje vzdálené spuštění kódu bez autentizace',
      severity: 'high',
      timestamp: '5 hodin',
      source: 'Microsoft',
      category: 'Vulnerability'
    },
    {
      id: '3',
      title: 'Phishingová kampaň zneužívající jméno České pošty',
      description: 'Útočníci rozesílají falešné notifikace o nedoručených zásilkách',
      severity: 'medium',
      timestamp: '1 den',
      source: 'CSIRT.CZ',
      category: 'Phishing'
    },
    {
      id: '4',
      title: 'Nový botnet Mirai variant detekován v ČR',
      description: 'Cílí na IoT zařízení s výchozími hesly',
      severity: 'medium',
      timestamp: '2 dny',
      source: 'Shodan',
      category: 'Malware'
    }
  ]

  // ETAPA 7: Severity colors podle specifikace
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-danger border-danger/20 bg-danger/10'
      case 'high': return 'text-orange-500 border-orange-500/20 bg-orange-500/10'
      case 'medium': return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10'
      case 'low': return 'text-success border-success/20 bg-success/10'
      default: return 'text-txt-secondary border-border-subtle bg-bg-card-alt'
    }
  }

  const getSeverityStripColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-danger'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-success'
      default: return 'bg-txt-secondary'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle
      case 'high': return AlertCircle
      default: return Shield
    }
  }

  // Auto-refresh každých 30s podle ETAPA 7 specifikace
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true)
      setTimeout(() => {
        setLastRefresh(new Date())
        setIsRefreshing(false)
      }, 1000)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Filter logic
  const filteredThreats = threats.filter(threat => {
    const matchesSeverity = !selectedSeverity || threat.severity === selectedSeverity
    const matchesSearch = !searchQuery || 
      threat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSeverity && matchesSearch
  })

  const severityFilters = ['critical', 'high', 'medium', 'low']

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-txt-primary mb-2">
            Reálné hrozby
          </h1>
          <p className="text-txt-secondary">
            Aktuální bezpečnostní hrozby a varování pro váš region a odvětví
          </p>
        </div>

        {/* ETAPA 7: Filtry nahoře - pill buttony pro severity + search box s lupou */}
        <div className="bg-bg-card-alt rounded-lg p-4 border border-border-subtle">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Severity filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSeverity(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  !selectedSeverity 
                    ? 'bg-brand-mid text-white' 
                    : 'bg-bg-card text-txt-muted hover:text-txt-primary hover:bg-bg-card border border-border-subtle'
                }`}
              >
                Vše
              </button>
              {severityFilters.map(severity => (
                <button
                  key={severity}
                  onClick={() => setSelectedSeverity(severity === selectedSeverity ? null : severity)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all capitalize ${
                    selectedSeverity === severity
                      ? getSeverityColor(severity).replace('text-', 'bg-').replace('border-', '').replace('bg-', '') + ' text-white'
                      : 'bg-bg-card text-txt-muted hover:text-txt-primary hover:bg-bg-card border border-border-subtle'
                  }`}
                  style={selectedSeverity === severity ? { 
                    backgroundColor: severity === 'critical' ? '#FF6B6B' : 
                                   severity === 'high' ? '#f97316' :
                                   severity === 'medium' ? '#eab308' : '#3CCB7F',
                    color: 'white'
                  } : {}}
                >
                  {severity}
                </button>
              ))}
            </div>

            {/* Search box a auto-refresh indikátor */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-txt-muted" />
                <input
                  type="text"
                  placeholder="Hledat hrozby..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-bg-card border border-border-subtle rounded-lg text-txt-primary placeholder-txt-muted focus:outline-none focus:ring-2 focus:ring-brand-mid/60 w-64"
                />
              </div>
              
              <div className="flex items-center gap-2 text-xs text-txt-muted">
                <RotateCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>
                  {isRefreshing ? 'Aktualizace...' : `Aktualizováno ${lastRefresh.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats podle ETAPA 7 specifikace */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card variant="alt">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-danger">{filteredThreats.filter(t => t.severity === 'critical').length}</div>
              <div className="text-sm text-txt-secondary">Kritické</div>
            </CardContent>
          </Card>
          <Card variant="alt">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-orange-500">{filteredThreats.filter(t => t.severity === 'high').length}</div>
              <div className="text-sm text-txt-secondary">Vysoké</div>
            </CardContent>
          </Card>
          <Card variant="alt">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-yellow-500">{filteredThreats.filter(t => t.severity === 'medium').length}</div>
              <div className="text-sm text-txt-secondary">Střední</div>
            </CardContent>
          </Card>
          <Card variant="alt">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-success">{filteredThreats.filter(t => t.severity === 'low').length}</div>
              <div className="text-sm text-txt-secondary">Nízké</div>
            </CardContent>
          </Card>
        </div>

        {/* ETAPA 7: Timeline threat feed s severity strip vlevo */}
        <div className="relative">
          {/* Vertikální timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border-subtle"></div>
          
          <div className="space-y-6">
            {filteredThreats.map((threat, index) => {
              const Icon = getSeverityIcon(threat.severity)
              return (
                <div key={threat.id} className="relative">
                  {/* Timeline tečka podle severity */}
                  <div className={`absolute left-4 w-4 h-4 rounded-full border-2 border-bg-page ${getSeverityStripColor(threat.severity)} z-10`}></div>
                  
                  {/* Threat karta s severity strip vlevo */}
                  <div className="ml-12">
                    <Card className="group hover:scale-[1.002] transition-all duration-200 relative">
                      {/* Severity strip vlevo podle ETAPA 7 specifikace */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${getSeverityStripColor(threat.severity)}`}></div>
                      
                      <CardContent className="p-6 pl-8">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getSeverityColor(threat.severity)}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-txt-primary group-hover:text-brand transition-colors">
                                  {threat.title}
                                </h3>
                                <p className="text-txt-secondary text-sm mt-1">{threat.description}</p>
                              </div>
                              <ExternalLink className="w-4 h-4 text-txt-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-txt-secondary flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {threat.timestamp} ago
                              </span>
                              <span className="text-txt-secondary">
                                Zdroj: <span className="text-txt-primary">{threat.source}</span>
                              </span>
                              <span className="px-2 py-1 bg-bg-card-alt rounded-full text-xs font-medium text-txt-secondary">
                                {threat.category}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getSeverityColor(threat.severity)}`}>
                                {threat.severity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Container>
  )
}
 
 