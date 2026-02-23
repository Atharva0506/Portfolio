import Link from 'next/link'
import { Clock } from 'lucide-react'

import { PostMetadata } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export default function Posts({ posts }: { posts: PostMetadata[] }) {
  return (
    <ul className='flex flex-col gap-8'>
      {posts.map(post => (
        <li key={post.slug} className='group'>
          <Link
            href={`/posts/${post.slug}`}
            className='flex flex-col justify-between gap-x-4 gap-y-1 rounded-lg border-l-2 border-transparent p-4 -mx-4 transition-all duration-300 hover:border-zinc-400 hover:bg-zinc-50 dark:hover:border-zinc-500 dark:hover:bg-zinc-900/50 sm:flex-row'
          >
            <div className='max-w-lg'>
              <p className='text-lg font-semibold transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300'>{post.title}</p>
              <p className='mt-1 line-clamp-2 text-sm font-light text-muted-foreground'>
                {post.summary}
              </p>
            </div>

            <div className='mt-1 flex flex-col items-start sm:items-end gap-1 text-sm font-light text-muted-foreground'>
              {post.publishedAt && (
                <span>{formatDate(post.publishedAt)}</span>
              )}
              {post.readingTime && (
                <span className='inline-flex items-center gap-1 text-xs'>
                  <Clock className='h-3 w-3' />
                  {post.readingTime} min read
                </span>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
