import React, { useState, useEffect } from 'react';

type ImageFormat = 'webp' | 'jpg' | 'png' | 'avif';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
  fallback?: string;
  formats?: ImageFormat[];
  placeholder?: 'blur' | 'empty';
  quality?: number;
}

/**
 * OptimizedImage component that implements best practices for image loading
 * - Responsive sizes
 * - Next-gen formats (WebP/AVIF) with fallbacks
 * - Lazy loading
 * - Blur-up placeholder
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  loading = 'lazy',
  fetchPriority = 'auto',
  className = '',
  fallback,
  formats = ['webp'],
  placeholder = 'empty',
  quality = 80,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Check if the source is an external URL
  const isExternalUrl = src.startsWith('http');
  
  // Handle image load complete
  const handleLoad = () => {
    setLoaded(true);
  };
  
  // Handle image load error
  const handleError = () => {
    setError(true);
  };
  
  // Generate source sets for different viewport sizes
  const generateSrcSet = (format: string) => {
    if (isExternalUrl) {
      // For external URLs, we can't generate responsive sizes
      return src;
    }
    
    // Define widths for responsive images
    const widths = [640, 768, 1024, 1280, 1536];
    
    // For local images, we would normally use an image processing library
    // This is a mock implementation since we don't have direct access to such a library
    return widths.map(w => `${src}?width=${w}&format=${format}&quality=${quality} ${w}w`).join(', ');
  };

  // Determine the final image source
  const imageSrc = error && fallback ? fallback : src;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : 'auto',
      }}
    >
      {/* Show blur placeholder during loading if specified */}
      {placeholder === 'blur' && !loaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ 
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
        />
      )}
      
      <picture>
        {/* Generate sources for various formats with srcSet for responsive sizes */}
        {formats.includes('avif') && !isExternalUrl && (
          <source
            type="image/avif"
            srcSet={generateSrcSet('avif')}
            sizes={sizes}
          />
        )}
        {formats.includes('webp') && !isExternalUrl && (
          <source
            type="image/webp"
            srcSet={generateSrcSet('webp')}
            sizes={sizes}
          />
        )}
        
        {/* Fallback image */}
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${!loaded ? 'opacity-0' : 'opacity-100'}`}
          sizes={sizes}
          {...props}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;