'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Building2, Code2, GraduationCap, Bot, Briefcase } from 'lucide-react'
import Link from 'next/link'

type AccentColor = 'emerald' | 'amber' | 'violet' | 'blue'

// Sorted by start date, newest first (descending)
const timelineData = [
  {
    id: 1,
    title: 'Open Source Contributor',
    company: 'AOSSIE / StabilityNexus',
    date: 'Mar 2026 – Present',
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
    title: 'AI News Aggregator',
    company: 'Personal Project',
    date: '2024',
    icon: <Bot className='h-5 w-5 text-[#3B82F6]' />,
    accent: 'blue' as AccentColor,
    description:
      'Built a full-stack AI platform with multi-agent pipelines, RAG, and real-time APIs.'
  },
  {
    id: 5,
    title: 'MCA',
    company: 'Savitribai Phule Pune University',
    date: '2024 – 2026',
    icon: <GraduationCap className='h-5 w-5 text-[#8B5CF6]' />,
    accent: 'violet' as AccentColor,
    description: 'Master of Computer Applications.'
  },
  {
    id: 4,
    title: 'Fullstack Engineer',
    company: 'Perfect Engineering',
    date: 'Dec 2023 – May 2025',
    icon: <Briefcase className='h-5 w-5 text-[#F59E0B]' />,
    accent: 'amber' as AccentColor,
    description:
      'Built AI-powered industrial systems including forecasting, defect detection, and analytics dashboards.'
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

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftState, setScrollLeftState] = useState(0)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)
  const [cardHeight, setCardHeight] = useState<number | 'auto'>('auto')

  const { scrollXProgress } = useScroll({ container: scrollRef })
  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // 4. EQUAL CARD HEIGHTS
  useEffect(() => {
    const calculateHeights = () => {
      if (!scrollRef.current) return
      const cards = scrollRef.current.querySelectorAll('article')
      let max = 0

      // Reset first to get natural heights
      cards.forEach(card => {
        card.style.height = 'auto'
      })

      cards.forEach(card => {
        if (card.offsetHeight > max) {
          max = card.offsetHeight
        }
      })
      setCardHeight(max)
    }

    calculateHeights()
    window.addEventListener('resize', calculateHeights)

    // Slight delay to ensure content is fully painted
    setTimeout(calculateHeights, 100)

    return () => window.removeEventListener('resize', calculateHeights)
  }, [])

  // 1. AUTO-SCROLL HINT on page load
  useEffect(() => {
    const section = sectionRef.current
    if (!section || !scrollRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          if (sessionStorage.getItem('timeline-hint-played')) return
          sessionStorage.setItem('timeline-hint-played', 'true')

          const el = scrollRef.current
          if (!el) return

          // 7. DRAG TOOLTIP
          setShowTooltip(true)

          // CSS transitions for the hint
          setTimeout(() => {
            el.style.scrollBehavior = 'smooth'
            el.scrollLeft = 120

            setTimeout(() => {
              el.scrollLeft = 0

              // Remove smooth behavior so native wheel/drag isn't lagged
              setTimeout(() => {
                el.style.scrollBehavior = 'auto'
              }, 400)
            }, 600 + 200) // 600ms scroll + 200ms pause
          }, 1000)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // 6. ACTIVE DOT ON SCROLL via IntersectionObserver
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setActiveCardIndex(index)
          }
        })
      },
      {
        root: el,
        threshold: 0.6 // Card must be 60% visible to activate
      }
    )

    const cards = el.querySelectorAll('article')
    cards.forEach(card => observer.observe(card))

    return () => observer.disconnect()
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeftState(scrollRef.current.scrollLeft)
  }

  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeftState - walk
  }

  // 3. DOT NAVIGATION FIX
  const scrollToCard = (index: number) => {
    const el = scrollRef.current
    if (!el) return

    const cards = el.querySelectorAll('article')
    if (cards[index] && cards[0]) {
      const firstCard = cards[0] as HTMLElement
      const targetCard = cards[index] as HTMLElement

      // Calculate exact left offset by subtracting the container's starting padding
      const paddingLeft = firstCard.offsetLeft
      const targetLeft = targetCard.offsetLeft - paddingLeft

      el.scrollTo({ left: targetLeft, behavior: 'smooth' })
    }
  }

  const activeColorHex = colorMap[timelineData[activeCardIndex].accent].hex

  return (
    <section
      ref={sectionRef}
      className='relative w-full select-none border-y border-black/5 bg-[#F5F4F0] py-24 dark:border-white/5 dark:bg-[#080808]'
    >
      <style>{`
        @keyframes tooltip-slide {
          0% { transform: translateX(20px); opacity: 0; }
          10% { transform: translateX(0); opacity: 1; }
          80% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-10px); opacity: 0; }
        }
        .animate-tooltip {
          animation: tooltip-slide 2.5s ease-in-out forwards;
        }
      `}</style>

      <div className='relative mb-12 flex w-full items-end justify-between px-4 md:px-12'>
        <h2 className='title m-0 text-left'>Journey & Experience</h2>

        <div className='font-mono text-sm tracking-widest text-zinc-400 dark:text-zinc-500'>
          0{activeCardIndex + 1} / 0{timelineData.length}
        </div>

        {/* 7. DRAG TOOLTIP */}
        {showTooltip && (
          <div className='animate-tooltip pointer-events-none absolute right-32 top-0 z-50 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-xl dark:bg-white dark:text-zinc-900'>
            ← drag
          </div>
        )}
      </div>

      {/* Edge fade mask on container */}
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
          {timelineData.map((item, index) => {
            // 1. YEAR LABEL FIX: Extract year dynamically
            const yearLabel = item.date.match(/\d{4}/)?.[0] || '2023'

            return (
              <motion.article
                key={item.id}
                data-index={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: 'easeOut'
                }}
                style={{ height: cardHeight !== 'auto' ? cardHeight : 'auto' }}
                className={`group relative flex w-[85vw] shrink-0 snap-start flex-col justify-start rounded-[20px] border border-[rgba(0,0,0,0.08)] bg-[#FFFFFF] p-6 transition-all duration-500 dark:border-[rgba(255,255,255,0.08)] dark:bg-[#111111] sm:w-[420px] ${colorMap[item.accent].hoverLight} ${colorMap[item.accent].hoverDark} `}
              >
                {/* Year Anchor */}
                <div className='pointer-events-none absolute -top-12 left-2 select-none text-4xl font-bold tracking-tighter text-black/5 dark:text-white/5'>
                  {yearLabel}
                </div>

                <div>
                  <div className='mb-8 flex items-start justify-between'>
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${colorMap[item.accent].bg}`}
                    >
                      {item.icon}
                    </div>

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

                {/* Interactive Links Area - Pushed to bottom using mt-auto */}
                {item.links && item.links.length > 0 && (
                  <div className='mt-auto flex flex-wrap gap-2 pt-8'>
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
            )
          })}
        </div>
      </div>

      <div className='mx-auto mt-2 max-w-4xl px-4 md:px-12'>
        {/* 5. SLEEK NAVIGATOR (TICK MARKS & AXIS) */}
        <div className='relative mb-8 flex w-full items-end justify-between'>
          <div className='absolute bottom-[14px] left-0 right-0 h-[1px] bg-black/10 dark:bg-white/10' />

          {timelineData.map((item, index) => {
            const isActive = index === activeCardIndex
            const yearLabel = item.date.match(/\d{4}/)?.[0] || '2023'

            return (
              <button
                key={`tick-${item.id}`}
                onClick={() => scrollToCard(index)}
                className='group relative flex flex-col items-center focus:outline-none'
                aria-label={`Scroll to ${yearLabel}`}
              >
                <div
                  className={`z-10 w-[2px] transition-all duration-300 ease-out`}
                  style={{
                    backgroundColor: isActive
                      ? activeColorHex
                      : 'var(--fallback-bg, rgba(150,150,150,0.3))',
                    height: isActive ? '32px' : '20px'
                  }}
                />
                <span
                  className={`mt-3 font-mono text-[11px] transition-colors duration-300 ${isActive ? 'font-bold text-zinc-900 dark:text-zinc-100' : 'text-zinc-500'}`}
                >
                  {yearLabel}
                </span>
              </button>
            )
          })}
        </div>

        {/* PROGRESS BAR */}
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
