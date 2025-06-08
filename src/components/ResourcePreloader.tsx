import React, { useEffect } from 'react';

type PreloadResource = {
  href: string;
  as: 'image' | 'style' | 'script' | 'font' | 'fetch';
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  media?: string;
};

interface ResourcePreloaderProps {
  resources: PreloadResource[];
  prefetch?: PreloadResource[];
  preconnect?: string[];
  dns?: string[];
}

/**
 * Component that preloads critical resources for better performance
 * This improves performance by declaring resource loading priorities to the browser
 */
const ResourcePreloader: React.FC<ResourcePreloaderProps> = ({
  resources = [],
  prefetch = [],
  preconnect = [],
  dns = []
}) => {
  useEffect(() => {
    // Dynamically inject preload/prefetch links
    const fragment = document.createDocumentFragment();
    const head = document.head;

    // Create preload links (highest priority - critical resources)
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) link.type = resource.type;
      if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
      if (resource.media) link.media = resource.media;
      
      fragment.appendChild(link);
    });

    // Create prefetch links (lower priority - resources needed for next navigation)
    prefetch.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) link.type = resource.type;
      if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
      
      fragment.appendChild(link);
    });

    // Create preconnect links (establish early connections)
    preconnect.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      
      fragment.appendChild(link);
    });

    // Create DNS prefetch links (resolve DNS early)
    dns.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = url;
      
      fragment.appendChild(link);
    });

    // Append all links to the document head
    head.appendChild(fragment);

    // Cleanup function to remove links when component unmounts
    return () => {
      const links = head.querySelectorAll('link[rel="preload"], link[rel="prefetch"], link[rel="preconnect"], link[rel="dns-prefetch"]');
      links.forEach(link => {
        head.removeChild(link);
      });
    };
  }, [resources, prefetch, preconnect, dns]);

  // This component doesn't render anything visible
  return null;
};

export default ResourcePreloader;
