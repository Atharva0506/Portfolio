import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Clock } from 'lucide-react'
import GithubSlugger from 'github-slugger'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { getPosts, getPostBySlug } from '@/lib/posts'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { notFound } from 'next/navigation'
import PageTransition from '@/components/page-transition'
import Breadcrumbs from '@/components/breadcrumbs'
import RelatedPosts from '@/components/related-posts'
import TableOfContents, { Heading } from '@/components/table-of-contents'
import ReadingProgress from '@/components/reading-progress'
import ShareButtons from '@/components/share-buttons'

const baseUrl = 'https://atharvanaik.me'

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
      images: image
        ? [
            {
              url: image.startsWith('http') ? image : `${baseUrl}${image}`,
              width: 1200,
              height: 630,
              alt: title
            }
          ]
        : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: summary,
      images: image
        ? [image.startsWith('http') ? image : `${baseUrl}${image}`]
        : undefined
    },
    alternates: {
      canonical: `${baseUrl}/posts/${params.slug}`
    }
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { metadata, content } = post
  const {
    title,
    image,
    author,
    publishedAt,
    summary,
    keywords,
    readingTime,
    relatedPosts
  } = metadata

  // Extract headings for Table of Contents
  const slugger = new GithubSlugger()
  const headingRegex = /^(#{2,3})\s+(.*)$/gm
  const headings: Heading[] = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].trim(),
      slug: slugger.slug(match[2].trim())
    })
  }

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
    image: image
      ? image.startsWith('http')
        ? image
        : `${baseUrl}${image}`
      : undefined,
    author: {
      '@type': 'Person',
      name: author || 'Atharva Naik',
      url: baseUrl
    },
    publisher: {
      '@type': 'Person',
      name: 'Atharva Naik',
      url: baseUrl
    },
    datePublished: publishedAt,
    dateModified: publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/posts/${slug}`
    },
    url: `${baseUrl}/posts/${slug}`,
    wordCount: readingTime ? readingTime * 200 : undefined,
    timeRequired: readingTime ? `PT${readingTime}M` : undefined
  }

  // JSON-LD structured data for Breadcrumbs
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Posts',
        item: `${baseUrl}/posts`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${baseUrl}/posts/${slug}`
      }
    ]
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ReadingProgress />
      <PageTransition>
        <section className='pb-24 pt-24 md:pt-32'>
          <div className='container max-w-6xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12'>
            <div className='mx-auto w-full min-w-0 max-w-3xl lg:mx-0 lg:max-w-none'>
              <Breadcrumbs
                items={[
                  { label: 'Posts', href: '/posts' },
                  {
                    label: title
                      ? title.length > 30
                        ? `${title.slice(0, 30)}...`
                        : title
                      : 'Post',
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

              <div className='mt-12'>
                <ShareButtons
                  url={`${baseUrl}/posts/${slug}`}
                  title={title || ''}
                />
              </div>

              {/* Copyright & Content Policy */}
              <div className='mt-16 rounded-lg border border-zinc-200/60 bg-zinc-50/50 p-6 text-sm text-muted-foreground dark:border-zinc-800/60 dark:bg-zinc-900/50'>
                <p>
                  <strong>
                    &copy; {new Date().getFullYear()} Atharva Naik. All rights
                    reserved.
                  </strong>
                  <br />
                  The content on this blog is written for informational and
                  educational purposes. You may link to this article or quote
                  brief snippets, but please do not republish the full content
                  without explicit permission.
                </p>
                <div className='mt-4 flex gap-4 text-xs font-medium'>
                  <Link
                    href='/terms'
                    className='underline decoration-muted-foreground/50 underline-offset-4 hover:text-foreground'
                  >
                    Terms of Use
                  </Link>
                  <Link
                    href='/privacy-policy'
                    className='underline decoration-muted-foreground/50 underline-offset-4 hover:text-foreground'
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>

              <RelatedPosts posts={relatedPostsData} />
            </div>

            {/* Right Sidebar for ToC */}
            <aside className='hidden lg:block'>
              <div className='sticky top-32'>
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </section>
      </PageTransition>
    </>
  )
}
