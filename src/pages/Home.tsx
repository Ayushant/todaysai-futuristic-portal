import React from 'react';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import WebAppShowcase from '@/components/WebAppShowcase';
import LabShowcase from '@/components/LabShowcase';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AppShowcase from '@/components/AppShowcase';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <WhatWeDo />
        <WebAppShowcase />
        <AppShowcase />
        <LabShowcase />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home; 