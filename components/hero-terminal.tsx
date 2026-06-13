'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'

/* ─── terminal line definitions ─── */

interface TerminalLine {
  type: 'command' | 'output' | 'blank'
  content: string
  /** only applies to 'command' lines */
  typingSpeed?: number
  /** pause (ms) after this line finishes before proceeding */
  pauseAfter?: number
  /** optional className for styling individual output tokens */
  className?: string
}

const TERMINAL_LINES: TerminalLine[] = [
  {
    type: 'command',
    content: 'whoami',
    typingSpeed: 60,
    pauseAfter: 300
  },
  {
    type: 'output',
    content: 'Atharva Naik',
    className: 'text-emerald-400'
  },
  {
    type: 'output',
    content: 'AI Full Stack Developer',
    className: 'text-zinc-400'
  },
  { type: 'blank', content: '' },
  {
    type: 'command',
    content: 'cat stack.json',
    typingSpeed: 50,
    pauseAfter: 200
  },
  {
    type: 'output',
    content: '{',
    className: 'text-zinc-500'
  },
  {
    type: 'output',
    content: '  "agents":  "LangGraph"',
    className: 'text-amber-400'
  },
  {
    type: 'output',
    content: '  "backend": "FastAPI"',
    className: 'text-sky-400'
  },
  {
    type: 'output',
    content: '  "payments":"Solana"',
    className: 'text-violet-400'
  },
  {
    type: 'output',
    content: '  "frontend":"Next.js"',
    className: 'text-emerald-400'
  },
  {
    type: 'output',
    content: '}',
    className: 'text-zinc-500'
  },
  { type: 'blank', content: '' },
  {
    type: 'command',
    content: 'status',
    typingSpeed: 55,
    pauseAfter: 250
  },
  {
    type: 'output',
    content: "● GSoC '26 @ AOSSIE",
    className: 'text-green-400'
  },
  {
    type: 'output',
    content: '🚀 Shipping multi-agent AI',
    className: 'text-zinc-400'
  }
]

const PROMPT = 'atharva@dev:~$'

/* ─── component ─── */

export default function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState<
    { line: TerminalLine; typedContent: string; done: boolean }[]
  >([])
  const [currentLineIdx, setCurrentLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [allDone, setAllDone] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const processLine = useCallback(() => {
    if (currentLineIdx >= TERMINAL_LINES.length) {
      setAllDone(true)
      return
    }

    const line = TERMINAL_LINES[currentLineIdx]

    if (line.type === 'blank' || line.type === 'output') {
      // Output and blank lines appear instantly
      setVisibleLines(prev => [
        ...prev,
        { line, typedContent: line.content, done: true }
      ])
      const pause = line.pauseAfter ?? 80
      setTimeout(() => {
        setCurrentLineIdx(prev => prev + 1)
        setCharIdx(0)
      }, pause)
      return
    }

    // Command line — type character by character
    if (charIdx === 0) {
      // Add the line entry for the first time
      setVisibleLines(prev => [
        ...prev,
        { line, typedContent: '', done: false }
      ])
    }

    if (charIdx < line.content.length) {
      setVisibleLines(prev => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        updated[updated.length - 1] = {
          ...last,
          typedContent: line.content.slice(0, charIdx + 1)
        }
        return updated
      })
      setCharIdx(prev => prev + 1)
    } else {
      // Finished typing the command
      setVisibleLines(prev => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        updated[updated.length - 1] = { ...last, done: true }
        return updated
      })
      const pause = line.pauseAfter ?? 400
      setTimeout(() => {
        setCurrentLineIdx(prev => prev + 1)
        setCharIdx(0)
      }, pause)
    }
  }, [currentLineIdx, charIdx])

  useEffect(() => {
    if (allDone) return
    if (currentLineIdx >= TERMINAL_LINES.length) {
      setAllDone(true)
      return
    }

    const line = TERMINAL_LINES[currentLineIdx]
    const isTyping = line.type === 'command' && charIdx <= line.content.length
    const speed = isTyping ? (line.typingSpeed ?? 60) : 60

    const timer = setTimeout(processLine, speed)
    return () => clearTimeout(timer)
  }, [currentLineIdx, charIdx, allDone, processLine])

  // auto-scroll terminal content
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [visibleLines])

  return (
    <div className='group w-full min-w-[260px] max-w-[320px]'>
      {/* ── Terminal Window ── */}
      <div className='overflow-hidden rounded-xl border border-zinc-200/70 bg-zinc-50 shadow-xl transition-all duration-500 group-hover:shadow-2xl dark:border-zinc-800/80 dark:bg-zinc-950'>
        {/* Title bar */}
        <div className='flex items-center gap-2 border-b border-zinc-200/60 bg-zinc-100/80 px-4 py-2.5 dark:border-zinc-800/60 dark:bg-zinc-900/80'>
          {/* Traffic-light dots */}
          <div className='flex items-center gap-1.5'>
            <span className='h-2.5 w-2.5 rounded-full bg-red-400/80 dark:bg-red-500/70' />
            <span className='h-2.5 w-2.5 rounded-full bg-yellow-400/80 dark:bg-yellow-500/70' />
            <span className='h-2.5 w-2.5 rounded-full bg-green-400/80 dark:bg-green-500/70' />
          </div>
          <span className='ml-2 select-none text-[11px] font-medium tracking-wide text-zinc-400 dark:text-zinc-500'>
            portfolio — zsh
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={containerRef}
          className='h-[280px] overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-[1.7] sm:text-[13px]'
        >
          {visibleLines.map((entry, i) => {
            if (entry.line.type === 'blank') {
              return <div key={i} className='h-4' />
            }

            if (entry.line.type === 'command') {
              return (
                <div key={i} className='flex items-start gap-2'>
                  <span className='shrink-0 select-none text-emerald-600 dark:text-emerald-500'>
                    {PROMPT}
                  </span>
                  <span className='text-zinc-800 dark:text-zinc-200'>
                    {entry.typedContent}
                    {!entry.done && (
                      <span className='ml-px inline-block h-[14px] w-[7px] translate-y-[2px] animate-pulse bg-emerald-500/80' />
                    )}
                  </span>
                </div>
              )
            }

            // output line
            return (
              <div
                key={i}
                className={cn(
                  'pl-0 text-zinc-600 dark:text-zinc-400',
                  entry.line.className
                )}
              >
                {entry.typedContent}
              </div>
            )
          })}

          {/* Final blinking cursor after all done */}
          {allDone && (
            <div className='flex items-start gap-2'>
              <span className='shrink-0 select-none text-emerald-600 dark:text-emerald-500'>
                {PROMPT}
              </span>
              <span className='ml-px inline-block h-[14px] w-[7px] translate-y-[2px] animate-pulse bg-emerald-500/80' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
