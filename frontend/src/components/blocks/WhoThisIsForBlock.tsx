"use client";

import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Compass, Briefcase, Users, Target, BookOpen } from "lucide-react";
import { easing, duration } from "@/lib/animations";
import { PageBlocks } from "../BlocksRenderer";

type WhoThisIsForProps = Extract<PageBlocks, { _type: "whoThisIsFor" }>;

// Icon mapping
const iconMap = {
  GraduationCap,
  Compass,
  Briefcase,
  Users,
  Target,
  BookOpen,
};

export default function WhoThisIsForBlock(block: WhoThisIsForProps) {
  const sectionTitle = block.sectionTitle || "WHO ICOLLEGE LIFE IS FOR";
  const audiences = block.audiences || [];
  const backgroundColor = block.backgroundColor || "linear-to-b from-white to-[#EAE8DF]/20";

  return (
    <section className={`py-16 md:py-20 bg-${backgroundColor}`}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-[#383838] mb-4">
            {sectionTitle}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((audience, index) => {
            const IconComponent = iconMap[audience.icon as keyof typeof iconMap] || Users;
            
            return (
              <motion.div
                key={`${audience.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: duration.slow, ease: easing.apple }}
                whileHover={{ y: -6 }}
                className="group relative p-8 rounded-2xl bg-white border border-[#EAE8DF] shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl shadow-sm mb-4"
                  style={{ backgroundColor: `${audience.color}20` }}
                >
                  <IconComponent
                    className="w-6 h-6"
                    style={{ color: audience.color }}
                    strokeWidth={1.5}
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-heading font-bold text-[#383838] mb-2">
                  {audience.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  {audience.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
