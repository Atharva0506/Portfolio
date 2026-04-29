import { Metadata } from 'next'
import ContactForm from '@/components/contact-form'
import PageTransition from '@/components/page-transition'
import Breadcrumbs from '@/components/breadcrumbs'

const baseUrl = 'https://atharvanaik.me'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Atharva Naik for AI development projects, consulting, or collaboration opportunities.',
  keywords: [
    'hire AI full stack developer',
    'AI engineer contact Atharva Naik',
    'FastAPI and LangChain consultant',
    'freelance AI developer India',
    'LLM application development consultant',
  ],
  openGraph: {
    title: 'Contact | Atharva Naik',
    description: 'Get in touch with Atharva Naik for AI development projects, consulting, or collaboration opportunities.',
    type: 'website',
    url: `${baseUrl}/contact`,
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
}

export default function Contact() {
  // ContactPage schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Atharva Naik',
    description: 'Get in touch for AI development projects, consulting, or collaboration opportunities.',
    url: `${baseUrl}/contact`,
    mainEntity: {
      '@type': 'Person',
      name: 'Atharva Naik',
      jobTitle: 'AI Engineer & Software Developer',
      url: baseUrl,
      sameAs: [
        'https://github.com/Atharva0506',
        'https://www.linkedin.com/in/atharva0506'
      ],
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
            <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />
            <h1 className='title'>Let&apos;s Talk</h1>
            <p className='mt-3 text-muted-foreground'>
              Building production-ready AI and scalable apps.
            </p>

            <div className='mt-6 flex flex-wrap gap-4'>
              <a
                href='https://www.linkedin.com/in/atharva0506/'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-lg border border-zinc-200/80 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-700/80 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-900'
              >
                <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 448 512' aria-hidden='true'>
                  <path d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z' />
                </svg>
                Message on LinkedIn
              </a>
              <a
                href='https://github.com/Atharva0506'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-lg border border-zinc-200/80 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-700/80 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-900'
              >
                <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path fillRule='evenodd' d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' clipRule='evenodd' />
                </svg>
                GitHub
              </a>
            </div>

            <p className='mt-2 text-xs text-muted-foreground'>
              Prefer async? Use the form below — I typically respond within 24 hours.
            </p>

            <ContactForm />
          </div>
        </section>
      </PageTransition>
    </>
  )
}
