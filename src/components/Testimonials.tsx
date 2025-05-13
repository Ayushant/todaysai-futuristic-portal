
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  logo: string;
};

// This would ideally come from an API or CMS
const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "TodaysAi's computer vision API allowed us to launch our contactless retail solution 3 months ahead of schedule, revolutionizing our customer experience.",
    author: "Akira Tanaka",
    position: "CTO",
    company: "FutureMart",
    logo: "https://via.placeholder.com/150?text=FutureMart",
  },
  {
    id: '2',
    quote: "The AI Team as a Service model provided flexible access to specialized talent that would have taken years to build in-house. Truly a game-changer for our roadmap.",
    author: "Elena Rodriguez",
    position: "Head of Innovation",
    company: "HealthTech Global",
    logo: "https://via.placeholder.com/150?text=HealthTech",
  },
  {
    id: '3',
    quote: "DocMind transformed our legal document processing workflow, reducing review time by 60% while improving accuracy. The ROI has been exceptional.",
    author: "Martin Schaefer",
    position: "Legal Operations Director",
    company: "Juridica Partners",
    logo: "https://via.placeholder.com/150?text=Juridica",
  },
];

// Partner logos (would come from CMS in production)
const partners = [
  { id: 'p1', name: 'Microsoft', logo: 'https://via.placeholder.com/120x60?text=Microsoft' },
  { id: 'p2', name: 'IBM', logo: 'https://via.placeholder.com/120x60?text=IBM' },
  { id: 'p3', name: 'TCS', logo: 'https://via.placeholder.com/120x60?text=TCS' },
  { id: 'p4', name: 'Samsung', logo: 'https://via.placeholder.com/120x60?text=Samsung' },
  { id: 'p5', name: 'Nvidia', logo: 'https://via.placeholder.com/120x60?text=Nvidia' },
  { id: 'p6', name: 'Azure', logo: 'https://via.placeholder.com/120x60?text=Azure' },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 relative overflow-hidden bg-navy-100/50">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-techpurple/10 blur-3xl"></div>
      <div className="absolute -bottom-40 left-0 w-96 h-96 rounded-full bg-elecblue/10 blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold heading-gradient mb-5">Trusted By Innovators</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            From startups to global enterprises, hear directly from organizations using TodaysAi
            to transform their businesses.
          </p>
        </div>
        
        {/* Testimonials carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="glass-card p-8 md:p-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: index === currentIndex ? 1 : 0,
                  x: index === currentIndex ? 0 : 100,
                  display: index === currentIndex ? 'block' : 'none'
                }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <div className="w-full md:w-auto">
                  <div className="w-24 h-24 bg-white/5 rounded-lg flex items-center justify-center p-2">
                    <img src={testimonial.logo} alt={testimonial.company} className="max-w-full max-h-full" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-white/90 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-white/70">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-6 gap-3">
            <button 
              onClick={prevTestimonial} 
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={18} className="text-white/80" />
            </button>
            <button 
              onClick={nextTestimonial} 
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight size={18} className="text-white/80" />
            </button>
          </div>
        </div>
        
        {/* Partners */}
        <div className="mt-20">
          <h3 className="text-xl font-semibold text-center mb-10 text-white/80">Our Technology Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map(partner => (
              <div 
                key={partner.id}
                className="w-full max-w-[150px] h-20 bg-white/5 rounded-lg flex items-center justify-center p-4 hover:bg-white/10 transition-colors"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
