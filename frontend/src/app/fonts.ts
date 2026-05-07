// app/fonts.ts
import localFont from "next/font/local";
import { Rubik, Poppins, Inter } from "next/font/google";

// Sharp Grotesk - Headings and emphasis (local font)
export const sharpGrotesk = localFont({
  src: [
    {
      path: "../../fonts/sharp-grotesk/SharpGrotesk-Light20.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/sharp-grotesk/SharpGrotesk-Book20.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/sharp-grotesk/SharpGrotesk-Medium20.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/sharp-grotesk/SharpGrotesk-SemiBold20.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/sharp-grotesk/SharpGrotesk-Bold20.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/sharp-grotesk/SharpGrotesk-Black20.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sharp-grotesk",
  display: "swap",
});

// Rubik - Body text and paragraphs (Google Font)
export const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

// Inter - Primary UI font (default body font)
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

// Poppins - Logo and special headings (Google Font)
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

// SF Pro Text - Apple's system font (local font files)
export const sfProText = localFont({
  src: [
    {
      path: "../../fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../fonts/SF-Pro-Text-Font-Family/SF-Pro-Text-HeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-sf-pro-text",
  display: "swap",
});

// Strongly-typed mapping + helpers
export const mapFont = {
  inter,
  sharpGrotesk,
  rubik,
  poppins,
  sfProText,
} as const;
export type FontKey = keyof typeof mapFont; // "inter" | "sharpGrotesk" | "rubik" | "poppins" | "sfProText"
const FONT_KEYS = Object.keys(mapFont) as FontKey[];

// Map font keys to CSS variable names for dynamic font switching
export const fontCSSVars: Record<FontKey, string> = {
  inter: "--font-inter",
  sharpGrotesk: "--font-sharp-grotesk",
  rubik: "--font-rubik",
  poppins: "--font-poppins",
  sfProText: "--font-sf-pro-text",
};

export const clean = (s?: string | null) =>
  (s ?? "").replace(/[\u200B-\u200D\uFEFF]/g, ""); // strip zero-width chars

export const isFontKey = (x: unknown): x is FontKey =>
  typeof x === "string" && (FONT_KEYS as readonly string[]).includes(x);
