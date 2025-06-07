import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import atkindLogo from '../assets/atkind-logo-new.png';
import atkindLogoBg from '../assets/atkind-logo.svg';

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
      <div className="absolute inset-0 bg-gradient-radial from-navy-200 to-navy opacity-70"></div>      {/* Logo Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <img 
          src={atkindLogoBg} 
          alt="atkind logo background" 
          className="absolute opacity-8 w-[1400px] blur-[3px] logo-bg-animate"
          aria-hidden="true"
        />
        <img 
          src={atkindLogoBg} 
          alt="atkind logo background" 
          className="absolute opacity-4 w-[1000px] rotate-45 blur-[5px] logo-bg-animate-reverse"
          aria-hidden="true"
        />
        <img 
          src={atkindLogoBg} 
          alt="atkind logo background" 
          className="absolute opacity-3 w-[600px] rotate-180 blur-[2px] logo-bg-animate-slow"
          aria-hidden="true"
        />
      </div>{/* Random white patches in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
        <div className="absolute w-[20px] h-[20px] bg-white/10 rounded-full blur-md random-patch-1"></div>
        <div className="absolute w-[40px] h-[40px] bg-white/15 rounded-full blur-lg random-patch-2"></div>
        <div className="absolute w-[15px] h-[15px] bg-white/20 rounded-full blur-md random-patch-3"></div>
        <div className="absolute w-[35px] h-[35px] bg-white/10 rounded-full blur-xl random-patch-4"></div>
        <div className="absolute w-[25px] h-[25px] bg-white/15 rounded-full blur-lg random-patch-5"></div>
      </div>

      {/* Organization Logo Foreground */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[400px] h-[400px] z-10 logo-container">
          <img 
            src={atkindLogo} 
            alt="atkind logo" 
            className="w-full h-full object-contain logo-animate"
            style={{ 
              filter: 'drop-shadow(0 0 30px rgba(123, 97, 255, 0.6))'
            }}
          />
        </div>
      </div>      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-20 z-5"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 -left-60 w-96 h-96 rounded-full bg-techpurple/10 blur-3xl z-5"></div>
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 rounded-full bg-elecblue/15 blur-3xl z-5"></div>
        <div className="container px-4 mx-auto relative z-30">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 heading-gradient leading-tight animate-float">
            Building Tomorrow's Solution, <span className="text-techpurple">Today.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto">
            Pioneer the future with atkind – where cutting-edge artificial intelligence meets 
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
      
      <style>{`
        @keyframes scroll {
          0%, 100% {
            top: 0;
          }
          50% {
            top: 66%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(0) rotate(0deg);
          }
          75% {
            transform: translateY(10px) rotate(-1deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            filter: drop-shadow(0 0 30px rgba(123, 97, 255, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 50px rgba(255, 149, 0, 0.7));
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes float-bg {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(20px, -20px) rotate(2deg) scale(1.02);
          }
          50% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          75% {
            transform: translate(-20px, 20px) rotate(-2deg) scale(0.98);
          }
        }
          @keyframes float-bg-reverse {
          0%, 100% {
            transform: translate(0, 0) rotate(45deg) scale(1);
          }
          25% {
            transform: translate(-20px, 20px) rotate(43deg) scale(0.99);
          }
          50% {
            transform: translate(0, 0) rotate(45deg) scale(1);
          }
          75% {
            transform: translate(20px, -20px) rotate(47deg) scale(1.01);
          }
        }
        
        @keyframes float-bg-slow {
          0%, 100% {
            transform: translate(0, 0) rotate(180deg) scale(1);
          }
          30% {
            transform: translate(15px, -10px) rotate(178deg) scale(1.02);
          }
          60% {
            transform: translate(-15px, -10px) rotate(182deg) scale(0.98);
          }
        }
        
        .logo-container {
          animation: float 8s ease-in-out infinite;
          perspective: 1000px;
        }
        
        .logo-bg-animate {
          animation: float-bg 20s ease-in-out infinite;
          transform-style: preserve-3d;
        }
          .logo-bg-animate-reverse {
          animation: float-bg-reverse 18s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        
        .logo-bg-animate-slow {
          animation: float-bg-slow 25s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        
        .logo-animate {
          animation: pulse 10s infinite alternate;
          transform-style: preserve-3d;
          position: relative;
        }
          .logo-animate::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.2),
            transparent
          );
          background-size: 200% 100%;
          pointer-events: none;
          animation: shimmer 6s linear infinite;
        }
        
        /* Random white patch animations */
        .random-patch-1 {
          top: 40%;
          right: 55%;
          animation: float-patch 8s ease-in-out infinite;
        }
        .random-patch-2 {
          bottom: 45%;
          left: 60%;
          animation: float-patch 12s ease-in-out infinite;
        }
        .random-patch-3 {
          top: 30%;
          left: 48%;
          animation: float-patch 9s ease-in-out infinite 2s;
        }
        .random-patch-4 {
          bottom: 38%;
          right: 42%;
          animation: float-patch 14s ease-in-out infinite 1s;
        }
        .random-patch-5 {
          top: 65%;
          left: 45%;
          animation: float-patch 10s ease-in-out infinite 3s;
        }
        
        @keyframes float-patch {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(15px, -15px) scale(1.3);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
