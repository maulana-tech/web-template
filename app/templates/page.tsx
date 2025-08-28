import { Metadata } from 'next';
import TemplatesPageClient from './templates-client';

// Generate metadata for the templates page
export const metadata: Metadata = {
  title: 'Website Templates Collection',
  description: 'Browse our extensive collection of premium website templates. Filter by category, framework, and features. Over 500+ responsive templates for React, Next.js, Vue, and more.',
  keywords: [
    'website templates',
    'template collection',
    'react templates',
    'nextjs templates',
    'vue templates',
    'responsive templates',
    'premium templates',
    'web templates'
  ],
  openGraph: {
    title: 'Website Templates Collection | TemplateHub',
    description: 'Browse our extensive collection of premium website templates. Filter by category, framework, and features.',
    type: 'website',
    images: [
      {
        url: '/og-templates.jpg',
        width: 1200,
        height: 630,
        alt: 'TemplateHub Templates Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Templates Collection | TemplateHub',
    description: 'Browse our extensive collection of premium website templates.',
    images: ['/og-templates.jpg'],
  },
  alternates: {
    canonical: 'https://templatehub.com/templates',
  },
};

export default function TemplatesPage() {
  return <TemplatesPageClient />;
}