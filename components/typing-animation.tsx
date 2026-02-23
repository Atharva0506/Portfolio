'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface TypingAnimationProps {
    phrases: string[]
    className?: string
    typingSpeed?: number
    deletingSpeed?: number
    pauseDuration?: number
}

export default function TypingAnimation({
    phrases,
    className,
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDuration = 3000,
}: TypingAnimationProps) {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
    const [displayText, setDisplayText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    const currentPhrase = phrases[currentPhraseIndex]

    const tick = useCallback(() => {
        if (isPaused) return

        if (!isDeleting) {
            // Typing
            if (displayText.length < currentPhrase.length) {
                setDisplayText(currentPhrase.slice(0, displayText.length + 1))
            } else {
                // Finished typing — pause before deleting
                setIsPaused(true)
                setTimeout(() => {
                    setIsPaused(false)
                    setIsDeleting(true)
                }, pauseDuration)
            }
        } else {
            // Deleting
            if (displayText.length > 0) {
                setDisplayText(displayText.slice(0, -1))
            } else {
                // Finished deleting — move to next phrase
                setIsDeleting(false)
                setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
            }
        }
    }, [displayText, isDeleting, isPaused, currentPhrase, phrases.length, pauseDuration])

    useEffect(() => {
        const speed = isDeleting ? deletingSpeed : typingSpeed
        const timer = setTimeout(tick, speed)
        return () => clearTimeout(timer)
    }, [tick, isDeleting, deletingSpeed, typingSpeed])

    return (
        <span className={cn('inline', className)}>
            {/* SEO: full text in sr-only so crawlers see all phrases */}
            <span className="sr-only">
                {phrases.join(' · ')}
            </span>
            <span aria-hidden="true">
                {displayText}
                <span className="animate-pulse text-emerald-500 dark:text-emerald-400">|</span>
            </span>
        </span>
    )
}
