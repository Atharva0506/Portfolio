'use client'

import { useEffect, useState } from 'react'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={scrollToTop}
      aria-label='Scroll to top'
      title='Scroll to top'
      className={cn(
        'fixed bottom-8 right-8 z-50 h-10 w-10 rounded-full bg-background shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      )}
    >
      <ArrowUpIcon className='h-4 w-4' />
    </Button>
  )
}
