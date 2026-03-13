import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/breadcrumbs'
import PageTransition from '@/components/page-transition'

const baseUrl = 'https://atharvanaik.me'
const lastUpdated = 'March 13, 2026'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for atharvanaik.me. Learn what data is collected, how it is used, and your privacy rights.',
  keywords: [
    'privacy policy',
    'data protection',
    'contact form privacy',
    'website analytics privacy',
  ],
  openGraph: {
    title: 'Privacy Policy | Atharva Naik',
    description:
      'Read the Privacy Policy for atharvanaik.me, including data collection, usage, retention, and your rights.',
    type: 'website',
    url: `${baseUrl}/privacy-policy`,
  },
  alternates: {
    canonical: `${baseUrl}/privacy-policy`,
  },
}

const policySections = [
  {
    title: '1. Information We Collect',
    content: [
      'When you use the contact form, we collect the personal information you provide: your name, email address, and message.',
      'We also use website analytics to understand aggregate traffic and usage patterns. This may include non-sensitive technical data such as browser type, pages visited, and approximate location.',
    ],
  },
  {
    title: '2. How We Use Information',
    content: [
      'To respond to your inquiries and provide the information you request.',
      'To improve website performance, content quality, and user experience.',
      'To maintain site security, prevent abuse, and troubleshoot technical issues.',
    ],
  },
  {
    title: '3. Third-Party Services',
    content: [
      'This site uses third-party providers to operate key functionality:',
      'Resend is used to process contact form email delivery.',
      'Google Analytics is used for website analytics and performance insights.',
      'These providers may process data according to their own privacy terms.',
    ],
  },
  {
    title: '4. Cookies and Tracking',
    content: [
      'Analytics tools may use cookies or similar technologies to measure site usage and improve the website.',
      'You can control cookies through your browser settings. Disabling cookies may affect some site functionality.',
    ],
  },
  {
    title: '5. Data Retention',
    content: [
      'Contact form messages are retained only as long as necessary to respond, keep relevant communication history, and meet legal or operational needs.',
      'Analytics data retention is managed based on the settings of the analytics provider.',
    ],
  },
  {
    title: '6. Data Sharing',
    content: [
      'Your personal information is not sold.',
      'Data is shared only with service providers required to run this website and only to the extent necessary for those services.',
    ],
  },
  {
    title: '7. Your Rights',
    content: [
      'Depending on your jurisdiction, you may have rights to request access, correction, deletion, or restriction of your personal data.',
      'To make a privacy-related request, use the contact details provided below.',
    ],
  },
  {
    title: '8. Security',
    content: [
      'Reasonable technical and organizational measures are used to protect personal information. However, no internet transmission or storage system can be guaranteed 100% secure.',
    ],
  },
  {
    title: '9. Children\'s Privacy',
    content: [
      'This website is not directed to children under 13, and personal information from children is not knowingly collected.',
    ],
  },
  {
    title: '10. Changes to This Policy',
    content: [
      'This Privacy Policy may be updated from time to time. The latest version will always be available on this page with the updated effective date.',
    ],
  },
  {
    title: '11. Contact',
    content: [
      'For questions about this Privacy Policy or data handling practices, please use the contact page at atharvanaik.me/contact.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    description:
      'Privacy Policy for atharvanaik.me describing data collection, use, retention, and user rights.',
    url: `${baseUrl}/privacy-policy`,
    dateModified: new Date(lastUpdated).toISOString(),
    inLanguage: 'en',
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
            <Breadcrumbs
              items={[{ label: 'Privacy Policy', href: '/privacy-policy' }]}
            />
            <h1 className='title'>Privacy Policy</h1>
            <p className='mt-3 text-sm text-muted-foreground'>
              Effective date: {lastUpdated}
            </p>

            <div className='mt-10 space-y-8'>
              <p className='text-muted-foreground'>
                This Privacy Policy explains how information is collected, used,
                and protected when you visit this website.
              </p>

              {policySections.map(section => (
                <section key={section.title} className='space-y-3'>
                  <h2 className='font-serif text-xl font-semibold tracking-tight'>
                    {section.title}
                  </h2>
                  {section.content.map(paragraph => {
                    if (section.title === '11. Contact') {
                      return (
                        <p key={paragraph} className='leading-7 text-muted-foreground'>
                          For questions about this Privacy Policy or data
                          handling practices, please use the{' '}
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
                      <p key={paragraph} className='leading-7 text-muted-foreground'>
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