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

const Index = () => {
  // Update page title and metadata
  useEffect(() => {
    document.title = 'atkind - Building Tomorrow\'s AI, Today';
  }, []);

  // Updated resource paths to be absolute
  const criticalResources = [
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
      >        <Navbar />
        <Hero />
        <WhatWeDo />
        <About />
        <AppShowcase />
        <WebAppShowcase />
        <LabShowcase />
        <Contact />
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;
