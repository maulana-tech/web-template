'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PricingTiers() {
  const [isYearly, setIsYearly] = useState(false);
  
  const tiers = [
    {
      name: 'Free',
      description: 'Perfect for getting started with basic templates',
      price: {
        monthly: 0,
        yearly: 0
      },
      features: [
        'Access to 10+ basic templates',
        'Community support',
        'Basic documentation',
        'Personal use only'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Pro',
      description: 'For professionals who need premium templates',
      price: {
        monthly: 19,
        yearly: 190
      },
      features: [
        'Access to 100+ premium templates',
        'Priority support',
        'Detailed documentation',
        'Commercial use license',
        'Source files included',
        'Lifetime updates'
      ],
      cta: 'Subscribe Now',
      highlighted: true
    },
    {
      name: 'Team',
      description: 'For teams working on multiple projects',
      price: {
        monthly: 49,
        yearly: 490
      },
      features: [
        'Everything in Pro',
        'Up to 5 team members',
        'Team collaboration tools',
        'Custom branding options',
        'API access',
        'Dedicated support'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];
  
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Choose Your Plan
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get access to premium templates with flexible pricing options
          </motion.p>
        </div>
        
        {/* Pricing toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center bg-gray-200 dark:bg-gray-800 p-1 rounded-full">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !isYearly ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isYearly ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Yearly <span className="text-neon-pink">Save 20%</span>
            </button>
          </div>
        </div>
        
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`card p-8 ${
                tier.highlighted ? 'border-2 border-neon-blue dark:border-neon-pink relative' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neon-pink text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-heading font-bold mb-2">{tier.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{tier.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-heading font-bold">
                  ${isYearly ? tier.price.yearly : tier.price.monthly}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {tier.price.monthly === 0 ? '' : isYearly ? '/year' : '/month'}
                </span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 text-neon-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <motion.button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  tier.highlighted
                    ? 'bg-neon-pink text-white hover:bg-opacity-90'
                    : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {tier.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}