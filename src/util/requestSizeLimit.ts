import { NextRequest, NextResponse } from 'next/server';

/**
 * Maximum allowed request body size in bytes
 * Default: 100KB (100 * 1024 bytes)
 * This prevents DoS attacks via large payloads
 */
export const MAX_REQUEST_BODY_SIZE = 100 * 1024; // 100KB

/**
 * Maximum allowed request body size for form submissions
 * Forms may need slightly more space for longer messages
 */
export const MAX_FORM_BODY_SIZE = 200 * 1024; // 200KB

/**
 * Checks if the request body size is within limits
 * @param req - The Next.js request object
 * @param maxSize - Maximum allowed size in bytes (default: MAX_REQUEST_BODY_SIZE)
 * @returns Object with isValid flag and error response if invalid
 */
export async function validateRequestSize(
  req: NextRequest,
  maxSize: number = MAX_REQUEST_BODY_SIZE
): Promise<{ isValid: boolean; errorResponse?: NextResponse }> {
  const contentLength = req.headers.get('content-length');

  // If content-length header is present, check it before reading the body
  if (contentLength) {
    const size = parseInt(contentLength, 10);
    if (isNaN(size) || size > maxSize) {
      return {
        isValid: false,
        errorResponse: NextResponse.json(
          {
            error: 'Request body too large',
            message: `Maximum request size is ${Math.round(maxSize / 1024)}KB`,
            maxSize: Math.round(maxSize / 1024),
          },
          {
            status: 413, // Payload Too Large
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ),
      };
    }
  }

  // For requests without content-length header, we'll need to check during body parsing
  // This is a best-effort check - actual validation happens during JSON parsing
  return { isValid: true };
}

/**
 * Safely parses JSON request body with size validation
 * @param req - The Next.js request object
 * @param maxSize - Maximum allowed size in bytes
 * @returns Parsed JSON object or error response
 */
export async function parseJsonWithSizeLimit(
  req: NextRequest,
  maxSize: number = MAX_REQUEST_BODY_SIZE
): Promise<{ success: true; data: any } | { success: false; error: NextResponse }> {
  // First check content-length header if available
  const sizeCheck = await validateRequestSize(req, maxSize);
  if (!sizeCheck.isValid && sizeCheck.errorResponse) {
    return { success: false, error: sizeCheck.errorResponse };
  }

  try {
    // Clone the request to read the body without consuming it
    const clonedRequest = req.clone();
    const text = await clonedRequest.text();

    // Check actual body size
    const bodySize = new Blob([text]).size;
    if (bodySize > maxSize) {
      return {
        success: false,
        error: NextResponse.json(
          {
            error: 'Request body too large',
            message: `Maximum request size is ${Math.round(maxSize / 1024)}KB`,
            maxSize: Math.round(maxSize / 1024),
          },
          {
            status: 413, // Payload Too Large
          }
        ),
      };
    }

    // Parse JSON
    const data = JSON.parse(text);
    return { success: true, data };
  } catch (error: any) {
    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: NextResponse.json(
          {
            error: 'Invalid JSON format',
            message: 'The request body must be valid JSON',
          },
          { status: 400 }
        ),
      };
    }

    // Handle other errors (e.g., body already consumed)
    return {
      success: false,
      error: NextResponse.json(
        {
          error: 'Failed to parse request body',
          message: 'An error occurred while processing the request',
        },
        { status: 400 }
      ),
    };
  }
}
