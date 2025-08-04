'use client'

import React from 'react'
import Container from '@/components/layout/Container'
import DashboardGrid from '@/components/layout/DashboardGrid'
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '@/components/card/Card'
import { FileSearch, ShieldCheck, Hash, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ToolsPage() {
  const router = useRouter()

  const tools = [
    {
      id: 'virus-scanner',
      title: 'VirusTotal Scanner',
      description: 'Skenování souborů a URL adres pomocí VirusTotal API',
      icon: FileSearch,
      href: '/dashboard/tools/virus-scanner',
      status: 'active'
    },
    {
      id: 'hibp-monitor',
      title: 'HIBP Monitor',
      description: 'Monitoring úniku dat pomocí Have I Been Pwned',
      icon: ShieldCheck,
      href: '/dashboard/tools/hibp-monitor',
      status: 'active'
    },
    {
      id: 'hash-scanner',
      title: 'Hash Scanner',
      description: 'Analýza hash hodnot souborů',
      icon: Hash,
      href: '/dashboard/tools/hash-scanner',
      status: 'coming-soon'
    }
  ]

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-txt-primary mb-2">
            Bezpečnostní nástroje
          </h1>
          <p className="text-txt-secondary">
            Kolekce nástrojů pro analýzu bezpečnostních hrozeb a skenování
          </p>
        </div>

        <DashboardGrid cols={3} gap="lg">
          {tools.map(tool => (
            <Card 
              key={tool.id}
              onClick={tool.status === 'active' ? () => router.push(tool.href) : undefined}
              className={tool.status === 'coming-soon' ? 'opacity-60' : ''}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-brand/20 rounded-lg flex items-center justify-center">
                    <tool.icon className="w-6 h-6 text-brand" />
                  </div>
                  {tool.status === 'active' && (
                    <ArrowRight className="w-4 h-4 text-txt-secondary ml-auto" />
                  )}
                  {tool.status === 'coming-soon' && (
                    <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full ml-auto">
                      Připravuje se
                    </span>
                  )}
                </div>
                <CardTitle level="h3">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </DashboardGrid>
      </div>
    </Container>
  )
}
 
 
 