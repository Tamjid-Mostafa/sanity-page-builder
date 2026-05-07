"use client";

import { motion } from "motion/react";
import { Users, Target, Globe2 } from "lucide-react";
import { SectionFrame } from "./SectionFrame";
import { AnimatedNumber } from "@/components/motion";
import { cn } from "@/lib/utils";
import type { SectionImages } from "@/sanity/queries";

const stats: {
  icon: typeof Target;
  value: number;
  suffix: string;
  label: string;
  detail: string;
  colorClass: string;
  accentBg: string;
}[] = [
  {
    icon: Target,
    value: 15,
    suffix: "+",
    label: "Countries represented",
    detail: "A genuinely international student community.",
    colorClass: "text-primary",
    accentBg: "bg-primary/10",
  },
  {
    icon: Users,
    value: 100,
    suffix: "%",
    label: "Real-world focus",
    detail: "Learning is built around experience, not just theory.",
    colorClass: "text-secondary",
    accentBg: "bg-secondary/15",
  },
  {
    icon: Globe2,
    value: 1,
    suffix: ":1",
    label: "Mentoring approach",
    detail: "Every student is known. Every voice heard.",
    colorClass: "text-primary",
    accentBg: "bg-primary/10",
  },
];

export function StudentStoriesSection({ images }: { images: Partial<SectionImages> }) {
  return (
    <SectionFrame className="bg-background">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Our International Community
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Different journeys. Clear direction.
        </h2>
        <p className="mt-3 text-sm font-light text-foreground max-w-xl leading-relaxed">
          Every learner arrives with a different path — our role is to help them move forward with clarity and confidence.
        </p>
      </motion.div>

      {/* ── Stat cards ────────────────────────────────────────────── */}
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="group bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
          >
            <div className="flex flex-col gap-4">
              <div className={cn("inline-flex items-center justify-center w-14 h-14 rounded-2xl", stat.accentBg)}>
                <stat.icon
                  className={cn("w-7 h-7 transition-transform duration-300 group-hover:scale-110", stat.colorClass)}
                  strokeWidth={1.75}
                />
              </div>
              <div>
                {/* Animated number */}
                <p className={cn("text-4xl font-heading font-bold leading-none mb-1", stat.colorClass)}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={1.6} />
                </p>
                <h3 className="text-sm font-semibold text-foreground leading-snug mb-1.5 uppercase tracking-wide">
                  {stat.label}
                </h3>
                <p className="text-sm font-normal text-foreground leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionFrame>
  );
}
