/**
 * ImageKit Utility for Astro
 * Handles real-time image optimization transformations.
 */

const ENDPOINT = import.meta.env.PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/placeholder/';

interface TransformationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  blur?: number;
  focus?: 'auto' | 'center' | 'top' | 'left' | 'bottom' | 'right';
}

export function getOptimizedUrl(src: string, options: TransformationOptions = {}): string {
  // If src is already a full URL and doesn't belong to ImageKit, return it as is
  if (src.startsWith('http') && !src.includes('ik.imagekit.io')) {
    return src;
  }

  // Handle case where src might be a full ImageKit URL already
  const path = src.includes('ik.imagekit.io') 
    ? src.split('/').pop() || '' 
    : src.startsWith('/') ? src.substring(1) : src;

  const transformations: string[] = [];

  if (options.width) transformations.push(`w-${options.width}`);
  if (options.height) transformations.push(`h-${options.height}`);
  if (options.quality) transformations.push(`q-${options.quality}`);
  
  // Format optimization
  const format = options.format || 'auto';
  transformations.push(`f-${format}`);

  if (options.blur) transformations.push(`bl-${options.blur}`);
  if (options.focus) transformations.push(`fo-${options.focus}`);
  
  const trString = transformations.length > 0 ? `tr:${transformations.join(',')}/` : '';
  const baseUrl = ENDPOINT.endsWith('/') ? ENDPOINT : `${ENDPOINT}/`;
  
  return `${baseUrl}${trString}${path}`;
}
