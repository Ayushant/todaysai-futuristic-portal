
import React from 'react';
import { motion as m } from 'framer-motion';

const PortfolioHeader = () => {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Our <span className="text-techpurple">Portfolio</span>
      </h2>
      <p className="text-xl text-white/70 max-w-3xl mx-auto">
        Discover our innovative solutions that drive business growth and user engagement
      </p>
    </m.div>
  );
};

export default PortfolioHeader;
