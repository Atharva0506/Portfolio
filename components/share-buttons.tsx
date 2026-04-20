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

function RedditIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg fill='currentColor' viewBox='0 0 512 512' {...props}>
      <path d='M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z' />
    </svg>
  )
}

function WhatsAppIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg fill='currentColor' viewBox='0 0 448 512' {...props}>
      <path d='M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6 2.1-3.6 7.4-14.2 2.8-5.6 1.4-10.3 0-13-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z' />
    </svg>
  )
}

function HackerNewsIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg fill='currentColor' viewBox='0 0 448 512' {...props}>
      <path d='M0 32v448h448V32H0zm256 252.5V416h-64V284.5L116 112h72l40 89.9 40-89.9h72l-84 172.5z' />
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
  const redditUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
  const hackernewsUrl = `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`

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
            <a
              href={redditUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
            >
              <RedditIcon className='h-4 w-4 text-zinc-500 dark:text-zinc-400' />
              Share on Reddit
            </a>
            <a
              href={hackernewsUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
            >
              <HackerNewsIcon className='h-4 w-4 text-zinc-500 dark:text-zinc-400' />
              Share on Hacker News
            </a>
            <a
              href={whatsappUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
            >
              <WhatsAppIcon className='h-4 w-4 text-zinc-500 dark:text-zinc-400' />
              Share on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
