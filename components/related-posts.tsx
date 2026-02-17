import Link from 'next/link'
import { PostMetadata } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

interface RelatedPostsProps {
  posts: PostMetadata[]
  title?: string
}

export default function RelatedPosts({ posts, title = 'Related Posts' }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="group block rounded-lg border border-zinc-200 p-4 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50"
            >
              <h3 className="font-medium transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                {post.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {post.summary}
              </p>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                {post.publishedAt && (
                  <span>{formatDate(post.publishedAt)}</span>
                )}
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                  </>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
