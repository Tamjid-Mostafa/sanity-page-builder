"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

const outcomes = [
  "Develop maturity and independence",
  "Engage with learning in a real-world context",
  "Build confidence navigating adult environments",
];

export function LearningEnvironments() {
  return (
    <SectionFrame id="learning-environments" className="bg-foreground border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="border-l-2 border-secondary pl-6 md:pl-8 space-y-6 max-w-3xl"
      >
        <span className="block text-4xl md:text-5xl font-heading font-bold text-secondary tabular-nums">
          03
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Learning environments that reflect real life
        </h2>
        <div className="space-y-4 text-sm sm:text-base font-light text-background leading-relaxed">
          <p>
            Learning at iCollege Life takes place in environments that reflect
            the world students are preparing to enter. Our primary learning
            environment is a professional work and living setting, intentionally
            designed to blur the lines between education, work, and everyday
            life while maintaining appropriate boundaries, supervision, and
            structure.
          </p>
          <p className="font-semibold text-background">
            This approach helps students:
          </p>
          <ul className="space-y-2 border-l-2 border-white/30 pl-5">
            {outcomes.map((o, i) => (
              <li key={i} className="text-sm sm:text-base font-light text-background">
                {o}
              </li>
            ))}
          </ul>
          <p className="font-semibold text-background">
            The environment is not incidental. It is part of the learning
            design.
          </p>
        </div>
      </motion.div>
    </SectionFrame>
  );
}
