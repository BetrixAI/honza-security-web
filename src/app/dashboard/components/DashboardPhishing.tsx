'use client'

import React from 'react'
import Button from '@/components/ui/Button'
import { 
  Zap, 
  CheckCircle, 
  Mail, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  Target, 
  Download, 
  Eye, 
  Bell 
} from 'lucide-react'

export default function DashboardPhishing() {
  const phishingResults = [
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