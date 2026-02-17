'use client'

import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: 'fade-up' | 'fade-in' | 'fade-down' | 'slide-in-right' | 'scale-in'
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  animation = 'fade-up'
}: AnimatedSectionProps) {
  const animationClass = {
    'fade-up': 'animate-fade-up',
    'fade-in': 'animate-fade-in',
    'fade-down': 'animate-fade-down',
    'slide-in-right': 'animate-slide-in-right',
    'scale-in': 'animate-scale-in'
  }[animation]

  return (
    <div
      className={cn(
        'opacity-0',
        animationClass,
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  )
}
