import { Metadata } from 'next'
import ContactForm from '@/components/contact-form'
import PageTransition from '@/components/page-transition'
import Breadcrumbs from '@/components/breadcrumbs'

const baseUrl = 'https://atharva-naik-portfolio.vercel.app'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Atharva Naik for AI development projects, consulting, or collaboration opportunities.',
  keywords: [
    'hire AI developer',
    'contact software engineer',
    'AI consulting services',
    'freelance AI developer India',
    'FastAPI developer for hire'
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
        <section className='pb-24 pt-40'>
          <div className='container max-w-3xl'>
            <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />
            <h1 className='title'>Let&apos;s talk about your project</h1>

            <ContactForm />
          </div>
        </section>
      </PageTransition>
    </>
  )
}
