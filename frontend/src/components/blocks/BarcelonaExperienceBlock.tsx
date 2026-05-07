"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import type { PageBuilderBlock as PageBlocks } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import { easing, duration } from "@/lib/animations";
import { sanitizeColor } from "@/utils/sanitize";

type BarcelonaExperienceProps = Extract<PageBlocks, { _type: "barcelonaExperience" }>;

export default function BarcelonaExperienceBlock(block: BarcelonaExperienceProps) {
  const locationLabel = block.locationLabel || "Barcelona, Spain";
  const sectionTitle = block.sectionTitle || "The Barcelona Experience";
  const description = block.description || "";
  const images = block.images || [];
  const additionalInfo = block.additionalInfo || "";
  const backgroundColor = sanitizeColor(block.backgroundColor) || "#383838";
  const highlightColor = block.highlightColor || "#DBA19A";

  // Get background class
  const getBackgroundClass = () => {
    if (backgroundColor === "#233E5F") return "bg-[#233E5F]";
    if (backgroundColor === "#000000") return "bg-black";
    return "bg-[#383838]";
  };

  return (
    <section className={`py-20 md:py-24 lg:py-32 relative overflow-hidden ${getBackgroundClass()}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DBA19A]/20 border border-[#DBA19A]/30 mb-6">
            <MapPin className="w-5 h-5 text-[#DBA19A]" />
            <span className="text-sm font-medium text-[#DBA19A]">
              {locationLabel}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
            {sectionTitle}
          </h2>
          <p
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            style={{ whiteSpace: "pre-line" }}
          >
            {description}
          </p>
        </motion.div>

        {/* Image Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {images.map((image, index) => {
            const imageUrl = image.image ? urlFor(image.image).width(800).height(600).url() : null;

            return (
              <motion.div
                key={`${image.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: index * 0.1, duration: duration.slow, ease: easing.apple }}
                whileHover={{ y: -8, transition: { duration: duration.medium, ease: easing.smooth } }}
                className="group relative overflow-hidden rounded-3xl shadow-2xl"
              >
                {/* Image Container with Ken Burns effect */}
                <div className="relative w-full h-80 md:h-96 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5, ease: easing.smooth }}
                    className="w-full h-full"
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={image.title || "Barcelona experience"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${image.fallbackGradient}`} />
                    )}
                  </motion.div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                        {image.title}
                      </h3>
                      <p className="text-white/90 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {image.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Decorative Corner Element */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/30 rounded-lg transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        {additionalInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-12 md:mt-16"
          >
            <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
              Our campus is located at{" "}
              <span className="text-[#DBA19A] font-medium">TSH Barcelona</span>,
              providing you with access to world-class facilities and a vibrant community of
              creators, entrepreneurs, and learners.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
