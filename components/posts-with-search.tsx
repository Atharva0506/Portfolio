'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { PostMetadata } from '@/lib/posts'
import Posts from '@/components/posts'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

const POSTS_PER_PAGE = 5

export default function PostsWithSearch({ posts }: { posts: PostMetadata[] }) {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach(post => post.tags?.forEach(tag => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [posts])

  // Filter posts by tags AND search query
  const filtered = useMemo(() => {
    return posts.filter(post => {
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every(tag => post.tags?.includes(tag))
      const matchesQuery =
        query.length === 0 ||
        post.title?.toLowerCase().includes(query.toLowerCase()) ||
        post.summary?.toLowerCase().includes(query.toLowerCase())
      return matchesTags && matchesQuery
    })
  }, [posts, selectedTags, query])

  // Search suggestions
  const suggestions = useMemo(() => {
    if (query.length < 2) return []
    return posts
      .filter(
        post =>
          post.title?.toLowerCase().includes(query.toLowerCase()) ||
          post.summary?.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
  }, [posts, query])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const paginatedPosts = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [query, selectedTags])

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function toggleTag(tag: string) {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  function resetAll() {
    setQuery('')
    setSelectedTags([])
    setCurrentPage(1)
  }

  const isFiltered = query.length > 0 || selectedTags.length > 0

  return (
    <div>
      {/* Search with suggestions */}
      <div ref={searchRef} className='relative mb-6'>
        <div className='flex items-center gap-3'>
          <div className='relative w-full sm:w-1/2'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              type='text'
              placeholder='Search posts...'
              className='h-9 w-full pl-9'
              value={query}
              onChange={e => {
                setQuery(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={e => {
                if (e.key === 'Escape') setShowSuggestions(false)
              }}
            />
          </div>
          {isFiltered && (
            <Button
              size='sm'
              variant='secondary'
              onClick={resetAll}
              className='h-8 px-2 lg:px-3'
            >
              Reset
              <Cross2Icon className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className='absolute z-50 mt-1 w-full sm:w-1/2 rounded-lg border border-border bg-card shadow-lg'>
            {suggestions.map(post => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className='flex flex-col gap-0.5 px-4 py-2.5 transition-colors hover:bg-accent first:rounded-t-lg last:rounded-b-lg'
                onClick={() => setShowSuggestions(false)}
              >
                <span className='text-sm font-medium'>{post.title}</span>
                <span className='line-clamp-1 text-xs text-muted-foreground'>
                  {post.summary}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Tag filter pills */}
      <div className='mb-8 flex flex-wrap gap-2'>
        {allTags.map(tag => {
          const isActive = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 ${isActive
                  ? 'border-blue-500 bg-blue-500 text-white shadow-sm shadow-blue-200 dark:border-primary dark:bg-primary dark:text-primary-foreground dark:shadow-none'
                  : 'border-zinc-300 bg-white text-zinc-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-border dark:bg-card dark:text-muted-foreground dark:hover:border-primary/50 dark:hover:text-foreground dark:hover:bg-transparent'
                }`}
            >
              {tag}
            </button>
          )
        })}
      </div>

      {/* Posts list */}
      {paginatedPosts.length > 0 ? (
        <Posts posts={paginatedPosts} />
      ) : (
        <p className='text-center text-sm text-muted-foreground py-12'>
          No posts found matching your criteria.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='mt-12 flex items-center justify-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className='h-8 w-8 p-0'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              size='sm'
              onClick={() => setCurrentPage(page)}
              className='h-8 w-8 p-0 text-xs'
            >
              {page}
            </Button>
          ))}

          <Button
            variant='outline'
            size='sm'
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className='h-8 w-8 p-0'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  )
}
