'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface CarouselContextType {
  globalIndex: number
  isAnyHovered: boolean
  setAnyHovered: (hovered: boolean) => void
}

const CarouselContext = createContext<CarouselContextType | undefined>(undefined)

export function CarouselProvider({
  children,
  interval = 3500
}: {
  children: React.ReactNode
  interval?: number
}) {
  const [globalIndex, setGlobalIndex] = useState(0)
  const [hoverCount, setHoverCount] = useState(0)

  const setAnyHovered = useCallback((hovered: boolean) => {
    setHoverCount(prev => hovered ? prev + 1 : Math.max(0, prev - 1))
  }, [])

  useEffect(() => {


    const timer = setInterval(() => {

      if (hoverCount === 0) {
        setGlobalIndex(prev => prev + 1)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [interval, hoverCount])

  return (
    <CarouselContext.Provider value={{ globalIndex, isAnyHovered: hoverCount > 0, setAnyHovered }}>
      {children}
    </CarouselContext.Provider>
  )
}

export function useCarouselSync() {
  const context = useContext(CarouselContext)
  if (!context) {
    return { globalIndex: 0, setAnyHovered: () => { } }
  }
  return context
}
