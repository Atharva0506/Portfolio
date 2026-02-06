import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

import { cn } from '@/lib/utils'

import './globals.css'
import Providers from '@/components/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { UbuntuPortfolioIntroduction } from '@/components/UbuntuPortfolioIntroduction'


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: 'Atharva Naik | Software Developer & AI Engineer',
  description:
    'Atharva Naik is a Software Developer specializing in AI-powered applications, FastAPI backends, and LLM-based systems using LangChain, OpenAI, and vector databases.',
  icons: {
    icon: '/favicon.png',
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
      </body>
    </html>
  )
}
