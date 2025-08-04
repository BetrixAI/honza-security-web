'use client'

import React from 'react'
import Container from '@/components/layout/Container'
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from '@/components/card/Card'
import { User, Bell, Shield, Palette, Globe, Key, Mail, Smartphone } from 'lucide-react'

export default function SettingsPage() {
  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-txt-primary mb-2">
            Nastavení
          </h1>
          <p className="text-txt-secondary">
            Správa účtu, předvoleb a bezpečnostních nastavení
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle level="h3" className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profil uživatele
              </CardTitle>
              <CardDescription>
                Základní informace o vašem účtu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-1">
                  Jméno a příjmení
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-bg-card-alt border border-border-subtle rounded-lg text-txt-primary focus:outline-none focus:ring-2 focus:ring-brand/60"
                  placeholder="Jan Novák"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 bg-bg-card-alt border border-border-subtle rounded-lg text-txt-primary focus:outline-none focus:ring-2 focus:ring-brand/60"
                  placeholder="jan.novak@firma.cz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-1">
                  Pozice
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-bg-card-alt border border-border-subtle rounded-lg text-txt-primary focus:outline-none focus:ring-2 focus:ring-brand/60"
                  placeholder="IT Specialist"
                />
              </div>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-brand-dark to-brand text-white rounded-lg hover:opacity-90 transition-opacity">
                Uložit změny
              </button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle level="h3" className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Oznámení
              </CardTitle>
              <CardDescription>
                Nastavení emailových a push notifikací
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-txt-primary">Nové kurzy</div>
                  <div className="text-xs text-txt-secondary">Upozornění na nové školení</div>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-txt-primary">Phishing testy</div>
                  <div className="text-xs text-txt-secondary">Notifikace o nových simulacích</div>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-txt-primary">Bezpečnostní výstrahy</div>
                  <div className="text-xs text-txt-secondary">Kritické bezpečnostní informace</div>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-txt-primary">Týdenní report</div>
                  <div className="text-xs text-txt-secondary">Souhrn aktivity za týden</div>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle level="h3" className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Bezpečnost
              </CardTitle>
              <CardDescription>
                Nastavení zabezpečení vašeho účtu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-txt-primary">Dvoufaktorová autentizace</div>
                  <div className="text-xs text-txt-secondary">Zapnuto přes SMS</div>
                </div>
                <button className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-success/20 text-success">
                  Aktivní
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-txt-primary">Změna hesla</div>
                  <div className="text-xs text-txt-secondary">Naposledy změněno před 30 dny</div>
                </div>
                <button className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-bg-card-alt text-txt-primary hover:bg-brand hover:text-white transition-colors">
                  Změnit
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-txt-primary">Aktivní relace</div>
                  <div className="text-xs text-txt-secondary">3 aktivní zařízení</div>
                </div>
                <button className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-bg-card-alt text-txt-primary hover:bg-danger hover:text-white transition-colors">
                  Spravovat
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle level="h3" className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Předvolby
              </CardTitle>
              <CardDescription>
                Personalizace rozhraní a chování
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-2">
                  Jazyk rozhraní
                </label>
                <select className="w-full px-3 py-2 bg-bg-card-alt border border-border-subtle rounded-lg text-txt-primary focus:outline-none focus:ring-2 focus:ring-brand/60">
                  <option>Čeština</option>
                  <option>English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-2">
                  Časové pásmo
                </label>
                <select className="w-full px-3 py-2 bg-bg-card-alt border border-border-subtle rounded-lg text-txt-primary focus:outline-none focus:ring-2 focus:ring-brand/60">
                  <option>Europe/Prague</option>
                  <option>UTC</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-txt-primary">Tmavý režim</div>
                  <div className="text-xs text-txt-secondary">Tmavé barevné schéma</div>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-txt-primary">Kompaktní zobrazení</div>
                  <div className="text-xs text-txt-secondary">Menší rozestupy v UI</div>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Export */}
        <Card>
          <CardHeader>
            <CardTitle level="h3">Export dat</CardTitle>
            <CardDescription>
              Stáhněte si vaše data v různých formátech
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <button className="px-4 py-2 bg-bg-card-alt border border-border-subtle text-txt-primary rounded-lg hover:bg-bg-card transition-colors">
                Export profilu (JSON)
              </button>
              <button className="px-4 py-2 bg-bg-card-alt border border-border-subtle text-txt-primary rounded-lg hover:bg-bg-card transition-colors">
                Historie kurzů (CSV)
              </button>
              <button className="px-4 py-2 bg-bg-card-alt border border-border-subtle text-txt-primary rounded-lg hover:bg-bg-card transition-colors">
                Certifikáty (PDF)
              </button>
              <button className="px-4 py-2 bg-danger/20 border border-danger/30 text-danger rounded-lg hover:bg-danger hover:text-white transition-colors">
                Smazat účet
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
 
 