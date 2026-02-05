import { ImageType } from './models';

/**
 * Get the base URL for API calls.
 * For client-side code, always returns empty string (relative URLs).
 * For server-side code, uses NEXT_PUBLIC_HOST_URL if available, otherwise relative URLs.
 */
export const getApiBaseUrl = (): string => {
  // Client-side: always use relative URLs (same origin, no CORS issues)
  if (typeof window !== 'undefined') {
    return '';
  }
  
  // Server-side: use environment variable or relative URL
  // During build time (static generation), use relative URLs
  // This allows Next.js to call internal API routes directly
  if (!process.env.NEXT_PUBLIC_HOST_URL) {
    return '';
  }
  
  return process.env.NEXT_PUBLIC_HOST_URL;
};

import { sanitizeWysiwygContent } from './sanitizeHtml';

/**
 * Converts and sanitizes WYSIWYG content from WordPress
 * This function sanitizes HTML to prevent XSS attacks while preserving safe formatting
 * @param rawContent - Raw HTML content from WordPress
 * @returns Sanitized HTML string safe for use with dangerouslySetInnerHTML
 */
export const convertWysywyg = (rawContent: string): string => {
  return sanitizeWysiwygContent(rawContent);
};

export const fetchFeaturedImage = async (imageId: number) => {
  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL || '';
  const apiUrl = baseUrl 
    ? `${baseUrl}/api/fetchImage?id=${imageId}` 
    : `/api/fetchImage?id=${imageId}`;
  
  const res = await fetch(apiUrl, {
    next: {
      revalidate: 86400,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const imageData: ImageType = await res.json();

  const encodedCredentials = btoa(`${process.env.WP_CREDENTIALS}`);

  const response = await fetch(imageData.source_url, {
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch image');

  const arrayBuffer = await response.arrayBuffer();
  const base64 = btoa(
    new Uint8Array(arrayBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  );

  // If svg the mime type should be 'svg+xml', if png, 'image/png'
  // (Obviously doesn't scale to other image types)
  let mimeType;

  if (imageData.source_url.endsWith('.svg')) {
    mimeType = 'svg+xml';
  } else if (imageData.source_url.endsWith('.png')) {
    mimeType = 'image/png';
  } else if (imageData.source_url.endsWith('.jpg')) {
    mimeType = 'image/jpeg';
  }

  const image = {
    altText: imageData.alt_text,
    source: `data:image/${mimeType};base64,${base64}`,
  };

  return image;
};

export const fetchMenuItems = async () => {
  // For client-side code, always use relative URLs (same origin)
  // For server-side code, use NEXT_PUBLIC_HOST_URL if available, otherwise relative
  let apiUrl: string;
  
  if (typeof window !== 'undefined') {
    // Client-side: always use relative URL (same origin)
    apiUrl = '/api/fetchPages';
  } else {
    // Server-side: use environment variable or relative URL
    const baseUrl = process.env.NEXT_PUBLIC_HOST_URL || '';
    apiUrl = baseUrl ? `${baseUrl}/api/fetchPages` : '/api/fetchPages';
  }
  
  const res = await fetch(apiUrl, {
    next: {
      revalidate: 86400,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const sanitiseURL = (url: string) => {
  return url.replace('https://clarkfinance.wordifysites.com', '');
};

export const replaceWpURL = (url: string) => {
  return url.replace(
    'https://clarkfinance.wordifysites.com',
    `${process.env.NEXT_PUBLIC_HOST_URL}`
  );
};
