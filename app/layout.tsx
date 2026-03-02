import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

import { cn } from '@/lib/utils'

import './globals.css'
import Providers from '@/components/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { UbuntuPortfolioIntroduction } from '@/components/UbuntuPortfolioIntroduction'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://atharvanaik.me'),

  title: {
    default: 'Atharva Naik | AI Full Stack Developer – LangChain, FastAPI, Next.js',
    template: '%s | Atharva Naik – AI Developer',
  },

  description:
    'AI Full Stack Developer building production-ready LLM apps with LangChain, FastAPI, and Next.js. View projects, case studies, and AI engineering insights.',

  keywords: [
    'Atharva Naik',
    'AI Engineer India',
    'Software Developer Portfolio',
    'FastAPI Developer',
    'LLM Developer',
    'LangChain Developer',
    'Next.js Developer',
    'Machine Learning Engineer',
    'Cloud Architect',
    'AI Developer'
  ],

  authors: [{ name: 'Atharva Naik' }],
  creator: 'Atharva Naik',
  publisher: 'Atharva Naik',

  icons: {
    icon: '/favicon.png',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://atharvanaik.me',
    siteName: 'Atharva Naik Portfolio',
    title: 'Atharva Naik | AI Full Stack Developer',
    description:
      'AI Full Stack Developer building production-ready LLM apps, FastAPI backends, and multi-agent AI systems.',
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
        alt: 'Atharva Naik Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Atharva Naik | AI Full Stack Developer',
    description:
      'AI Full Stack Developer building scalable LLM systems and modern web applications.',
    images: ['/favicon.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://atharvanaik.me',
  },

  manifest: '/manifest.json',

  verification: {
    google: 'PcdpjtHSzybn4X3M94M79xBzQmcw_2TqqncD154v35I',
  },
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          inter.variable,
          playfair.variable
        )}
      >
        <Providers>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
          <UbuntuPortfolioIntroduction />
        </Providers>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Atharva Naik",
              url: "https://atharvanaik.me",
              image: "https://atharvanaik.me/favicon.png",
              jobTitle: "AI Full Stack Developer",
              sameAs: [
                "https://github.com/Atharva0506",
                "https://www.linkedin.com/in/atharva0506"
              ]
            }),
          }}
        />
      </body>
    </html>
  )
}
