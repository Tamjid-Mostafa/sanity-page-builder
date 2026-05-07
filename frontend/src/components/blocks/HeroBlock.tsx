"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { easing, duration, scale } from "@/lib/animations";
import { PageBlocks } from "../BlocksRenderer";
import { urlForImage } from "@/sanity/lib/image";
import { openCalendly } from "@/lib/site-cta";

type HeroBlockProps = Extract<PageBlocks, { _type: "hero" }>;

/* ------------------------------- Component -------------------------------- */

export default function HeroBlock(block: HeroBlockProps) {
  // Extract data from block with fallbacks
  const headline = block.headline || "Design a";
  const highlightText = block.highlightText || "Life Worth Living";
  const description = block.description || "Education, experience, and guidance for navigating a changing world.";
  const secondaryDescription = block.secondaryDescription || "";
  
  const primaryCta = block.primaryCta || { label: "Book a Conversation", href: "/book-call", newTab: false };
  const secondaryCta = block.secondaryCta || { label: "Apply Now", href: "/apply", newTab: false };
  const tertiaryCta = block.tertiaryCta;
  
  const videoOpacity = block.videoOpacity ?? 55;
  const showAnimatedShapes = block.showAnimatedShapes ?? true;
  
  // Get video URL from media asset
  const videoUrl = block.backgroundVideo?.video?.asset?.url;
  const posterUrl = block.backgroundVideo?.image?.asset?.url;

  // Handle headline and highlight text
  // If highlightText exists in headline, split it; otherwise, treat them as separate parts
  const headlineContainsHighlight = highlightText && headline.includes(highlightText);
  const headlineParts = headlineContainsHighlight && highlightText
    ? headline.split(highlightText)
    : highlightText
    ? [headline.trim()] // headline before, highlightText will be appended
    : [headline];

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Background Video */}
      {videoUrl && (
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ opacity: videoOpacity / 100 }}
            poster={posterUrl || ""}
            src={videoUrl}
          />
          {/* Video overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-br from-white/70 via-white/55 to-white/40" />
        </div>
      )}
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8 z-10"
          >
            {/* Headline with Highlight */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-[#383838] leading-[1.1] tracking-[-0.02em]">
                {headlineParts[0]}
                {highlightText && (
                  <>
                    {headlineContainsHighlight ? (
                      <>
                        <span className="relative inline-block">
                          <span className="relative z-10 whitespace-nowrap">{highlightText}</span>
                          <span className="absolute bottom-1 left-0 w-full h-3 bg-[#DBA19A] z-0 opacity-60" />
                        </span>
                        {headlineParts[1]}
                      </>
                    ) : (
                      <>
                        {" "}
                        <span className="relative inline-block">
                          <span className="relative z-10 whitespace-nowrap">{highlightText}</span>
                          <span className="absolute bottom-1 left-0 w-full h-3 bg-[#DBA19A] z-0 opacity-60" />
                        </span>
                      </>
                    )}
                  </>
                )}
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg sm:text-xl md:text-2xl font-light leading-[1.75] tracking-[-0.01em] max-w-2xl"
              >
                {description}
              </motion.p>

              {secondaryDescription && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-base sm:text-lg/80 leading-relaxed max-w-2xl"
                >
                  {secondaryDescription}
                </motion.p>
              )}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {primaryCta && (
                <motion.div
                  whileHover={{ scale: scale.button }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: duration.fast, ease: easing.smooth }}
                >
                  {primaryCta.href === "/book-call" ? (
                    <Button
                      size="lg"
                      onClick={() => openCalendly()}
                      className="bg-[#233E5F] hover:bg-[#233E5F]/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl group cursor-pointer"
                    >
                      {primaryCta.label}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="bg-[#233E5F] hover:bg-[#233E5F]/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl group"
                      asChild
                    >
                      <Link
                        href={primaryCta.href || "#"}
                        target={primaryCta.newTab ? "_blank" : undefined}
                        rel={primaryCta.newTab ? "noopener noreferrer" : undefined}
                      >
                        {primaryCta.label}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  )}
                </motion.div>
              )}

              {secondaryCta && (
                <motion.div
                  whileHover={{ scale: scale.button }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: duration.fast, ease: easing.smooth }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#DBA19A] text-[#233E5F] hover:bg-[#DBA19A]/10 px-8 py-6 text-lg rounded-xl transition-all duration-300 group"
                    asChild
                  >
                    <Link 
                      href={secondaryCta.href || "#"}
                      target={secondaryCta.newTab ? "_blank" : undefined}
                      rel={secondaryCta.newTab ? "noopener noreferrer" : undefined}
                    >
                      {secondaryCta.label}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Tertiary CTA */}
            {tertiaryCta && tertiaryCta.label && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="pt-2"
              >
                <Link
                  href={tertiaryCta.href || "#"}
                  target={tertiaryCta.newTab ? "_blank" : undefined}
                  rel={tertiaryCta.newTab ? "noopener noreferrer" : undefined}
                  className="text-sm hover:text-[#233E5F] underline underline-offset-4 transition-colors duration-200 inline-flex items-center gap-1"
                >
                  {tertiaryCta.label}
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Visual / Illustration */}
          {showAnimatedShapes && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative h-[400px] md:h-[600px] lg:h-[700px] hidden lg:block"
            >
              {/* Animated Background Shapes */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-10 w-64 h-64 bg-[#DBA19A]/20 rounded-full blur-3xl"
              />

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-20 left-10 w-80 h-80 bg-[#577A65]/15 rounded-full blur-3xl"
              />

              {/* Main Visual Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full max-w-lg"
                >
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-linear-to-br from-[#233E5F]/80 to-[#577A65]/60 rounded-3xl shadow-2xl transform rotate-12" />
                      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-linear-to-br from-[#DBA19A]/70 to-[#EDE2DF]/80 rounded-3xl shadow-2xl transform -rotate-6" />

                      {/* Center Accent */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                        <div className="w-16 h-16 bg-linear-to-br from-[#233E5F] to-[#577A65] rounded-xl" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
