import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Clock } from 'lucide-react'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { getPosts, getPostBySlug } from '@/lib/posts'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { notFound } from 'next/navigation'
import PageTransition from '@/components/page-transition'
import Breadcrumbs from '@/components/breadcrumbs'
import RelatedPosts from '@/components/related-posts'

const baseUrl = 'https://atharva-naik-portfolio.vercel.app'

export async function generateStaticParams() {
  const posts = await getPosts()
  const slugs = posts.map(post => ({ slug: post.slug }))

  return slugs
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  const { title, summary, image, author, publishedAt, keywords } = post.metadata

  return {
    title: title,
    description: summary,
    keywords: keywords,
    authors: [{ name: author || 'Atharva Naik' }],
    openGraph: {
      title: title,
      description: summary,
      type: 'article',
      publishedTime: publishedAt,
      authors: [author || 'Atharva Naik'],
      url: `${baseUrl}/posts/${params.slug}`,
      images: image ? [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: summary,
      images: image ? [image.startsWith('http') ? image : `${baseUrl}${image}`] : undefined,
    },
    alternates: {
      canonical: `${baseUrl}/posts/${params.slug}`,
    },
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { metadata, content } = post
  const { title, image, author, publishedAt, summary, keywords, readingTime, relatedPosts } = metadata

  // Get related posts data
  const allPosts = await getPosts()
  const relatedPostsData = relatedPosts
    ? allPosts.filter(p => relatedPosts.includes(p.slug))
    : allPosts.filter(p => p.slug !== slug).slice(0, 2)

  // JSON-LD structured data for blog post
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: summary,
    keywords: keywords?.join(', '),
    image: image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : undefined,
    author: {
      '@type': 'Person',
      name: author || 'Atharva Naik',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Atharva Naik',
      url: baseUrl,
    },
    datePublished: publishedAt,
    dateModified: publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/posts/${slug}`,
    },
    url: `${baseUrl}/posts/${slug}`,
    wordCount: readingTime ? readingTime * 200 : undefined,
    timeRequired: readingTime ? `PT${readingTime}M` : undefined,
  }

  // JSON-LD structured data for Breadcrumbs
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Posts', item: `${baseUrl}/posts` },
      { '@type': 'ListItem', position: 3, name: title, item: `${baseUrl}/posts/${slug}` }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageTransition>
        <section className='pb-24 pt-32'>
          <div className='container max-w-3xl'>
            <Breadcrumbs
              items={[
                { label: 'Posts', href: '/posts' },
                {
                  label: title ? (title.length > 30 ? `${title.slice(0, 30)}...` : title) : 'Post',
                  href: `/posts/${slug}`
                }
              ]}
            />

            <Link
              href='/posts'
              className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
            >
              <ArrowLeftIcon className='h-5 w-5' />
              <span>Back to posts</span>
            </Link>

            {image && (
              <div className='relative mb-6 h-48 w-full overflow-hidden rounded-lg sm:h-64 md:h-96'>
                <Image
                  src={image}
                  alt={`${title} - Featured image for blog post about ${keywords?.[0] || 'software development'}`}
                  className='object-cover'
                  fill
                  priority
                />
              </div>
            )}

            <header>
              <h1 className='title'>{title}</h1>
              <div className='mt-3 flex items-center gap-3 text-xs text-muted-foreground'>
                <span>{author}</span>
                <span>/</span>
                <span>{formatDate(publishedAt ?? '')}</span>
                {readingTime && (
                  <>
                    <span>/</span>
                    <span className='inline-flex items-center gap-1'>
                      <Clock className='h-3 w-3' />
                      {readingTime} min read
                    </span>
                  </>
                )}
              </div>
            </header>

            <main className='prose mt-16 dark:prose-invert'>
              <MDXContent source={content} />
            </main>

            <RelatedPosts posts={relatedPostsData} />
          </div>
        </section>
      </PageTransition>
    </>
  )
}
