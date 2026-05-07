"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { urlForImage } from "@/sanity/lib/image";
import type { PageBuilderBlock as PageBlocks } from "@/types/sanity";

type HeroQuoteBlockProps = Extract<PageBlocks, { _type: "heroQuote" }>;

/* ----------------------------- Motion Config ------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* ------------------------------- Component -------------------------------- */

export default function HeroQuoteBlock(block?: HeroQuoteBlockProps) {
  if (!block) return null;

  const {
    backgroundImage,
    backgroundImageAlt,
    quote,
    highlightedWords = [],
    footerLeftText,
    footerRightText,
  } = block;

  // Get image URL from Sanity
  const imageData = backgroundImage
    ? urlForImage(backgroundImage, { maxWidth: 1920 })
    : null;

  // Split quote into words and identify which to highlight
  // This handles punctuation and case-insensitive matching
  const quoteText = quote && typeof quote === 'string' ? quote : '';
  const quoteWords: Array<{ word: string; shouldHighlight: boolean; key: string }> = 
    quoteText.split(/(\s+)/).map((word: string, index: number) => {
          const trimmedWord = word.trim();
          if (!trimmedWord) {
            return { word, shouldHighlight: false, key: `word-${index}` };
          }
          // Remove punctuation for comparison
          const cleanWord = trimmedWord.toLowerCase().replace(/[.,!?;:'"()]/g, "");
          const shouldHighlight = Array.isArray(highlightedWords) && highlightedWords.some(
            (hw: string) => typeof hw === 'string' && hw.toLowerCase().trim() === cleanWord
          );
          return { word, shouldHighlight, key: `word-${index}` };
        });

  return (
    <section className="relative min-h-[95vh] overflow-hidden">
      {/* Background Image */}
      {imageData && (
        <div className="absolute inset-0">
          <Image
            src={imageData.src}
            alt={backgroundImageAlt || "Hero background"}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            placeholder={imageData.blurDataURL ? "blur" : "empty"}
            blurDataURL={imageData.blurDataURL || undefined}
          />
          {/* Subtle overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        </div>
      )}

      {/* Quote Overlay */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex min-h-[70vh] items-center justify-center px-6"
      >
        <motion.div
          variants={itemVariants}
          className="relative max-w-4xl text-center"
        >
          {/* Hand-drawn oval/circle decoration */}
          <div
            className="absolute -inset-8 -z-10"
            style={{
              border: "3px solid white",
              borderRadius: "60% 40% 50% 50% / 50% 50% 50% 50%",
              opacity: 0.9,
            }}
            aria-hidden="true"
          />

          {/* Quote Text */}
          <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {quoteWords.map(({ word, shouldHighlight, key }) => {
              if (shouldHighlight) {
                return (
                  <span
                    key={key}
                    className="inline-block"
                    style={{
                      color: "#B8FF65", // Yellow-green color
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    {word}
                  </span>
                );
              }
              return <span key={key}>{word}</span>;
            })}
          </h1>
        </motion.div>
      </motion.div>

      {/* Black Footer Bar */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 left-0 right-0 z-10 bg-black px-6 py-8 md:px-12 md:py-12"
        style={{ minHeight: "25vh" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            {/* Left: Large Text */}
            <div>
              <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {footerLeftText}
              </h2>
            </div>

            {/* Right: Descriptive Text */}
            <div>
              <p className="font-body text-base leading-relaxed text-white sm:text-lg md:text-xl">
                {footerRightText}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

