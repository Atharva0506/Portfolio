'use client'

import { useState, useRef, useEffect } from 'react'
import { Share2, Link as LinkIcon, Facebook, Check } from 'lucide-react'
import { toast } from 'sonner'

function XIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
      <path d='M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823Z' />
    </svg>
  )
}

function LinkedInIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg fill='currentColor' viewBox='0 0 448 512' {...props}>
      <path d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z' />
    </svg>
  )
}

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const xUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=Atharva_0506`
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard')
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
        setIsOpen(false)
      }, 2000)
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  return (
    <div
      className='relative border-t border-zinc-200/60 pt-8 dark:border-zinc-800/60'
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900'
      >
        <Share2 className='h-4 w-4 text-zinc-500 transition-transform group-hover:scale-110 dark:text-zinc-400' />
        Share
      </button>

      {isOpen && (
        <div className='absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-zinc-200 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 dark:border-zinc-800 dark:bg-zinc-950'>
          <div className='flex flex-col space-y-1'>
            <button
              onClick={copyToClipboard}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
            >
              {isCopied ? (
                <Check className='h-4 w-4 text-green-500' />
              ) : (
                <LinkIcon className='h-4 w-4 text-zinc-500 dark:text-zinc-400' />
              )}
              {isCopied ? 'Copied!' : 'Copy link'}
            </button>
            <div className='my-1 h-px bg-zinc-200 dark:bg-zinc-800' />
            <a
              href={xUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
            >
              <XIcon className='h-4 w-4 text-zinc-500 dark:text-zinc-400' />
              Share on X
            </a>
            <a
              href={facebookUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
            >
              <Facebook className='h-4 w-4 text-zinc-500 dark:text-zinc-400' />
              Share on Facebook
            </a>
            <a
              href={linkedinUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
            >
              <LinkedInIcon className='h-4 w-4 text-zinc-500 dark:text-zinc-400' />
              Share on LinkedIn
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
