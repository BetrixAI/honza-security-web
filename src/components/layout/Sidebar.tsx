'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Shield, 
  BarChart3,
  BookOpen,
  Wrench,
  Radar,
  Mail,
  Award,
  FileText,
  Settings,
  User,
  LogOut,
  FileAudio2,
  ShieldCheck,
  Hash,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react'
import { Disclosure, Transition } from '@headlessui/react'
import { useAuth } from '@/contexts/AuthContext'
import { useSidebar } from '@/contexts/SidebarContext'
import clsx from 'clsx'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { useTranslation } from '@/hooks/useTranslation'

interface SidebarItem {
  id: string
  label: string
  icon: React.ElementType
  href: string
  children?: SidebarItem[]
}

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
  className?: string
}

const sidebarItems: SidebarItem[] = [
  { 
    id: 'overview', 
    label: 'Přehled', 
    icon: BarChart3, 
    href: '/dashboard' 
  },
  { 
    id: 'training', 
    label: 'Školení', 
    icon: BookOpen, 
    href: '/dashboard/training' 
  },
  { 
    id: 'threat-feed', 
    label: 'Reálné hrozby', 
    icon: Radar, 
    href: '/dashboard/threat-feed' 
  },
  { 
    id: 'phishing', 
    label: 'Phishing simulace', 
    icon: Mail, 
    href: '/dashboard/phishing' 
  },
  { 
    id: 'certificates', 
    label: 'Certifikáty', 
    icon: Award, 
    href: '/dashboard/certificates' 
  },
  { 
    id: 'reports', 
    label: 'Reporty', 
    icon: FileText, 
    href: '/dashboard/reports' 
  },
  { 
    id: 'settings', 
    label: 'Nastavení', 
    icon: Settings, 
    href: '/dashboard/settings' 
  }
]

// Bezpečnostní nástroje jako separátní skupina
const securityToolsItems = [
  { 
    id: 'virus-scanner', 
    label: 'VirusTotal Scanner', 
    icon: ShieldCheck, 
    href: '/dashboard/tools/virus-scanner' 
  },
  { 
    id: 'hibp-monitor', 
    label: 'HIBP Monitor', 
    icon: FileAudio2, 
    href: '/dashboard/tools/hibp-monitor' 
  },
  { 
    id: 'hash-scanner', 
    label: 'Hash Scanner', 
    icon: Hash, 
    href: '/dashboard/tools/hash-scanner' 
  }
]

export default function Sidebar({ className = '' }: Omit<SidebarProps, 'isCollapsed' | 'onToggle'>) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { isCollapsed, toggle } = useSidebar()
  const { t } = useTranslation('dashboard')

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  const renderNavItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const active = isActive(item.href)
    
    return (
      <div key={item.id} className="space-y-1">
        <button
          onClick={() => handleNavigation(item.href)}
          className={clsx(
            'w-full flex items-center gap-3 py-2 text-left transition-all duration-200 group relative',
            'focus:outline-none',
            level > 0 && 'ml-6 text-sm',
            active 
              ? 'nav-item-active bg-brand-mid/20 text-brand-mid font-bold pl-4 pr-3 mx-0' 
              : 'text-txt-muted hover:text-txt-primary hover:bg-bg-card-alt pl-3 pr-3 mx-0',
            isCollapsed && 'justify-center px-2'
          )}
          aria-label={item.label}
          aria-current={active ? 'page' : undefined}
          title={isCollapsed ? item.label : undefined}
        >
          
          <item.icon 
            className={`w-5 h-5 flex-shrink-0 icon-duotone ${active ? 'active' : ''} group-hover:fill-[rgba(46,139,255,0.4)]`}
          />
          {!isCollapsed && (
            <span className="font-medium tracking-wide truncate">{item.label}</span>
          )}
        </button>
        
        {/* Children (sub-navigation) */}
        {hasChildren && !isCollapsed && (
          <div className="space-y-1">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className={clsx(
      'fixed top-0 left-0 h-screen bg-bg-card border-r border-border-subtle/40 shadow-lg z-50',
      'flex flex-col transition-all duration-300 ease-in-out relative',
      isCollapsed ? 'w-20' : 'w-64',
      className
    )}
    role="navigation"
    aria-label="Hlavní navigace"
    >
      {/* Header */}
      <div className={`p-4 ${isCollapsed ? 'px-3' : ''}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand/70 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h1 className="text-txt-primary font-bold text-sm truncate">SecureHero</h1>
              <p className="text-txt-secondary text-xs truncate">Security Dashboard</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Collapse/Expand Toggle Button */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-4 z-10 w-6 h-6 bg-brand-mid text-white rounded-full
                   flex items-center justify-center shadow-lg hover:bg-brand-dark transition-colors
                   focus:outline-none"
        title={isCollapsed ? 'Rozbalit sidebar' : 'Sbalit sidebar'}
        aria-label={isCollapsed ? 'Rozbalit sidebar' : 'Sbalit sidebar'}
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Navigation - vylepšený layout s collapsible skupinou */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden pb-4">
        <ul className="mt-6 space-y-1 relative">
          {/* Přehled */}
          <li>
            {renderNavItem(sidebarItems[0])}
          </li>
          
          {/* Bezpečnostní nástroje hned pod Přehledem */}
          {!isCollapsed && (
            <li>
              <Disclosure defaultOpen={false}>
                {({ open }) => (
                  <div className="space-y-1">
                    <Disclosure.Button
                      className={clsx(
                        'w-full flex items-center gap-3 pl-3 pr-3 py-2 text-left transition-all duration-300 group relative mx-0',
                        'focus:outline-none',
                        'text-txt-muted hover:text-txt-primary hover:bg-bg-card-alt hover:shadow-md'
                      )}
                    >
                      <Wrench className="w-5 h-5 flex-shrink-0 icon-duotone transition-transform duration-300 group-hover:rotate-12" />
                      <span className="font-medium tracking-wide truncate flex-1">
                        {t('SECURITY_TOOLS')}
                      </span>
                      <ChevronDown 
                        className={clsx(
                          'w-4 h-4 transition-all duration-300 ease-out',
                          open ? 'rotate-180 text-brand-mid' : 'rotate-0'
                        )} 
                      />
                    </Disclosure.Button>

                    <Transition
                      enter="transition duration-300 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-200 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="mt-2 space-y-1 pl-0 border-l-2 border-brand-mid/20 ml-0">
                        {securityToolsItems.map((tool, index) => {
                          const active = isActive(tool.href)
                          return (
                            <div
                              key={tool.id}
                              className={`transform transition-all duration-300 ease-out`}
                              style={{ 
                                transitionDelay: `${index * 50}ms`,
                              }}
                            >
                              <button
                                onClick={() => handleNavigation(tool.href)}
                                className={clsx(
                                  'w-full flex items-center gap-3 py-2 text-left transition-all duration-200 group relative text-sm',
                                  'focus:outline-none',
                                  'hover:translate-x-1 hover:shadow-sm',
                                  active 
                                    ? 'nav-item-active bg-brand-mid/20 text-brand-mid font-bold pl-4 pr-3 mx-0' 
                                    : 'text-txt-muted hover:text-txt-primary hover:bg-bg-card-alt pl-4 pr-3 mx-0'
                                )}
                                aria-label={tool.label}
                                aria-current={active ? 'page' : undefined}
                              >
                                <tool.icon className={`w-4 h-4 flex-shrink-0 icon-duotone ${active ? 'active' : ''} transition-transform duration-200 group-hover:scale-110`} />
                                <span className="font-medium tracking-wide truncate">{tool.label}</span>
                              </button>
                            </div>
                          )
                        })}
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>
            </li>
          )}
          
          {/* Zbytek menu items */}
          {sidebarItems.slice(1).map(item => (
            <li key={item.id}>
              {renderNavItem(item)}
            </li>
          ))}
          
          {/* Collapsed state - jen ikony pro tools */}
          {isCollapsed && securityToolsItems.map(tool => {
            const active = isActive(tool.href)
            return (
              <li key={tool.id}>
                <button
                  onClick={() => handleNavigation(tool.href)}
                  className={clsx(
                    'w-full flex items-center gap-3 px-3 py-2 text-left transition-all duration-200 group relative',
                    'focus:outline-none',
                    active 
                      ? 'nav-item-active bg-brand-mid/20 text-brand-mid font-bold' 
                      : 'text-txt-muted hover:text-txt-primary hover:bg-bg-card-alt',
                    'justify-center px-2'
                  )}
                  aria-label={tool.label}
                  aria-current={active ? 'page' : undefined}
                  title={tool.label}
                >
                  <tool.icon className={`w-5 h-5 flex-shrink-0 icon-duotone ${active ? 'active' : ''}`} />
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      
      {/* Language Switcher */}
      <div className={`border-t border-border-subtle/40 shrink-0 ${isCollapsed ? 'p-2' : 'p-3'}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-center'}`}>
          <LanguageSwitcher isCollapsed={isCollapsed} />
        </div>
      </div>

      {/* User Profile - shrink-0 podle specifikace */}
      <div className={`border-t border-border-subtle shrink-0 ${isCollapsed ? 'p-2' : 'p-3'}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className={`flex items-center ${isCollapsed ? '' : 'gap-3 min-w-0'}`}>
            <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="text-txt-primary font-medium text-sm truncate">
                  {user?.email?.split('@')[0] || 'Uživatel'}
                </div>
                <div className="text-txt-secondary text-xs truncate">
                  {user?.email || 'Nepřihlášen'}
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={handleSignOut}
              className="p-1 text-txt-secondary hover:text-danger transition-colors flex-shrink-0
                       focus:outline-none rounded"
              title="Odhlásit se"
              aria-label="Odhlásit se"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
 