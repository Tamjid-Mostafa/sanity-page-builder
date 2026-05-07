"use client";

import { motion } from "motion/react";
import { ShieldCheck, Eye, MessageSquare } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const priorities = [
  {
    icon: ShieldCheck,
    label: "Safeguarding & student wellbeing",
    description:
      "Student safety is the first design constraint. All logistics, supervision, and environment are evaluated accordingly.",
    accent: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: Eye,
    label: "Clear supervision structures",
    description:
      "All in-person programmes include defined oversight arrangements appropriate to the context and participant group.",
    accent: "bg-secondary",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/15",
  },
  {
    icon: MessageSquare,
    label: "Transparent communication",
    description:
      "Partner institutions and families receive clear, consistent information before, during, and after each programme.",
    accent: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
];

export function GlobalResponsibleDelivery() {
  return (
    <SectionFrame id="responsible-delivery" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Responsible Delivery
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Quality and responsibility over scale or speed.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-2xl">
          All programmes are designed with careful attention to the things that
          matter most to partner institutions and families:
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-4">
        {priorities.map((item, i) => (
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
