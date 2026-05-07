"use client";

import React from "react";
import { motion } from "motion/react";
import type { PageBuilderBlock as PageBlocks } from "@/types/sanity";
import { sanitizeColor } from "@/utils/sanitize";

type BrandPositioningStripProps = Extract<PageBlocks, { _type: "brandPositioningStrip" }>;

export default function BrandPositioningStripBlock(block: BrandPositioningStripProps) {
  const sectionTitle = block.sectionTitle || "The World Has Changed. Education Must Too…";
  const mainStatement = block.mainStatement || "AI, globalisation and access to knowledge are reshaping how we live and work. What matters now is adaptability, creativity, self-direction and being human.";
  const secondStatement = block.secondStatement || "iCollege Life is designed for this reality — not outdated systems built for a past world.";
  const highlights = block.highlights || [];
  const backgroundColor = sanitizeColor(block.backgroundColor) || '#EDE2DF';

  // Function to highlight text based on highlights array
  const renderHighlightedText = () => {
    if (!highlights.length) {
      return mainStatement;
    }

    let processedText = mainStatement;
    const parts: Array<{ text: string; color?: string; isHighlight: boolean }> = [];
    
    // Sort highlights by their position in the text (longest first to avoid partial matches)
    const sortedHighlights = [...highlights].sort((a, b) => 
      (b.text?.length || 0) - (a.text?.length || 0)
    );

    let lastIndex = 0;
    const matches: Array<{ start: number; end: number; color: string }> = [];

    // Find all matches
    sortedHighlights.forEach((highlight) => {
      if (!highlight.text) return;
      
      const regex = new RegExp(highlight.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      let match: RegExpExecArray | null;
      
      while ((match = regex.exec(mainStatement)) !== null) {
        // Check if this match overlaps with existing matches
        const overlaps = matches.some(m => 
          (match!.index >= m.start && match!.index < m.end) ||
          (match!.index + match![0].length > m.start && match!.index + match![0].length <= m.end)
        );
        
        if (!overlaps) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            color: sanitizeColor(highlight.color) || '#233E5F',
          });
        }
      }
    });

    // Sort matches by position
    matches.sort((a, b) => a.start - b.start);

    // Build the parts array
    matches.forEach((match, index) => {
      // Add text before the match
      if (match.start > lastIndex) {
        parts.push({
          text: mainStatement.substring(lastIndex, match.start),
          isHighlight: false,
        });
      }
      
      // Add the highlighted text
      parts.push({
        text: mainStatement.substring(match.start, match.end),
        color: match.color,
        isHighlight: true,
      });
      
      lastIndex = match.end;
    });

    // Add remaining text
    if (lastIndex < mainStatement.length) {
      parts.push({
        text: mainStatement.substring(lastIndex),
        isHighlight: false,
      });
    }

    return parts.map((part, index) => (
      part.isHighlight ? (
        <span key={index} className="font-medium" style={{ color: part.color }}>
          {part.text}
        </span>
      ) : (
        <span key={index}>{part.text}</span>
      )
    ));
  };

  return (
    <section className="relative py-16 md:py-20" style={{ backgroundColor }}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-[#383838]"
          >
            {sectionTitle}
          </motion.h2>

          {/* Main Statement */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed"
          >
            {renderHighlightedText()}
            <br /><br />
            {secondStatement}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
