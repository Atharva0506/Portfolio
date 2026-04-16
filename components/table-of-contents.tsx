'use client'

import { useEffect, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

export type Heading = {
  level: number
  text: string
  slug: string
}

type GroupedHeading = Heading & { children: Heading[] }

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('')
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  const groupedHeadings = useMemo(() => {
    return headings.reduce((acc, heading) => {
      if (heading.level === 2) {
        acc.push({ ...heading, children: [] })
      } else if (heading.level === 3 && acc.length > 0) {
        acc[acc.length - 1].children.push(heading)
      } else if (heading.level === 3) {
        // Fallback if H3 appears before any H2
        acc.push({ ...heading, level: 2, children: [] })
      }
      return acc
    }, [] as GroupedHeading[])
  }, [headings])

  useEffect(() => {
    // Auto-expand the currently active group
    const activeGroup = groupedHeadings.find(
      g => g.slug === activeId || g.children.some(c => c.slug === activeId)
    )
    if (activeGroup) {
      setExpandedGroups(prev => {
        const next = new Set(prev)
        next.add(activeGroup.slug)
        return next
      })
    }
  }, [activeId, groupedHeadings])

  const toggleGroup = (slug: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      return next
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    headings.forEach(heading => {
      const element = document.getElementById(heading.slug)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  return (
    <nav className='max-h-[calc(100vh-8rem)] space-y-4 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
      <h3 className='text-sm font-semibold uppercase tracking-tight text-muted-foreground'>
        On this page
      </h3>
      <ul className='space-y-2.5 pb-8 text-sm'>
        {groupedHeadings.map(group => {
          const isActiveGroup = activeId === group.slug
          const isExpanded = expandedGroups.has(group.slug)

          return (
            <li key={group.slug} className='flex flex-col gap-2.5'>
              <div className='group flex items-start justify-between gap-2'>
                <a
                  href={`#${group.slug}`}
                  onClick={e => {
                    e.preventDefault()
                    document.querySelector(`#${group.slug}`)?.scrollIntoView({
                      behavior: 'smooth'
                    })
                  }}
                  className={cn(
                    'line-clamp-2 block flex-1 text-muted-foreground transition-colors hover:text-foreground',
                    isActiveGroup && 'font-medium text-foreground text-primary'
                  )}
                >
                  {group.text}
                </a>
                {group.children.length > 0 && (
                  <button
                    onClick={() => toggleGroup(group.slug)}
                    className='p-0.5 text-muted-foreground transition-colors hover:text-foreground'
                    aria-label='Toggle subsection'
                  >
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        isExpanded && 'rotate-90'
                      )}
                    />
                  </button>
                )}
              </div>

              {isExpanded && group.children.length > 0 && (
                <ul className='ml-1 space-y-2.5 border-l border-border/50 pl-4'>
                  {group.children.map(child => (
                    <li key={child.slug}>
                      <a
                        href={`#${child.slug}`}
                        onClick={e => {
                          e.preventDefault()
                          document
                            .querySelector(`#${child.slug}`)
                            ?.scrollIntoView({
                              behavior: 'smooth'
                            })
                        }}
                        className={cn(
                          'line-clamp-2 block text-muted-foreground transition-colors hover:text-foreground',
                          activeId === child.slug &&
                            'font-medium text-foreground text-primary'
                        )}
                      >
                        {child.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
