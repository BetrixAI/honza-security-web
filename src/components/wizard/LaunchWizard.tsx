/**
 * Launch Wizard komponenta pro ETAPA 8 - Phishing simulation
 * Multi-step wizard s progress indikátorem
 * Owner: Kubca - dashboard wizards
 */

'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Users, Mail, Settings, Calendar } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card, { CardContent } from '@/components/card/Card'

interface LaunchWizardProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (data: any) => void
}

const steps = [
  { id: 1, title: 'Typ kampaně', icon: Mail },
  { id: 2, title: 'Cílení', icon: Users },
  { id: 3, title: 'Nastavení', icon: Settings },
  { id: 4, title: 'Plánování', icon: Calendar }
]

export default function LaunchWizard({ isOpen, onClose, onComplete }: LaunchWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState({
    campaignType: '',
    targets: [],
    settings: {},
    schedule: {}
  })

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    onComplete(wizardData)
    onClose()
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-txt-primary">Vyberte typ kampaně</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Falešné faktury', 'IT podpora', 'COVID-19', 'Obecný phishing'].map(type => (
                <Card key={type} className={`cursor-pointer transition-all ${
                  wizardData.campaignType === type ? 'ring-2 ring-brand-mid' : ''
                }`}>
                  <CardContent 
                    className="p-4 text-center"
                    onClick={() => setWizardData({...wizardData, campaignType: type})}
                  >
                    <Mail className="w-6 h-6 mx-auto mb-2 text-brand-mid" />
                    <div className="text-sm font-medium text-txt-primary">{type}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-txt-primary">Cílová skupina</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded border-border-subtle" />
                <span className="text-txt-primary">Všichni zaměstnanci</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded border-border-subtle" />
                <span className="text-txt-primary">IT oddělení</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded border-border-subtle" />
                <span className="text-txt-primary">Management</span>
              </label>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-txt-primary">Nastavení kampaně</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-2">
                  Doba trvání (dny)
                </label>
                <input 
                  type="number" 
                  defaultValue={14}
                  className="w-full px-3 py-2 bg-bg-card border border-border-subtle rounded-lg text-txt-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-2">
                  Automatické ukončení při dosažení cíle
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-border-subtle" />
                  <span className="text-txt-secondary text-sm">Ukončit při 80% úspěšnosti</span>
                </label>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-txt-primary">Plánování</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-2">
                  Datum spuštění
                </label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 bg-bg-card border border-border-subtle rounded-lg text-txt-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-2">
                  Čas spuštění
                </label>
                <input 
                  type="time" 
                  defaultValue="09:00"
                  className="w-full px-3 py-2 bg-bg-card border border-border-subtle rounded-lg text-txt-primary"
                />
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* Wizard Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-subtle">
                <h2 className="text-xl font-semibold text-txt-primary">
                  Nová phishing simulace
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-txt-muted hover:text-txt-primary transition-colors rounded-lg hover:bg-bg-card-alt"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress indikátor podle ETAPA 8 specifikace */}
              <div className="px-6 py-4 border-b border-border-subtle">
                <div className="flex items-center justify-between mb-2">
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = currentStep === step.id
                    const isCompleted = currentStep > step.id
                    
                    return (
                      <div key={step.id} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                          isActive ? 'bg-brand-mid text-white' :
                          isCompleted ? 'bg-success text-white' :
                          'bg-bg-card-alt text-txt-muted'
                        }`}>
                          {isCompleted ? '✓' : step.id}
                        </div>
                        <div className="ml-2 text-xs text-txt-muted hidden md:block">
                          {step.title}
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-12 h-0.5 mx-4 ${
                            isCompleted ? 'bg-success' : 'bg-border-subtle'
                          }`} />
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="text-xs text-txt-muted">
                  Krok {currentStep} z {steps.length}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-border-subtle">
                <Button 
                  variant="secondary" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Zpět
                </Button>
                
                <div className="flex gap-2">
                  {currentStep < steps.length ? (
                    <Button variant="primary" onClick={nextStep}>
                      Pokračovat
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={handleComplete}>
                      Spustit kampaň
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}