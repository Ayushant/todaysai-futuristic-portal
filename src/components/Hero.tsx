
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Animation for particles
  useEffect(() => {
    if (!heroRef.current) return;
    
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size
      const size = Math.random() * 50 + 10;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const posX = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.bottom = '0';
      
      // Random animation duration and delay
      const duration = Math.random() * 3 + 3;
      const delay = Math.random() * 5;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      // Random opacity
      const opacity = Math.random() * 0.5 + 0.2;
      particle.style.opacity = opacity.toString();
      
      heroRef.current?.appendChild(particle);
      
      // Remove after animation completes
      setTimeout(() => {
        if (particle.parentNode === heroRef.current) {
          heroRef.current?.removeChild(particle);
        }
      }, (duration + delay) * 1000);
    };
    
    // Create initial particles
    for (let i = 0; i < 15; i++) {
      createParticle();
    }
    
    // Create particles at intervals
    const interval = setInterval(createParticle, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-navy"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-navy-200 to-navy opacity-70"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 -left-60 w-96 h-96 rounded-full bg-techpurple/10 blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 rounded-full bg-elecblue/15 blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 heading-gradient leading-tight animate-float">
            Building Tomorrow's AI, <span className="text-techpurple">Today.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto">
            Pioneer the future with TodaysAI – where cutting-edge artificial intelligence meets 
            real-world applications. From Pune to the world, we're redefining what's possible.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#products" className="btn-primary">
              Explore Products
            </a>
            <a href="#services" className="btn-secondary">
              Discover Services
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white/50 text-sm mb-2">Scroll to explore</span>
        <div className="w-1 h-10 bg-white/10 rounded-full relative overflow-hidden">
          <div className="w-full bg-white/80 h-1/3 rounded-full absolute top-0 animate-[scroll_2s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0%, 100% {
            top: 0;
          }
          50% {
            top: 66%;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
