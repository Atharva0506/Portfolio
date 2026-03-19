'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCarouselSync } from './carousel-context'
import { cn } from '@/lib/utils'

interface ProjectImageCarouselProps {
  images: string[]
  projectName: string
  priority?: boolean
}

export default function ProjectImageCarousel({
  images,
  projectName,
  priority = false
}: ProjectImageCarouselProps) {
  const { globalIndex, setAnyHovered } = useCarouselSync()
  const [mounted, setMounted] = useState(false)

  const imageCount = images.length
  const currentIndex = imageCount > 0 ? globalIndex % imageCount : 0

  useEffect(() => {
    setMounted(true)
  }, [])

  // Optimized Preloading for the NEXT image in sequence
  useEffect(() => {
    if (imageCount <= 1) return
    const nextIndex = (currentIndex + 1) % imageCount
    const nextImg = new window.Image()
    nextImg.src = images[nextIndex]
  }, [currentIndex, images, imageCount])

  if (!images || imageCount === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-400 dark:bg-zinc-800/50">
        <span className="text-sm font-medium">No Preview</span>
      </div>
    )
  }

  return (
    <div
      className="relative h-full w-full cursor-pointer"
      onMouseEnter={() => setAnyHovered(true)}
      onMouseLeave={() => setAnyHovered(false)}
    >
      {images.map((src, index) => {
        const isActive = index === currentIndex
        
        return (
          <div
            key={`${projectName}-${index}-${src}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
            style={{ willChange: 'opacity' }}
          >
            <Image
              src={src}
              alt={`${projectName} - Showcase Image ${index + 1}`}
              fill
              priority={priority && index === 0}
              loading={priority && index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover transition-transform duration-[2000ms] ease-out",
                isActive && mounted ? "scale-105" : "scale-100"
              )}
            />
          </div>
        )
      })}
      
      {/* Adaptive Pagination Indicators */}
      {imageCount > 1 && (
        <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/20 px-2.5 py-1.5 backdrop-blur-sm transition-opacity duration-300 opacity-60 hover:opacity-100">
          {images.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1 rounded-full transition-all duration-700 ease-in-out",
                index === currentIndex 
                  ? "w-4 bg-white" 
                  : "w-1 bg-white/40"
              )}
            />
          ))}
        </div>
      )}

      {/* Interactive Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  )
}
