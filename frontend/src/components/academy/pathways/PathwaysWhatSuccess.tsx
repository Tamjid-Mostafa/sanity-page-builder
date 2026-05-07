"use client";

import { motion } from "motion/react";
import { Award } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const successMarkers = [
  {
    label: "Graduate with recognised qualifications",
    description:
      "UK and US qualifications that are understood and valued by universities and institutions worldwide.",
  },
  {
    label: "Understand their strengths and direction",
    description:
      "Self-knowledge built through reflection, coaching, and structured academic experience — not just grades.",
  },
  {
    label: "Move to their next step with confidence",
    description:
      "Whether university, a global experience, or another pathway — students leave with clarity and capability.",
  },
];

export function PathwaysWhatSuccess() {
  return (
    <SectionFrame id="what-success" className="bg-background">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            What Success Looks Like
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
            Success means students who are ready — not just qualified.
          </h2>
          <p className="mt-5 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-prose">
            Whatever the next step — university, a global experience, or
            another pathway — the outcome is the same:{" "}
            <span className="font-semibold text-foreground">
              clarity, capability, and independence.
            </span>
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-card border border-border px-5 py-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0">
              <Award className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-light text-foreground leading-relaxed">
              Not simply completion — progression with direction and purpose.
            </p>
          </div>
        </motion.div>

        {/* Right: success markers */}
        <div className="flex flex-col gap-4">
          {successMarkers.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                delay: i * stagger.cards,
                duration: duration.slow,
                ease: easing.apple,
              }}
            >
              <div className="relative rounded-2xl bg-card border border-border p-5 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-primary" aria-hidden />
                <div className="pl-4">
                  <h3 className="text-sm font-semibold text-foreground mb-1">
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
      </div>
    </SectionFrame>
  );
}
