'use client'

import { useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface MouseGlowCardProps {
    children: React.ReactNode
    className?: string
    glowClassName?: string
}

export default function MouseGlowCard({ children, className, glowClassName }: MouseGlowCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        setGlowPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }, [])

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn('relative overflow-hidden', className)}
        >
            {/* Glow effect */}
            <div
                className={cn(
                    'pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500',
                    isHovered && 'opacity-100',
                    glowClassName
                )}
                style={{
                    background: `radial-gradient(400px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(120, 119, 198, 0.06), transparent 60%)`,
                }}
            />
            {/* Dark mode glow - slightly brighter to be visible */}
            <div
                className={cn(
                    'pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 hidden dark:block',
                    isHovered && 'dark:opacity-100'
                )}
                style={{
                    background: `radial-gradient(400px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(120, 119, 198, 0.1), transparent 60%)`,
                }}
            />
            {/* Content */}
            <div className='relative z-10'>{children}</div>
        </div>
    )
}
