import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./hooks/use-theme";
import ResourcePreloader from "@/components/ResourcePreloader";
import PerformanceMonitor from "@/components/PerformanceMonitor";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

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
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
