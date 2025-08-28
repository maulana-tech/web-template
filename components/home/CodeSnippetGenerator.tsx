'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Framework = 'react' | 'nextjs' | 'vue' | 'angular' | 'html';
type ComponentType = 'hero' | 'navbar' | 'card' | 'footer' | 'button' | 'form';

interface GeneratedCode {
  framework: Framework;
  component: ComponentType;
  code: string;
  language: string;
  description: string;
}

export default function CodeSnippetGenerator() {
  const [selectedFramework, setSelectedFramework] = useState<Framework>('react');
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('hero');
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Generate code snippets based on selections
  useEffect(() => {
    if (selectedFramework && selectedComponent) {
      generateCode();
    }
  }, [selectedFramework, selectedComponent]);
  
  const generateCode = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const codeSnippets: Record<Framework, Record<ComponentType, GeneratedCode>> = {
        react: {
          hero: {
            framework: 'react',
            component: 'hero',
            language: 'jsx',
            description: 'A responsive hero section with call-to-action buttons',
            code: `import React, { useState } from 'react';

export default function HeroSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Build Amazing Websites
        </h1>
        
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Create stunning websites with our pre-built components and templates
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-800"
              required
            />
            <button type="submit" className="bg-pink-500 text-white px-6 py-3 rounded-r-lg">
              Get Started
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}`
          },
          navbar: {
            framework: 'react',
            component: 'navbar',
            language: 'jsx',
            description: 'A responsive navigation bar with mobile menu',
            code: `import React, { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="text-xl font-bold">Brand</div>
          
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">About</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
}`
          },
          card: {
            framework: 'react',
            component: 'card',
            language: 'jsx',
            description: 'A versatile card component',
            code: `import React from 'react';

export default function Card({ title, description, image }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}`
          },
          footer: {
            framework: 'react',
            component: 'footer',
            language: 'jsx',
            description: 'A comprehensive footer',
            code: `import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p>&copy; 2024 Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}`
          },
          button: {
            framework: 'react',
            component: 'button',
            language: 'jsx',
            description: 'A customizable button component',
            code: `import React from 'react';

export default function Button({ children, variant = 'primary', ...props }) {
  const baseClasses = 'px-4 py-2 rounded font-medium';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  };
  
  return (
    <button className={\`\${baseClasses} \${variants[variant]}\`} {...props}>
      {children}
    </button>
  );
}`
          },
          form: {
            framework: 'react',
            component: 'form',
            language: 'jsx',
            description: 'A contact form with validation',
            code: `import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        className="w-full px-3 py-2 border rounded"
        rows={4}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Send Message
      </button>
    </form>
  );
}`
          }
        },
        nextjs: {
          hero: { framework: 'nextjs', component: 'hero', language: 'tsx', description: 'Next.js hero section', code: 'export default function Hero() { return <section>NextJS Hero</section>; }' },
          navbar: { framework: 'nextjs', component: 'navbar', language: 'tsx', description: 'Next.js navigation', code: 'export default function Navbar() { return <nav>NextJS Nav</nav>; }' },
          card: { framework: 'nextjs', component: 'card', language: 'tsx', description: 'Next.js card', code: 'export default function Card() { return <div>NextJS Card</div>; }' },
          footer: { framework: 'nextjs', component: 'footer', language: 'tsx', description: 'Next.js footer', code: 'export default function Footer() { return <footer>NextJS Footer</footer>; }' },
          button: { framework: 'nextjs', component: 'button', language: 'tsx', description: 'Next.js button', code: 'export default function Button() { return <button>NextJS Button</button>; }' },
          form: { framework: 'nextjs', component: 'form', language: 'tsx', description: 'Next.js form', code: 'export default function Form() { return <form>NextJS Form</form>; }' }
        },
        vue: {
          hero: { framework: 'vue', component: 'hero', language: 'vue', description: 'Vue hero section', code: '<template><section>Vue Hero</section></template>' },
          navbar: { framework: 'vue', component: 'navbar', language: 'vue', description: 'Vue navigation', code: '<template><nav>Vue Nav</nav></template>' },
          card: { framework: 'vue', component: 'card', language: 'vue', description: 'Vue card', code: '<template><div>Vue Card</div></template>' },
          footer: { framework: 'vue', component: 'footer', language: 'vue', description: 'Vue footer', code: '<template><footer>Vue Footer</footer></template>' },
          button: { framework: 'vue', component: 'button', language: 'vue', description: 'Vue button', code: '<template><button>Vue Button</button></template>' },
          form: { framework: 'vue', component: 'form', language: 'vue', description: 'Vue form', code: '<template><form>Vue Form</form></template>' }
        },
        angular: {
          hero: { framework: 'angular', component: 'hero', language: 'typescript', description: 'Angular hero section', code: '@Component({ template: `<section>Angular Hero</section>` }) export class HeroComponent {}' },
          navbar: { framework: 'angular', component: 'navbar', language: 'typescript', description: 'Angular navigation', code: '@Component({ template: `<nav>Angular Nav</nav>` }) export class NavbarComponent {}' },
          card: { framework: 'angular', component: 'card', language: 'typescript', description: 'Angular card', code: '@Component({ template: `<div>Angular Card</div>` }) export class CardComponent {}' },
          footer: { framework: 'angular', component: 'footer', language: 'typescript', description: 'Angular footer', code: '@Component({ template: `<footer>Angular Footer</footer>` }) export class FooterComponent {}' },
          button: { framework: 'angular', component: 'button', language: 'typescript', description: 'Angular button', code: '@Component({ template: `<button>Angular Button</button>` }) export class ButtonComponent {}' },
          form: { framework: 'angular', component: 'form', language: 'typescript', description: 'Angular form', code: '@Component({ template: `<form>Angular Form</form>` }) export class FormComponent {}' }
        },
        html: {
          hero: { framework: 'html', component: 'hero', language: 'html', description: 'HTML hero section', code: '<section class="hero"><h1>HTML Hero</h1></section>' },
          navbar: { framework: 'html', component: 'navbar', language: 'html', description: 'HTML navigation', code: '<nav><ul><li><a href="#">Home</a></li></ul></nav>' },
          card: { framework: 'html', component: 'card', language: 'html', description: 'HTML card', code: '<div class="card"><h3>Card Title</h3><p>Card content</p></div>' },
          footer: { framework: 'html', component: 'footer', language: 'html', description: 'HTML footer', code: '<footer><p>&copy; 2024 Company</p></footer>' },
          button: { framework: 'html', component: 'button', language: 'html', description: 'HTML button', code: '<button class="btn btn-primary">Click Me</button>' },
          form: { framework: 'html', component: 'form', language: 'html', description: 'HTML form', code: '<form><input type="text" placeholder="Name"><input type="email" placeholder="Email"><button type="submit">Submit</button></form>' }
        }
      };
      
      setGeneratedCode(codeSnippets[selectedFramework][selectedComponent]);
      setIsGenerating(false);
    }, 800);
  };
  
  const copyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const frameworks: { id: Framework; name: string }[] = [
    { id: 'react', name: 'React' },
    { id: 'nextjs', name: 'Next.js' },
    { id: 'vue', name: 'Vue.js' },
    { id: 'angular', name: 'Angular' },
    { id: 'html', name: 'HTML/CSS' }
  ];
  
  const components: { id: ComponentType; name: string }[] = [
    { id: 'hero', name: 'Hero Section' },
    { id: 'navbar', name: 'Navigation Bar' },
    { id: 'card', name: 'Card Component' },
    { id: 'footer', name: 'Footer' },
    { id: 'button', name: 'Button' },
    { id: 'form', name: 'Form' }
  ];
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Automated Code Generator
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Generate production-ready code snippets for your favorite frameworks
          </motion.p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
          {/* Controls */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Framework</label>
                <div className="flex flex-wrap gap-2">
                  {frameworks.map((framework) => (
                    <button
                      key={framework.id}
                      onClick={() => setSelectedFramework(framework.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedFramework === framework.id
                          ? 'bg-neon-blue text-dark'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {framework.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Component</label>
                <div className="flex flex-wrap gap-2">
                  {components.map((component) => (
                    <button
                      key={component.id}
                      onClick={() => setSelectedComponent(component.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedComponent === component.id
                          ? 'bg-neon-pink text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {component.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Code Preview */}
          <div className="p-6">
            {isGenerating ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
              </div>
            ) : generatedCode ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading font-bold text-lg">
                    {generatedCode.description}
                  </h3>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-2 bg-gray-900">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {generatedCode.framework}.{generatedCode.language}
                    </span>
                  </div>
                  <SyntaxHighlighter
                    language={generatedCode.language}
                    style={vscDarkPlus}
                    showLineNumbers
                    customStyle={{
                      margin: 0,
                      borderRadius: '0 0 0.5rem 0.5rem',
                      fontSize: '14px'
                    }}
                  >
                    {generatedCode.code}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p>Select a framework and component to generate code</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}