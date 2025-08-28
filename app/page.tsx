import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Metadata } from 'next';

// Generate metadata for the home page
export const metadata: Metadata = {
  title: 'Premium Website Templates & React Components',
  description: 'Discover 500+ premium website templates, React components, and Next.js themes. Perfect for portfolios, e-commerce, SaaS applications, and more. Download instantly.',
  keywords: [
    'website templates',
    'react components',
    'nextjs themes',
    'premium templates',
    'responsive design',
    'modern web templates',
    'ui components',
    'figma templates'
  ],
  openGraph: {
    title: 'Premium Website Templates & React Components | TemplateHub',
    description: 'Discover 500+ premium website templates, React components, and Next.js themes. Perfect for portfolios, e-commerce, SaaS applications, and more.',
    type: 'website',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'TemplateHub - Premium Website Templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Website Templates & React Components | TemplateHub',
    description: 'Discover 500+ premium website templates, React components, and Next.js themes.',
    images: ['/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://templatehub.com',
  },
};

// Critical components loaded immediately
import HeroSection from '@/components/home/HeroSection';
import KeyFeatures from '@/components/home/KeyFeatures';

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
  </div>
);

// Lazy load non-critical components
const TemplateCategories = dynamic(() => import('@/components/home/TemplateCategories'), {
  loading: LoadingSpinner,
  ssr: true,
});

const TemplateShowcase = dynamic(() => import('@/components/home/TemplateShowcase'), {
  loading: LoadingSpinner,
});

const PricingTiers = dynamic(() => import('@/components/home/PricingTiers'), {
  loading: LoadingSpinner,
  ssr: true,
});

const DeveloperFeatures = dynamic(() => import('@/components/home/DeveloperFeatures'), {
  loading: LoadingSpinner,
});

const TemplateRecommendations = dynamic(() => import('@/components/home/TemplateRecommendations'), {
  loading: LoadingSpinner,
});

const InteractiveBuilder = dynamic(() => import('@/components/home/InteractiveBuilder'), {
  loading: LoadingSpinner,
});

const SocialProof = dynamic(() => import('@/components/home/SocialProof'), {
  loading: LoadingSpinner,
  ssr: true,
});

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Critical above-the-fold content */}
      <HeroSection />
      <KeyFeatures />
      
      {/* Lazy-loaded content with suspense boundaries */}
      <Suspense fallback={<LoadingSpinner />}>
        <TemplateCategories />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <TemplateShowcase />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <TemplateRecommendations />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <InteractiveBuilder />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <DeveloperFeatures />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <SocialProof />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <PricingTiers />
      </Suspense>
    </div>
  );
}