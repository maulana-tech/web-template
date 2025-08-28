'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

type TemplateData = {
  id: string;
  name: string;
  downloads: number;
  views: number;
  conversionRate: number;
  revenue: number;
  rating: number;
};

type TimeRange = '7d' | '30d' | '90d' | '1y';

export default function TemplateAnalytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  // Mock analytics data
  const templateData: TemplateData[] = [
    { id: 'portfolio-pro', name: 'Portfolio Pro', downloads: 12500, views: 45000, conversionRate: 27.8, revenue: 612500, rating: 4.8 },
    { id: 'ecommerce-elite', name: 'E-commerce Elite', downloads: 8900, views: 32000, conversionRate: 27.8, revenue: 702000, rating: 4.6 },
    { id: 'blog-master', name: 'Blog Master', downloads: 6700, views: 24000, conversionRate: 27.9, revenue: 395300, rating: 4.7 },
    { id: 'saas-dashboard', name: 'SaaS Dashboard', downloads: 15200, views: 58000, conversionRate: 26.2, revenue: 1504800, rating: 4.9 },
    { id: 'landing-pro', name: 'Landing Page Pro', downloads: 21500, views: 89000, conversionRate: 24.1, revenue: 838500, rating: 4.5 },
    { id: 'restaurant-template', name: 'Restaurant Template', downloads: 7800, views: 29000, conversionRate: 26.9, revenue: 538200, rating: 4.4 }
  ];
  
  // Mock time series data
  const timeSeriesData = [
    { date: '2023-01-01', downloads: 120, revenue: 5200, views: 4200 },
    { date: '2023-01-02', downloads: 150, revenue: 6800, views: 5100 },
    { date: '2023-01-03', downloads: 180, revenue: 8100, views: 6300 },
    { date: '2023-01-04', downloads: 140, revenue: 6300, views: 4900 },
    { date: '2023-01-05', downloads: 210, revenue: 9800, views: 7200 },
    { date: '2023-01-06', downloads: 190, revenue: 8900, views: 6800 },
    { date: '2023-01-07', downloads: 230, revenue: 11200, views: 8100 }
  ];
  
  // Mock category distribution data
  const categoryData = [
    { name: 'Portfolio', value: 22 },
    { name: 'E-commerce', value: 18 },
    { name: 'Blog', value: 15 },
    { name: 'Dashboard', value: 12 },
    { name: 'Landing Page', value: 20 },
    { name: 'Other', value: 13 }
  ];
  
  const COLORS = ['#00F0FF', '#FF00C4', '#FF6B00', '#6BFF00', '#C400FF', '#006BFF'];
  
  const selectedTemplateData = selectedTemplate 
    ? templateData.find(t => t.id === selectedTemplate) 
    : templateData[0];
  
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
            Template Analytics Dashboard
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Track performance, understand user behavior, and optimize your templates
          </motion.p>
        </div>
        
        {/* Time range selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-gray-800">
            {(['7d', '30d', '90d', '1y'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  timeRange === range
                    ? 'bg-neon-blue text-dark'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {range === '7d' && '7 Days'}
                {range === '30d' && '30 Days'}
                {range === '90d' && '90 Days'}
                {range === '1y' && '1 Year'}
              </button>
            ))}
          </div>
        </div>
        
        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Downloads</p>
                <p className="text-2xl font-heading font-bold mt-1">72.6K</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                <svg className="h-6 w-6 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                12.5%
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">from last period</span>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-heading font-bold mt-1">$4.2M</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-neon-pink/10 flex items-center justify-center">
                <svg className="h-6 w-6 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                8.3%
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">from last period</span>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Avg. Rating</p>
                <p className="text-2xl font-heading font-bold mt-1">4.6</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-neon-blue to-neon-pink/10 flex items-center justify-center">
                <svg className="h-6 w-6 text-neon-pink" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                0.2
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">from last period</span>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Active Templates</p>
                <p className="text-2xl font-heading font-bold mt-1">24</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                <svg className="h-6 w-6 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                3
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">new this month</span>
            </div>
          </motion.div>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Downloads and Revenue Chart */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-heading font-bold text-lg mb-4">Downloads & Revenue</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      borderColor: '#374151',
                      borderRadius: '0.5rem'
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="downloads" 
                    stroke="#00F0FF" 
                    strokeWidth={2}
                    dot={{ stroke: '#00F0FF', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Downloads"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#FF00C4" 
                    strokeWidth={2}
                    dot={{ stroke: '#FF00C4', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Revenue ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          {/* Category Distribution */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-heading font-bold text-lg mb-4">Template Categories</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={(props: any) => `${props.name}: ${(props.percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      borderColor: '#374151',
                      borderRadius: '0.5rem'
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
        
        {/* Template Performance Table */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-heading font-bold text-lg">Template Performance</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Template</th>
                  <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-center">Downloads</th>
                  <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-center">Views</th>
                  <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-center">Conversion</th>
                  <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-center">Revenue</th>
                  <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {templateData.map((template, index) => (
                  <tr 
                    key={template.id} 
                    className={`border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      selectedTemplate === template.id ? 'bg-neon-blue/10 dark:bg-neon-pink/10' : ''
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <td className="p-4 font-medium">{template.name}</td>
                    <td className="p-4 text-center">{template.downloads.toLocaleString()}</td>
                    <td className="p-4 text-center">{template.views.toLocaleString()}</td>
                    <td className="p-4 text-center">{template.conversionRate}%</td>
                    <td className="p-4 text-center">${(template.revenue / 1000).toFixed(1)}K</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{template.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        {/* Insights */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-neon-blue to-blue-500 rounded-2xl p-6 text-white">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mr-3">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-lg">Top Performer</h3>
            </div>
            <p className="mb-3">SaaS Dashboard is your best performing template with 15.2K downloads and $1.5M in revenue.</p>
            <button className="text-sm font-medium underline">View details</button>
          </div>
          
          <div className="bg-gradient-to-r from-neon-pink to-purple-500 rounded-2xl p-6 text-white">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mr-3">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-lg">Growth Opportunity</h3>
            </div>
            <p className="mb-3">Restaurant templates show high engagement but lower conversion. Consider optimizing the landing page.</p>
            <button className="text-sm font-medium underline">View details</button>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-6 text-white">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mr-3">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-lg">Seasonal Trend</h3>
            </div>
            <p className="mb-3">E-commerce templates peak during Q4. Plan your marketing campaigns accordingly.</p>
            <button className="text-sm font-medium underline">View details</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}