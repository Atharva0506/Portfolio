import Image from 'next/image'
import Link from 'next/link'
import authorImage from '@/public/images/authors/atharva.jpg'
import { BootUbuntuButton } from '@/components/UbuntuPortfolioIntroduction'
import TypingAnimation from '@/components/typing-animation'

const subtitlePhrases = [
  "GSoC '26 @ AOSSIE",
  'Multi-agent LLM pipelines → production',
  'Solana payments in AI products',
  'FastAPI backends processing 500+ articles/day',
  'RAG systems with persistent memory',
  'From autonomous reasoning to autonomous revenue'
]

export default function Intro() {
  return (
    <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-700 shadow-sm backdrop-blur-md dark:text-green-400'>
          <span className='relative flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75'></span>
            <span className='relative inline-flex h-2 w-2 rounded-full bg-green-500'></span>
          </span>
          Open to Work — Full-Time &amp; Freelance
        </div>

        <h1 className='title no-underline'>
          I Build AI Agents That Handle Money
        </h1>

        <p className='mt-3 h-7 text-base font-medium text-muted-foreground'>
          <TypingAnimation
            phrases={subtitlePhrases}
            typingSpeed={70}
            deletingSpeed={35}
            pauseDuration={3500}
          />
        </p>

        <p className='mt-4 font-light leading-relaxed text-muted-foreground'>
          I combine <strong>LangGraph multi-agent orchestration</strong>,{' '}
          <strong>Solana blockchain payments</strong>, and{' '}
          <strong>FastAPI backends</strong> to build AI products that don&apos;t
          just think — they transact. Currently shipping production systems with
          real-time SSE streaming and crypto-native monetization.
        </p>

        <div className='mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground'>
          <span>📍 Pune, India</span>
          <span>🏆 GSoC &apos;26 @ AOSSIE</span>
          <span>⚡ News AI : 4-agent pipelines, 100+ articles/day</span>
        </div>

        {/* CTA Buttons — premium styling with subtle borders and glow */}
        <div className='mt-8 flex flex-wrap items-center gap-4'>
          {/* Primary CTA */}
          <Link
            href='/contact'
            className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-900/20 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:shadow-zinc-50/10 dark:focus:ring-zinc-100 dark:focus:ring-offset-black'
          >
            <span className='absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[200%] dark:via-black/10' />
            <span className='relative'>Get in Touch</span>
          </Link>
          <Link
            href='https://drive.google.com/file/d/1AiKcpCz7bDBYmVkjDBY5dkjZeJWCp_aV/view?usp=sharing'
            target='_blank'
            rel='noopener noreferrer'
            className='relative inline-flex items-center justify-center rounded-lg border border-zinc-200/80 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md hover:shadow-zinc-200/40 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 active:scale-[0.98] dark:border-zinc-700/80 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:hover:shadow-zinc-900/40 dark:focus:ring-zinc-600 dark:focus:ring-offset-black'
          >
            View Resume
          </Link>

          <div className='hidden md:block'>
            <BootUbuntuButton />
          </div>
        </div>
        <div className='mt-4 md:hidden'>
          <BootUbuntuButton />
        </div>
      </div>

      {/* Hero image — elegantly framed hover */}
      <div className='relative mt-12 flex justify-center md:mt-0 md:justify-end'>
        {/* Soft glow behind the image */}
        <div className='absolute -inset-4 rounded-full bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 opacity-50 blur-2xl transition-opacity duration-500 hover:opacity-75 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800' />

        {/* Glassmorphic border container */}
        <div className='relative rounded-[2rem] border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/50'>
          <Image
            className='rounded-2xl object-cover transition-all duration-500 hover:scale-[1.02] hover:shadow-lg dark:grayscale-[15%] dark:hover:grayscale-0'
            src={authorImage}
            alt='Atharva Naik — AI Full Stack Developer specializing in LangChain, FastAPI, and Next.js'
            width={175}
            height={175}
            placeholder='blur'
            priority
          />
        </div>
      </div>
    </section>
  )
}
