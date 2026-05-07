"use client";

import React from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, Globe, Workflow, Users, Target, BookOpen, Lightbulb, Rocket } from "lucide-react";
import type { PageBuilderBlock as PageBlocks } from "@/types/sanity";
import { sanitizeColor } from "@/utils/sanitize";

type WhyiCollegeProps = Extract<PageBlocks, { _type: "whyiCollege" }>;

// Icon mapping
const iconMap = {
  Heart,
  Workflow,
  Target,
  Users,
  Sparkles,
  Globe,
  BookOpen,
  Lightbulb,
  Rocket,
};

export default function WhyiCollegeBlock(block: WhyiCollegeProps) {
  const sectionTitle = block.sectionTitle || "WHY iCOLLEGE LIFE";
  const subtitle = block.subtitle || "One philosophy. Multiple pathways. Lifelong learning.";
  const pillars = block.pillars || [];
  const backgroundColor = sanitizeColor(block.backgroundColor) || "white";

  return (
    <section className="py-20 md:py-24 lg:py-32" style={{ backgroundColor }}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#383838] mb-4">
            {sectionTitle}
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {pillars.map((pillar, index) => {
            const IconComponent = iconMap[pillar.icon as keyof typeof iconMap] || Heart;
            
            return (
              <motion.div
                key={`${pillar.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`
                  relative p-10 rounded-2xl 
                  bg-gradient-to-br from-white to-[#EAE8DF]/30
                  border border-[#EAE8DF]
                  shadow-md hover:shadow-xl
                  transition-all duration-300
                  ${pillar.isComingSoon ? "opacity-75" : ""}
                `}
              >
                {/* Coming Soon Badge */}
                {pillar.isComingSoon && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-medium bg-[#EDE2DF] rounded-full">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl shadow-sm mb-6"
                  style={{ backgroundColor: `${pillar.color}20` }}
                >
                  <IconComponent
                    className="w-7 h-7"
                    style={{ color: pillar.color }}
                    strokeWidth={1.5}
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-heading font-bold text-[#383838] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-base leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
