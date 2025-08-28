'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
};

type Stat = {
  value: string;
  label: string;
};

export default function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Frontend Developer',
      company: 'TechCorp',
      content: 'TemplateHub has saved us hundreds of hours in development. The templates are not only beautiful but also highly functional and easy to customize.',
      avatar: '/avatars/alex.jpg',
      rating: 5
    },
    {
      id: 2,
      name: 'Sarah Miller',
      role: 'Product Designer',
      company: 'DesignStudio',
      content: 'As a designer, I appreciate the attention to detail in these templates. They\'ve become my go-to resource for rapid prototyping and client presentations.',
      avatar: '/avatars/sarah.jpg',
      rating: 5
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Startup Founder',
      company: 'StartupX',
      content: 'We launched our MVP in just two weeks using TemplateHub templates. The code quality is exceptional and the documentation is comprehensive.',
      avatar: '/avatars/michael.jpg',
      rating: 4
    },
    {
      id: 4,
      name: 'Emma Thompson',
      role: 'Marketing Director',
      company: 'GrowthCo',
      content: 'Our conversion rates increased by 35% after implementing a TemplateHub landing page. The designs are proven to convert.',
      avatar: '/avatars/emma.jpg',
      rating: 5
    }
  ];
  
  const stats: Stat[] = [
    { value: '500+', label: 'Templates' },
    { value: '200k+', label: 'Downloads' },
    { value: '10k+', label: 'Developers' },
    { value: '4.8/5', label: 'Average Rating' }
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <section className="py-20 bg-gradient-to-r from-neon-blue/10 via-white dark:via-dark to-neon-pink/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Loved by Developers & Designers
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of satisfied users who have transformed their workflow
          </motion.p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-3xl md:text-4xl font-heading font-bold bg-clip-text text-transparent gradient-bg mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="absolute top-0 left-8 -translate-y-1/2 bg-neon-pink text-white px-4 py-2 rounded-lg font-bold">
              Testimonial
            </div>
            
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-1 mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 italic">
                "{testimonials[currentTestimonial].content}"
              </p>
              
              <div className="flex items-center">
                <Image
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-heading font-bold text-lg">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-neon-blue' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Trusted by */}
        <div className="mt-20">
          <h3 className="text-center text-lg font-medium text-gray-600 dark:text-gray-400 mb-8">
            Trusted by innovative teams at
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[
              { name: 'Vercel', logo: '/logos/vercel.svg' },
              { name: 'Netlify', logo: '/logos/netlify.svg' },
              { name: 'Stripe', logo: '/logos/stripe.svg' },
              { name: 'Shopify', logo: '/logos/shopify.svg' },
              { name: 'Figma', logo: '/logos/figma.svg' },
              { name: 'GitHub', logo: '/logos/github.svg' }
            ].map((company, index) => (
              <motion.div
                key={company.name}
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-gray-200 dark:bg-gray-800 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 font-bold">
                    {company.name.charAt(0)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-heading font-bold mb-4">Ready to join them?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Start building your next project with our premium templates today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="/templates"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Templates
            </motion.a>
            <motion.a
              href="/pricing"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Pricing
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}