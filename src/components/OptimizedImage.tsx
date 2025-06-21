import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  width,
  height,
  objectFit = 'cover',
  priority = false,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Skip intersection observer if priority is true (load immediately)
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '200px 0px', // Start loading 200px before the image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  // Generate a tiny placeholder version (could be improved with actual tiny thumbnails)
  const placeholderSrc = src.includes('?') 
    ? `${src}&w=20` 
    : `${src}?w=20`;

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
      }}
    >
      {/* Low-quality placeholder */}
      <img
        src={placeholderSrc}
        alt=""
        className={`absolute w-full h-full transition-opacity duration-500 ease-in ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        } ${placeholderClassName} filter blur-xl scale-105`}
        style={{ objectFit }}
        aria-hidden="true"
      />
      
      {/* Main image (loads when in view) */}
      {(isInView || priority) && (
        <img
          src={src}
          alt={alt}
          className={`absolute w-full h-full transition-opacity duration-700 ease-in ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectFit }}
          onLoad={handleImageLoad}
        />
      )}
    </div>
  );
};

export default OptimizedImage; 