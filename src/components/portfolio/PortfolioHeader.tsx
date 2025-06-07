
import React from 'react';
import { motion as m } from 'framer-motion';

const PortfolioHeader = () => {
  return (
    <m.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-5xl font-bold heading-gradient mb-5">
        Our Portfolio
      </h2>
      <p className="text-white/70 max-w-2xl mx-auto">
        Explore our diverse range of projects showcasing how we've helped businesses 
        across industries leverage cutting-edge technology to achieve their goals.
      </p>
    </m.div>
  );
};

export default PortfolioHeader;
