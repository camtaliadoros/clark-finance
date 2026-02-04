/**
 * Rate limiting utility
 * Simple in-memory rate limiter (can be upgraded to Redis/Upstash later)
 */

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

// In-memory store (for single-instance deployments)
// For production with multiple instances, use Redis/Upstash
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of requestCounts.entries()) {
    if (value.resetTime < now) {
      requestCounts.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Rate limit check
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param options - Rate limit configuration
 * @returns Rate limit result
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  const { windowMs, maxRequests } = options;
  const now = Date.now();
  const key = identifier;

  const existing = requestCounts.get(key);

  if (!existing || existing.resetTime < now) {
    // New window or expired window
    requestCounts.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs,
    };
  }

  if (existing.count >= maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      resetTime: existing.resetTime,
    };
  }

  // Increment count
  existing.count++;
  requestCounts.set(key, existing);

  return {
    success: true,
    remaining: maxRequests - existing.count,
    resetTime: existing.resetTime,
  };
}

/**
 * Get client IP address from request
 * @param req - Next.js request object
 * @returns IP address string
 */
export function getClientIp(req: Request): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback (won't work in serverless, but good for development)
  return 'unknown';
}

/**
 * Rate limit presets for common use cases
 */
export const rateLimitPresets = {
  // Strict: 5 requests per 15 minutes (for form submissions)
  strict: { windowMs: 15 * 60 * 1000, maxRequests: 5 },
  
  // Moderate: 20 requests per minute (for API endpoints)
  moderate: { windowMs: 60 * 1000, maxRequests: 20 },
  
  // Lenient: 100 requests per minute (for public content)
  lenient: { windowMs: 60 * 1000, maxRequests: 100 },
};
