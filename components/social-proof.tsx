import { Code2, Database } from 'lucide-react'
import Image from 'next/image'

export default function SocialProof() {
  return (
    <section className='mb-24 mt-8 border-y border-muted/30 py-10 dark:border-muted/10'>
      <p className='mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground'>
        Trusted By & Contributing To
      </p>
      <div className='flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0'>
        {/* AOSSIE (GSoC) */}
        <div className='flex items-center gap-2 px-4'>
          <Image
            src='https://aossie.org/logo1.png'
            alt='AOSSIE Logo'
            width={32}
            height={32}
            className='object-contain'
          />
          <span className='text-lg font-bold tracking-tight'>AOSSIE</span>
        </div>

        {/* TCS */}
        <div className='flex items-center gap-2 px-4'>
          <Image
            src='https://www.tcs.com/content/dam/global-tcs/en/images/home/tcs-logo-1.svg'
            alt='TCS Logo'
            width={60}
            height={24}
            className='h-6 w-auto object-contain'
          />
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
