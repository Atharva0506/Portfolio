import { Building2, Code2, Database } from 'lucide-react'

export default function SocialProof() {
  return (
    <section className='mb-24 mt-8 border-y border-muted/30 py-10 dark:border-muted/10'>
      <p className='mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground'>
        Trusted By & Contributing To
      </p>
      <div className='flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0'>
        {/* TCS */}
        <div className='flex items-center gap-2 px-4'>
          <Building2 className='h-6 w-6 text-blue-600' />
          <span className='text-lg font-bold tracking-tight'>TCS</span>
        </div>

        {/* StabilityNexus */}
        <div className='flex items-center gap-2 px-4'>
          <Code2 className='h-6 w-6 text-indigo-500' />
          <span className='text-lg font-bold tracking-tight'>
            StabilityNexus
          </span>
        </div>

        {/* MongoDB */}
        <div className='flex items-center gap-2 px-4'>
          <Database className='h-6 w-6 text-green-600' />
          <span className='text-lg font-bold tracking-tight'>
            MongoDB Certified
          </span>
        </div>
      </div>
    </section>
  )
}
