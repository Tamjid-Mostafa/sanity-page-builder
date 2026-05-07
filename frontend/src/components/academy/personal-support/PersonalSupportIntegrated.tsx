"use client";

import { motion } from "motion/react";
import { Users, MessageSquare, BookOpen, CalendarCheck, TrendingUp } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const supportItems = [
  {
    icon: Users,
    title: "Small-cohort teaching",
    description: "Academic guidance delivered in cohorts where every student receives individual attention and is known personally.",
    accent: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    title: "Regular mentoring",
    description: "Consistent progress conversations that address both academic development and personal direction.",
    accent: "bg-secondary",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
  },
  {
    icon: BookOpen,
    title: "Study planning & organisation",
    description: "Structured support to help students build effective routines, manage workload, and develop independent study skills.",
    accent: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: CalendarCheck,
    title: "Structured academic check-ins",
    description: "Scheduled reviews that keep students on track, identify early challenges, and celebrate genuine progress.",
    accent: "bg-secondary",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
  },
  {
    icon: TrendingUp,
    title: "Proactive & normalised",
    description: "Support is adjusted as students mature — built to develop independence and personal confidence, not dependency.",
    accent: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
];

export function PersonalSupportIntegrated() {
  return (
    <SectionFrame id="integrated-support" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Integrated Support
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          All enrolled students benefit from a high-touch support model.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-2xl">
          Support is proactive, normalised, and adjusted as students mature. The
          aim is to ensure students remain both academically engaged and
          personally confident.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {supportItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: index * stagger.cards,
              duration: duration.slow,
              ease: easing.apple,
            }}
            className={cn(index === 4 ? "sm:col-span-2 lg:col-span-1" : "")}
          >
            <div
              className="group relative h-full rounded-2xl border border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-white/20"
              style={{ background: "oklch(0.18 0.01 255)" }}
            >
              <div className={cn("absolute top-0 left-0 right-0 h-0.5", item.accent)} aria-hidden />
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className={cn("inline-flex items-center justify-center w-9 h-9 rounded-lg", item.iconBg)}>
                  <item.icon className={cn("w-4 h-4", item.iconColor)} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-background leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-background leading-relaxed">
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
