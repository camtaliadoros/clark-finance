import { ImageType } from './models';

/**
 * Get the base URL for API calls.
 * During build time, uses relative URLs for internal API routes.
 * During runtime, uses the NEXT_PUBLIC_HOST_URL environment variable.
 */
export const getApiBaseUrl = (): string => {
  // During build time (static generation), use relative URLs
  // This allows Next.js to call internal API routes directly
  if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_HOST_URL) {
    // Build time - use relative URL or construct from process
    return '';
  }
  
  // Runtime - use environment variable or fallback to relative
  return process.env.NEXT_PUBLIC_HOST_URL || '';
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
  const baseUrl = process.env.NEXT_PUBLIC_HOST_URL || '';
  const apiUrl = baseUrl ? `${baseUrl}/api/fetchPages` : '/api/fetchPages';
  
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
