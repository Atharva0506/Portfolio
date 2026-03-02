import Image from 'next/image'
import authorImage from "@/public/images/authors/atharva.jpg"
import { BootUbuntuButton } from '@/components/UbuntuPortfolioIntroduction'
import TypingAnimation from '@/components/typing-animation'

const subtitlePhrases = [
  'Building multi-agent AI systems',
  'Shipping production-ready LLM apps',
  'Designing scalable FastAPI backends',
  'Crafting full stack AI experiences',
]

export default function Intro() {
  return (
    <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Open to Work — Full-Time &amp; Freelance
        </div>

        <h1 className='title no-underline'>Atharva Naik — Full Stack Developer</h1>

        
        <p className='mt-3 h-7 text-base font-medium text-muted-foreground'>
          <TypingAnimation
            phrases={subtitlePhrases}
            typingSpeed={70}
            deletingSpeed={35}
            pauseDuration={3500}
          />
        </p>

        <p className='mt-4 font-light leading-relaxed text-muted-foreground'>
          I build <strong>AI-powered applications</strong> — from multi-agent LLM pipelines to production-ready full stack systems. My core stack bridges <strong>Python, FastAPI, LangChain, Next.js, and Cloud</strong> to ship scalable software that solves real problems.
        </p>

        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
          <span>📍 Pune, India</span>
          <span>🔧 3+ AI apps shipped</span>
          <span>⚡ Built RAG systems, multi-agent pipelines</span>
        </div>

        {/* CTA Buttons — premium styling with subtle borders and glow */}
        <div className='mt-8 flex flex-wrap items-center gap-4'>
          {/* Primary CTA */}
          <a
            href='/contact'
            className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/20 hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:shadow-zinc-50/10 dark:focus:ring-zinc-100 dark:focus:ring-offset-black'
          >
           
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 dark:via-black/10" />
            <span className="relative">Book a Call</span>
          </a>
          <a
            href='/Atharva_Naik.pdf'
            download
            className='relative inline-flex items-center justify-center rounded-lg border border-zinc-200/80 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md hover:shadow-zinc-200/40 hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-700/80 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:hover:shadow-zinc-900/40 dark:focus:ring-zinc-600 dark:focus:ring-offset-black'
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

      {/* Hero image — clean, professional hover */}
      <div className='relative'>
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-zinc-200 via-transparent to-zinc-200/50 opacity-0 blur-sm transition-opacity duration-500 hover:opacity-100 dark:from-zinc-700 dark:to-zinc-700/50" />
        <Image
          className='relative rounded-lg transition-all duration-500 hover:shadow-lg hover:shadow-zinc-300/50 dark:hover:shadow-zinc-800/50'
          src={authorImage}
          alt='Atharva Naik — AI Full Stack Developer'
          width={175}
          height={175}
          priority
        />
      </div>
    </section>
  )
}
