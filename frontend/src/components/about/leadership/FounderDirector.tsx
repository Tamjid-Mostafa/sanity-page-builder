"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

export function FounderDirector() {
  return (
    <SectionFrame id="founder-director" className="bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Founder & Director
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Steven Lockwood
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="relative aspect-3/4 w-full max-w-sm rounded-2xl overflow-hidden border border-border bg-card">
            <Image
              src="/steven.jpeg"
              alt="Steven Lockwood"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">Steven Lockwood</p>
            <p className="text-sm font-light text-foreground">
              Educator · Former professional athlete · Anthropologist by training
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-4 text-sm sm:text-base font-light text-foreground leading-relaxed"
        >
          <p>
            iCollege Life is led by Steven Lockwood, an educator with
            experience in high-performance sport, international education, and
            academic study.
          </p>
          <p>
            From an early age, Steven competed at an elite level in tennis,
            representing Great Britain and later playing professionally on the
            ATP Tour. Years of international competition exposed him to
            different cultures, expectations, and ways of living — and taught
            him early that performance, resilience, and self-understanding
            matter as much as talent.
          </p>
          <p>
            His academic journey took him to the United States for
            undergraduate study, before returning to the UK to complete a
            master&apos;s degree and qualify as a licensed teacher. Alongside
            this, his background in anthropology and philosophy deepened a
            long-standing interest in how people learn, develop judgement, and
            shape meaningful lives over time.
          </p>
          <p>
            These experiences inform a leadership approach that is thoughtful,
            future-facing, and grounded in a simple belief: education should
            not only prepare people to succeed academically, but to navigate
            life with confidence, agency, and intention.
          </p>
          <p className="font-semibold text-foreground">
            iCollege Life reflects this philosophy in both its structure and
            its direction.
          </p>
          <p className="font-semibold text-secondary italic">
            Education matters most when it helps people understand who they
            are and take responsibility for building a well-lived life.
          </p>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
