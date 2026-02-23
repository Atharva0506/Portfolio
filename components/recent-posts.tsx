import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import Posts from '@/components/posts'

export default async function RecentPosts() {
  const posts = await getPosts(2)

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>AI Engineering Insights</h2>
        <Posts posts={posts} />

        <Link
          href='/posts'
          className='mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
        >
          <span>View all posts &rarr;</span>
        </Link>
      </div>
    </section>
  )
}
