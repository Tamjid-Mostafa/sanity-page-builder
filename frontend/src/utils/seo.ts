import type {Metadata} from 'next'

/** Sanity metaTitle values are already complete — bypass the root layout template. */
export function seoTitle(
  metaTitle?: string | null,
  fallback?: string,
): Metadata['title'] {
  if (metaTitle) return {absolute: metaTitle}
  return fallback
}
