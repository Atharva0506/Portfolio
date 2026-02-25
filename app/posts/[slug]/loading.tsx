import { ArticleSkeleton } from '@/components/skeleton'
import { Skeleton } from '@/components/skeleton'

export default function Loading() {
  return (
    <section className='pb-24 pt-24 md:pt-32'>
      <div className='container max-w-3xl'>
        <Skeleton className='h-4 w-48 mb-6' />
        <Skeleton className='h-5 w-32 mb-8' />

        <ArticleSkeleton />
      </div>
    </section>
  )
}
