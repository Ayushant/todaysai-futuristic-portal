
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-navy-100/70 backdrop-blur-lg border-b border-white/5 py-3" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">        <a href="/" className="flex items-center">          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">            atkind
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#products" className="text-white/80 hover:text-white transition-colors">Products</a>
          <a href="#services" className="text-white/80 hover:text-white transition-colors">Services</a>
          <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
          <a href="#lab" className="text-white/80 hover:text-white transition-colors">Lab</a>          <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-navy/95 backdrop-blur-xl z-40 pt-20 px-6 transition-all duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-6 items-center">
          <a href="#products" className="text-xl text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Products</a>
          <a href="#services" className="text-xl text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="#about" className="text-xl text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#lab" className="text-xl text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Lab</a>          <a href="#contact" className="text-xl text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
