import './globals.css'
import './components.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/lib/auth'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SkipLinks } from '@/components/accessibility/AccessibilityUtils'
import { CriticalErrorBoundary, PageErrorBoundary } from '@/components/error/ErrorBoundary'
import ErrorHandlingProvider from '@/components/error/ErrorHandlingProvider'
import { Suspense } from 'react'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: {
    default: 'TemplateHub - Modern Website Template Marketplace',
    template: '%s | TemplateHub'
  },
  description: 'Discover premium responsive website templates, React components, and Next.js themes. Download modern templates for portfolios, e-commerce, SaaS, and more.',
  keywords: [
    'website templates',
    'react components', 
    'nextjs themes',
    'responsive templates',
    'modern web design',
    'figma templates',
    'template marketplace',
    'web development',
    'ui components',
    'website builder'
  ],
  authors: [{ name: 'TemplateHub Team' }],
  creator: 'TemplateHub',
  publisher: 'TemplateHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://templatehub.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://templatehub.com',
    title: 'TemplateHub - Modern Website Template Marketplace',
    description: 'Discover premium responsive website templates, React components, and Next.js themes. Download modern templates for portfolios, e-commerce, SaaS, and more.',
    siteName: 'TemplateHub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TemplateHub - Modern Website Template Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TemplateHub - Modern Website Template Marketplace',
    description: 'Discover premium responsive website templates, React components, and Next.js themes.',
    creator: '@templatehub',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'TemplateHub',
    'description': 'Modern Website Template Marketplace',
    'url': 'https://templatehub.com',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://templatehub.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'TemplateHub',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://templatehub.com/logo.png'
      }
    },
    'sameAs': [
      'https://twitter.com/templatehub',
      'https://github.com/templatehub',
      'https://linkedin.com/company/templatehub'
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <SkipLinks />
        <ErrorHandlingProvider>
          <CriticalErrorBoundary>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AuthProvider>
                <PageErrorBoundary>
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  }>
                    <Header />
                    <main id="main-content" tabIndex={-1}>
                      {children}
                    </main>
                    <Footer />
                  </Suspense>
                </PageErrorBoundary>
              </AuthProvider>
            </ThemeProvider>
          </CriticalErrorBoundary>
        </ErrorHandlingProvider>
      </body>
    </html>
  )
}
