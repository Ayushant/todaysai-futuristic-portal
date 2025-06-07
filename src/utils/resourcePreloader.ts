/**
 * Resource Preloader Utility
 * 
 * This utility helps preload critical resources like images, fonts, and scripts
 * to improve perceived performance and reduce layout shifts.
 */

// Types of resources that can be preloaded
type ResourceType = 'image' | 'font' | 'style' | 'script';

interface Resource {
  url: string;
  type: ResourceType;
  crossOrigin?: boolean;
  importance?: 'high' | 'low' | 'auto';
}

/**
 * Preloads a single resource
 * @param resource - The resource to preload
 */
export const preloadResource = (resource: Resource): void => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = resource.url;
  link.as = resource.type;
  
  if (resource.crossOrigin) {
    link.crossOrigin = 'anonymous';
  }
  
  if (resource.importance) {
    link.setAttribute('importance', resource.importance);
  }
  
  document.head.appendChild(link);
};

/**
 * Preloads multiple resources
 * @param resources - Array of resources to preload
 */
export const preloadResources = (resources: Resource[]): void => {
  resources.forEach(preloadResource);
};

/**
 * Preloads critical above-the-fold images
 * @param imagePaths - Array of image paths to preload
 */
export const preloadCriticalImages = (imagePaths: string[]): void => {
  const resources: Resource[] = imagePaths.map(path => ({
    url: path,
    type: 'image',
    importance: 'high'
  }));
  
  preloadResources(resources);
};

/**
 * Preloads web fonts to prevent layout shifts
 * @param fontUrls - Array of font URLs to preload
 */
export const preloadFonts = (fontUrls: string[]): void => {
  const resources: Resource[] = fontUrls.map(url => ({
    url,
    type: 'font',
    crossOrigin: true,
    importance: 'high'
  }));
  
  preloadResources(resources);
};

/**
 * Prefetches resources that will be needed soon but not immediately
 * @param urls - Array of URLs to prefetch
 */
export const prefetchResources = (urls: string[]): void => {
  if (typeof document === 'undefined') return;
  
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Preconnects to origins that will be used soon
 * @param origins - Array of origins to preconnect to
 * @param crossOrigin - Whether to include credentials
 */
export const preconnectToOrigins = (origins: string[], crossOrigin = true): void => {
  if (typeof document === 'undefined') return;
  
  origins.forEach(origin => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    
    if (crossOrigin) {
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
  });
};

// Critical resources for the landing page
export const criticalResources = {
  images: [
    '/src/assets/atkind-logo-new.png',
    '/src/assets/atkind-logo.svg'
  ],
  fonts: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap'
  ],
  origins: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ]
};