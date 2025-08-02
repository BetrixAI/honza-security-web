'use client'

import React from 'react'
import DashboardStats from './DashboardStats'
import Button from '@/components/ui/Button'
import { Eye, CheckCircle, Mail, Award, Play, Plus, ChevronRight } from 'lucide-react'

export default function DashboardOverview() {
  const stats = {
    securityScore: 85,
    coursesCompleted: 12,
    phishingDetected: 23,
    certificationsEarned: 3
  }

  const trainingModules = [
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
            {trainingModules.slice(0, 3).map((module) => (
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
}