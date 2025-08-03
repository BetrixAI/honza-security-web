'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Shield, AlertTriangle, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center p-4">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-danger/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-warning/20 rounded-full blur-2xl opacity-30" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-24 h-24 bg-gradient-to-br from-danger to-warning rounded-2xl flex items-center justify-center shadow-lg shadow-danger/20"
            >
              <AlertTriangle className="w-12 h-12 text-white" />
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-8xl md:text-9xl font-black text-transparent bg-gradient-to-r from-brand via-warning to-danger bg-clip-text leading-none"
          >
            404
          </motion.h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-txt-primary">
              Stránka nebyla nalezena
            </h2>
            <p className="text-lg text-txt-secondary max-w-md mx-auto">
              Zdá se, že jste narazili na bezpečnostní bariéru. Požadovaná stránka neexistuje nebo byla přesunuta.
            </p>
          </div>

          {/* Security themed message */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-bg-card border border-border-subtle/50 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-brand" />
              <span className="text-sm font-semibold text-brand uppercase tracking-wide">
                Security Notice
              </span>
            </div>
            <p className="text-sm text-txt-secondary text-left">
              Pokud jste se pokusili o přístup k chráněné oblasti systému, 
              tento incident byl zaznamenán pro bezpečnostní účely. 
              Všechny oprávněné cesty jsou dostupné z hlavní navigace.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/dashboard"
              className="group px-6 py-3 bg-gradient-to-r from-brand-dark to-brand text-white rounded-lg hover:opacity-90 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-brand/25"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Zpět na dashboard
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-bg-card-alt border border-border-subtle text-txt-primary rounded-lg hover:bg-bg-card hover:border-brand/30 transition-all duration-200 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Zpět
            </button>
          </motion.div>

          {/* Search suggestion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="pt-6 border-t border-border-subtle/30"
          >
            <p className="text-sm text-txt-secondary mb-3">
              Hledáte něco konkrétního?
            </p>
            <div className="flex max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-txt-secondary" />
                <input
                  type="text"
                  placeholder="Hledat v dokumentaci..."
                  className="w-full pl-10 pr-4 py-2 bg-bg-card-alt border border-border-subtle rounded-l-lg text-txt-primary focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand"
                />
              </div>
              <button className="px-4 py-2 bg-brand text-white rounded-r-lg hover:bg-brand-dark transition-colors">
                Hledat
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-brand/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
 
 