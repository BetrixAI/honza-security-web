'use client'

import React from 'react'
import Container from '@/components/layout/Container'
import VirusTotalWidget from '@/components/dashboard/VirusTotalWidget'

export default function VirusScannerPage() {
  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-txt-primary mb-2">
            VirusTotal Scanner
          </h1>
          <p className="text-txt-secondary">
            Skenování souborů a URL adres pomocí VirusTotal API pro detekci malwaru a hrozeb
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Drag-n-Drop area + Stats podle specifikace 3.2 */}
          <div className="lg:col-span-2">
            <VirusTotalWidget />
          </div>
          
          {/* Statistiky (min-w 260) */}
          <div className="lg:col-span-1 min-w-[260px]">
            <div className="bg-bg-card rounded-lg border border-border-subtle p-6">
              <h3 className="text-lg font-semibold text-txt-primary mb-4">
                Statistiky skenování
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-txt-secondary">Celkem skenů:</span>
                  <span className="text-txt-primary font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-txt-secondary">Malware detekován:</span>
                  <span className="text-danger font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-txt-secondary">Čisté soubory:</span>
                  <span className="text-success font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-txt-secondary">Tento měsíc:</span>
                  <span className="text-txt-primary font-medium">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent scans table - bude implementováno později */}
        <div className="bg-bg-card rounded-lg border border-border-subtle p-6">
          <h3 className="text-lg font-semibold text-txt-primary mb-4">
            Nedávné skeny
          </h3>
          <div className="text-center py-8 text-txt-secondary">
            Žádné skeny ještě nebyly provedeny
          </div>
        </div>
      </div>
    </Container>
  )
}
 
 