"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Globe, 
  Briefcase, 
  BookOpen, 
  Users, 
  Target, 
  Rocket, 
  Sparkles, 
  ArrowRight,
  LucideIcon 
} from "lucide-react";
import { easing, duration, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { PageBlocks } from "../BlocksRenderer";
import Link from "next/link";
import { sanitizeColor } from "@/utils/sanitize";

type ThreePathwaysGridProps = Extract<PageBlocks, { _type: "threePathwaysGrid" }>;

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'graduation-cap': GraduationCap,
  'globe': Globe,
  'briefcase': Briefcase,
  'book-open': BookOpen,
  'users': Users,
  'target': Target,
  'rocket': Rocket,
  'sparkles': Sparkles,
};

export default function ThreePathwaysGridBlock(block: ThreePathwaysGridProps) {
  const heading = block.heading || "Choose Your Pathway";
  const description = block.description || "Three distinct paths designed for different stages of your journey";
  const pathways = block.pathways || [];

  return (
    <section className="py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#383838] mb-4">
            {heading}
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {pathways.map((pathway, index) => {
            const IconComponent = pathway.icon ? iconMap[pathway.icon] : GraduationCap;
            
            return (
              <motion.div
                key={pathway.title || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  delay: index * stagger.cards,
                  duration: duration.slow,
                  ease: easing.apple
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { duration: duration.medium, ease: easing.smooth }
                }}
                className="group relative"
              >
                <div
                  className={cn(
                    "relative h-full p-8 rounded-3xl bg-linear-to-br border border-[#EAE8DF] shadow-lg transition-all duration-400 ease-in-out hover:shadow-2xl flex flex-col",
                    pathway.gradient || "from-[#233E5F]/10 to-[#577A65]/10"
                  )}
                >
                  {/* Icon Badge */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md mb-6 transition-all duration-300 group-hover:shadow-lg group-hover:rotate-6 group-hover:scale-110">
                    {IconComponent && (
                      <IconComponent
                        className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: sanitizeColor(pathway.iconColor) || '#233E5F' }}
                        strokeWidth={1.5}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#383838] mb-2">
                        {pathway.title}
                      </h3>
                      {pathway.ageBand && (
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-white rounded-full">
                          {pathway.ageBand}
                        </span>
                      )}
                    </div>

                    <p className="text-base font-medium text-[#383838]">
                      {pathway.subtitle}
                    </p>

                    <p className="text-base leading-relaxed">
                      {pathway.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  {pathway.buttonLink && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: duration.fast, ease: easing.smooth }}
                      className="mt-6"
                    >
                      <Button
                        className="w-full group/btn bg-[#383838] hover:bg-[#233E5F] text-white rounded-xl transition-all duration-300 hover:shadow-lg"
                        size="lg"
                        asChild
                      >
                        <Link href={pathway.buttonLink}>
                          {pathway.buttonText || 'Learn More'}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
