"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

export function AcademyFooterMicroLine() {
  return (
    <SectionFrame className="bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <p className="text-sm font-light text-foreground leading-relaxed max-w-md">
          iCollege Academy is part of{" "}
          <Link
            href="/"
            className="font-semibold text-foreground hover:text-primary transition-colors duration-200"
          >
            iCollege Life
          </Link>{" "}
          — helping young people design smarter lives, academically and beyond.
        </p>
        <div className="h-px w-12 bg-border rounded-full" aria-hidden />
      </motion.div>
    </SectionFrame>
  );
}
