'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center gap-6 text-center'>
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20'>
        <AlertCircle className='h-10 w-10 text-red-600 dark:text-red-400' />
      </div>
      <div className='space-y-2'>
        <h2 className='text-2xl font-bold tracking-tight'>
          Something went wrong!
        </h2>
        <p className='text-muted-foreground'>
          An unexpected error occurred. We have been notified.
        </p>
      </div>
      <div className='flex items-center gap-4'>
        <Button onClick={() => reset()} variant='default'>
          Try again
        </Button>
        <Button asChild variant='outline'>
          <Link href='/'>Go home</Link>
        </Button>
      </div>
    </div>
  )
}
