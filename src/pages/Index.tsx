import React, { useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import About from '@/components/About';
import LabShowcase from '@/components/LabShowcase';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ResourcePreloader from '@/components/ResourcePreloader';

// Lazy load the Portfolio component for better initial load performance
const Portfolio = lazy(() => import('@/components/portfolio/OptimizedPortfolio'));

const Index = () => {  // Update page title and metadata
  useEffect(() => {
    document.title = 'atkind - Building Tomorrow\'s AI, Today';
  }, []);
  // Define critical resources to preload
  const criticalResources = [
    // Preload critical images
    { href: '/images/hero-bg.webp', as: 'image' as const, type: 'image/webp' },
    { href: '/fonts/custom-font.woff2', as: 'font' as const, type: 'font/woff2', crossOrigin: 'anonymous' as const },
    // Add other critical resources here
  ];

  // Define resources to prefetch (for subsequent navigation)
  const prefetchResources = [
    { href: '/images/about-section-bg.webp', as: 'image' as const }
  ];

  // Define domains to preconnect to
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://cdn.example.com'
  ];

  return (
    <div className="bg-navy text-white min-h-screen custom-cursor-zone">
      {/* Preload critical resources */}
      <ResourcePreloader 
        resources={criticalResources}
        prefetch={prefetchResources}
        preconnect={preconnectDomains}
        dns={['https://analytics.example.com']}
      />
      
      <CustomCursor />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <Hero />
        <WhatWeDo />
        <About />
        
        {/* Lazy-loaded Portfolio with loading fallback */}
        <Suspense fallback={
          <div className="py-16 relative overflow-hidden">
            <div className="container px-4 mx-auto">
              <div className="text-center">
                <div className="h-10 w-48 bg-white/5 animate-pulse rounded-lg mx-auto mb-4"></div>
                <div className="h-4 w-96 bg-white/5 animate-pulse rounded-lg mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {Array(6).fill(null).map((_, i) => (
                  <div key={i} className="glass-card h-64 animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        }>
          <Portfolio />
        </Suspense>
        
        <LabShowcase />
        <Contact />
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;
