"use client";

import { motion } from "motion/react";
import { Mail, Phone, MapPin, ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { easing, duration, stagger } from "@/lib/animations";
import { useState, useEffect } from "react";

interface FooterLink {
  text?: string | null;
  url?: string | null;
  newTab?: boolean | null;
}

interface SocialLinks {
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  tiktok?: string | null;
  x?: string | null;
  youtube?: string | null;
}

interface FooterProps {
  tagline?: string;
  taglineLinkText?: string;
  taglineLinkHref?: string;
  aboutLinks?: FooterLink[];
  academyLinks?: FooterLink[];
  globalExperiencesLinks?: FooterLink[];
  contactAddress?: string;
  contactCity?: string;
  contactEmail?: string;
  contactPhone?: string;
  brandLine?: string;
  socialLinks?: SocialLinks;
  copyrightText?: string;
  logo?: {
    asset?: {
      url?: string | null;
    } | null;
  } | null;
}

export function Footer({
  tagline = "iCollege Life is an education company helping people design smarter lives.",
  taglineLinkText = "See how iCollege Life prepares students for what comes next →",
  taglineLinkHref = "#hero",
  aboutLinks = [],
  academyLinks = [],
  globalExperiencesLinks = [],
  contactAddress = "TSH Barcelona",
  contactCity = "Barcelona, Spain",
  contactEmail = "hello@icollegelife.com",
  contactPhone = "+34 123 456 789",
  brandLine = "iCollege Life is a modern education company supporting academic progress, personal development, and long-term direction.",
  socialLinks,
  copyrightText = "iCollege Life. All rights reserved.",
  logo,
}: FooterProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Map social links to component format
  type SocialLinkItem = {
    name: string;
    href: string;
    icon: React.ReactElement;
  };

  const socialLinksArray: SocialLinkItem[] = [
    socialLinks?.instagram ? {
      name: "Instagram",
      href: socialLinks.instagram,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    } : null,
    socialLinks?.facebook ? {
      name: "Facebook",
      href: socialLinks.facebook,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    } : null,
    socialLinks?.x ? {
      name: "X",
      href: socialLinks.x,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    } : null,
    socialLinks?.youtube ? {
      name: "YouTube",
      href: socialLinks.youtube,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    } : null,
    socialLinks?.linkedin ? {
      name: "LinkedIn",
      href: socialLinks.linkedin,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    } : null,
    socialLinks?.tiktok ? {
      name: "TikTok",
      href: socialLinks.tiktok,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
    } : null,
  ].filter((social): social is SocialLinkItem => social !== null); // Only include social links that exist

  return (
    <>
      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:bg-primary/90 transition-colors duration-300"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}

      <footer className="bg-background text-foreground relative overflow-hidden">
        {/* Premium Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-14 md:py-16">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-foreground text-base md:text-lg max-w-3xl mx-auto">
            {tagline}{" "}
            {taglineLinkText && taglineLinkHref && (
              <a href={taglineLinkHref} className="text-primary hover:text-primary/80 transition-colors duration-200 underline underline-offset-4">
                {taglineLinkText}
              </a>
            )}
          </p>
        </motion.div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10 mb-10">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: duration.slow, ease: easing.apple }}
          >
            <h3 className="text-sm font-heading font-bold text-foreground uppercase tracking-wider mb-3">
              About
            </h3>
            <ul className="space-y-3">
              {aboutLinks?.filter(item => item.text && item.url).map((item, index) => (
                <motion.li
                  key={item.text || index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * stagger.list, duration: duration.fast }}
                >
                  <Link
                    href={item.url || "#"}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    className="text-sm text-foreground hover:text-foreground transition-colors duration-200 inline-block relative group"
                  >
                    {item.text}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-border group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Academy */}
          <div>
            <h3 className="text-sm font-heading font-bold text-foreground uppercase tracking-wider mb-3">
              Academy
            </h3>
            <ul className="space-y-3">
              {academyLinks?.filter(item => item.text && item.url).map((item, index) => (
                <li key={item.text || index}>
                  <Link
                    href={item.url || "#"}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    className="text-sm text-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Experiences */}
          <div>
            <h3 className="text-sm font-heading font-bold text-foreground uppercase tracking-wider mb-3">
              Global Experiences
            </h3>
            <ul className="space-y-3">
              {globalExperiencesLinks?.filter(item => item.text && item.url).map((item, index) => (
                <li key={item.text || index}>
                  <Link
                    href={item.url || "#"}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    className="text-sm text-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-heading font-bold text-foreground uppercase tracking-wider mb-3">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-foreground/70 shrink-0" />
                <span className="text-sm text-foreground">
                  {contactAddress}
                  <br />
                  {contactCity}
                </span>
              </li>
              {contactEmail && (
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-foreground/70 shrink-0" />
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-sm text-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {contactEmail}
                  </a>
                </li>
              )}
              {contactPhone && (
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-foreground/70 shrink-0" />
                  <a
                    href={`tel:${contactPhone.replace(/\s/g, '')}`}
                    className="text-sm text-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {contactPhone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Brand Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 pt-10 border-t border-border/40"
        >
          <p className="text-center text-base md:text-lg text-foreground leading-relaxed max-w-4xl mx-auto">
            {brandLine}
          </p>
        </motion.div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-border/40 mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo / Brand */}
            <Link
              href="/"
              className="shrink-0 transition-opacity duration-200 hover:opacity-80"
            >
              <Image
                src={logo?.asset?.url || "/logo_nobg.png"}
                alt="iCollege Life"
                width={160}
                height={44}
                className="h-7 lg:h-9 w-auto"
                priority
              />
            </Link>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinksArray.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: duration.fast, ease: easing.bounce }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -2,
                    rotate: 10,
                    transition: { duration: duration.fast, ease: easing.smooth }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-primary transition-all duration-200 relative overflow-hidden group"
                  aria-label={social.name}
                >
                  {/* Ripple effect on hover */}
                  <span className="absolute inset-0 bg-foreground/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                  <span className="relative z-10">{social.icon}</span>
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-sm text-foreground">
              © {new Date().getFullYear()} {copyrightText}
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}

