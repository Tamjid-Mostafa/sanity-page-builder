"use client";

import { motion } from "motion/react";
import { Users, BookOpen, Compass, Rocket, Sparkles } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import {
  ApproachCarousel,
  type ApproachCarouselItem,
} from "@/components/landing/redesign/ApproachCarousel";

const pillars: ApproachCarouselItem[] = [
  {
    icon: Users,
    label: "Community",
    title: "Small-cohort learning",
    description:
      "Individual attention, discussion-led classes, and strong relationships with teachers.",
    colorClass: "text-primary",
    iconBgClass: "bg-primary/10",
  },
  {
    icon: BookOpen,
    label: "Curriculum",
    title: "Academic rigour with flexibility",
    description:
      "International qualifications delivered in a focused, supportive environment.",
    colorClass: "text-secondary",
    iconBgClass: "bg-secondary/10",
  },
  {
    icon: Compass,
    label: "Mentoring",
    title: "Mentoring & guidance",
    description:
      "Students develop confidence, independence, and self-direction with personal support throughout.",
    colorClass: "text-primary",
    iconBgClass: "bg-primary/10",
  },
  {
    icon: Rocket,
    label: "Future",
    title: "Future readiness",
    description:
      "Communication, critical thinking, and decision-making embedded in every programme.",
    colorClass: "text-secondary",
    iconBgClass: "bg-secondary/10",
  },
  {
    icon: Sparkles,
    label: "Technology",
    title: "Embracing technology",
    description:
      "Modern tools — including AI-supported planning — enhance personalisation while keeping teaching human-led.",
    colorClass: "text-primary",
    iconBgClass: "bg-primary/10",
  },
];

export function OurApproach() {
  return (
    <SectionFrame
      id="our-approach"
      className="bg-background pb-2 md:pb-3"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          How we work
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Our approach
        </h2>
      </motion.div>

      <ApproachCarousel items={pillars} />
    </SectionFrame>
  );
}
