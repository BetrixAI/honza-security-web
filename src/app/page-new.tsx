'use client'

import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { 
  Shield, 
  Lock,
  Eye,
  Brain,
  Target,
  Activity,
  Database,
  ChevronRight,
  Check,
  ArrowRight,
  BarChart3,
  Users,
  FileSearch,
  Zap
} from 'lucide-react'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    setIsVisible(true)

    // Intersection Observer pro fade-in
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section')
            if (sectionId) {
              setVisibleSections(prev => new Set([...Array.from(prev), sectionId]))
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    const sections = document.querySelectorAll('[data-section]')
    sections.forEach(section => observer.observe(section))

    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [])

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Advanced threat detection using machine learning algorithms',
      metric: '99.9%',
      metricLabel: 'Accuracy'
    },
    {
      icon: Shield,
      title: 'Real-time Protection',
      description: 'Continuous monitoring and instant threat response',
      metric: '<100ms',
      metricLabel: 'Response'
    },
    {
      icon: Target,
      title: 'Phishing Simulation',
      description: 'Adaptive testing to strengthen human firewall',
      metric: '87%',
      metricLabel: 'Success Rate'
    },
    {
      icon: Activity,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights and risk assessment',
      metric: '24/7',
      metricLabel: 'Monitoring'
    }
  ]

  return (
    <Layout>
      {/* Hero sekce - elegantní gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black to-blue-950">
        
        {/* Jemný pattern v pozadí */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #1e40af 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            
            {/* Subtitle */}
            <div className={`text-blue-400 text-sm font-medium tracking-widest uppercase mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Enterprise Security Platform
            </div>

            {/* Hlavní nadpis */}
            <h1 className={`text-5xl lg:text-7xl font-light text-white mb-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Security Awareness
              <span className="block text-blue-400 font-semibold">Platform</span>
            </h1>
            
            {/* Popis */}
            <p className={`text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Transform your organization's security culture with AI-driven training 
              and real-time threat intelligence.
            </p>

            {/* CTA tlačítka */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <button className="group px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-all duration-300">
                Get Started
                <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-3 bg-transparent border border-gray-700 hover:border-blue-600 text-white font-medium rounded transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features sekce */}
      <section className="py-20 bg-black" data-section="features">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-white mb-4">
              Core Capabilities
            </h2>
            <p className="text-gray-500">
              Enterprise-grade security powered by advanced AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-950 border border-gray-900 hover:border-blue-900 rounded-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 mb-4 bg-blue-950 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-medium text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {feature.description}
                </p>
                
                {/* Metric */}
                <div className="pt-4 border-t border-gray-900">
                  <div className="text-xl font-semibold text-blue-400">{feature.metric}</div>
                  <div className="text-xs text-gray-600">{feature.metricLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats sekce */}
      <section className="py-20 bg-gradient-to-b from-black to-blue-950/20" data-section="stats">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          visibleSections.has('stats') ? 'opacity-100' : 'opacity-0'
        }`}>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10M+', label: 'Security Scans' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '50K+', label: 'Active Users' },
              { value: '< 3s', label: 'Response Time' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-light text-blue-400 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA sekce */}
      <section className="py-20 bg-black" data-section="cta">
        <div className={`max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          visibleSections.has('cta') ? 'opacity-100' : 'opacity-0'
        }`}>
          
          <h2 className="text-3xl font-light text-white mb-4">
            Ready to Transform Your Security?
          </h2>
          <p className="text-gray-500 mb-8">
            Join thousands of companies that trust our platform.
          </p>
          
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-all duration-300">
            Start Free Trial
          </button>
        </div>
      </section>
    </Layout>
  )
}