'use client'

import React from 'react'
import Link from 'next/link'
import Logo from './Logo'
import { Github, Twitter, Linkedin, Mail, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { language, setLanguage, t } = useLanguage()

  return (
    <footer className="section-modern mx-4 mb-6">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo a popis */}
          <div className="col-span-1 md:col-span-2">
            <Logo size="lg" showText={true} />
            <p className="mt-6 text-gray-400 max-w-md leading-relaxed">
              {t('FOOTER_DESCRIPTION')}
            </p>
            
            {/* Sociální ikony */}
            <div className="flex space-x-4 mt-8">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Mail, href: 'mailto:info@securityshield.cz', label: 'Email' }
              ].map(({ icon: Icon, href, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={href}
                    className="glass-icon-box w-12 h-12 text-blue-400 hover:text-blue-300 transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigace */}
          <div>
            <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase mb-6">
              {t('FOOTER_NAVIGATION')}
            </h3>
            <ul className="space-y-4">
              {              [
                { name: t('NAV_HOME'), href: '/' },
                { name: t('NAV_FEATURES'), href: '/#features' },
                { name: t('NAV_PROCESS'), href: '/#process' },
                { name: t('NAV_INTEGRATIONS'), href: '/#integrations' }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Jazyk a kontakt */}
          <div>
            <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase mb-6">
              {t('FOOTER_SETTINGS')}
            </h3>
            
            {/* Jazykový přepínač */}
            <div className="mb-8">
              <p className="text-gray-400 text-sm mb-4">{t('FOOTER_LANGUAGE')}</p>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLanguage('cs')}
                  className={`glass-button-small px-4 py-2 text-sm flex items-center gap-2 ${
                    language === 'cs' 
                      ? 'bg-blue-600/30 border-blue-400/50 text-blue-200' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  {t('FOOTER_SWITCH_CZECH')}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLanguage('en')}
                  className={`glass-button-small px-4 py-2 text-sm flex items-center gap-2 ${
                    language === 'en' 
                      ? 'bg-blue-600/30 border-blue-400/50 text-blue-200' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  {t('FOOTER_SWITCH_ENGLISH')}
                </motion.button>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block"
              >
                {t('FOOTER_PRIVACY')}
              </Link>
              <br />
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block"
              >
                {t('FOOTER_TERMS')}
              </Link>
            </div>
          </div>
        </div>

        {/* Spodní část */}
        <div className="mt-12 pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} SecurityShield. {t('FOOTER_COPYRIGHT')}
          </p>
          
          <div className="mt-4 sm:mt-0">
            <p className="text-gray-500 text-sm">
              {t('FOOTER_MADE_WITH_LOVE')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}