/**
 * Article utilities for consistent file naming and content generation
 * This ensures all future articles follow the dated subject-based filename convention
 */

export interface ArticleMetadata {
  date: Date;
  subject: string;
  category: string;
  location?: string;
  author?: string;
}

/**
 * Generate consistent filename for articles
 * Format: YYYY-MM-DD-Subject-Short-Point
 * Example: 2026-09-29-Monadoongar-Wayside-Facilities
 */
export function generateArticleFileName(metadata: ArticleMetadata): string {
  const year = metadata.date.getFullYear();
  const month = String(metadata.date.getMonth() + 1).padStart(2, '0');
  const day = String(metadata.date.getDate()).padStart(2, '0');

  // Convert subject to filename-safe format
  const subjectSlug = metadata.subject
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${year}-${month}-${day}-${subjectSlug}`;
}

/**
 * Generate short-point subject for filename
 * Takes a longer subject and creates a concise version
 */
export function generateShortPoint(longSubject: string): string {
  return longSubject
    .split(' ')
    .slice(0, 3) // Take first 3 words
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Validate article metadata before file generation
 */
export function validateArticleMetadata(metadata: ArticleMetadata): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!metadata.date || isNaN(metadata.date.getTime())) {
    errors.push('Invalid date provided');
  }

  if (!metadata.subject || metadata.subject.trim().length === 0) {
    errors.push('Subject cannot be empty');
  }

  if (!metadata.category || metadata.category.trim().length === 0) {
    errors.push('Category cannot be empty');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Current article metadata for Monadoongar
 * This serves as a template for future articles
 */
export const MONADOONGAR_METADATA: ArticleMetadata = {
  date: new Date(2026, 8, 29), // September 29, 2026
  subject: 'Monadoongar Wayside Facilities',
  category: 'Infrastructure',
  location: 'Rajasthan',
  author: 'Special Correspondent, Infrastructure Bureau',
};

/**
 * Article metadata for State Highway 32
 */
export const STATEHIGHWAY32_METADATA: ArticleMetadata = {
  date: new Date(2026, 9, 1), // October 1, 2026
  subject: 'State Highway 32: The Road of Misfortune',
  category: 'Infrastructure',
  location: 'Rajasthan',
  author: 'Special Correspondent, Infrastructure Bureau',
};

/**
 * Article metadata for Mangalam Orchid Issue
 */
export const MANGALAMORCHID_METADATA: ArticleMetadata = {
  date: new Date(2026, 9, 1), // October 1, 2026
  subject: 'Mangalam Orchid: Incomplete Handover and Environmental Negligence',
  category: 'Real Estate',
  location: 'Udaipur',
  author: 'Special Correspondent, Urban Affairs Bureau',
};

/**
 * Example metadata structure for future articles
 * Copy this pattern for new articles
 */
export const ARTICLE_METADATA_TEMPLATE: ArticleMetadata = {
  date: new Date(), // Current date
  subject: 'Your Article Subject Here',
  category: 'Category', // e.g., Infrastructure, Education, Health
  location: 'Location', // Optional
  author: 'Author Name', // Optional
};