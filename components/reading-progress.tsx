'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function ReadingProgress({ className }: { className?: string }) {
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setReadingProgress(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        )
      }
    }

    window.addEventListener('scroll', updateScrollCompletion)
    updateScrollCompletion()

    return () => window.removeEventListener('scroll', updateScrollCompletion)
  }, [])

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-50 h-1 bg-primary transition-all duration-300 ease-out',
        className
      )}
      style={{ width: `${readingProgress}%` }}
    />
  )
}
