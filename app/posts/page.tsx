import { Metadata } from 'next'
import { getPosts } from '@/lib/posts'
import PostsWithSearch from '@/components/posts-with-search'
import PageTransition from '@/components/page-transition'
import Breadcrumbs from '@/components/breadcrumbs'

const baseUrl = 'https://atharvanaik.me'

export const metadata: Metadata = {
  title: 'Blog Posts',
  description: 'Read articles about AI development, FastAPI, LangChain, Next.js, and software engineering best practices by Atharva Naik.',
  keywords: [
    'AI engineering blog',
    'LangChain and LangGraph tutorials',
    'FastAPI and Python backend tutorials',
    'Next.js AI app guides',
    'RAG architecture articles',
    'LLM system design blog',
    'software engineering deep dives'
  ],
  openGraph: {
    title: 'Blog Posts | Atharva Naik',
    description: 'Read articles about AI development, FastAPI, LangChain, Next.js, and software engineering best practices.',
    type: 'website',
    url: `${baseUrl}/posts`,
  },
  alternates: {
    canonical: `${baseUrl}/posts`,
  },
}

export default async function PostsPage() {
  const posts = await getPosts()

  // CollectionPage schema for blog listing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog Posts',
    description: 'Articles about AI development, FastAPI, LangChain, and software engineering.',
    url: `${baseUrl}/posts`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${baseUrl}/posts/${post.slug}`,
        name: post.title,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTransition>
        <section className='pb-24 pt-24 md:pt-40'>
          <div className='container max-w-3xl'>
            <Breadcrumbs items={[{ label: 'Posts', href: '/posts' }]} />
            <h1 className='title mb-12'>Posts</h1>

            <PostsWithSearch posts={posts} />
          </div>
        </section>
      </PageTransition>
    </>
  )
}
