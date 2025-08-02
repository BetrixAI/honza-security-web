'use client'

import React from 'react'
import { Shield, CheckCircle, Mail, Award, TrendingUp, Trophy, Target } from 'lucide-react'

interface DashboardStatsProps {
  stats: {
    securityScore: number
    coursesCompleted: number
    phishingDetected: number
    certificationsEarned: number
  }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="security-card security-card-hover">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 security-gradient-blue rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{stats.securityScore}%</div>
            <div className="text-sm text-gray-400">Security Score</div>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-security-blue-600 to-security-blue-400 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${stats.securityScore}%` }}
          ></div>
        </div>
      </div>

      <div className="security-card security-card-hover">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-400 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{stats.coursesCompleted}</div>
            <div className="text-sm text-gray-400">Dokončená školení</div>
          </div>
        </div>
        <div className="flex items-center text-green-400 text-sm">
          <TrendingUp className="w-4 h-4 mr-1" />
          +2 tento měsíc
        </div>
      </div>

      <div className="security-card security-card-hover">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-400 rounded-lg flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{stats.phishingDetected}</div>
            <div className="text-sm text-gray-400">Odhalené phishing útoky</div>
          </div>
        </div>
        <div className="flex items-center text-orange-400 text-sm">
          <Target className="w-4 h-4 mr-1" />
          92% úspěšnost
        </div>
      </div>

      <div className="security-card security-card-hover">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{stats.certificationsEarned}</div>
            <div className="text-sm text-gray-400">Certifikáty</div>
          </div>
        </div>
        <div className="flex items-center text-purple-400 text-sm">
          <Trophy className="w-4 h-4 mr-1" />
          Gold level
        </div>
      </div>
    </div>
  )
}