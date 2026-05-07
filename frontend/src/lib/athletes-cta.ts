/**
 * Set in `.env.local`:
 * - NEXT_PUBLIC_ATHLETES_CALENDLY_URL — full Calendly scheduling link (falls back to site-wide)
 * - NEXT_PUBLIC_ATHLETES_FIT_FORM_URL — Google Form "Check your fit" URL
 *
 * If unset, buttons fall back to the site-wide Calendly URL.
 */
export const ATHLETES_CALENDLY_URL =
  process.env.NEXT_PUBLIC_ATHLETES_CALENDLY_URL?.trim() ||
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ||
  "https://calendly.com/icollegebarcelona-info/30min";

export const ATHLETES_FIT_FORM_URL =
  process.env.NEXT_PUBLIC_ATHLETES_FIT_FORM_URL?.trim() ||
  "https://docs.google.com/forms/d/e/1FAIpQLSfWZMWx1FSSEviBxle02op1BAiQ-8L1Rzq7STewMEBkkHXkRw/viewform";
