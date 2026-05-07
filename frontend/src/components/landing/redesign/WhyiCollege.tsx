"use client";

import { motion } from "motion/react";
import { Heart, Workflow, Users, Target, Sparkles } from "lucide-react";
import { SectionFrame } from "./SectionFrame";
import { ApproachCarousel, type ApproachCarouselItem } from "./ApproachCarousel";
import type { SectionImages } from "@/sanity/queries";
function buildItems(): ApproachCarouselItem[] {
  return [
  {
    icon: Heart,
    label: "Philosophy",
    title: "Education for life",
    description:
      "We develop thinking, judgement, and self-understanding — alongside academic outcomes.",
    colorClass: "text-secondary",
    iconBgClass: "bg-secondary/10",
  },
  {
    icon: Workflow,
    label: "Framework",
    title: "Clear educational design",
    description:
      "Every programme follows a simple structure: Learn. Design. Build.",
    colorClass: "text-primary",
    iconBgClass: "bg-primary/10",
  },
  {
    icon: Users,
    label: "Approach",
    title: "Personal by design",
    description:
      "Learning is shaped around the individual, not a one-size-fits-all system.",
    colorClass: "text-secondary",
    iconBgClass: "bg-secondary/10",
  },
  {
    icon: Target,
    label: "Outcomes",
    title: "Real outcomes",
    description:
      "Qualifications, projects, portfolios, and real-world experience.",
    colorClass: "text-primary",
    iconBgClass: "bg-primary/10",
  },
  {
    icon: Sparkles,
    label: "Future-ready",
    title: "Built for change",
    description:
      "Preparing learners for uncertainty, technology, and modern working life.",
    colorClass: "text-secondary",
    iconBgClass: "bg-secondary/10",
  },
 ];
}
export function WhyiCollegeSection({ images: _images }: { images: Partial<SectionImages> }) {
  const items = buildItems();
  return (
    <SectionFrame className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Our approach
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          What makes us different.
        </h2>
      </motion.div>

      <ApproachCarousel items={items} />
    </SectionFrame>
  );
}
