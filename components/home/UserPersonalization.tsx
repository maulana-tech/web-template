'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type UserPreference = {
  categories: string[];
  styles: string[];
  frameworks: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
};

export default function UserPersonalization() {
  const [preferences, setPreferences] = useState<UserPreference>({
    categories: [],
    styles: [],
    frameworks: [],
    skillLevel: 'intermediate'
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const categories = [
    'Portfolio', 'E-commerce', 'Blog', 'Landing Page', 
    'Dashboard', 'SaaS', 'Restaurant', 'Agency', 'Education'
  ];
  
  const styles = [
    'Minimal', 'Dark Mode', 'Colorful', 'Glassmorphism', 
    'Neumorphism', 'Brutalism', 'Retro', 'Modern'
  ];
  
  const frameworks = [
    'React', 'Next.js', 'Vue', 'Angular', 'Svelte', 'HTML/CSS'
  ];
  
  const skillLevels = [
    { id: 'beginner', label: 'Beginner (Just starting out)' },
    { id: 'intermediate', label: 'Intermediate (Some experience)' },
    { id: 'advanced', label: 'Advanced (Professional developer)' }
  ];
  
  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (e) {
        console.error('Failed to parse saved preferences', e);
      }
    }
  }, []);
  
  // Save preferences to localStorage when they change
  useEffect(() => {
    if (preferences.categories.length > 0 || preferences.styles.length > 0 || preferences.frameworks.length > 0) {
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
    }
  }, [preferences]);
  
  const togglePreference = (type: keyof UserPreference, value: string) => {
    if (type === 'skillLevel') {
      setPreferences(prev => ({
        ...prev,
        skillLevel: value as 'beginner' | 'intermediate' | 'advanced'
      }));
      return;
    }
    
    setPreferences(prev => {
      const currentArray = [...prev[type] as string[]];
      const index = currentArray.indexOf(value);
      
      if (index >= 0) {
        // Remove if already selected
        currentArray.splice(index, 1);
      } else {
        // Add if not selected
        currentArray.push(value);
      }
      
      return {
        ...prev,
        [type]: currentArray
      };
    });
  };
  
  const isPreferenceSelected = (type: keyof UserPreference, value: string): boolean => {
    if (type === 'skillLevel') {
      return preferences.skillLevel === value;
    }
    
    return (preferences[type] as string[]).includes(value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
  const resetPreferences = () => {
    setPreferences({
      categories: [],
      styles: [],
      frameworks: [],
      skillLevel: 'intermediate'
    });
  };
  
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-heading font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Personalize Your Experience
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Tell us about your preferences and we'll tailor TemplateHub to your needs
            </motion.p>
          </div>
          
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-neon-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="h-8 w-8 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2">Preferences Saved!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your preferences have been saved. We'll now show you more relevant templates.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-primary"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Skill Level */}
                <div className="mb-10">
                  <h3 className="text-xl font-heading font-bold mb-4">What's your experience level?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {skillLevels.map((level) => (
                      <motion.label
                        key={level.id}
                        className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          isPreferenceSelected('skillLevel', level.id)
                            ? 'border-neon-blue bg-neon-blue/10'
                            : 'border-gray-200 dark:border-gray-700 hover:border-neon-blue'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="skillLevel"
                          value={level.id}
                          checked={isPreferenceSelected('skillLevel', level.id)}
                          onChange={() => togglePreference('skillLevel', level.id)}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                            isPreferenceSelected('skillLevel', level.id)
                              ? 'border-neon-blue bg-neon-blue'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {isPreferenceSelected('skillLevel', level.id) && (
                              <div className="w-2 h-2 rounded-full bg-dark"></div>
                            )}
                          </div>
                          <span className="font-medium">{level.label}</span>
                        </div>
                      </motion.label>
                    ))}
                  </div>
                </div>
                
                {/* Categories */}
                <div className="mb-10">
                  <h3 className="text-xl font-heading font-bold mb-4">Which categories interest you?</h3>
                  <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        type="button"
                        onClick={() => togglePreference('categories', category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          isPreferenceSelected('categories', category)
                            ? 'bg-neon-blue text-dark'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Styles */}
                <div className="mb-10">
                  <h3 className="text-xl font-heading font-bold mb-4">Preferred design styles?</h3>
                  <div className="flex flex-wrap gap-3">
                    {styles.map((style) => (
                      <motion.button
                        key={style}
                        type="button"
                        onClick={() => togglePreference('styles', style)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          isPreferenceSelected('styles', style)
                            ? 'bg-gradient-to-r from-neon-blue to-neon-pink text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {style}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Frameworks */}
                <div className="mb-10">
                  <h3 className="text-xl font-heading font-bold mb-4">Favorite frameworks?</h3>
                  <div className="flex flex-wrap gap-3">
                    {frameworks.map((framework) => (
                      <motion.button
                        key={framework}
                        type="button"
                        onClick={() => togglePreference('frameworks', framework)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          isPreferenceSelected('frameworks', framework)
                            ? 'bg-neon-pink text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {framework}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    type="submit"
                    className="flex-1 btn-primary flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Save Preferences'
                    )}
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={resetPreferences}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
          
          {/* Benefits */}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">Personalized Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get templates tailored to your interests and skill level
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">Faster Discovery</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Spend less time searching and more time building
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">Learning Path</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Progress from beginner to expert with curated learning
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}