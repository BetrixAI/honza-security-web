'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  width?: 'sm' | 'md' | 'lg' | 'xl'
}

const widthClasses = {
  sm: 'w-96',      // 384px
  md: 'w-[500px]', // 500px
  lg: 'w-[600px]', // 600px
  xl: 'w-[60vw]'   // 60vw according to spec
}

export default function SidePanel({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  width = 'xl' 
}: SidePanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`
              fixed top-0 right-0 h-full bg-bg-card border-l border-border-subtle z-50
              flex flex-col shadow-2xl ${widthClasses[width]}
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-subtle">
              <h2 className="text-xl font-semibold text-txt-primary">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-txt-secondary hover:text-txt-primary transition-colors
                         rounded-lg hover:bg-bg-card-alt focus:outline-none focus:ring-2 focus:ring-brand/50"
                aria-label="Zavřít panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content - overflow-scroll according to spec */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}