import { ProjectListSkeleton } from '@/components/skeleton'
import { Skeleton } from '@/components/skeleton'

export default function Loading() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <Skeleton className='h-4 w-32 mb-6' />
        <Skeleton className='h-10 w-40 mb-12' />

        <ProjectListSkeleton count={4} />
      </div>
    </section>
  )
}
