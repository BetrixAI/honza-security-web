'use client'

import React from 'react'
import Container from '@/components/layout/Container'
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '@/components/card/Card'
import { Hash, Clock, AlertTriangle } from 'lucide-react'

export default function HashScannerPage() {
  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-txt-primary mb-2">
            Hash Scanner
          </h1>
          <p className="text-txt-secondary">
            Analýza hash hodnot souborů - připravuje se
          </p>
        </div>

        <Card variant="subtle">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-warning" />
            </div>
            <CardTitle level="h3" className="mb-2">Připravuje se</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              Hash Scanner bude umožňovat analýzu hash hodnot souborů pro detekci známých hrozeb.
              Tato funkce bude dostupná v nadcházející aktualizaci.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}