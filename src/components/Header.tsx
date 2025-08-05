'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import { Menu, X, Sparkles, ArrowRight, Mail, Phone, CheckCircle, Users, CreditCard, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const pathname = usePathname()
  const { t } = useLanguage()

  const navigation = [
    { name: t('NAV_HOME'), section: 'hero' },
    { name: t('NAV_FEATURES'), section: 'features' },
    { name: t('NAV_PROCESS'), section: 'process' },
    { name: t('NAV_INTEGRATIONS'), section: 'integrations' },
    { name: t('NAV_FAQ'), section: 'faq' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Automatické sledování aktivní sekce
      const sections = navigation.map(nav => nav.section)
      const scrollPosition = window.scrollY + 100 // offset pro header
      
      for (const section of sections) {
        const element = document.querySelector(`[data-section="${section}"]`)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Spusť hned při načtení
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navigation])

  const [activeSection, setActiveSection] = useState('hero')

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`)
    if (element) {
      const headerHeight = 100 // výška headeru
      const elementTop = element.getBoundingClientRect().top + window.scrollY
      const windowHeight = window.innerHeight
      
      // Posun sekci tak, aby začínala níže na obrazovce (asi ve 2/3 výšky obrazovky)
      const offsetFromTop = windowHeight * 0 // sekce začne 30% od vrchu = 70% od spodu
      const targetPosition = elementTop - offsetFromTop - headerHeight
      
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      })
      
      setActiveSection(sectionId)
      setIsMobileMenuOpen(false)
    }
  }

  const isActiveSection = (section: string) => {
    return activeSection === section
  }

  const closeModal = () => {
    setIsContactModalOpen(false)
    setCurrentStep(1)
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
              <nav className={`relative flex items-center px-4 py-2 rounded-xl transition-all duration-500 ${
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
                    className="relative"
                  >
                    {/* Animovaný gradient pozadí pro aktivní tlačítko */}
                    {isActiveSection(item.section) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-blue-400/40 to-blue-600/30 backdrop-blur-md rounded-xl shadow-lg shadow-blue-500/25 border border-blue-400/20"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          mass: 0.8
                        }}
                        style={{
                          boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                      />
                    )}
                    
                    <button
                      onClick={() => scrollToSection(item.section)}
                      className={`relative px-4 py-2 text-base font-medium rounded-xl transition-all duration-300 group z-10 mx-1 focus:outline-none ${
                        isActiveSection(item.section)
                          ? 'text-white'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {/* Hover efekt pro neaktivní tlačítka */}
                      {!isActiveSection(item.section) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      )}
                    </button>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-3">
                <Link href="/auth" className="text-base text-gray-300 hover:text-white transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/8 backdrop-blur-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {t('AUTH_SIGNIN')}
                </Link>
                
                <button onClick={() => setIsContactModalOpen(true)} className="group focus:outline-none">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden text-white px-6 py-2.5 rounded-xl text-base font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300"
                  >
                    {/* Animovaný gradient pozadí s dýchací animací */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-800 via-slate-900 to-blue-700"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        scale: [1, 1.05, 1],
                        opacity: [0.9, 1, 0.9],
                      }}
                      transition={{
                        backgroundPosition: {
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        },
                        scale: {
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        },
                        opacity: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                      style={{
                        backgroundSize: '300% 100%',
                      }}
                    />
                    
                    {/* Overlay pro interakci */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-slate-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Obsah tlačítka */}
                    <div className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      {t('AUTH_GETSTARTED')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </motion.div>
                </button>
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
                className={`p-3 rounded-xl transition-all duration-300 focus:outline-none ${
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
                  className="text-gray-300 hover:text-white transition-all duration-300 px-3 py-2.5 rounded-xl hover:bg-white/8 backdrop-blur-sm flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
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
                      <button
                        onClick={() => scrollToSection(item.section)}
                        className={`block w-full text-left py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 focus:outline-none ${
                          isActiveSection(item.section)
                            ? 'text-white bg-blue-500/15 backdrop-blur-sm'
                            : 'text-gray-300 hover:text-white hover:bg-white/8'
                        }`}
                      >
                        {item.name}
                      </button>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigation.length * 0.05 }}
                    className="pt-4 mt-4 border-t border-white/10 space-y-3"
                  >
                    <Link
                      href="/auth"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-3 text-gray-300 hover:text-white hover:bg-white/8 rounded-xl text-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      {t('AUTH_SIGNIN')}
                    </Link>
                    <button
                      onClick={() => {
                        setIsContactModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="relative overflow-hidden block w-full text-center py-4 text-white rounded-xl text-lg font-medium shadow-lg shadow-blue-500/20 transition-all duration-300 focus:outline-none group"
                    >
                      {/* Animovaný gradient pozadí pro mobilní s dýchací animací */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-800 via-slate-900 to-blue-700"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                          scale: [1, 1.05, 1],
                          opacity: [0.9, 1, 0.9],
                        }}
                        transition={{
                          backgroundPosition: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          },
                          scale: {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          },
                          opacity: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                        style={{
                          backgroundSize: '300% 100%',
                        }}
                      />
                      
                      {/* Overlay pro interakci */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-slate-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Obsah tlačítka */}
                      <span className="relative z-10">
                        {t('AUTH_GETSTARTED')} →
                      </span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Contact Modal - 3 Steps */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-black/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 max-w-3xl w-full shadow-2xl shadow-blue-500/20 h-[580px] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-light text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  {t('CONTACT_TITLE')}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-500/10 rounded-lg p-2 border border-blue-500/20">
                  <div className="flex items-center justify-center space-x-6">
                    {[
                      { number: 1, title: t('CONTACT_HOW_IT_WORKS'), icon: Users },
                      { number: 2, title: t('CONTACT_FORM_TITLE'), icon: Mail }
                    ].map((step, index) => (
                      <div key={step.number} className="flex items-center">
                        <div className="flex flex-col items-center text-center">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-medium transition-all duration-300 ${
                            currentStep >= step.number 
                              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                              : 'bg-white/10 text-gray-400'
                          }`}>
                            <step.icon className="w-3.5 h-3.5" />
                          </div>
                          <span className={`mt-1 text-xs font-medium transition-colors ${
                            currentStep >= step.number ? 'text-blue-300' : 'text-gray-500'
                          }`}>
                            {step.title}
                          </span>
                        </div>
                        {index < 1 && (
                          <div className={`w-12 h-0.5 mx-4 transition-all duration-300 ${
                            currentStep > step.number ? 'bg-blue-500' : 'bg-white/10'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="text-center flex-1 flex flex-col justify-center"
                    >
                      <div className="mb-4">
                        <h3 className="text-2xl font-light text-white mb-3">{t('CONTACT_COOPERATION_TITLE')}</h3>
                        <p className="text-gray-300 leading-relaxed max-w-xl mx-auto mb-4">
                          {t('CONTACT_COOPERATION_SUBTITLE')}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20">
                          <div className="bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30">
                            <Phone className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-white font-semibold mb-2">{t('CONTACT_INITIAL_CONTACT')}</h4>
                          <p className="text-gray-300 text-xs leading-relaxed">
                            {t('CONTACT_INITIAL_DESC')}
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20">
                          <div className="bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30">
                            <Calendar className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-white font-semibold mb-2">{t('CONTACT_CONSULTATION')}</h4>
                          <p className="text-gray-300 text-xs leading-relaxed">
                            {t('CONTACT_CONSULTATION_DESC')}
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20">
                          <div className="bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-white font-semibold mb-2">{t('CONTACT_IMPLEMENTATION')}</h4>
                          <p className="text-gray-300 text-xs leading-relaxed">
                            {t('CONTACT_IMPLEMENTATION_DESC')}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 border border-blue-500/15 rounded-lg p-3">
                        <div className="flex items-center justify-center gap-2 text-blue-300">
                          <ArrowRight className="w-4 h-4" />
                          <span className="text-xs font-medium">
                            {t('CONTACT_CONTINUE_TEXT')}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex-1 flex flex-col justify-center"
                    >
                      <div className="text-center mb-4">
                        <h3 className="text-2xl font-light text-white mb-3">{t('CONTACT_REQUEST_TITLE')}</h3>
                        <p className="text-gray-300 max-w-xl mx-auto">
                          {t('CONTACT_REQUEST_SUBTITLE')}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20">
                        <form className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-white mb-1">
                                {t('CONTACT_PERSON')} *
                              </label>
                              <input
                                type="text"
                                required
                                className="w-full px-3 py-2 bg-black/40 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none focus:bg-black/60 transition-all duration-300 text-sm"
                                placeholder={t('CONTACT_PERSON')}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-white mb-1">
                                {t('CONTACT_BUSINESS_EMAIL')} *
                              </label>
                              <input
                                type="email"
                                required
                                className="w-full px-3 py-2 bg-black/40 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none focus:bg-black/60 transition-all duration-300 text-sm"
                                placeholder={t('CONTACT_BUSINESS_EMAIL')}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-white mb-1">
                                {t('CONTACT_ORGANIZATION')} *
                              </label>
                              <input
                                type="text"
                                required
                                className="w-full px-3 py-2 bg-black/40 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none focus:bg-black/60 transition-all duration-300 text-sm"
                                placeholder={t('CONTACT_ORGANIZATION')}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-white mb-1">
                                {t('CONTACT_ORG_SIZE')} *
                              </label>
                              <select 
                                required
                                className="w-full px-3 py-2 bg-black/40 border border-blue-500/30 rounded-lg text-white focus:border-blue-400/50 focus:outline-none focus:bg-black/60 transition-all duration-300 text-sm"
                              >
                                <option value="" className="bg-black">{t('CONTACT_ORG_SIZE_PLACEHOLDER')}</option>
                                <option value="1-25" className="bg-black">{t('CONTACT_ORG_SIZE_1_25')}</option>
                                <option value="26-100" className="bg-black">{t('CONTACT_ORG_SIZE_26_100')}</option>
                                <option value="101-500" className="bg-black">{t('CONTACT_ORG_SIZE_101_500')}</option>
                                <option value="500+" className="bg-black">{t('CONTACT_ORG_SIZE_500_PLUS')}</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-white mb-1">
                              {t('CONTACT_DESCRIPTION')}
                            </label>
                            <textarea
                              rows={2}
                              className="w-full px-3 py-2 bg-black/40 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none focus:bg-black/60 transition-all duration-300 resize-none text-sm"
                              placeholder={t('CONTACT_DESCRIPTION_PLACEHOLDER')}
                            />
                          </div>
                        </form>
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-blue-500/15">
                  {currentStep > 1 ? (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-3 py-2 text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center gap-1 text-xs"
                    >
                      <ArrowRight className="w-3 h-3 rotate-180" />
                      {t('CONTACT_BACK_TO_OVERVIEW')}
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < 2 ? (
                    <motion.button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 text-sm"
                    >
                      {t('CONTACT_FILL_REQUEST')}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      {t('CONTACT_SEND_REQUEST')}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-0"></div>
    </>
  )
}