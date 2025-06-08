import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">About Us</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300">
            We are a team of passionate developers and designers dedicated to creating
            innovative digital solutions that help businesses grow and succeed in the
            digital age.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About; 