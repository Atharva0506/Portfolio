import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Clock } from 'lucide-react'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { notFound } from 'next/navigation'
import PageTransition from '@/components/page-transition'
import Breadcrumbs from '@/components/breadcrumbs'
import RelatedProjects from '@/components/related-projects'

const baseUrl = 'https://atharva-naik-portfolio.vercel.app'

export async function generateStaticParams() {
  const projects = await getProjects()
  const slugs = projects.map(project => ({ slug: project.slug }))

  return slugs
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: 'Project Not Found'
    }
  }

  const { title, summary, image, author, keywords } = project.metadata

  return {
    title: title,
    description: summary,
    keywords: keywords,
    authors: [{ name: author || 'Atharva Naik' }],
    openGraph: {
      title: title,
      description: summary,
      type: 'article',
      url: `${baseUrl}/projects/${params.slug}`,
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
      canonical: `${baseUrl}/projects/${params.slug}`,
    },
  }
}

export default async function Project({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const { title, image, author, publishedAt, summary, keywords, techStack, readingTime, relatedProjects } = metadata

  // Get related projects data
  const allProjects = await getProjects()
  const relatedProjectsData = relatedProjects
    ? allProjects.filter(p => relatedProjects.includes(p.slug))
    : allProjects.filter(p => p.slug !== slug).slice(0, 2)

  // JSON-LD structured data for project (SoftwareApplication schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description: summary,
    keywords: keywords?.join(', '),
    image: image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : undefined,
    author: {
      '@type': 'Person',
      name: author || 'Atharva Naik',
      url: baseUrl,
    },
    datePublished: publishedAt,
    url: `${baseUrl}/projects/${slug}`,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  // JSON-LD structured data for Breadcrumbs
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${baseUrl}/projects` },
      { '@type': 'ListItem', position: 3, name: title, item: `${baseUrl}/projects/${slug}` }
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
        <section className='pb-24 pt-24 md:pt-32'>
          <div className='container max-w-3xl'>
            <Breadcrumbs
              items={[
                { label: 'Projects', href: '/projects' },
                { label: title || 'Project', href: `/projects/${slug}` }
              ]}
            />

            <Link
              href='/projects'
              className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
            >
              <ArrowLeftIcon className='h-5 w-5' />
              <span>Back to projects</span>
            </Link>

            {image && (
              <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg'>
                <Image
                  src={image}
                  alt={`${title} - ${summary?.slice(0, 50) || 'Project screenshot'}`}
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
              {techStack && techStack.length > 0 && (
                <div className='mt-4 flex flex-wrap gap-2'>
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className='inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-400/20'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <main className='prose mt-16 dark:prose-invert'>
              <MDXContent source={content} />
            </main>

            <RelatedProjects projects={relatedProjectsData} />
          </div>
        </section>
      </PageTransition>
    </>
  )
}
