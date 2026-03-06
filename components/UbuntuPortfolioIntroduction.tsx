'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, ExternalLink, Terminal } from 'lucide-react'

const UBUNTU_PORTFOLIO_URL = 'https://ubuntu.atharvanaik.me/'
const STORAGE_KEY = 'hasSeenUbuntuIntro'

/**
 * A non-intrusive bottom-right floating card suggesting the Ubuntu Portfolio.
 */
export function UbuntuPortfolioIntroduction() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const hasSeen = localStorage.getItem(STORAGE_KEY)
        if (!hasSeen) {
            // Delay appearance so it doesn't distract immediately
            const timer = setTimeout(() => {
                setIsOpen(true)
            }, 2500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        localStorage.setItem(STORAGE_KEY, 'true')
    }

    const handlePrimaryAction = () => {
        handleClose()
        window.open(UBUNTU_PORTFOLIO_URL, '_blank')
    }

    if (!isMounted || !isOpen) return null

    return (
        <div className='fixed bottom-4 right-4 z-[100] sm:bottom-6 sm:right-6'>
            <div
                className='relative w-[calc(100vw-2rem)] sm:w-[380px] overflow-hidden rounded-xl border border-zinc-200/80 bg-white/95 p-5 shadow-2xl backdrop-blur-md transition-all duration-500 animate-in slide-in-from-bottom-5 fade-in dark:border-zinc-800/80 dark:bg-zinc-950/95 dark:shadow-black/40'
                role='region'
                aria-label='Ubuntu Portfolio Suggestion'
            >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 to-red-500" />

                <button
                    onClick={handleClose}
                    className='absolute right-3 top-4 rounded-sm opacity-50 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300'
                >
                    <X className='size-4' />
                    <span className='sr-only'>Close</span>
                </button>

                <div className='flex items-start gap-x-3'>
                    <div className='mt-0.5 flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-950/40 dark:to-orange-900/10'>
                        <Terminal className='size-5 text-orange-600 dark:text-orange-500' />
                    </div>
                    <div className='pr-4'>
                        <h3 className='text-sm font-semibold text-zinc-900 dark:text-zinc-100'>
                            Want to see something different?
                        </h3>
                        <p className='mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400'>
                            I’ve built an interactive OS-inspired portfolio inside the browser. Try it out!
                        </p>

                        <div className='mt-3 flex items-center gap-x-3'>
                            <button
                                onClick={handlePrimaryAction}
                                className='inline-flex items-center gap-x-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-50 shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'
                            >
                                <span>Boot Now</span>
                                <ExternalLink className='size-3' />
                            </button>
                            <button
                                onClick={handleClose}
                                className='text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:underline decoration-zinc-300 underline-offset-2'
                            >
                                Maybe later
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * The CTA Button for the Hero section.
 */
export function BootUbuntuButton() {
    return (
        <Link
            href={UBUNTU_PORTFOLIO_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='group relative inline-flex items-center gap-x-2 overflow-hidden rounded-lg bg-gradient-to-r from-orange-600 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950'
        >
            {/* Glow effect */}
            <div className='absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

            <Terminal className='relative z-10 size-4 transition-transform duration-300 group-hover:rotate-12' />
            <span className='relative z-10'>Boot Ubuntu</span>
            <ExternalLink className='relative z-10 size-4 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:opacity-100' />
        </Link>
    )
}
