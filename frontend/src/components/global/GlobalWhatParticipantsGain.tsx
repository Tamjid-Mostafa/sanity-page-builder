"use client";

import { motion } from "motion/react";
import { Shield, MessageCircle, Globe2, Compass } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const gains = [
  {
    icon: Shield,
    title: "Greater confidence and independence",
    description:
      "Navigating new environments — with support — builds the kind of resilience that stays long after the programme ends.",
    accent: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: MessageCircle,
    title: "Improved communication and adaptability",
    description:
      "Working across cultures and contexts sharpens how participants listen, collaborate, and express themselves clearly.",
    accent: "bg-secondary",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/15",
  },
  {
    icon: Globe2,
    title: "Broader cultural and professional awareness",
    description:
      "Exposure to diverse industries, communities, and perspectives that most formal education simply cannot provide.",
    accent: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: Compass,
    title: "Clearer thinking about their next step",
    description:
      "Through reflection and life design frameworks, participants leave with direction — not just experience.",
    accent: "bg-secondary",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/15",
  },
];

export function GlobalWhatParticipantsGain() {
  return (
    <SectionFrame id="what-participants-gain" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          What Participants Gain
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Not just experience — direction.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-2xl">
          Participants typically leave with more than memories. Through
          reflection and life design frameworks, the goal is genuine
          development — clarity about who they are and what they want next.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {gains.map((item, index) => (
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
            whileHover={{ y: -4 }}
          >
            <div className="group relative h-full rounded-2xl bg-card border border-border overflow-hidden flex gap-4 p-5 shadow-sm hover:shadow-md transition-all duration-300">
              <div className={cn("absolute top-0 left-0 right-0 h-0.5", item.accent)} aria-hidden />
              <div className={cn("shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg mt-0.5", item.iconBg)}>
                <item.icon className={cn("w-4 h-4", item.iconColor)} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {item.title}
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
