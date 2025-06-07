
import React from 'react';
import { motion as m } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import App1 from '@/assets/app1.jpg';
import App2 from '@/assets/app2.jpg';
import App3 from '@/assets/app3.jpg';

const MobileShowcase = () => {
  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
      className="mt-20 pt-16 border-t border-navy-400/20"
    >
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-4">
          <Smartphone className="w-8 h-8 text-techpurple mr-3" />
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            Mobile <span className="text-techpurple">Applications</span>
          </h3>
        </div>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Revolutionary mobile apps that transform user experiences
        </p>
      </div>

      {/* NextGen Mobile Solutions */}
      <div className="bg-gradient-to-r from-techpurple/10 to-blue-600/10 rounded-2xl p-6 md:p-8 lg:p-10 border border-techpurple/20 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Images Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {[App1, App2].map((image, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl bg-navy-600/30 border border-navy-400/20 hover:border-techpurple/50 transition-all duration-300 shadow-lg hover:shadow-techpurple/20"
                >
                  <div className="aspect-[9/16] overflow-hidden">
                    <img
                      src={image}
                      alt={`NextGen Mobile App Screenshot ${index + 1}`}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </m.div>
              ))}
            </div>
            
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-navy-600/30 border border-navy-400/20 hover:border-techpurple/50 transition-all duration-300 shadow-lg hover:shadow-techpurple/20"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={App3}
                  alt="NextGen Mobile App Dashboard"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </m.div>
          </div>

          {/* Details Column */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6 lg:space-y-8"
          >
            <div>
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
                NextGen Mobile Solutions
              </h4>
              <p className="text-base lg:text-lg text-white/80 mb-6 lg:mb-8 leading-relaxed">
                Experience the future of mobile technology with our cutting-edge applications featuring
                AI-powered interfaces, real-time synchronization, and seamless cross-platform compatibility.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
                <div className="bg-navy-800/50 p-3 lg:p-4 rounded-lg text-center hover:bg-navy-800/70 transition-colors border border-navy-600/30">
                  <div className="text-xl lg:text-2xl font-bold text-techpurple mb-1">500K+</div>
                  <div className="text-xs lg:text-sm text-white/60">Downloads</div>
                </div>
                <div className="bg-navy-800/50 p-3 lg:p-4 rounded-lg text-center hover:bg-navy-800/70 transition-colors border border-navy-600/30">
                  <div className="text-xl lg:text-2xl font-bold text-blue-400 mb-1">4.9★</div>
                  <div className="text-xs lg:text-sm text-white/60">Rating</div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold text-white mb-4">Technology Stack</h5>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {['React Native', 'TypeScript', 'AI Integration', 'Real-time Sync'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 lg:px-4 py-1.5 lg:py-2 bg-techpurple/10 text-techpurple/90 rounded-full text-xs lg:text-sm border border-techpurple/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </m.div>
  );
};

export default MobileShowcase;
