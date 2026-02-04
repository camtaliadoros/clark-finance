/**
 * URL parameter validation utilities
 * Validates and sanitizes URL parameters to prevent injection attacks
 */

/**
 * Validates a slug parameter
 * Slugs should only contain lowercase letters, numbers, and hyphens
 * @param slug - The slug to validate
 * @returns true if valid, false otherwise
 */
export function isValidSlug(slug: string | null): boolean {
  if (!slug) {
    return false;
  }
  // Allow lowercase letters, numbers, and hyphens
  // Must start and end with alphanumeric character
  // Length between 1 and 100 characters
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length >= 1 && slug.length <= 100;
}

/**
 * Validates and sanitizes a slug parameter
 * @param slug - The slug to validate
 * @returns The sanitized slug or null if invalid
 */
export function validateSlug(slug: string | null): string | null {
  if (!slug) {
    return null;
  }
  // Convert to lowercase and trim
  const sanitized = slug.toLowerCase().trim();
  return isValidSlug(sanitized) ? sanitized : null;
}

/**
 * Validates a numeric ID parameter
 * @param id - The ID to validate
 * @returns true if valid, false otherwise
 */
export function isValidId(id: string | null): boolean {
  if (!id) {
    return false;
  }
  // Must be a positive integer
  const idRegex = /^\d+$/;
  return idRegex.test(id) && parseInt(id, 10) > 0;
}

/**
 * Validates a page number parameter
 * @param page - The page number to validate
 * @param maxPage - Optional maximum page number
 * @returns true if valid, false otherwise
 */
export function isValidPageNumber(
  page: string | null,
  maxPage?: number
): boolean {
  if (!page) {
    return false;
  }
  const pageRegex = /^\d+$/;
  if (!pageRegex.test(page)) {
    return false;
  }
  const pageNum = parseInt(page, 10);
  if (pageNum < 1) {
    return false;
  }
  if (maxPage && pageNum > maxPage) {
    return false;
  }
  return true;
}

/**
 * Validates pagination parameters
 * @param page - Page number
 * @param perPage - Items per page
 * @param maxPerPage - Maximum items per page allowed
 * @returns Object with validated values or null if invalid
 */
export function validatePagination(
  page: string | null,
  perPage: string | null,
  maxPerPage: number = 100
): { page: number; perPage: number } | null {
  if (!isValidPageNumber(page)) {
    return null;
  }
  if (!perPage || !/^\d+$/.test(perPage)) {
    return null;
  }
  const pageNum = parseInt(page!, 10);
  const perPageNum = parseInt(perPage, 10);
  if (perPageNum < 1 || perPageNum > maxPerPage) {
    return null;
  }
  return { page: pageNum, perPage: perPageNum };
}
