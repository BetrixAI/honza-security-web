'use client'

import React from 'react'
import Container from '@/components/layout/Container'
import VirusTotalWidget from '@/components/dashboard/VirusTotalWidget'
import { useTranslation } from '@/hooks/useTranslation'

export default function VirusScannerPage() {
  const { t } = useTranslation('dashboard')
  
  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-txt-primary mb-2">
            {t('VIRUS_SCANNER_TITLE')}
          </h1>
          <p className="text-txt-secondary">
            {t('SCAN_WITH_VIRUSTOTAL')}
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
              {t('SCAN_STATISTICS')}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-txt-secondary">{t('TOTAL_SCANS')}:</span>
                <span className="text-txt-primary font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-txt-secondary">{t('MALWARE_DETECTED')}:</span>
                <span className="text-danger font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-txt-secondary">{t('CLEAN_FILES')}:</span>
                <span className="text-success font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-txt-secondary">{t('THIS_MONTH')}:</span>
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
 
 
 