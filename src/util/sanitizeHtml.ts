import sanitizeHtml from 'sanitize-html';

/**
 * Configuration for HTML sanitization
 * Allows safe HTML tags and attributes while removing potentially dangerous content
 */
const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    'p',
    'br',
    'strong',
    'em',
    'u',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
    'a',
    'blockquote',
    'div',
    'span',
    'img',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    div: ['class'],
    span: ['class'],
    p: ['class'],
    h1: ['class'],
    h2: ['class'],
    h3: ['class'],
    h4: ['class'],
    h5: ['class'],
    h6: ['class'],
    table: ['class'],
    th: ['class'],
    td: ['class'],
    tr: ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: {
    img: ['http', 'https', 'data'],
    a: ['http', 'https', 'mailto', 'tel'],
  },
  // Transform URLs to remove WordPress domain
  transformTags: {
    a: (tagName, attribs) => {
      if (attribs.href) {
        // Remove WordPress domain from internal links
        attribs.href = attribs.href.replace(
          'https://clarkfinance.wordifysites.com',
          ''
        );
        // Ensure external links open in new tab with security attributes
        if (attribs.href.startsWith('http')) {
          attribs.target = '_blank';
          attribs.rel = 'noopener noreferrer';
        }
      }
      return {
        tagName,
        attribs,
      };
    },
    img: (tagName, attribs) => {
      if (attribs.src) {
        // Remove WordPress domain from image sources
        attribs.src = attribs.src.replace(
          'https://clarkfinance.wordifysites.com',
          ''
        );
      }
      return {
        tagName,
        attribs,
      };
    },
  },
  // Remove empty tags
  exclusiveFilter: (frame) => {
    // Remove empty paragraphs
    if (frame.tag === 'p' && !frame.text.trim()) {
      return true;
    }
    return false;
  },
};

/**
 * Sanitizes HTML content from WordPress to prevent XSS attacks
 * @param rawContent - Raw HTML content from WordPress
 * @returns Sanitized HTML string safe for use with dangerouslySetInnerHTML
 */
export function sanitizeWysiwygContent(rawContent: string): string {
  if (!rawContent || typeof rawContent !== 'string') {
    return '';
  }

  // First, remove WordPress domain from URLs
  let processedContent = rawContent.replace(
    /https:\/\/clarkfinance\.wordifysites\.com/g,
    ''
  );

  // Then sanitize the HTML to remove dangerous content
  const sanitized = sanitizeHtml(processedContent, sanitizeOptions);

  return sanitized;
}
