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
  metadataBase: new URL('https://atharva-naik-portfolio.vercel.app'),

  title: {
    default: 'Atharva Naik | Software Developer & AI Engineer',
    template: '%s | Atharva Naik',
  },

  description:
    'Atharva Naik is a Software Developer and AI Engineer building AI-powered applications, FastAPI backends, LLM systems using LangChain, OpenAI, and scalable architectures.',

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
    url: 'https://atharva-naik-portfolio.vercel.app',
    siteName: 'Atharva Naik Portfolio',
    title: 'Atharva Naik | AI Engineer & Software Developer',
    description:
      'AI Engineer building intelligent systems, FastAPI backends, and production-ready AI applications.',
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
    title: 'Atharva Naik | AI Engineer',
    description:
      'AI Engineer building scalable AI systems and modern web applications.',
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
    canonical: 'https://atharva-naik-portfolio.vercel.app',
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
              url: "https://atharva-naik-portfolio.vercel.app",
              image: "https://atharva-naik-portfolio.vercel.app/favicon.png",
              jobTitle: "AI Engineer",
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
