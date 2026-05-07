"use client";

import { motion } from "motion/react";
import { Sparkles, Heart, Target, TrendingUp } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

const focusAreas = [
  { text: "Thoughtful guidance", icon: Target },
  { text: "Honest conversations", icon: Heart },
  { text: "Realistic expectations", icon: TrendingUp },
  { text: "Long-term development", icon: Sparkles },
];

export function ClarityOverHype() {
  return (
    <SectionFrame id="clarity-over-hype" className="bg-background border-t border-border">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            Our philosophy
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground mb-8">
            Clarity over hype
          </h2>
          <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed mb-6">
            iCollege Life is intentionally selective and considered. We
            don&apos;t promise shortcuts, guaranteed outcomes, or
            one-size-fits-all solutions. What we do offer is:
          </p>

          <div className="grid grid-cols-2 gap-3">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                  className="flex flex-col gap-2 rounded-xl bg-foreground p-4 cursor-default"
                >
                  <Icon className="w-4 h-4 text-secondary shrink-0" />
                  <span className="text-sm font-semibold text-background">{area.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-5 text-sm sm:text-base font-medium text-foreground leading-relaxed"
        >
          <p>
            We work in a flexible way, shaped around the needs, strengths, and
            circumstances of each individual. But that flexibility is grounded
            in clear standards, honest feedback, and mutual accountability.
          </p>
          <p>
            Progress comes from consistency, effort, and reflection — not from
            pressure, performance theatre, or trying to appear impressive.
            We&apos;re not interested in marketing narratives or superficial
            metrics. We&apos;re interested in whether students are genuinely
            learning, growing, and developing the clarity they&apos;ll need for
            the years ahead.
          </p>

          <div className="rounded-2xl bg-card border border-border p-6 mt-2">
            <p className="text-base font-heading font-bold text-foreground leading-snug">
              &ldquo;We&apos;re not interested in superficial metrics — we&apos;re interested in whether students are genuinely growing.&rdquo;
            </p>
          </div>
        </motion.div>

      </div>
    </SectionFrame>
  );
}
