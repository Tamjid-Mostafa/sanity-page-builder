"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

export function FounderNote() {
  return (
    <SectionFrame id="founder-note" className="bg-background border-t border-border">
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">

        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-muted">
            <Image
              src="/steven.jpeg"
              alt="Steven Lockwood, Founder of iCollege Life"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="rounded-2xl bg-foreground p-5">
            <p className="text-base font-bold text-background">Steven Lockwood</p>
            <p className="text-sm font-medium text-secondary mt-0.5">Founder, iCollege Life</p>
          </div>
        </motion.div>

        {/* Letter column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            A note from the founder
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground mb-8">
            Why I built iCollege Life
          </h2>

          <div className="space-y-5 text-sm sm:text-base font-medium text-foreground leading-relaxed">
            <p>
              I&apos;ve spent most of my career working with students who are
              capable, curious, and often academically strong — but many feel
              detached from their education. They&apos;re told to work hard,
              get good grades, and keep their options open, but they&apos;re
              not always given the time, space, or support to understand
              themselves or explore what they genuinely care about.
            </p>
            <p>
              At the same time, the world is changing dramatically. Digital
              tools, automation, global connectivity, and artificial
              intelligence are transforming careers, industries, and the
              nature of work itself. The skills and habits that matter most are
              increasingly those that can&apos;t be taught through instruction
              alone — they have to be developed through experience, reflection,
              and real responsibility.
            </p>
            <p>
              iCollege Life is my attempt to build something better. Not a
              shortcut, not a gap-year filler, and not a replacement for
              serious academic work — but a more complete approach to
              education. One that combines strong academic preparation with the
              kinds of experiences, conversations, and challenges that actually
              help young people grow.
            </p>
            <p>
              I believe young people are far more capable than we typically
              allow them to be. Given the right environment, the right support,
              and the right challenges, they develop remarkably quickly — not
              just academically, but as people. That is what we&apos;re here
              to enable.
            </p>
          </div>
        </motion.div>

      </div>
    </SectionFrame>
  );
}
