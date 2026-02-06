'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, ExternalLink, Terminal } from 'lucide-react'

const UBUNTU_PORTFOLIO_URL = 'https://ubuntu-portfolio-eta.vercel.app/'
const STORAGE_KEY = 'hasSeenUbuntuIntro'

/**
 * The Popup/Modal component that appears on first visit.
 */
export function UbuntuPortfolioIntroduction() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const hasSeen = localStorage.getItem(STORAGE_KEY)
        if (!hasSeen) {
            // Small delay to not overwhelm the user immediately on load
            const timer = setTimeout(() => {
                setIsOpen(true)
            }, 1500)
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
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0'>
            {/* Backdrop */}
            <div
                className='absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in'
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div
                className='relative z-50 w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-2xl transition-all duration-300 animate-in zoom-in-95 dark:border-zinc-800 dark:bg-zinc-950'
                role='dialog'
                aria-modal='true'
                aria-labelledby='ubuntu-modal-title'
            >
                <button
                    onClick={handleClose}
                    className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300'
                >
                    <X className='size-4' />
                    <span className='sr-only'>Close</span>
                </button>

                <div className='flex flex-col gap-y-4'>
                    <div className='flex items-center gap-x-3'>
                        <div className='flex size-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30'>
                            <Terminal className='size-5 text-orange-600 dark:text-orange-500' />
                        </div>
                        <div>
                            <h2 id='ubuntu-modal-title' className='text-lg font-semibold leading-none tracking-tight'>
                                Want to see something different?
                            </h2>
                            <p className='mt-1.5 text-sm text-zinc-500 dark:text-zinc-400'>
                                I’ve built an interactive Ubuntu OS–inspired portfolio. Totally optional, but fun to explore.
                            </p>
                        </div>
                    </div>

                    <div className='mt-2 flex flex-col-reverse justify-end gap-2 sm:flex-row'>
                        <button
                            onClick={handleClose}
                            className='inline-flex h-9 items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300'
                        >
                            Continue Normally
                        </button>
                        <button
                            onClick={handlePrimaryAction}
                            className='inline-flex h-9 items-center justify-center gap-x-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300'
                        >
                            <span>Boot Ubuntu Portfolio</span>
                            <ExternalLink className='size-3.5' />
                        </button>
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
            <span className='relative z-10'>Boot Ubuntu Portfolio</span>
            <ExternalLink className='relative z-10 size-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5' />
        </Link>
    )
}
