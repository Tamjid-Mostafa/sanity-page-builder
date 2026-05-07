"use client";

import Script from "next/script";

/**
 * Loads the Calendly popup widget CSS and JS globally.
 * Add once to the root layout. Buttons call window.Calendly.initPopupWidget().
 */
export function CalendlyProvider() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
