/**
 * Site-wide CTA URLs
 *
 * Set in `.env.local`:
 *   NEXT_PUBLIC_CALENDLY_URL  — Calendly scheduling link (used for all "Book a Conversation" buttons)
 *
 * Falls back to the hardcoded Calendly URL if the env var is not set.
 */
export const SITE_CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ||
  "https://calendly.com/icollegebarcelona-info/30min";

export const SITE_CTA_FORM_URL =
  process.env.NEXT_PUBLIC_SITE_CTA_FORM_URL?.trim() ||
  process.env.NEXT_PUBLIC_ATHLETES_FIT_FORM_URL?.trim() ||
  "";

/**
 * Opens the Calendly popup widget.
 * Falls back to opening in a new tab if the widget script hasn't loaded yet.
 */
export function openCalendly(url?: string) {
  const target = url ?? SITE_CALENDLY_URL;
  if (
    typeof window !== "undefined" &&
    (
      window as unknown as {
        Calendly?: { initPopupWidget: (opts: { url: string }) => void };
      }
    ).Calendly
  ) {
    (
      window as unknown as {
        Calendly: { initPopupWidget: (opts: { url: string }) => void };
      }
    ).Calendly.initPopupWidget({ url: target });
  } else {
    window.open(target, "_blank", "noopener,noreferrer");
  }
}
