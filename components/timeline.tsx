'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Building2, Code2, GraduationCap, Bot, Briefcase } from 'lucide-react'
import Link from 'next/link'

type AccentColor = 'emerald' | 'amber' | 'violet' | 'blue'

const timelineData = [
  {
    id: 1,
    year: '2023',
    title: 'Open Source Contributor',
    company: 'AOSSIE / StabilityNexus',
    date: 'Mar 2023 – Present',
    icon: <Code2 className='h-5 w-5 text-[#10B981]' />,
    accent: 'emerald' as AccentColor,
    description:
      'Contributed to decentralized applications like Chainvoice. Merged multiple PRs and worked on backend + blockchain integrations. Researched Lit Protocol implementation for decentralized authentication.',
    links: [
      {
        label: 'VouchMe PR #35',
        url: 'https://github.com/StabilityNexus/VouchMe/pull/35'
      },
      {
        label: 'Chainvoice PR #146',
        url: 'https://github.com/StabilityNexus/Chainvoice/pull/146'
      },
      {
        label: 'Chainvoice PR #138',
        url: 'https://github.com/StabilityNexus/Chainvoice/pull/138'
      },
      {
        label: 'Chainvoice Issue #139',
        url: 'https://github.com/StabilityNexus/Chainvoice/issues/139'
      }
    ]
  },
  {
    id: 2,
    year: '2025',
    title: 'Fullstack Engineer — AI Platform',
    company: 'Tata Consultancy Services',
    date: 'May 2025 – Nov 2025',
    icon: <Building2 className='h-5 w-5 text-[#F59E0B]' />,
    accent: 'amber' as AccentColor,
    description:
      'Built an internal AI coding assistant used by 300+ engineers. Designed FastAPI backend, React frontend, RAG pipelines, and real-time streaming.'
  },
  {
    id: 3,
    year: '2024',
    title: 'AI News Aggregator',
    company: 'Personal Project',
    date: '2024',
    icon: <Bot className='h-5 w-5 text-[#3B82F6]' />,
    accent: 'blue' as AccentColor,
    description:
      'Built a full-stack AI platform with multi-agent pipelines, RAG, and real-time APIs.'
  },
  {
    id: 4,
    year: '2023',
    title: 'Fullstack Engineer',
    company: 'Perfect Engineering',
    date: 'Dec 2023 – May 2025',
    icon: <Briefcase className='h-5 w-5 text-[#F59E0B]' />,
    accent: 'amber' as AccentColor,
    description:
      'Built AI-powered industrial systems including forecasting, defect detection, and analytics dashboards.'
  },
  {
    id: 5,
    year: '2024',
    title: 'MCA',
    company: 'Savitribai Phule Pune University',
    date: '2024 – 2026',
    icon: <GraduationCap className='h-5 w-5 text-[#8B5CF6]' />,
    accent: 'violet' as AccentColor,
    description: 'Master of Computer Applications.'
  }
]

const colorMap = {
  emerald: {
    bg: 'bg-[#10B981]/15',
    text: 'text-[#10B981]',
    hex: '#10B981',
    hoverDark:
      'dark:hover:border-[#10B981]/40 dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    hoverLight:
      'hover:border-[#10B981]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
  },
  amber: {
    bg: 'bg-[#F59E0B]/15',
    text: 'text-[#F59E0B]',
    hex: '#F59E0B',
    hoverDark:
      'dark:hover:border-[#F59E0B]/40 dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    hoverLight:
      'hover:border-[#F59E0B]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
  },
  violet: {
    bg: 'bg-[#8B5CF6]/15',
    text: 'text-[#8B5CF6]',
    hex: '#8B5CF6',
    hoverDark:
      'dark:hover:border-[#8B5CF6]/40 dark:hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]',
    hoverLight:
      'hover:border-[#8B5CF6]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
  },
  blue: {
    bg: 'bg-[#3B82F6]/15',
    text: 'text-[#3B82F6]',
    hex: '#3B82F6',
    hoverDark:
      'dark:hover:border-[#3B82F6]/40 dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    hoverLight:
      'hover:border-[#3B82F6]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
  }
}

// Easing function for smooth manual animation
const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftState, setScrollLeftState] = useState(0)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)

  // Custom scroll progress for the thin bar
  const { scrollXProgress } = useScroll({ container: scrollRef })
  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Smooth custom scroll animation function
  const animateScroll = useCallback(
    (targetLeft: number, duration: number, callback?: () => void) => {
      const el = scrollRef.current
      if (!el) return

      const startLeft = el.scrollLeft
      const distance = targetLeft - startLeft
      let startTime: number | null = null

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const easeProgress = easeInOutQuad(progress)

        el.scrollLeft = startLeft + distance * easeProgress

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          if (callback) callback()
        }
      }

      requestAnimationFrame(step)
    },
    []
  )

  // 1. AUTO-SCROLL HINT on page load
  useEffect(() => {
    const section = sectionRef.current
    if (!section || !scrollRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          if (sessionStorage.getItem('timeline-hint-played')) return
          sessionStorage.setItem('timeline-hint-played', 'true')

          // Wait a tiny bit for the entrance animation to settle
          setTimeout(() => {
            // Scroll right 120px over 600ms
            animateScroll(120, 600, () => {
              // Pause 200ms, then scroll back to 0 over 400ms
              setTimeout(() => {
                animateScroll(0, 400)
              }, 200)
            })
          }, 1500)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [animateScroll])

  // 2. TOOLTIP on first hover
  const handleMouseEnterSection = () => {
    if (!sessionStorage.getItem('timeline-tooltip-shown')) {
      sessionStorage.setItem('timeline-tooltip-shown', 'true')
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 2000)
    }
  }

  // 3. INTERSECTION OBSERVER for active card
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      const scrollPos = el.scrollLeft
      const cardWidth = 420 + 24 // 420px width + 24px gap (approx)
      // Determine active card based on scroll position (center of the viewport)
      const index = Math.round(scrollPos / cardWidth)
      setActiveCardIndex(Math.max(0, Math.min(index, timelineData.length - 1)))
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  // Mouse Wheel to Horizontal Scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return

      const { scrollLeft, scrollWidth, clientWidth } = el
      const maxScroll = scrollWidth - clientWidth

      if (
        (e.deltaY > 0 && scrollLeft < maxScroll - 1) ||
        (e.deltaY < 0 && scrollLeft > 1)
      ) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeftState(scrollRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeftState - walk
  }

  // Scroll to dot
  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return
    // Approximate card width + gap.
    // Wait, a more robust way is to select the child element and use its offsetLeft.
    const container = scrollRef.current
    const cards = container.querySelectorAll('article')
    if (cards[index]) {
      const targetLeft =
        (cards[index] as HTMLElement).offsetLeft - container.offsetLeft
      container.scrollTo({ left: targetLeft, behavior: 'smooth' })
    }
  }

  const activeColorHex = colorMap[timelineData[activeCardIndex].accent].hex

  return (
    <section
      ref={sectionRef}
      onMouseEnter={handleMouseEnterSection}
      className='relative w-full select-none border-y border-black/5 bg-[#F5F4F0] py-24 dark:border-white/5 dark:bg-[#080808]'
    >
      <div className='relative mb-12 flex w-full items-end justify-between px-4 md:px-12'>
        <h2 className='title m-0 text-left'>Journey & Experience</h2>

        {/* 6. CARD COUNT INDICATOR */}
        <div className='font-mono text-sm tracking-widest text-zinc-400 dark:text-zinc-500'>
          0{activeCardIndex + 1} / 0{timelineData.length}
        </div>

        {/* 2. FLOATING TOOLTIP */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='pointer-events-none absolute right-32 top-0 z-50 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-xl dark:bg-white dark:text-zinc-900'
          >
            ← drag to explore →
          </motion.div>
        )}
      </div>

      {/* 
        Scroll Container 
        5. EDGE FADE: Right edge fades out over 80px
      */}
      <div
        className='relative w-full'
        style={{
          maskImage:
            'linear-gradient(to right, black calc(100% - 80px), transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, black calc(100% - 80px), transparent 100%)'
        }}
      >
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex w-full snap-x snap-mandatory items-start gap-6 overflow-x-auto px-4 pb-12 pt-12 [-ms-overflow-style:none] [scrollbar-width:none] md:px-12 [&::-webkit-scrollbar]:hidden ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab'}`}
        >
          {timelineData.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: 'easeOut'
              }}
              className={`group relative flex w-[85vw] shrink-0 snap-start flex-col justify-between rounded-[20px] border border-[rgba(0,0,0,0.08)] bg-[#FFFFFF] p-6 transition-all duration-500 dark:border-[rgba(255,255,255,0.08)] dark:bg-[#111111] sm:w-[420px] ${colorMap[item.accent].hoverLight} ${colorMap[item.accent].hoverDark} `}
            >
              {/* Year Anchor */}
              <div className='pointer-events-none absolute -top-12 left-2 select-none text-4xl font-bold tracking-tighter text-black/5 dark:text-white/5'>
                {item.year}
              </div>

              <div>
                <div className='mb-8 flex items-start justify-between'>
                  {/* Icon Container with Accent Background */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${colorMap[item.accent].bg}`}
                  >
                    {item.icon}
                  </div>

                  {/* Date Pill */}
                  <span className='ml-4 inline-flex shrink-0 items-center rounded-full bg-[rgba(0,0,0,0.05)] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-tight text-zinc-600 dark:bg-[rgba(255,255,255,0.06)] dark:text-zinc-300'>
                    {item.date}
                  </span>
                </div>

                <div className='space-y-1'>
                  <p className='text-[13px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400'>
                    {item.company}
                  </p>
                  <h3 className='font-serif text-[26px] italic tracking-tight text-zinc-900 dark:text-zinc-100'>
                    {item.title}
                  </h3>
                  <p className='pt-4 text-[14px] leading-[1.7] text-zinc-600 dark:text-zinc-400'>
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Interactive Links Area */}
              {item.links && item.links.length > 0 && (
                <div className='mt-8 flex flex-wrap gap-2'>
                  {item.links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center rounded-lg border border-[rgba(0,0,0,0.08)] bg-transparent px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-[rgba(0,0,0,0.03)] dark:border-[rgba(255,255,255,0.08)] dark:text-zinc-400 dark:hover:bg-[rgba(255,255,255,0.03)]'
                    >
                      <svg
                        className='mr-1.5 h-3.5 w-3.5 shrink-0 opacity-70'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'></path>
                        <polyline points='15 3 21 3 21 9'></polyline>
                        <line x1='10' y1='14' x2='21' y2='3'></line>
                      </svg>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>

      <div className='mt-6 px-4 md:px-12'>
        {/* 3. TIMELINE DOTS */}
        <div className='mb-4 flex items-center gap-4'>
          {timelineData.map((item, index) => {
            const isActive = index === activeCardIndex
            return (
              <button
                key={`dot-${item.id}`}
                onClick={() => scrollToCard(index)}
                className='group flex flex-col items-center gap-2 focus:outline-none'
                aria-label={`Scroll to ${item.year}`}
              >
                <div
                  className={`h-2 w-2 rounded-full transition-all duration-300 ease-out`}
                  style={{
                    backgroundColor: isActive
                      ? activeColorHex
                      : 'var(--fallback-bg, rgba(150,150,150,0.3))',
                    transform: isActive ? 'scale(1.3)' : 'scale(1)'
                  }}
                />
              </button>
            )
          })}
        </div>

        {/* 4. SCROLL PROGRESS BAR */}
        <div className='h-[2px] w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/5'>
          <motion.div
            className='h-full origin-left transition-colors duration-300 ease-out'
            style={{
              scaleX,
              backgroundColor: activeColorHex
            }}
          />
        </div>
      </div>
    </section>
  )
}
