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

            <ContactForm />
          </div>
        </section>
      </PageTransition>
    </>
  )
}
