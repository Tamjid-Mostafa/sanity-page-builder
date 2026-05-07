"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PageBlocks } from "../BlocksRenderer";
import { sanitizeColor } from "@/utils/sanitize";

type WorldChangingProps = Extract<PageBlocks, { _type: "worldChanging" }>;

export default function WorldChangingBlock(block: WorldChangingProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const mainTitle = block.mainTitle || "The World is Changing";
  const highlightedWord = block.highlightedWord || "Changing";
  const paragraphs = block.paragraphs || [];
  const comparisonTitle = block.comparisonTitle || "Old vs New";
  const comparisonSubtitle = block.comparisonSubtitle || "A paradigm shift in education";
  const comparisons = block.comparisons || [];
  const backgroundColor = sanitizeColor(block.backgroundColor) || "#383838";
  const highlightColor = sanitizeColor(block.highlightColor) || "#DBA19A";

  // Split title to highlight specific word
  const titleParts = mainTitle.split(highlightedWord);

  return (
    <section className="py-20 md:py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: highlightColor }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#577A65] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold text-white mb-8">
            {titleParts[0]}
            <span className="relative inline-block">
              <span className="relative z-10">{highlightedWord}</span>
              <span className="absolute bottom-1 left-0 w-full h-3 opacity-60" style={{ backgroundColor: highlightColor }} />
            </span>
            {titleParts[1]}
          </h2>

          <div className="max-w-3xl mx-auto space-y-6 text-xl md:text-xl text-white/90 leading-relaxed">
            {paragraphs.map((paragraph, index) => {
              const text = paragraph.text || "";
              const highlightPhrase = paragraph.highlightPhrase || "";
              const isLastParagraph = index === paragraphs.length - 1;
              
              // Split text for inline highlighting if highlightPhrase exists
              let content: React.ReactNode = text;
              if (highlightPhrase && text.includes(highlightPhrase)) {
                const parts = text.split(highlightPhrase);
                content = (
                  <>
                    {parts[0]}
                    <span className="relative inline-block">
                      <span className="relative z-10" style={{ color: highlightColor }}>
                        {highlightPhrase}
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-2 -z-0 opacity-30" style={{ backgroundColor: highlightColor }} />
                    </span>
                    {parts[1]}
                  </>
                );
              }

              // Determine className based on paragraph properties
              let paragraphClass = "";
              if (paragraph.isEmphasized) {
                paragraphClass = "text-xl md:text-2xl font-medium";
              } else if (isLastParagraph) {
                paragraphClass = "text-white font-medium";
              }

              return (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className={paragraphClass}
                >
                  {content}
                </motion.p>
              );
            })}
          </div>
        </motion.div>

        {/* Old vs New Comparison */}
        {comparisons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2" style={{ color: highlightColor }}>
                {comparisonTitle}
              </h3>
              <p className="text-white/70">{comparisonSubtitle}</p>
            </div>

            {comparisons.map((comparison, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                <div 
                  className="flex flex-col md:flex-row items-center gap-4 md:gap-8 p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300"
                  style={{
                    borderColor: hoveredIndex === index ? `${highlightColor}80` : 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {/* Old */}
                  <div className="flex-1 text-center md:text-right">
                    <motion.p
                      animate={{
                        opacity: hoveredIndex === index ? 0.5 : 1,
                        x: hoveredIndex === index ? -10 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-lg md:text-xl text-white/60 line-through"
                    >
                      {comparison.old}
                    </motion.p>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.2 : 1,
                      rotate: hoveredIndex === index ? 90 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${highlightColor}33` }}>
                      <ArrowRight className="w-5 h-5" style={{ color: highlightColor }} />
                    </div>
                  </motion.div>

                  {/* New */}
                  <div className="flex-1 text-center md:text-left">
                    <motion.p
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0.9,
                        x: hoveredIndex === index ? 10 : 0,
                        scale: hoveredIndex === index ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-lg md:text-xl font-medium"
                      style={{ color: highlightColor }}
                    >
                      {comparison.new}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
