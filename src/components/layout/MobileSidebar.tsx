'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import Sidebar from './Sidebar'

interface MobileSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function MobileSidebar({ isOpen, onToggle }: MobileSidebarProps) {
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-bg-card border border-border-subtle 
                 rounded-lg text-txt-primary hover:bg-bg-card-alt transition-colors
                 focus:outline-none focus:ring-2 focus:ring-brand/50"
        aria-label={isOpen ? 'Zavřít menu' : 'Otevřít menu'}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Off-canvas Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 left-0 z-50 h-full"
            >
              <Sidebar className="shadow-2xl" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
 
 