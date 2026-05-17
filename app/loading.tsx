import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div
      className='flex min-h-[400px] flex-col items-center justify-center space-y-4'
      role='status'
      aria-label='Loading content'
    >
      <Loader2
        className='h-8 w-8 animate-spin text-muted-foreground'
        aria-hidden='true'
      />
      <p className='animate-pulse text-sm text-muted-foreground'>Loading...</p>
      <span className='sr-only'>Please wait while the content is loading</span>
    </div>
  )
}
