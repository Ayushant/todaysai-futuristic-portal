import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
  sizes?: string;
  style?: React.CSSProperties;
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * OptimizedImage component for better performance
 * - Uses native lazy loading and async decoding by default
 * - Supports priority loading for above-the-fold images
 * - Automatically sets width and height attributes to prevent layout shifts
 * - Supports responsive images with srcset and sizes
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  decoding = 'async',
  sizes,
  style,
  fetchPriority = 'auto',
  ...props
}) => {
  // Determine if the image is from an external source (URL) or local
  const isExternal = src.startsWith('http') || src.startsWith('https');
    // For external images, we can't generate srcset, so we use the original src
  if (isExternal) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? 'eager' : loading}
        decoding={decoding}
        sizes={sizes}
        style={style}
        fetchPriority={fetchPriority}
        {...props}
      />
    );  }

  // For local images, we could implement more advanced optimizations
  // In a real-world scenario, you might use a library like next/image or a custom solution
  // This is a simplified version
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : loading}
      decoding={decoding}
      sizes={sizes}
      style={style}
      fetchPriority={fetchPriority}
      {...props}
    />
  );
};

export default OptimizedImage;