'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PricingTiers() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  
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
        'Personal use only',
        'Watermarked exports',
        'Limited updates'
      ],
      cta: 'Get Started',
      highlighted: false,
      featureDetails: {
        'templates': '10+ basic templates',
        'support': 'Community forums',
        'updates': 'Monthly',
        'exports': 'Watermarked',
        'commercial': 'No',
        'source': 'No',
        'api': 'No',
        'team': '1 user'
      }
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
        'Lifetime updates',
        'API access',
        'Unlimited exports'
      ],
      cta: 'Subscribe Now',
      highlighted: true,
      featureDetails: {
        'templates': '100+ premium templates',
        'support': 'Email & chat',
        'updates': 'Lifetime',
        'exports': 'Unlimited',
        'commercial': 'Yes',
        'source': 'Yes',
        'api': 'Basic',
        'team': '1 user'
      }
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
        'Advanced API access',
        'Dedicated support',
        'Custom templates',
        'Priority feature requests'
      ],
      cta: 'Contact Sales',
      highlighted: false,
      featureDetails: {
        'templates': 'All templates + custom',
        'support': 'Dedicated account manager',
        'updates': 'Lifetime + early access',
        'exports': 'Unlimited',
        'commercial': 'Yes',
        'source': 'Yes',
        'api': 'Advanced',
        'team': 'Up to 5 users'
      }
    }
  ];
  
  const featureCategories = [
    { id: 'templates', name: 'Templates' },
    { id: 'support', name: 'Support' },
    { id: 'updates', name: 'Updates' },
    { id: 'exports', name: 'Exports' },
    { id: 'commercial', name: 'Commercial Use' },
    { id: 'source', name: 'Source Files' },
    { id: 'api', name: 'API Access' },
    { id: 'team', name: 'Team Members' }
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
              Yearly <span className="text-neon-pink">(Save 20%)</span>
            </button>
          </div>
        </div>
        
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`card p-8 relative cursor-pointer transition-all duration-300 ${
                tier.highlighted ? 'border-2 border-neon-blue dark:border-neon-pink' : ''
              } ${selectedTier === index ? 'ring-2 ring-neon-blue scale-105' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedTier(index)}
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
                {isYearly && tier.price.monthly > 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Billed annually (${tier.price.monthly}/month)
                  </p>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 text-neon-blue mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        
        {/* Feature comparison table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-heading font-bold">Detailed Feature Comparison</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Feature</th>
                  {tiers.map((tier, index) => (
                    <th key={index} className="p-4 font-medium text-gray-900 dark:text-white">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureCategories.map((category, index) => (
                  <motion.tr
                    key={category.id}
                    className={`border-b border-gray-100 dark:border-gray-800 ${
                      index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''
                    }`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="p-4 font-medium">{category.name}</td>
                    {tiers.map((tier, tierIndex) => (
                      <td key={tierIndex} className="p-4 text-center">
                        {tier.featureDetails[category.id as keyof typeof tier.featureDetails]}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* FAQ section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-heading font-bold text-center mb-8">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            {[
              {
                question: 'Can I switch plans later?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Your billing will be adjusted accordingly.'
              },
              {
                question: 'Do you offer refunds?',
                answer: 'We offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied, contact us for a full refund.'
              },
              {
                question: 'Can I use templates for client projects?',
                answer: 'Yes, our Pro and Team plans include a commercial license that allows you to use templates for client projects.'
              },
              {
                question: 'How often are new templates added?',
                answer: 'We add 3-5 new templates every month. Pro and Team subscribers get early access to new releases.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h4 className="font-heading font-bold text-lg mb-2">{faq.question}</h4>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}