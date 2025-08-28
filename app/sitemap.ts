import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://templatehub.com'
  
  // Static pages
  const routes = [
    '',
    '/templates',
    '/categories',
    '/pricing',
    '/about',
    '/contact',
    '/login',
    '/register',
    '/dashboard',
    '/checkout',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1 : 0.8,
  }))

  // Template categories (these would typically come from a database)
  const templateCategories = [
    'portfolio',
    'ecommerce',
    'blog',
    'saas',
    'landing-page',
    'restaurant',
    'business',
    'agency',
    'dashboard',
    'education'
  ].map((category) => ({
    url: `${baseUrl}/templates/category/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.7,
  }))

  // Individual templates (these would typically come from a database)
  const templates = [
    'modern-portfolio',
    'ecommerce-starter',
    'blog-platform',
    'saas-dashboard',
    'landing-page-pro',
    'restaurant-template',
    'business-website',
    'agency-portfolio',
    'admin-dashboard',
    'education-platform'
  ].map((template) => ({
    url: `${baseUrl}/templates/${template}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.6,
  }))

  return [...routes, ...templateCategories, ...templates]
}