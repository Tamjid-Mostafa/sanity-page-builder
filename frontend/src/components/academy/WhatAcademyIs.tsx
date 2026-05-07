"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

export function WhatAcademyIs() {
  return (
    <SectionFrame
      id="what-academy-is"
      className="bg-background border-t border-border"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="flex-1 min-w-0"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          The Academy
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground mb-8 max-w-xl">
          What iCollege Academy is
        </h2>
        <div className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-3xl">
          <p>
            iCollege Academy is for students who want more than exam preparation
            alone and who are seeking a learning lifestyle.
          </p>
          <p>
            We combine internationally recognised qualifications with mentoring,
            coaching, and real-world thinking — helping students build
            confidence, direction, and independence alongside strong academic
            outcomes.
          </p>
          <p>
            Small cohorts, flexibility, personalised support, and a
            future-focused mindset are central to everything we do.
          </p>
          <p className="font-semibold text-foreground">
            This is education designed for life — not just school.
          </p>
        </div>
      </motion.div>
    </SectionFrame>
  );
}
