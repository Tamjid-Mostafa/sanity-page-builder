/** Horizontal padding used site-wide (matches icollege.life). */
export const SITE_CONTAINER_PADDING_X = "px-6 sm:px-8 lg:px-12";

/** Default page container — no extra max-width cap beyond Tailwind `container`. */
export const SITE_CONTAINER = `container mx-auto ${SITE_CONTAINER_PADDING_X}`;

/** Bottom padding for hero and full-bleed sections. */
export const SITE_SECTION_PADDING_BOTTOM = "pb-14 md:pb-16 lg:pb-20";

export const SITE_CONTAINER_SECTION = `${SITE_CONTAINER} ${SITE_SECTION_PADDING_BOTTOM}`;

/** Optional max-width constraints for CMS maxWidth fields. */
export const CONTENT_MAX_WIDTH_MAP: Record<string, string> = {
  narrow: "max-w-3xl",
  content: "max-w-4xl",
  default: "",
  wide: "max-w-[1400px]",
  full: "",
};

export function contentMaxWidthClass(
  value?: string | null,
  fallback = "default",
): string {
  const key = value || fallback;
  return CONTENT_MAX_WIDTH_MAP[key] ?? "";
}
