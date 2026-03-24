import { ProjectListSkeleton, Skeleton } from '@/components/skeleton'

export default function Loading() {
  return (
    <section className='pb-24 pt-24 md:pt-40'>
      <div className='container max-w-3xl'>
        <Skeleton className='mb-6 h-4 w-40' />
        <Skeleton className='mb-12 h-10 w-64' />

        <div className='mb-10'>
          <Skeleton className='mb-6 h-6 w-36' />
          <ProjectListSkeleton count={4} />
        </div>

        <div className='mb-10'>
          <Skeleton className='mb-6 h-6 w-28' />
          <ProjectListSkeleton count={2} />
        </div>

        <div>
          <Skeleton className='mb-6 h-6 w-24' />
          <ProjectListSkeleton count={2} />
        </div>
      </div>
    </section>
  )
}
