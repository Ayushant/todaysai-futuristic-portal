import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/use-theme";
import ResourcePreloader from "@/components/ResourcePreloader";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import LoadingSpinner from '@/components/LoadingSpinner';

const queryClient = new QueryClient();

// Lazy load routes
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Contact = lazy(() => import('@/pages/Contact'));

const App = () => {
  // Global application resources that should be preloaded
  const globalResources = [
    // Main font
    { href: '/fonts/inter-var.woff2', as: 'font' as const, type: 'font/woff2', crossOrigin: 'anonymous' as const },
  ];

  // Third-party domains to establish early connections with
  const thirdPartyDomains = [
    'https://fonts.googleapis.com',
    'https://images.unsplash.com'
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          {/* Preload critical global resources */}
          <ResourcePreloader 
            resources={globalResources}
            preconnect={thirdPartyDomains}
            dns={['https://api.example.com']}
          />
          
          {/* Monitor and report performance metrics */}
          <PerformanceMonitor 
            logToConsole={process.env.NODE_ENV !== 'production'}
            reportToServer={process.env.NODE_ENV === 'production'}
          />
          
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
