import { Skeleton } from '@/components/skeleton'
import Breadcrumbs from '@/components/breadcrumbs'
import PageTransition from '@/components/page-transition'

export default function Loading() {
  return (
    <PageTransition>
      <section className='pb-24 pt-24 md:pt-40'>
        <div className='container max-w-3xl'>
          <Breadcrumbs
            items={[{ label: 'Contributions', href: '/contributions' }]}
          />
          <h1 className='title mb-12'>GitHub Contributions</h1>

          <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-wrap gap-2'>
              <Skeleton className='h-8 w-28 rounded-lg' />
              <Skeleton className='h-8 w-28 rounded-lg' />
              <Skeleton className='h-8 w-20 rounded-lg' />
            </div>
            <Skeleton className='h-8 w-[120px] rounded-lg' />
          </div>

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className='h-[160px] rounded-2xl border border-zinc-200/80 bg-zinc-50/40 p-5 dark:border-zinc-800/80 dark:bg-zinc-900/40 sm:p-6 flex flex-col'
              >
                <div className='flex items-start justify-between gap-3'>
                  <div className='flex items-center gap-3 w-full'>
                    <Skeleton className='h-7 w-7 rounded-full' />
                    <div className='flex flex-col gap-2 w-full'>
                      <Skeleton className='h-3 w-1/3' />
                      <Skeleton className='h-2 w-1/4' />
                    </div>
                  </div>
                  <Skeleton className='h-8 w-8 rounded-full shrink-0' />
                </div>
                
                <Skeleton className='mt-6 h-4 w-5/6' />
                <Skeleton className='mt-2 h-4 w-4/6' />
                
                <div className='mt-5 flex gap-2'>
                   <Skeleton className='h-5 w-16' />
                   <Skeleton className='h-5 w-12' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
