import React, { useEffect } from 'react';

interface PreloadConfig {
  images?: string[];
  fonts?: string[];
  scripts?: string[];
}

const defaultConfig: PreloadConfig = {
  images: [
    '/assets/images/logo.png',
    '/assets/images/hero-bg.jpg',
  ],
  fonts: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
    'https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap',
  ],
};

/**
 * Component that preloads critical resources for better performance
 * This improves performance by declaring resource loading priorities to the browser
 */
const ResourcePreloader: React.FC<{ config?: PreloadConfig }> = ({ config = defaultConfig }) => {
  useEffect(() => {
    // Preload images
    config.images?.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Preload fonts
    config.fonts?.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    });

    // Preload scripts
    config.scripts?.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    });
  }, [config]);

  // This component doesn't render anything visible
  return null;
};

export default ResourcePreloader;
