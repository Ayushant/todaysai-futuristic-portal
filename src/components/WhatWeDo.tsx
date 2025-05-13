
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, Code, Smartphone } from 'lucide-react';

// Define product and service types
type Product = {
  id: string;
  name: string;
  description: string;
  icon: string;
  useCase: string;
};

type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
  industries: string[];
};

const products: Product[] = [
  {
    id: 'codex',
    name: 'Codex AI',
    description: 'Advanced code assistant that writes, refactors, and explains code in 20+ programming languages.',
    icon: '🧩',
    useCase: 'Boosting developer productivity by 40% with contextual code suggestions and automated debugging.',
  },
  {
    id: 'docai',
    name: 'DocMind',
    description: 'Intelligent document analysis that extracts, summarizes, and categorizes information.',
    icon: '📑',
    useCase: 'Processing legal documents 8x faster with 99.2% accuracy for compliance verification.',
  },
  {
    id: 'visionapi',
    name: 'VisionCore API',
    description: 'Computer vision API for object detection, facial recognition, and scene analysis.',
    icon: '👁️',
    useCase: 'Enabling touchless retail experiences with 98.7% accurate customer identification.',
  },
  {
    id: 'audioai',
    name: 'WaveSync',
    description: 'Real-time audio processing, transcription, and multi-language translation.',
    icon: '🔊',
    useCase: 'Powering multilingual virtual events with instant translations across 42 languages.',
  },
];

const services: Service[] = [
  {
    id: 'webdev',
    name: 'Web Development',
    description: 'Full-stack web solutions with modern frameworks, responsive designs, and cloud integration for businesses of all sizes.',
    icon: '💻',
    industries: ['E-commerce', 'FinTech', 'Healthcare', 'Education'],
  },
  {
    id: 'appdev',
    name: 'App Development',
    description: 'Native and cross-platform mobile applications with seamless UX/UI, backend integration, and advanced features.',
    icon: '📱',
    industries: ['Retail', 'Logistics', 'Social Media', 'Fitness'],
  },
  {
    id: 'aidev',
    name: 'AI Development',
    description: 'Full-cycle AI solution development from concept to deployment, including model training and integration.',
    icon: '⚙️',
    industries: ['Healthcare', 'Finance', 'Manufacturing'],
  },
  {
    id: 'dataconsult',
    name: 'Data Strategy',
    description: 'Data architecture design, optimization of data pipelines, and implementing data governance frameworks.',
    icon: '📊',
    industries: ['Retail', 'Telecom', 'Insurance'],
  },
  {
    id: 'aiops',
    name: 'AI Operations',
    description: 'Continuous monitoring, optimization, and scaling of AI models in production environments.',
    icon: '🔄',
    industries: ['Logistics', 'Energy', 'E-commerce'],
  },
  {
    id: 'teamaas',
    name: 'AI Team as a Service',
    description: 'On-demand access to specialized AI talent, from research scientists to ML engineers.',
    icon: '👥',
    industries: ['Startups', 'Education', 'Media'],
  },
];

const WhatWeDo = () => {
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [activeService, setActiveService] = useState('webdev');
  
  return (
    <section className="py-20 relative overflow-hidden" id="products">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-navy-100 opacity-50 z-0"></div>
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      <div className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-techpurple/10 blur-3xl"></div>
      <div className="absolute bottom-40 -right-40 w-96 h-96 rounded-full bg-elecblue/10 blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold heading-gradient mb-5">What We Do</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            The perfect synergy of groundbreaking products and expert services,
            designed to transform how businesses leverage artificial intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Products Column - Left Brain */}
          <div className="relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                <span className="text-techpurple">Products</span> | The Logic Core
              </h3>
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-techpurple"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className={cn(
                    "glass-card p-5 cursor-pointer group transition-all duration-300",
                    activeProduct === product.id ? "border-techpurple/50" : ""
                  )}
                  onClick={() => setActiveProduct(activeProduct === product.id ? null : product.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl">{product.icon}</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-techpurple/20 transition-colors">
                      <ArrowRight size={16} className="text-white/70 group-hover:text-white" />
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold mb-2 text-white">{product.name}</h4>
                  
                  {activeProduct === product.id ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white/70 mb-3">{product.description}</p>
                      <div className="mt-4 bg-white/5 p-3 rounded-lg">
                        <p className="text-sm text-white/90">
                          <span className="text-techpurple font-semibold">Use Case: </span>
                          {product.useCase}
                        </p>
                      </div>
                      <a href="#contact" className="inline-flex items-center text-techpurple hover:text-techpurple-light mt-4 text-sm">
                        Learn more <ArrowRight size={14} className="ml-1" />
                      </a>
                    </motion.div>
                  ) : (
                    <p className="text-white/70 line-clamp-2">{product.description}</p>
                  )}
                </div>
              ))}
            </div>
            
            {/* Decorative "Left Brain" element */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full border border-dashed border-techpurple/20 opacity-30"></div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full border border-dashed border-techpurple/30 opacity-50"></div>
          </div>
          
          {/* Services Column - Right Brain */}
          <div className="relative" id="services">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                <span className="text-elecblue">Services</span> | The Creative Core
              </h3>
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-elecblue"></div>
            </div>
            
            {/* Service tabs */}
            <div className="flex mb-6 overflow-x-auto hide-scrollbar">
              {services.map((service) => (
                <button
                  key={service.id}
                  className={cn(
                    "px-4 py-2 whitespace-nowrap transition-colors",
                    activeService === service.id
                      ? "text-white border-b-2 border-elecblue"
                      : "text-white/60 hover:text-white/80"
                  )}
                  onClick={() => setActiveService(service.id)}
                >
                  {service.name}
                </button>
              ))}
            </div>
            
            {/* Active service details */}
            {services.map((service) => (
              activeService === service.id && (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{service.icon}</span>
                    <h4 className="text-2xl font-bold text-white">{service.name}</h4>
                  </div>
                  
                  <p className="text-white/80 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h5 className="text-sm uppercase text-white/50 mb-3">Industries</h5>
                    <div className="flex flex-wrap gap-2">
                      {service.industries.map((industry) => (
                        <span 
                          key={industry} 
                          className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-sm text-white/80"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {service.id === 'webdev' || service.id === 'appdev' ? (
                    <div className="mb-6 bg-white/5 p-4 rounded-lg border border-elecblue/20">
                      <h5 className="text-sm uppercase text-elecblue mb-3">Expert Team</h5>
                      <p className="text-white/80 text-sm">
                        Our dedicated team of {service.id === 'webdev' ? 'web' : 'app'} development experts brings years of 
                        industry experience with cutting-edge technologies and frameworks to deliver robust, 
                        scalable, and user-friendly solutions tailored to your business needs.
                      </p>
                    </div>
                  ) : null}
                  
                  <a href="#contact" className="btn-secondary inline-flex items-center text-sm">
                    Request Consultation <ArrowRight size={16} className="ml-2" />
                  </a>
                </motion.div>
              )
            ))}
            
            {/* Decorative "Right Brain" element */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full border border-dashed border-elecblue/20 opacity-30"></div>
            <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full border border-dashed border-elecblue/30 opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
