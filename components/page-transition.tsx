'use client'

import { cn } from '@/lib/utils'

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export default function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <div
      className={cn(
        'opacity-0 animate-fade-in',
        className
      )}
      style={{
        animationDuration: '0.4s',
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  )
}
