import Image from 'next/image'
import authorImage from "@/public/images/authors/atharva.jpg"
import { BootUbuntuButton } from '@/components/UbuntuPortfolioIntroduction'

export default function Intro() {
  return (
    <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <h1 className='title no-underline'>Hey, I&#39;m Atharva Naik.</h1>
        <p className='mt-3 font-light text-muted-foreground'>
          I&#39;m a Software Developer specializing in AI-powered applications
          and backend systems. Based in Pune, India, I work with Python,
          FastAPI, and LLMs to build scalable, real-world solutions.
        </p>

        <div className='mt-8 flex flex-wrap items-center gap-4'>
          <a
            href='/Atharva_Naik.pdf'
            download
            className='inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-100 dark:focus:ring-offset-black'
          >
            Download Resume
          </a>
          <div className="hidden md:block">
            <BootUbuntuButton />
          </div>

        </div>
        <div className="mt-4 md:hidden">
          <BootUbuntuButton />
        </div>
      </div>
      <div className='relative group'>
        <Image
          className='flex-1 rounded-lg grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105'
          src={authorImage}
          alt='Atharva Naik'
          width={175}
          height={175}
          priority
        />
      </div>
    </section>
  )
}
