'use client'

import React from 'react'
import Link from 'next/link'
import Logo from './Logo'
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const companyLinks = [
    { name: 'O nás', href: '/o-nas' },
    { name: 'Kontakt', href: '/kontakt' },
  ]

  const supportLinks = [
    { name: 'Podpora', href: '/podpora' },
    { name: 'FAQ', href: '/faq' },
  ]

  const legalLinks = [
    { name: 'Ochrana soukromí', href: '/privacy' },
    { name: 'Podmínky použití', href: '/terms' },
  ]

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'YouTube', href: '#', icon: Youtube },
  ]

  return (
    <footer className="pb-8 px-4">
      {/* Footer okno kontejner */}
      <div className="max-w-7xl mx-auto footer-window">
        <div className="px-6 sm:px-8 lg:px-10 py-8">
          
          {/* Hlavní obsah footeru */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Logo a popis */}
            <div className="space-y-4">
              <Logo size="md" />
              <p className="text-gray-300 text-sm leading-relaxed">
                Moderní platforma pro vzdělávání v oblasti kybernetické bezpečnosti.
              </p>
              
              {/* Kontaktní info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Mail className="w-3 h-3 text-security-blue-400" />
                  <span>info@securityshield.cz</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Phone className="w-3 h-3 text-security-blue-400" />
                  <span>+420 123 456 789</span>
                </div>
              </div>
            </div>

            {/* Společnost */}
            <div>
              <h3 className="text-white font-medium mb-4 text-base">Společnost</h3>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-security-blue-400 transition-colors duration-300 text-sm hover:scale-105 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Podpora */}
            <div>
              <h3 className="text-white font-medium mb-4 text-base">Podpora</h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-security-blue-400 transition-colors duration-300 text-sm hover:scale-105 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Právní info */}
            <div>
              <h3 className="text-white font-medium mb-4 text-base">Právní</h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-security-blue-400 transition-colors duration-300 text-sm hover:scale-105 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Spodní část footeru */}
          <div className="pt-6 border-t border-gray-600/30">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              
              {/* Copyright */}
              <div className="text-gray-400 text-sm">
                © {currentYear} SecurityShield. Všechna práva vyhrazena.
              </div>

              {/* Sociální sítě */}
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="p-2 text-gray-400 hover:text-security-blue-400 
                             transition-all duration-300 hover:scale-110 rounded-lg
                             hover:bg-security-blue-600/10"
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>

              {/* Security badge */}
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <Shield className="w-3 h-3 text-security-blue-400" />
                <span>Zabezpečeno SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 