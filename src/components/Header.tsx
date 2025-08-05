'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: t('NAV_HOME'), href: '/' },
    { name: t('NAV_FEATURES'), href: '/#features' },
    { name: t('NAV_PROCESS'), href: '/#process' },
    { name: t('NAV_INTEGRATIONS'), href: '/#integrations' },
    { name: t('NAV_FAQ'), href: '/#faq' }
  ]

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'top-6 left-6 right-6' 
            : 'top-0 left-0 right-0'
        }`}
      >
        <div className={`transition-all duration-500 ${
          isScrolled 
            ? 'max-w-7xl mx-auto' 
            : 'w-full'
        }`}>
          <div className={`transition-all duration-500 ${
            isScrolled 
              ? 'backdrop-blur-xl bg-black/40 rounded-2xl shadow-2xl shadow-black/50' 
              : 'bg-transparent'
          }`}>
            {/* Desktop Header */}
            <div className={`hidden md:flex items-center justify-between transition-all duration-500 ${
              isScrolled 
                ? 'px-8 py-4' 
                : 'px-6 py-6 max-w-7xl mx-auto'
            }`}>
              {/* Logo with subtle glow */}
              <Link href="/" className="flex-shrink-0 group">
                <div className="relative">
                  <Logo size="md" />
                  <div className="absolute inset-0 bg-blue-400/10 blur-lg group-hover:bg-blue-400/20 transition-colors pointer-events-none rounded-full" />
                </div>
              </Link>

              {/* Navigation */}
              <nav className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-500 ${
                isScrolled 
                  ? 'bg-white/5 backdrop-blur-sm' 
                  : 'bg-white/8 backdrop-blur-sm'
              }`}>
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2 text-base font-medium rounded-xl transition-all duration-300 group ${
                        isActiveLink(item.href)
                          ? 'text-white bg-blue-500/15 backdrop-blur-sm'
                          : 'text-gray-300 hover:text-white hover:bg-white/8'
                      }`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {!isActiveLink(item.href) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/3 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth"
                  className="text-base text-gray-300 hover:text-white transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/8 backdrop-blur-sm"
                >
                  {t('AUTH_SIGNIN')}
                </Link>
                
                <Link href="/auth" className="group">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-sm text-white px-6 py-2.5 rounded-xl text-base font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:from-blue-500/90 hover:to-blue-600/90"
                  >
                    <Sparkles className="w-4 h-4" />
                    {t('AUTH_GETSTARTED')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </motion.div>
                </Link>
              </div>
            </div>

            {/* Mobile Header */}
            <div className={`md:hidden flex items-center justify-between transition-all duration-500 ${
              isScrolled 
                ? 'px-6 py-4' 
                : 'px-6 py-6'
            }`}>
              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-white/10 backdrop-blur-sm hover:bg-white/20' 
                    : 'bg-white/8 backdrop-blur-sm hover:bg-white/15'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Logo size="sm" showText={true} />
              </Link>

              {/* Mobile CTA */}
              <Link href="/auth">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl text-base font-medium hover:from-blue-500/90 hover:to-blue-600/90 transition-all duration-300"
                >
                  {t('AUTH_SIGNIN')}
                </motion.div>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`md:hidden absolute top-full mt-3 ${
                isScrolled 
                  ? 'left-0 right-0' 
                  : 'left-6 right-6'
              }`}
            >
              <div className="backdrop-blur-xl bg-black/40 rounded-2xl shadow-2xl shadow-black/50 p-6">
                <div className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                          isActiveLink(item.href)
                            ? 'text-white bg-blue-500/15 backdrop-blur-sm'
                            : 'text-gray-300 hover:text-white hover:bg-white/8'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigation.length * 0.05 }}
                    className="pt-4 mt-4 border-t border-white/10"
                  >
                    <Link
                      href="/auth"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-4 bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-sm text-white rounded-xl text-lg font-medium shadow-lg shadow-blue-500/20 hover:from-blue-500/90 hover:to-blue-600/90 transition-all duration-300"
                    >
                      {t('AUTH_GETSTARTED')} →
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer */}
      <div className="h-0"></div>
    </>
  )
}