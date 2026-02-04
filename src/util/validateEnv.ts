/**
 * Environment variable validation
 * This ensures all required environment variables are set at startup
 */

const requiredServerEnvVars = [
  'WP_CREDENTIALS',
  'WP_ROUTE',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY',
  'RECAPTCHA_SECRET_KEY',
  'ZOHO_CLIENT_ID',
  'ZOHO_CLIENT_SECRET',
  'ZOHO_REDIRECT_URI',
] as const;

const requiredClientEnvVars = [
  'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
] as const;

const optionalClientEnvVars = [
  'NEXT_PUBLIC_HOST_URL',
  'NEXT_PUBLIC_MAPS_PLACE_ID',
  'NEXT_PUBLIC_MAPS_KEY',
] as const;

/**
 * Validates that all required environment variables are set
 * @throws Error if any required environment variable is missing
 */
export function validateEnv() {
  const missing: string[] = [];

  // Check server-side variables (only in server context)
  if (typeof window === 'undefined') {
    for (const varName of requiredServerEnvVars) {
      if (!process.env[varName]) {
        missing.push(varName);
      }
    }
  }

  // Check client-side variables (only in client context)
  if (typeof window !== 'undefined') {
    for (const varName of requiredClientEnvVars) {
      if (!process.env[varName]) {
        missing.push(varName);
      }
    }
  }

  if (missing.length > 0) {
    const context = typeof window === 'undefined' ? 'server' : 'client';
    throw new Error(
      `Missing required ${context}-side environment variables: ${missing.join(', ')}`
    );
  }
}

/**
 * Validates environment variables and returns a boolean
 * Useful for conditional checks without throwing
 */
export function isEnvValid(): boolean {
  try {
    validateEnv();
    return true;
  } catch {
    return false;
  }
}

// Auto-validate on import (only in server context to avoid client-side errors)
if (typeof window === 'undefined') {
  try {
    validateEnv();
  } catch (error) {
    // Log error but don't throw during import to allow graceful handling
    console.error('Environment validation failed:', error);
    // In production, you might want to throw here to fail fast
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
}
