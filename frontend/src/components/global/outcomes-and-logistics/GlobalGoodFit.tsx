"use client";

import { motion } from "motion/react";
import { Globe2, BookOpen, Sparkles, Star } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const qualities = [
  {
    icon: Globe2,
    label: "International experience with purpose",
    description:
      "They are looking for perspective and insight — not a holiday or a gap in their CV.",
  },
  {
    icon: BookOpen,
    label: "Structured learning & reflection",
    description:
      "They value the guided element — workshops, discussion, and the time to think properly.",
  },
  {
    icon: Sparkles,
    label: "Open to new environments & ideas",
    description:
      "They are willing to engage with people, places, and perspectives that challenge their assumptions.",
  },
  {
    icon: Star,
    label: "Curiosity, responsibility & maturity",
    description:
      "They approach the experience ready to take ownership, engage fully, and make the most of it.",
  },
];

export function GlobalGoodFit() {
  return (
    <SectionFrame id="good-fit" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          A Good Fit For
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Participants who bring intention and readiness.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background/75 leading-relaxed max-w-2xl">
          These programmes work best for participants who approach the experience
          as an opportunity to think more clearly about their direction and next
          steps — not as passive observers. They:
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {qualities.map((item, i) => (
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
            <div
              className="group relative h-full rounded-2xl border border-white/10 overflow-hidden flex gap-3 p-5 transition-all duration-300 hover:border-white/20"
              style={{ background: "oklch(0.18 0.01 255)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
              <div className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/15 mt-0.5">
                <item.icon className="w-4 h-4 text-secondary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-background mb-1 leading-snug">
                  {item.label}
                </h3>
                <p className="text-sm font-light text-background/70 leading-relaxed">
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
