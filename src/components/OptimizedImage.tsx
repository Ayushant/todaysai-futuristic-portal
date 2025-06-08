import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fallbackSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  priority = false,
  className,
  fallbackSrc,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Generate WebP srcset
  const webpSrcSet = `${src.replace(/\.[^/.]+$/, '.webp')} ${width}w`;
  const originalSrcSet = `${src} ${width}w`;

  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [src, priority]);

  return (
    <picture>
      {/* WebP format with fallback */}
      <source
        type="image/webp"
        srcSet={webpSrcSet}
        sizes={sizes}
      />
      <img
        src={error && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={cn(
          'transition-opacity duration-300',
          !isLoaded && !priority && 'opacity-0',
          isLoaded && 'opacity-100',
          className
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;
