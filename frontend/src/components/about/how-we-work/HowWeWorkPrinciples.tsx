"use client";

import { motion } from "motion/react";
import {
  Lightbulb,
  Layers,
  Globe,
  Shield,
  Users,
  Handshake,
  Sprout,
} from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import {
  ApproachCarousel,
  type ApproachCarouselItem,
} from "@/components/landing/redesign/ApproachCarousel";

const principles: ApproachCarouselItem[] = [
  {
    icon: Lightbulb,
    label: "Principle 01",
    title: "Design before delivery",
    description:
      "Programmes are designed with intention — shaped around what genuinely serves people at different stages of life. If the answer is unclear, we do not proceed.",
    colorClass: "text-primary",
    iconBgClass: "bg-primary/20",
  },
  {
    icon: Layers,
    label: "Principle 02",
    title: "Structure with flexibility",
    description:
      "Learning is shaped around individuals while remaining grounded in clear expectations and accountability. Flexibility exists to support better outcomes, not to lower them.",
    colorClass: "text-secondary",
    iconBgClass: "bg-secondary/15",
  },
  {
    icon: Globe,
    label: "Principle 03",
    title: "Environments that reflect real life",
    description:
      "Our learning environment blurs the lines between education, work, and everyday life — intentionally designed to build confidence and maturity.",
    colorClass: "text-primary",
    iconBgClass: "bg-primary/20",
  },
  {
    icon: Shield,
    label: "Principle 04",
    title: "Safeguarding & responsibility",
    description:
      "Working with young people carries real responsibility. Safeguarding, clear boundaries, and open communication with families are central — never secondary.",
    colorClass: "text-secondary",
    iconBgClass: "bg-secondary/15",
  },
  {
    icon: Users,
    label: "Principle 05",
    title: "Human-led, technology-supported",
    description:
      "Technology enhances education but cannot replace human judgement or mentoring. We use modern tools carefully — always with human oversight.",
    colorClass: "text-primary",
    iconBgClass: "bg-primary/20",
  },
  {
    icon: Handshake,
    label: "Principle 06",
    title: "Partnerships with purpose",
    description:
      "We work with a small number of carefully chosen partners who share our values. Depth of collaboration matters more than scale.",
    colorClass: "text-secondary",
    iconBgClass: "bg-secondary/15",
  },
  {
    icon: Sprout,
    label: "Principle 07",
    title: "Growing responsibly",
    description:
      "Growth is guided by one question: what genuinely serves people at each stage of life? We grow steadily and responsibly — never for its own sake.",
    colorClass: "text-primary",
    iconBgClass: "bg-primary/20",
  },
];

export function HowWeWorkPrinciples() {
  return (
    <SectionFrame className="bg-background pb-12 md:pb-14 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Our principles
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Seven principles that shape how we work
        </h2>
      </motion.div>

      <div className="relative">
        <ApproachCarousel items={principles} />
      </div>
    </SectionFrame>
  );
}
