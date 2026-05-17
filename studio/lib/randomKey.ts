/**
 * Generates a random alphanumeric string for Sanity array item `_key` fields.
 * Replaces the removed `@sanity/util/content` `randomKey` helper.
 */
export function randomKey(length = 12): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}
