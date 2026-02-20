import Image from 'next/image'
import authorImage from "@/public/images/authors/atharva.jpg"
import { BootUbuntuButton } from '@/components/UbuntuPortfolioIntroduction'

export default function Intro() {
  return (
    <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          #OpenToWork: Available for Full-Time & Freelance Roles
        </div>

        <h1 className='title no-underline'>Hey, I&#39;m Atharva Naik.</h1>
        <p className='mt-3 font-light text-muted-foreground'>
          I am an <strong>AI Engineer, Backend Developer, and Full Stack Developer</strong> based in India. As an <strong>LLM Architect</strong>, I specialize in building highly scalable AI applications, generative RAG systems, and robust infrastructure. My core expertise bridges <strong>Python, FastAPI, Next.js, and DevOps</strong> to deliver production-ready software solutions.
        </p>

        <div className='mt-8 flex flex-wrap items-center gap-4'>
          <a
            href='/contact'
            className='inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-100 dark:focus:ring-offset-black'
          >
            Hire Me / Book a Call
          </a>
          <a
            href='/Atharva_Naik.pdf'
            download
            className='inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800'
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
