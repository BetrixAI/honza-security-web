/**
 * Page Transition komponenta pro ETAPA 9 - Micro-animace & Polish
 * Fade-in animace při změně stran
 * Owner: Kubca - page transitions
 */

'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.4,
            ease: 'easeOut'
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -20,
          transition: {
            duration: 0.3,
            ease: 'easeIn'
          }
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Staggered animation pro seznamy
interface StaggeredListProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
}

export function StaggeredList({ children, className = '', staggerDelay = 0.1 }: StaggeredListProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.5,
                ease: 'easeOut'
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Route change loading komponenta
export function RouteChangeLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-dark to-brand-light z-50"
    >
      <motion.div
        className="h-full bg-brand-light"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
 
 
 