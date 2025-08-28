'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type TutorialStep = {
  id: number;
  title: string;
  description: string;
  code?: string;
  language?: string;
  tip?: string;
  image?: string;
};

export default function InteractiveTutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [codeOutput, setCodeOutput] = useState<string>('');
  
  const tutorialSteps: TutorialStep[] = [
    {
      id: 1,
      title: 'Getting Started',
      description: 'Welcome to TemplateHub! In this tutorial, you\'ll learn how to quickly set up and customize a template.',
      image: '/tutorials/getting-started.svg'
    },
    {
      id: 2,
      title: 'Choosing a Template',
      description: 'Browse our collection of professionally designed templates. Use filters to find exactly what you need.',
      code: `// Filter templates by category
const filteredTemplates = templates.filter(template => 
  template.category === 'portfolio'
);

// Sort by popularity
filteredTemplates.sort((a, b) => b.rating - a.rating);`,
      language: 'javascript',
      tip: 'Pro tip: Use the search bar to quickly find templates by name or features.'
    },
    {
      id: 3,
      title: 'Downloading & Installation',
      description: 'Once you\'ve selected a template, download it and follow the installation instructions.',
      code: `// Step 1: Extract the downloaded file
// Step 2: Navigate to the project directory
cd my-template-project

// Step 3: Install dependencies
npm install

// Step 4: Start the development server
npm run dev`,
      language: 'bash',
      tip: 'Make sure you have Node.js installed before running these commands.'
    },
    {
      id: 4,
      title: 'Customizing Your Template',
      description: 'Personalize your template by modifying colors, fonts, and content to match your brand.',
      code: `// Update theme colors in tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#FF00C4',
        secondary: '#00F0FF',
      }
    }
  }
}

// Update content in components
<h1 className="text-4xl font-bold text-primary">
  Welcome to My Website
</h1>`,
      language: 'javascript',
      tip: 'Use the global search (Cmd/Ctrl + Shift + F) to find all instances of text you want to change.'
    },
    {
      id: 5,
      title: 'Adding Your Content',
      description: 'Replace placeholder content with your own text, images, and media.',
      code: `// Example: Updating a hero section
export default function Hero() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-5xl font-bold mb-4">
        {/* Replace with your headline */}
        Welcome to Acme Inc
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        {/* Replace with your subheading */}
        We create innovative solutions for modern businesses
      </p>
    </section>
  );
}`,
      language: 'jsx',
      tip: 'Organize your content in a content management system for easier updates later.'
    },
    {
      id: 6,
      title: 'Deployment',
      description: 'Publish your website to the internet with just a few clicks.',
      code: `// Deploy with Vercel (recommended)
// 1. Push your code to GitHub
// 2. Import project in Vercel dashboard
// 3. Configure environment variables
// 4. Deploy!

// Or deploy with Netlify
// 1. Connect your Git repository
// 2. Configure build settings
// 3. Deploy!`,
      language: 'bash',
      tip: 'For production deployments, always set up a custom domain and SSL certificate.'
    },
    {
      id: 7,
      title: 'Congratulations!',
      description: 'You\'ve successfully built and deployed your first website with TemplateHub!',
      image: '/tutorials/congratulations.svg'
    }
  ];
  
  // Simulate code output
  useEffect(() => {
    if (isPlaying && tutorialSteps[currentStep].code) {
      const timer = setTimeout(() => {
        setCodeOutput('// Output will appear here after running the code');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, isPlaying, tutorialSteps]);
  
  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const completeStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
  };
  
  const resetTutorial = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
  };
  
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;
  
  return (
    <section className="py-20 bg-gradient-to-br from-neon-blue/10 via-white dark:via-dark to-neon-pink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-heading font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Interactive Tutorial
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Learn how to build your first website with TemplateHub in 7 easy steps
            </motion.p>
          </div>
          
          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Step {currentStep + 1} of {tutorialSteps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-neon-blue to-neon-pink"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Steps sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="font-heading font-bold text-lg mb-4">Tutorial Steps</h3>
                <ul className="space-y-2">
                  {tutorialSteps.map((step, index) => (
                    <motion.li
                      key={step.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        currentStep === index 
                          ? 'bg-neon-blue/20 dark:bg-neon-pink/20' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setCurrentStep(index)}
                      whileHover={{ x: 5 }}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                        completedSteps.includes(index)
                          ? 'bg-neon-blue text-dark'
                          : currentStep === index
                          ? 'bg-neon-pink text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}>
                        {completedSteps.includes(index) ? (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="font-medium">{step.id}</span>
                        )}
                      </div>
                      <span className={`font-medium ${
                        currentStep === index 
                          ? 'text-neon-pink dark:text-neon-blue' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {step.title}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-8">
                    <div className="flex items-start mb-6">
                      <div className="w-12 h-12 rounded-lg bg-neon-blue flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-dark font-heading font-bold text-xl">{tutorialSteps[currentStep].id}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-heading font-bold mb-2">{tutorialSteps[currentStep].title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{tutorialSteps[currentStep].description}</p>
                      </div>
                    </div>
                    
                    {tutorialSteps[currentStep].image && (
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 mb-6 flex items-center justify-center min-h-[200px]">
                        <div className="text-center">
                          <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                          <p className="text-gray-500 dark:text-gray-400">Tutorial illustration</p>
                        </div>
                      </div>
                    )}
                    
                    {tutorialSteps[currentStep].code && (
                      <div className="mb-6">
                        <div className="bg-gray-800 rounded-lg overflow-hidden">
                          <div className="flex justify-between items-center px-4 py-2 bg-gray-900">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <button
                              onClick={() => navigator.clipboard.writeText(tutorialSteps[currentStep].code || '')}
                              className="text-gray-400 hover:text-white text-sm"
                            >
                              Copy Code
                            </button>
                          </div>
                          <SyntaxHighlighter
                            language={tutorialSteps[currentStep].language}
                            style={vscDarkPlus}
                            showLineNumbers
                            customStyle={{
                              margin: 0,
                              borderRadius: '0 0 0.5rem 0.5rem',
                              fontSize: '14px'
                            }}
                          >
                            {tutorialSteps[currentStep].code}
                          </SyntaxHighlighter>
                        </div>
                        
                        {tutorialSteps[currentStep].tip && (
                          <div className="mt-3 p-4 bg-neon-blue/10 dark:bg-neon-pink/10 rounded-lg border border-neon-blue/30 dark:border-neon-pink/30">
                            <div className="flex">
                              <svg className="h-5 w-5 text-neon-blue dark:text-neon-pink mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-medium">Pro tip:</span> {tutorialSteps[currentStep].tip}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {codeOutput && (
                      <div className="mb-6">
                        <h4 className="font-heading font-bold mb-2">Output:</h4>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm">
                          <pre>{codeOutput}</pre>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                          currentStep === 0
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
                        }`}
                      >
                        Previous
                      </button>
                      
                      {currentStep < tutorialSteps.length - 1 ? (
                        <button
                          onClick={nextStep}
                          className="btn-primary"
                        >
                          Next Step
                        </button>
                      ) : (
                        <button
                          onClick={resetTutorial}
                          className="btn-secondary"
                        >
                          Restart Tutorial
                        </button>
                      )}
                      
                      {currentStep < tutorialSteps.length - 1 && !completedSteps.includes(currentStep) && (
                        <button
                          onClick={completeStep}
                          className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                        >
                          Mark as Complete
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Tutorial benefits */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-neon-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">Learn by Doing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Hands-on approach with real code examples and practical exercises
              </p>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-neon-pink rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">Fast Results</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build and deploy your first website in under 30 minutes
              </p>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-pink rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">Expert Guidance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tips and best practices from experienced developers
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}