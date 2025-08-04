import React from 'react'
import { cn } from '@/lib/utils'

interface DashboardGridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const colsClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-1 md:grid-cols-6 lg:grid-cols-12'
}

const gapClasses = {
  sm: 'gap-4',
  md: 'gap-6', 
  lg: 'gap-8',
  xl: 'gap-8'
}

export default function DashboardGrid({ 
  children, 
  cols = 4, 
  gap = 'xl',
  className 
}: DashboardGridProps) {
  return (
    <div className={cn(
      'grid',
      colsClasses[cols],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}