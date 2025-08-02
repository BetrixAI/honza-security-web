'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import DashboardStats from '@/components/dashboard/DashboardStats'
import Button from '@/components/ui/Button'
import { 
  Shield, 
  BookOpen,
  BarChart3,
  Settings,
  Bell,
  Mail,
  Award,
  FileText,
  Plus,
  User,
  LogOut,
  Eye,
  CheckCircle,
  Play,
  ArrowRight,
  ChevronRight,
  Search,
  Filter,
  Clock,
  Star,
  TrendingUp,
  Activity,
  Target,
  AlertTriangle,
  Download,
  Zap
} from 'lucide-react'

interface DashboardStats {
  securityScore: number
  coursesCompleted: number
  phishingDetected: number
  certificationsEarned: number
}

interface TrainingModule {
  id: string
  title: string
  description: string
  progress: number
  duration: string
  level: 'Začátečník' | 'Pokročilý' | 'Expert'
  status: 'not_started' | 'in_progress' | 'completed'
  category: string
}

interface PhishingResult {
  id: string
  date: string
  result: 'passed' | 'failed' | 'reported'
  scenario: string
  difficulty: 'Lehký' | 'Střední' | 'Těžký'
}

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [stats, setStats] = useState<DashboardStats>({
    securityScore: 85,
    coursesCompleted: 12,
    phishingDetected: 23,
    certificationsEarned: 3
  })
  
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Přesměrování se provede automaticky přes AuthProvider
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Simulace načítání dat
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const trainingModules: TrainingModule[] = [
    {
      id: '1',
      title: 'Základy phishingu',
      description: 'Naučte se rozpoznat phishingové útoky a chránit se před nimi',
      progress: 100,
      duration: '45 min',
      level: 'Začátečník',
      status: 'completed',
      category: 'Email Security'
    },
    {
      id: '2',
      title: 'Pokročilé sociální inženýrství',
      description: 'Hlubší pohled na taktiky útočníků a obranné strategie',
      progress: 65,
      duration: '60 min',
      level: 'Pokročilý',
      status: 'in_progress',
      category: 'Social Engineering'
    },
    {
      id: '3',
      title: 'Bezpečnost hesel a autentifikace',
      description: 'Best practices pro vytváření a správu bezpečných hesel',
      progress: 0,
      duration: '30 min',
      level: 'Začátečník',
      status: 'not_started',
      category: 'Authentication'
    },
    {
      id: '4',
      title: 'Malware a ransomware',
      description: 'Jak rozpoznat a předcházet malwarovým útokům',
      progress: 0,
      duration: '50 min',
      level: 'Pokročilý',
      status: 'not_started',
      category: 'Threat Detection'
    }
  ]

  const phishingResults: PhishingResult[] = [
    {
      id: '1',
      date: '2024-01-15',
      result: 'passed',
      scenario: 'Falešný email od banky',
      difficulty: 'Střední'
    },
    {
      id: '2',
      date: '2024-01-10',
      result: 'reported',
      scenario: 'Podezřelý příkaz z IT oddělení',
      difficulty: 'Těžký'
    },
    {
      id: '3',
      date: '2024-01-05',
      result: 'failed',
      scenario: 'Falešná nabídka práce',
      difficulty: 'Lehký'
    }
  ]

  const sidebarItems = [
    { id: 'overview', label: 'Přehled', icon: BarChart3 },
    { id: 'training', label: 'Školení', icon: BookOpen },
    { id: 'phishing', label: 'Phishing testy', icon: Mail },
    { id: 'certificates', label: 'Certifikáty', icon: Award },
    { id: 'reports', label: 'Reporty', icon: FileText },
    { id: 'settings', label: 'Nastavení', icon: Settings }
  ]

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hlavní metriky */}
      <DashboardStats stats={stats} />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="security-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Nedávná aktivita</h3>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Zobrazit vše
            </Button>
          </div>
          <div className="space-y-4">
            {[
              { icon: CheckCircle, text: 'Dokončil jste "Základy phishingu"', time: '2 hodiny', color: 'text-green-400' },
              { icon: Mail, text: 'Nahlásili jste podezřelý email', time: '1 den', color: 'text-orange-400' },
              { icon: Award, text: 'Získali jste certifikát "Email Security"', time: '3 dny', color: 'text-purple-400' },
              { icon: Play, text: 'Spustili jste kurz "Pokročilé sociální inženýrství"', time: '5 dní', color: 'text-blue-400' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                <activity.icon className={`w-5 h-5 mt-0.5 ${activity.color}`} />
                <div className="flex-1">
                  <p className="text-gray-200 text-sm">{activity.text}</p>
                  <p className="text-gray-500 text-xs mt-1">Před {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="security-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Doporučené kurzy</h3>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Prozkoumat
            </Button>
          </div>
          <div className="space-y-4">
            {trainingModules.filter(module => module.status === 'not_started').slice(0, 3).map((module) => (
              <div key={module.id} className="p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-medium group-hover:text-security-blue-400 transition-colors">{module.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{module.description}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="text-xs text-gray-500">{module.duration}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        module.level === 'Začátečník' ? 'bg-green-600/20 text-green-400' :
                        module.level === 'Pokročilý' ? 'bg-orange-600/20 text-orange-400' :
                        'bg-red-600/20 text-red-400'
                      }`}>
                        {module.level}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-security-blue-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderTraining = () => {
    // Lazy load těžkých komponent
    return (
    <div className="space-y-8">
      {/* Hlavička s filtry */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Školení a kurzy</h2>
          <p className="text-gray-400">Rozšiřte své znalosti kybernetické bezpečnosti</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Hledat kurzy..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-security-blue-500"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtr
          </Button>
        </div>
      </div>

      {/* Progress overview */}
      <div className="security-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Celkový pokrok</h3>
          <span className="text-security-blue-400 font-medium">75% dokončeno</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div className="bg-gradient-to-r from-security-blue-600 to-security-blue-400 h-3 rounded-full" style={{ width: '75%' }}></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-sm text-gray-400">Dokončeno</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">3</div>
            <div className="text-sm text-gray-400">Probíhající</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">8</div>
            <div className="text-sm text-gray-400">Nezačaté</div>
          </div>
        </div>
      </div>

      {/* Kurzy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trainingModules.map((module) => (
          <div key={module.id} className="security-card security-card-hover cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-white font-semibold">{module.title}</h3>
                  {module.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {module.status === 'in_progress' && (
                    <Clock className="w-5 h-5 text-orange-400" />
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-3">{module.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{module.duration}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    module.level === 'Začátečník' ? 'bg-green-600/20 text-green-400' :
                    module.level === 'Pokročilý' ? 'bg-orange-600/20 text-orange-400' :
                    'bg-red-600/20 text-red-400'
                  }`}>
                    {module.level}
                  </span>
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full">{module.category}</span>
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Pokrok</span>
                <span className="text-sm text-white">{module.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    module.status === 'completed' ? 'bg-green-500' :
                    module.status === 'in_progress' ? 'bg-orange-500' :
                    'bg-gray-600'
                  }`}
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Button 
                variant={module.status === 'not_started' ? 'primary' : 'outline'} 
                size="sm"
              >
                {module.status === 'not_started' && (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Začít kurz
                  </>
                )}
                {module.status === 'in_progress' && (
                  <>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Pokračovat
                  </>
                )}
                {module.status === 'completed' && (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Přehlédnout
                  </>
                )}
              </Button>
              {module.status === 'completed' && (
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    )
  }

  const renderPhishing = () => {
    return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Phishing simulace</h2>
          <p className="text-gray-400">Testujte svou schopnost rozpoznat phishingové útoky</p>
        </div>
        <Button variant="primary">
          <Zap className="w-4 h-4 mr-2" />
          Nová simulace
        </Button>
      </div>

      {/* Statistiky phishingu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="security-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-400 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">92%</div>
              <div className="text-sm text-gray-400">Úspěšnost detekce</div>
            </div>
          </div>
          <div className="flex items-center text-green-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +5% od posledního měsíce
          </div>
        </div>

        <div className="security-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-400 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">47</div>
              <div className="text-sm text-gray-400">Celkem testů</div>
            </div>
          </div>
          <div className="flex items-center text-orange-400 text-sm">
            <Activity className="w-4 h-4 mr-1" />
            23 tento měsíc
          </div>
        </div>

        <div className="security-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-400 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-sm text-gray-400">Neúspěšné pokusy</div>
            </div>
          </div>
          <div className="flex items-center text-red-400 text-sm">
            <Target className="w-4 h-4 mr-1" />
            Vyžaduje pozornost
          </div>
        </div>
      </div>

      {/* Historie testů */}
      <div className="security-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Historie phishing testů</h3>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Datum</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Scénář</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Obtížnost</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Výsledek</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Akce</th>
              </tr>
            </thead>
            <tbody>
              {phishingResults.map((result) => (
                <tr key={result.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="py-3 px-4 text-gray-300">
                    {new Date(result.date).toLocaleDateString('cs-CZ')}
                  </td>
                  <td className="py-3 px-4 text-white">{result.scenario}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      result.difficulty === 'Lehký' ? 'bg-green-600/20 text-green-400' :
                      result.difficulty === 'Střední' ? 'bg-orange-600/20 text-orange-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {result.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center space-x-1 ${
                      result.result === 'passed' ? 'text-green-400' :
                      result.result === 'reported' ? 'text-blue-400' :
                      'text-red-400'
                    }`}>
                      {result.result === 'passed' && <CheckCircle className="w-4 h-4" />}
                      {result.result === 'reported' && <Bell className="w-4 h-4" />}
                      {result.result === 'failed' && <AlertTriangle className="w-4 h-4" />}
                      <span className="capitalize">
                        {result.result === 'passed' ? 'Úspěch' :
                         result.result === 'reported' ? 'Nahlášeno' : 'Neúspěch'}
                      </span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
  }



  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="security-spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar */}
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
          {/* Header */}
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
              <Button variant="primary">
                <Plus className="w-4 h-4 mr-2" />
                Nový kurz
              </Button>
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
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'training' && renderTraining()}
          {activeTab === 'phishing' && renderPhishing()}
          {activeTab === 'certificates' && (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Certifikáty</h3>
              <p className="text-gray-400">Tato sekce je ve vývoji</p>
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Reporty</h3>
              <p className="text-gray-400">Tato sekce je ve vývoji</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Nastavení</h3>
              <p className="text-gray-400">Tato sekce je ve vývoji</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}