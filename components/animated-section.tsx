'use client'

import { useEffect, useRef, useState } from 'react'
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
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -20px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const animationClass = {
    'fade-up': 'animate-fade-up',
    'fade-in': 'animate-fade-in',
    'fade-down': 'animate-fade-down',
    'slide-in-right': 'animate-slide-in-right',
    'scale-in': 'animate-scale-in'
  }[animation]

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0',
        isInView && animationClass,
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
