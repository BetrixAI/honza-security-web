'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Detekce scrollování
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Domů', href: '/' },
    { name: 'O nás', href: '/o-nas' },
    { name: 'Kontakt', href: '/kontakt' },
  ]

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        {/* Header okno kontejner */}
        <div className={`max-w-7xl mx-auto transition-all duration-500 ${
          isScrolled 
            ? 'header-window-scrolled' 
            : 'header-window'
        }`}>
          <div className="px-6 sm:px-8 lg:px-10">
          
            {/* Desktop Header */}
            <div className="hidden md:flex items-center justify-between h-16 py-1">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0 transform hover:scale-102 transition-transform duration-300">
                <Logo size="md" />
              </Link>

              {/* Navigace - střed */}
              <nav className="flex space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-lg font-medium transition-all duration-300 hover:text-security-blue-400 hover:scale-105 ${
                      isActiveLink(item.href)
                        ? 'text-security-blue-400 glow-text scale-105'
                        : 'text-gray-200 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Přihlásit se tlačítko s animovaným gradientem */}
              <Link
                href="/auth"
                className="animated-gradient-btn-compact"
              >
                Přihlásit se
              </Link>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between h-14 py-1">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-security-blue-400 transition-colors duration-300 hover:scale-105"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Logo */}
              <Link href="/" className="flex-shrink-0 transform hover:scale-102 transition-transform duration-300">
                <Logo size="sm" showText={true} />
              </Link>

              {/* Přihlásit se tlačítko - mobilní s gradientem */}
              <Link
                href="/auth"
                className="text-xs animated-gradient-btn-mobile-compact"
              >
                Přihlásit se
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-4 right-4 mt-2 mobile-menu-window">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg text-lg font-medium transition-all duration-300 ${
                    isActiveLink(item.href)
                      ? 'text-security-blue-400 bg-security-blue-600/10 border border-security-blue-600/30'
                      : 'text-gray-300 hover:text-white hover:bg-dark-surface'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Spacer pro fixed header */}
      <div className="h-8 md:h-8"></div>
    </>
  )
} 