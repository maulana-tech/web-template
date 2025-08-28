import { Metadata } from 'next';
import Link from 'next/link';
import NotFoundClient from './not-found-client';

export const metadata: Metadata = {
  title: 'Page Not Found - 404 Error | TemplateHub',
  description: 'The page you are looking for could not be found. Return to TemplateHub homepage or browse our premium website templates and UI components.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Page Not Found - 404 Error | TemplateHub',
    description: 'The page you are looking for could not be found. Return to TemplateHub homepage or browse our premium website templates.',
    type: 'website',
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}