
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import About from '@/components/About';
import LabShowcase from '@/components/LabShowcase';
import GlobalImpact from '@/components/GlobalImpact';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  // Update page title and metadata
  useEffect(() => {
    document.title = 'TodaysAi - Building Tomorrow\'s AI, Today';
  }, []);

  return (
    <div className="bg-navy text-white min-h-screen custom-cursor-zone">
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
        <LabShowcase />
        <GlobalImpact />
        <Testimonials />
        <Contact />
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;
