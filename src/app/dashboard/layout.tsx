'use client'

import React, { useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import MobileSidebar from '@/components/layout/MobileSidebar'
import ToastProvider from '@/components/toast/ToastProvider'
import SidebarProvider, { useSidebar } from '@/contexts/SidebarContext'

interface DashboardLayoutProps {
  children: React.ReactNode
}

function DashboardLayoutInner({ children }: DashboardLayoutProps) {
  const { isCollapsed, setCollapsed } = useSidebar()
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false)

  // Auto-collapse na obrazovkách < 1024px podle specifikace
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true)
      }
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setCollapsed])

  // Debug funkce pro testování XP toastů (ETAPA 4)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).debugAddXP = (amount: number = 50) => {
        // Tento event bude zachycen ToastProviderem pro demo
        window.dispatchEvent(new CustomEvent('debugXP', { detail: { amount } }))
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg-page">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
          
          {/* Mobile Sidebar */}
          <MobileSidebar 
            isOpen={mobileSidebarOpen}
            onToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />
          
          {/* Main Content - properly centered with equal margins */}
          <div className={`
            flex-1 min-h-screen transition-all duration-300 ease-in-out
            ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
          `}>
            <main className={`
              min-h-screen
              ${isCollapsed ? 'lg:mr-20' : 'lg:mr-64'}
              p-4 lg:p-8 pt-16 lg:pt-8
            `}>
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
  )
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <ToastProvider>
        <DashboardLayoutInner>{children}</DashboardLayoutInner>
      </ToastProvider>
    </SidebarProvider>
  )
}
 
 