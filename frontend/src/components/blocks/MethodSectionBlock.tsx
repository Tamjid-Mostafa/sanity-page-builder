"use client";

import React from "react";
import { motion } from "motion/react";
import { BookOpen, Compass, Rocket, Target, Lightbulb, Sparkles } from "lucide-react";
import { easing, duration } from "@/lib/animations";
import type { PageBuilderBlock as PageBlocks } from "@/types/sanity";
import { stripZW, sanitizeColor } from "@/utils/sanitize";

type MethodSectionProps = Extract<PageBlocks, { _type: "methodSection" }>;

// Icon mapping
const iconMap = {
  BookOpen,
  Compass,
  Rocket,
  Target,
  Lightbulb,
  Sparkles,
};

export default function MethodSectionBlock(block: MethodSectionProps) {
  const sectionTitle = block.sectionTitle || "THE iCOLLEGE LIFE METHOD";
  const subtitle = block.subtitle || "An education for life…";
  const closingText = block.closingText || "A complete system for becoming your better self";
  const steps = block.steps || [];
  const backgroundStyle = stripZW(block.backgroundColor) || "linear-to-br from-[#EAE8DF] to-white";
  const lineColor = sanitizeColor(block.lineColor) || "#DBA19A";

  // Determine background class based on style
  const getBackgroundClass = () => {
    if (backgroundStyle === "white") return "bg-white";
    if (backgroundStyle === "#EAE8DF") return "bg-[#EAE8DF]";
    return "bg-gradient-to-br from-[#EAE8DF] to-white";
  };

  return (
    <section className={`py-20 md:py-24 lg:py-32 ${getBackgroundClass()} relative overflow-hidden`}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#577A65] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#233E5F] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
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
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Circular Diagram */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Desktop: Triangular Layout */}
            <div className="hidden md:block">
              <div className="relative h-[650px]">
                {/* Connection Lines - Triangle */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 100 }}
                >
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.8, ease: easing.apple }}
                    d="M 50% 12% L 18% 88% L 82% 88% Z"
                    fill="none"
                    stroke="#DBA19A"
                    strokeWidth="2"
                    strokeDasharray="8 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Step 1: Learn (Top) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: 0.3, duration: duration.slow, ease: easing.apple }}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2"
                >
                  <StepCard step={steps[0]} index={0} />
                </motion.div>

                {/* Step 2: Design (Bottom Left) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: 0.5, duration: duration.slow, ease: easing.apple }}
                  className="absolute bottom-0 left-[10%]"
                >
                  <StepCard step={steps[1]} index={1} />
                </motion.div>

                {/* Step 3: Build (Bottom Right) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: 0.7, duration: duration.slow, ease: easing.apple }}
                  className="absolute bottom-0 right-[10%]"
                >
                  <StepCard step={steps[2]} index={2} />
                </motion.div>

                {/* Center Circle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: 0.9, duration: duration.medium, ease: easing.bounce }}
                  className="absolute lg:top-[55%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(219, 161, 154, 0)",
                        "0 0 0 20px rgba(219, 161, 154, 0.1)",
                        "0 0 0 0 rgba(219, 161, 154, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="lg:w-32 w-24 lg:h-32 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-[#DBA19A]/30"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#233E5F]">{steps.length}</div>
                      <div className="text-xs font-medium">Steps</div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Mobile: Vertical Stack */}
            <div className="md:hidden space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={`${step.title}-mobile-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="flex justify-center"
                >
                  <StepCard step={step} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing Text */}
        {closingText && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-xl md:text-2xl font-medium text-[#383838]">
              {closingText}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Step Card Component
function StepCard({
  step,
  index,
}: {
  step: {
    icon?: string;
    title?: string;
    description?: string;
    color?: string;
  };
  index: number;
}) {
  const IconComponent = iconMap[step.icon as keyof typeof iconMap] || BookOpen;
  const color = step.color || '#233E5F';

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        transition: { duration: duration.medium, ease: easing.smooth }
      }}
      className="relative group"
    >
      <div className="w-64 p-8 rounded-2xl bg-white shadow-lg border border-[#EAE8DF] transition-all duration-300 hover:border-[#DBA19A]/50">
        {/* Step Number */}
        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-[#233E5F] to-[#577A65] flex items-center justify-center text-white font-bold shadow-md">
          {index + 1}
        </div>

        {/* Icon */}
        <motion.div
          whileHover={{
            rotate: 10,
            scale: 1.1,
            transition: { duration: duration.fast, ease: easing.bounce }
          }}
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300"
          style={{ backgroundColor: `${color}20` }}
        >
          <IconComponent
            className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
            style={{ color }}
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-heading font-bold text-[#383838] mb-2">
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}
