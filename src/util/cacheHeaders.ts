/**
 * Cache header utilities for API routes
 * Provides consistent caching strategies across the application
 */

export interface CacheOptions {
  maxAge?: number; // Maximum age in seconds (default: 3600 = 1 hour)
  staleWhileRevalidate?: number; // Stale-while-revalidate in seconds (default: 86400 = 24 hours)
  isPublic?: boolean; // Whether response can be cached by public caches (default: true)
}

/**
 * Get Cache-Control header value
 * @param options - Cache configuration options
 * @returns Cache-Control header string
 */
export function getCacheControlHeader(options: CacheOptions = {}): string {
  const {
    maxAge = 3600, // 1 hour default
    staleWhileRevalidate = 86400, // 24 hours default
    isPublic = true,
  } = options;

  const visibility = isPublic ? 'public' : 'private';
  return `${visibility}, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`;
}

/**
 * Cache strategies for different content types
 */
export const cacheStrategies = {
  // Static page content - cache for 1 hour, serve stale for 24 hours
  staticPage: () => getCacheControlHeader({ maxAge: 3600, staleWhileRevalidate: 86400 }),

  // Dynamic content (articles, case studies) - cache for 30 minutes, serve stale for 1 hour
  dynamicContent: () => getCacheControlHeader({ maxAge: 1800, staleWhileRevalidate: 3600 }),

  // List content with pagination - cache for 5 minutes, serve stale for 30 minutes
  paginatedList: () => getCacheControlHeader({ maxAge: 300, staleWhileRevalidate: 1800 }),

  // Metadata - cache for 1 hour, serve stale for 24 hours
  metadata: () => getCacheControlHeader({ maxAge: 3600, staleWhileRevalidate: 86400 }),

  // Service cards/menu items - cache for 1 hour, serve stale for 24 hours
  navigation: () => getCacheControlHeader({ maxAge: 3600, staleWhileRevalidate: 86400 }),
};
