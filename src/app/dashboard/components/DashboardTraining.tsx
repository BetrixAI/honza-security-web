'use client'

import React from 'react'
import Button from '@/components/ui/Button'
import { Search, Filter, CheckCircle, Clock, Play, ArrowRight, Eye, Star } from 'lucide-react'

export default function DashboardTraining() {
  const trainingModules = [
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