'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Shield, 
  BarChart3,
  BookOpen,
  Mail,
  Award,
  FileText,
  Settings,
  Bell,
  Plus,
  User,
  LogOut
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function DashboardLayout({ children, activeTab, setActiveTab }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const sidebarItems = [
    { id: 'overview', label: 'Přehled', icon: BarChart3 },
    { id: 'training', label: 'Školení', icon: BookOpen },
    { id: 'phishing', label: 'Phishing testy', icon: Mail },
    { id: 'certificates', label: 'Certifikáty', icon: Award },
    { id: 'reports', label: 'Reporty', icon: FileText },
    { id: 'settings', label: 'Nastavení', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 bg-black/40 backdrop-blur-xl border-r border-security-blue-600/20 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 security-gradient-blue rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold">Security Dashboard</h1>
                <p className="text-gray-400 text-sm">Váš bezpečnostní přehled</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-security-blue-600/20 text-security-blue-400 border border-security-blue-600/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          
          {/* User Profile */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-security-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">
                    {user?.email?.split('@')[0] || 'Uživatel'}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {user?.email || 'Nepřihlášen'}
                  </div>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                title="Odhlásit se"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Header */}
        <div className="lg:hidden bg-black/40 backdrop-blur-xl border-b border-security-blue-600/20 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 security-gradient-blue rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-white font-bold">Security Dashboard</h1>
            </div>
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-64 h-full bg-black/90 backdrop-blur-xl border-r border-security-blue-600/20" onClick={e => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 security-gradient-blue rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-white font-bold">Security Dashboard</h1>
                      <p className="text-gray-400 text-sm">Váš bezpečnostní přehled</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-security-blue-600/20 text-security-blue-400 border border-security-blue-600/30'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
                
                {/* Mobile User Profile */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-security-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {user?.email?.split('@')[0] || 'Uživatel'}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {user?.email || 'Nepřihlášen'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      title="Odhlásit se"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-400">
                {new Date().toLocaleDateString('cs-CZ', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="btn-security-primary">
                <Plus className="w-4 h-4 mr-2" />
                Nový kurz
              </button>
            </div>
          </div>
          
          {/* Mobile Content Header */}
          <div className="lg:hidden mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">
              {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <p className="text-gray-400 text-sm">
              {new Date().toLocaleDateString('cs-CZ', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  )
}