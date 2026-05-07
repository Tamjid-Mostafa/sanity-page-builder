import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { poppins, rubik, sfProText, sharpGrotesk } from "./fonts";
import { siteUrl } from "@/utils/url";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "iCollege Life",
    template: "%s | iCollege Life",
  },
  description:
    "iCollege Life — premium education and global experiences for ambitious young people aged 13–25.",
  openGraph: {
    siteName: "iCollege Life",
    locale: "en_GB",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sharpGrotesk.variable} ${rubik.variable} ${poppins.variable} ${sfProText.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
