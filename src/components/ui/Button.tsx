'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ children, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-security-blue-500 focus:ring-offset-2 focus:ring-offset-black'
  
  const variants: Record<string, string> = {
    primary: 'bg-security-blue-600 hover:bg-security-blue-700 text-white',
    outline: 'border border-security-blue-600 text-security-blue-400 hover:bg-security-blue-600 hover:text-white',
    ghost: 'text-gray-400 hover:text-white hover:bg-gray-800'
  }
  
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  )
}