'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import DashboardLayout from './DashboardLayout'
import DashboardOverview from './DashboardOverview'
import DashboardTraining from './DashboardTraining'
import DashboardPhishing from './DashboardPhishing'
import { Award, FileText, Settings } from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="security-spinner"></div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />
      case 'training':
        return <DashboardTraining />
      case 'phishing':
        return <DashboardPhishing />
      case 'certificates':
        return (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Certifikáty</h3>
            <p className="text-gray-400">Tato sekce je ve vývoji</p>
          </div>
        )
      case 'reports':
        return (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Reporty</h3>
            <p className="text-gray-400">Tato sekce je ve vývoji</p>
          </div>
        )
      case 'settings':
        return (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Nastavení</h3>
            <p className="text-gray-400">Tato sekce je ve vývoji</p>
          </div>
        )
      default:
        return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  )
}