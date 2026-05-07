"use client";

import { motion } from "motion/react";
import {
  School,
  GraduationCap,
  BookMarked,
  Plane,
  Briefcase,
} from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const partnerTypes = [
  {
    icon: School,
    label: "International schools & sixth forms",
    description:
      "Providing structured international learning experiences for secondary students at key transition moments.",
    accent: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: GraduationCap,
    label: "Colleges & universities",
    description:
      "Supporting students preparing for or taking a period away from full-time academic study.",
    accent: "bg-secondary",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/15",
  },
  {
    icon: BookMarked,
    label: "University pathway providers",
    description:
      "Complementing academic preparation programmes with real-world exposure and life design components.",
    accent: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: Plane,
    label: "Study-abroad organisations",
    description:
      "Collaborating on structured, purpose-driven international learning experiences with clear outcomes.",
    accent: "bg-secondary",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/15",
  },
  {
    icon: Briefcase,
    label: "Professional & entrepreneurial networks",
    description:
      "Bringing professional context, mentorship, and real-world exposure into participant learning journeys.",
    accent: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
];

export function GlobalWhoWeWorkWith() {
  return (
    <SectionFrame id="who-we-work-with" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Who We Work With
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Each partnership is built around the institution and its students.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-2xl">
          These collaborations help participants gain a global perspective,
          professional exposure, and meaningful learning environments. We
          collaborate with institutions and organisations such as:
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partnerTypes.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: i * stagger.cards,
              duration: duration.slow,
              ease: easing.apple,
            }}
            whileHover={{ y: -4 }}
          >
            <div className="group relative h-full rounded-2xl bg-card border border-border overflow-hidden flex flex-col gap-3 p-5 shadow-sm hover:shadow-md transition-all duration-300">
              <div
                className={cn("absolute top-0 left-0 right-0 h-0.5", item.accent)}
                aria-hidden
              />
              <div
                className={cn(
                  "inline-flex items-center justify-center w-9 h-9 rounded-lg",
                  item.iconBg,
                )}
              >
                <item.icon
                  className={cn("w-4 h-4", item.iconColor)}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1 leading-snug">
                  {item.label}
                </h3>
                <p className="text-sm font-light text-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionFrame>
  );
}
