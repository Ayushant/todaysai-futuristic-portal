
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import About from '@/components/About';
import AppShowcase from '@/components/AppShowcase';
import WebAppShowcase from '@/components/WebAppShowcase';
import LabShowcase from '@/components/LabShowcase';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ResourcePreloader from '@/components/ResourcePreloader';
import OptimizedPortfolio from '@/components/portfolio/OptimizedPortfolio';

const Index = () => {
  // Update page title and metadata
  useEffect(() => {
    document.title = 'atkind - Building Tomorrow\'s AI, Today';
  }, []);

  // Define critical resources to preload
  const criticalResources = [
    // Preload critical images
    { href: '/images/hero-bg.webp', as: 'image' as const, type: 'image/webp' },
    { href: '/fonts/inter-var.woff2', as: 'font' as const, type: 'font/woff2', crossOrigin: 'anonymous' as const },
  ];

  // Define resources to prefetch (for subsequent navigation)
  const prefetchResources = [
    { href: '/images/about-section-bg.webp', as: 'image' as const }
  ];

  // Define domains to preconnect to
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://images.unsplash.com'
  ];

  return (
    <div className="relative min-h-screen bg-navy text-white">
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
        className="relative z-10"
      >
        <Navbar />
        <main>
          <Hero />
          <WhatWeDo />
          <About />
          <AppShowcase />
          <WebAppShowcase />
          <LabShowcase />
          <OptimizedPortfolio />
          <Contact />
        </main>
        <Footer />
      </motion.div>

      {/* Background elements */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-navy-200 to-navy opacity-70"></div>
        <div className="absolute inset-0 grid-bg opacity-20"></div>
      </div>
    </div>
  );
};

export default Index;
