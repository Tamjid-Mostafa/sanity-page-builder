"use client";

import React from "react";
import { motion } from "motion/react";
import { Monitor, Globe, Users } from "lucide-react";
import type { PageBuilderBlock as PageBlocks } from "@/types/sanity";
import { easing, duration, stagger } from "@/lib/animations";

type LearningExperienceProps = Extract<PageBlocks, { _type: "learningExperience" }>;

// Icon mapping
const iconMap = {
  Monitor,
  Globe,
  Users,
};

export default function LearningExperienceBlock(block: LearningExperienceProps) {
  const sectionTitle = block.sectionTitle || "The iCollege Learning Experience";
  const features = block.features || [];

  return (
    <section className="py-20 md:py-24 lg:py-32 bg-[#383838] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#DBA19A] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#577A65] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
            {sectionTitle}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Monitor;
            const color = feature.color || "#233E5F";
            
            return (
              <motion.div
                key={`${feature.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * stagger.cards,
                  duration: duration.slow,
                  ease: easing.apple
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: duration.medium, ease: easing.smooth }
                }}
                className="group relative"
              >
                <div className="h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-6 transition-shadow duration-300 group-hover:shadow-xl"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <IconComponent
                      className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: color }}
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-base text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
