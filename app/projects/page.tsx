import { Metadata } from 'next'
import Projects from '@/components/projects'
import { projects } from '@/lib/data'
import PageTransition from '@/components/page-transition'
import Breadcrumbs from '@/components/breadcrumbs'

const baseUrl = 'https://atharva-naik-portfolio.vercel.app'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore AI-powered projects including conversational AI companions, news aggregation platforms, and developer tools built by Atharva Naik.',
  keywords: [
    'AI projects portfolio',
    'conversational AI projects',
    'RAG applications',
    'LangChain projects',
    'FastAPI projects',
    'Next.js portfolio projects',
    'AI developer portfolio'
  ],
  openGraph: {
    title: 'Projects | Atharva Naik',
    description: 'Explore AI-powered projects including conversational AI companions, news aggregation platforms, and developer tools.',
    type: 'website',
    url: `${baseUrl}/projects`,
  },
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
}

export default function ProjectsPage() {
  // CollectionPage schema for projects listing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects',
    description: 'AI-powered projects and developer tools.',
    url: `${baseUrl}/projects`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${baseUrl}/projects/${project.id}`,
        name: project.name,
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
        <section className='pb-24 pt-40'>
          <div className='container max-w-3xl'>
            <Breadcrumbs items={[{ label: 'Projects', href: '/projects' }]} />
            <h1 className='title mb-12'>Projects</h1>

            <Projects projects={projects} />
          </div>
        </section>
      </PageTransition>
    </>
  )
}
