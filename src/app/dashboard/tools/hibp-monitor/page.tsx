'use client'

import React from 'react'
import Container from '@/components/layout/Container'
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '@/components/card/Card'
import { ShieldCheck, Mail, AlertTriangle, Search } from 'lucide-react'

export default function HibpMonitorPage() {
  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-txt-primary mb-2">
            HIBP Monitor
          </h1>
          <p className="text-txt-secondary">
            Monitoring úniku dat pomocí Have I Been Pwned API
          </p>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle level="h3">Kontrola emailové adresy</CardTitle>
            <CardDescription>
              Zkontrolujte, zda nebyla vaše emailová adresa součástí známého úniku dat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Zadejte emailovou adresu..."
                className="flex-1 px-4 py-2 bg-bg-card-alt border border-border-subtle rounded-lg
                         text-txt-primary placeholder-txt-secondary focus:outline-none 
                         focus:ring-2 focus:ring-brand/50"
              />
              <button className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 
                               transition-colors flex items-center gap-2">
                <Search className="w-4 h-4" />
                Zkontrolovat
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-txt-primary">0</div>
              <div className="text-sm text-txt-secondary">Kontrolovaných emailů</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div className="text-2xl font-bold text-txt-primary">0</div>
              <div className="text-sm text-txt-secondary">Detekované úniiky</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-brand/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-brand" />
              </div>
              <div className="text-2xl font-bold text-txt-primary">0</div>
              <div className="text-sm text-txt-secondary">Monitorovaných domén</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Breaches */}
        <Card>
          <CardHeader>
            <CardTitle level="h3">Nedávné úniiky dat</CardTitle>
            <CardDescription>
              Přehled nejnovějších známých úniků dat podle HIBP databáze
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-txt-secondary">
              <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              Načítání dat o únicích...
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}