/**
 * Hover Animation komponenty pro ETAPA 9 - Micro-animace & Polish
 * Scale, glow, tilt efekty pro interaktivní prvky
 * Owner: Kubca - animations
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'scale' | 'glow' | 'tilt' | 'lift'
  disabled?: boolean
}

export function AnimatedCard({ 
  children, 
  className = '', 
  variant = 'scale',
  disabled = false 
}: AnimatedCardProps) {
  if (disabled) {
    return <div className={className}>{children}</div>
  }

  const variants = {
    scale: {
      whileHover: { 
        scale: 1.02,
        y: -4,
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.25)',
        transition: { duration: 0.3, ease: 'easeOut' }
      },
      whileTap: { scale: 0.98 }
    },
    glow: {
      whileHover: { 
        scale: 1.01,
        boxShadow: '0 0 25px rgba(66, 165, 255, 0.4), 0 0 50px rgba(66, 165, 255, 0.1)',
        transition: { duration: 0.4, ease: 'easeOut' }
      },
      whileTap: { scale: 0.99 }
    },
    tilt: {
      whileHover: { 
        scale: 1.01,
        rotateY: 3,
        rotateX: 3,
        y: -6,
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
        transition: { duration: 0.4, ease: 'easeOut' }
      },
      whileTap: { scale: 0.99 }
    },
    lift: {
      whileHover: { 
        y: -8,
        scale: 1.01,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        transition: { duration: 0.3, ease: 'easeOut' }
      },
      whileTap: { scale: 0.99 }
    }
  }

  return (
    <motion.div
      className={className}
      whileHover={variants[variant].whileHover}
      whileTap={'whileTap' in variants[variant] ? variants[variant].whileTap : undefined}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'bounce' | 'pulse' | 'glow' | 'ripple'
  disabled?: boolean
}

export function AnimatedButton({ 
  children, 
  className = '', 
  onClick,
  variant = 'bounce',
  disabled = false 
}: AnimatedButtonProps) {
  const variants = {
    bounce: {
      whileHover: { 
        scale: 1.05,
        transition: { type: 'spring', stiffness: 400, damping: 10 }
      },
      whileTap: { scale: 0.95 }
    },
    pulse: {
      whileHover: { 
        scale: [1, 1.05, 1],
        transition: { duration: 0.6, repeat: Infinity }
      },
      whileTap: { scale: 0.95 }
    },
    glow: {
      whileHover: { 
        boxShadow: '0 0 25px rgba(66, 165, 255, 0.6)',
        transition: { duration: 0.3 }
      },
      whileTap: { scale: 0.95 }
    },
    ripple: {
      whileTap: { 
        scale: 0.95,
        transition: { duration: 0.1 }
      },
      whileHover: { scale: 1.02 }
    }
  }

  return (
    <motion.button
      className={`${className} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      onClick={disabled ? undefined : onClick}
      whileHover={variants[variant].whileHover}
      whileTap={variants[variant].whileTap}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}

interface AnimatedIconProps {
  children: React.ReactNode
  className?: string
  variant?: 'spin' | 'bounce' | 'wiggle' | 'float'
  trigger?: 'hover' | 'always' | 'none'
}

export function AnimatedIcon({ 
  children, 
  className = '', 
  variant = 'bounce',
  trigger = 'hover' 
}: AnimatedIconProps) {
  const animations = {
    spin: {
      rotate: 360,
      transition: { duration: 2, repeat: Infinity, ease: 'linear' }
    },
    bounce: {
      y: [-2, 2, -2],
      transition: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
    },
    wiggle: {
      rotate: [-10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    },
    float: {
      y: [-5, 5, -5],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    }
  }

  const getAnimation = () => {
    if (trigger === 'always') return animations[variant]
    if (trigger === 'none') return {}
    return {}
  }

  const getHoverAnimation = () => {
    if (trigger === 'hover') return animations[variant]
    return {}
  }

  return (
    <motion.div
      className={className}
      animate={getAnimation()}
      whileHover={getHoverAnimation()}
    >
      {children}
    </motion.div>
  )
}

// Scroll reveal animace
interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  delay?: number
}

export function ScrollReveal({ 
  children, 
  className = '', 
  direction = 'up',
  delay = 0 
}: ScrollRevealProps) {
  const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
    fade: { opacity: 0 }
  }

  return (
    <motion.div
      className={className}
      initial={directionVariants[direction]}
      whileInView={{ 
        x: 0, 
        y: 0, 
        opacity: 1,
        transition: { 
          duration: 0.6, 
          delay,
          ease: 'easeOut'
        }
      }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {children}
    </motion.div>
  )
}
 


