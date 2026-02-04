import { NextRequest, NextResponse } from 'next/server';

/**
 * Validates that the request Origin header matches the expected domain
 * This helps prevent CSRF attacks by ensuring requests come from the same origin
 * 
 * @param req - The Next.js request object
 * @param allowedOrigins - Array of allowed origin patterns (e.g., ['https://example.com', 'https://*.netlify.app'])
 * @returns Object with isValid flag and error response if invalid
 */
export function validateOrigin(
  req: NextRequest,
  allowedOrigins?: string[]
): { isValid: boolean; errorResponse?: NextResponse } {
  // Allow requests without Origin header (same-origin requests, some browsers)
  // This is safe because same-origin requests don't include Origin header
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');

  // If no Origin or Referer header, allow the request (same-origin)
  if (!origin && !referer) {
    return { isValid: true };
  }

  // If allowedOrigins is not provided, validate against NEXT_PUBLIC_HOST_URL
  if (!allowedOrigins || allowedOrigins.length === 0) {
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;
    if (!hostUrl) {
      // In development or build time, allow requests
      return { isValid: true };
    }

    try {
      const hostUrlObj = new URL(hostUrl);
      const allowedHost = hostUrlObj.origin;

      // Check Origin header
      if (origin) {
        if (origin === allowedHost) {
          return { isValid: true };
        }
        // Also allow localhost in development
        if (process.env.NODE_ENV === 'development' && origin.includes('localhost')) {
          return { isValid: true };
        }
      }

      // Check Referer header as fallback
      if (referer) {
        try {
          const refererUrl = new URL(referer);
          if (refererUrl.origin === allowedHost) {
            return { isValid: true };
          }
          // Also allow localhost in development
          if (process.env.NODE_ENV === 'development' && refererUrl.origin.includes('localhost')) {
            return { isValid: true };
          }
        } catch {
          // Invalid referer URL, continue to error
        }
      }

      // Origin/Referer doesn't match allowed host
      return {
        isValid: false,
        errorResponse: NextResponse.json(
          {
            error: 'Invalid request origin',
            message: 'Request must come from an authorized origin',
          },
          {
            status: 403, // Forbidden
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ),
      };
    } catch {
      // Invalid NEXT_PUBLIC_HOST_URL, allow request (fallback)
      return { isValid: true };
    }
  }

  // Validate against provided allowedOrigins
  const originToCheck = origin || (referer ? new URL(referer).origin : null);
  if (!originToCheck) {
    return { isValid: true };
  }

  // Check if origin matches any allowed pattern
  const isAllowed = allowedOrigins.some((allowed) => {
    // Exact match
    if (originToCheck === allowed) {
      return true;
    }
    // Wildcard pattern (e.g., 'https://*.netlify.app')
    if (allowed.includes('*')) {
      const pattern = allowed.replace(/\*/g, '.*');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(originToCheck);
    }
    return false;
  });

  if (!isAllowed) {
    return {
      isValid: false,
      errorResponse: NextResponse.json(
        {
          error: 'Invalid request origin',
          message: 'Request must come from an authorized origin',
        },
        {
          status: 403, // Forbidden
        }
      ),
    };
  }

  return { isValid: true };
}
