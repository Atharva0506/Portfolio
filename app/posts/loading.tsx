import { PostListSkeleton } from '@/components/skeleton'
import { Skeleton } from '@/components/skeleton'

export default function Loading() {
  return (
    <section className='pb-24 pt-24 md:pt-40'>
      <div className='container max-w-3xl'>
        <Skeleton className='h-4 w-32 mb-6' />
        <Skeleton className='h-10 w-32 mb-12' />

        <div className='mb-12 flex items-center gap-3'>
          <Skeleton className='h-9 w-full sm:w-1/2' />
        </div>

        <PostListSkeleton count={5} />
      </div>
    </section>
  )
}
