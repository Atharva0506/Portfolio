import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/breadcrumbs'
import PageTransition from '@/components/page-transition'

const baseUrl = 'https://atharvanaik.me'
const lastUpdated = 'April 19, 2026'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for atharvanaik.me. Read the rules and guidelines for using our content and website.',
  keywords: [
    'terms of use',
    'terms of service',
    'content policy',
    'copyright policy'
  ],
  openGraph: {
    title: 'Terms of Use | Atharva Naik',
    description: 'Read the Terms of Use and Content Policy for atharvanaik.me.',
    type: 'website',
    url: `${baseUrl}/terms`
  },
  alternates: {
    canonical: `${baseUrl}/terms`
  }
}

const termsSections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.'
    ]
  },
  {
    title: '2. Intellectual Property and Content Policy',
    content: [
      'All written content, articles, and blog posts on this website are the intellectual property of Atharva Naik and are protected by applicable copyright laws.',
      'You are free to link to our articles or quote brief snippets for commentary or review purposes, provided that you clearly attribute the source with a backlink to the original page.',
      'You may not scrape, reproduce, republish, or distribute full articles without explicit, written permission.'
    ]
  },
  {
    title: '3. Open Source Code',
    content: [
      'While the written content is copyrighted, any source code snippets, gists, or open source repositories linked from this website are governed by their respective licenses (often the MIT License) unless otherwise stated.'
    ]
  },
  {
    title: '4. Disclaimer of Warranties',
    content: [
      'The materials on this website are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose.',
      'We do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on this website.'
    ]
  },
  {
    title: '5. Limitations of Liability',
    content: [
      'In no event shall Atharva Naik be liable for any damages arising out of the use or inability to use the materials on this website.'
    ]
  },
  {
    title: '6. Revisions and Errata',
    content: [
      'The materials appearing on this website could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current. We may make changes to the materials contained on the website at any time without notice.'
    ]
  },
  {
    title: '7. Revisions to Terms',
    content: [
      'We may revise these Terms of Use for the website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Use.'
    ]
  },
  {
    title: '8. Contact',
    content: [
      'For questions regarding permissions, republication requests, or any other inquiries, please visit the contact page at atharvanaik.me/contact.'
    ]
  }
]

export default function TermsOfUsePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Use',
    description: 'Terms of Use and Content Policy for atharvanaik.me.',
    url: `${baseUrl}/terms`,
    dateModified: new Date(lastUpdated).toISOString(),
    inLanguage: 'en'
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTransition>
        <section className='pb-24 pt-24 md:pt-40'>
          <div className='container max-w-3xl'>
            <Breadcrumbs items={[{ label: 'Terms of Use', href: '/terms' }]} />
            <h1 className='title'>Terms of Use & Content Policy</h1>
            <p className='mt-3 text-sm text-muted-foreground'>
              Effective date: {lastUpdated}
            </p>

            <div className='mt-10 space-y-8'>
              <p className='text-muted-foreground'>
                Please read these terms carefully before using this website.
              </p>

              {termsSections.map(section => (
                <section key={section.title} className='space-y-3'>
                  <h2 className='font-serif text-xl font-semibold tracking-tight'>
                    {section.title}
                  </h2>
                  {section.content.map(paragraph => {
                    if (section.title === '8. Contact') {
                      return (
                        <p
                          key={paragraph}
                          className='leading-7 text-muted-foreground'
                        >
                          For questions regarding permissions, republication
                          requests, or any other inquiries, please visit the{' '}
                          <Link
                            href='/contact'
                            className='underline decoration-muted-foreground/60 underline-offset-4 transition-colors hover:text-foreground'
                          >
                            contact page
                          </Link>
                          .
                        </p>
                      )
                    }

                    return (
                      <p
                        key={paragraph}
                        className='leading-7 text-muted-foreground'
                      >
                        {paragraph}
                      </p>
                    )
                  })}
                </section>
              ))}
            </div>
          </div>
        </section>
      </PageTransition>
    </>
  )
}
