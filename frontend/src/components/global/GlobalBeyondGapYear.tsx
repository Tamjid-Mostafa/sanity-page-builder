"use client";

import { motion } from "motion/react";
import { Layers } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const modularBenefits = [
  {
    label: "Stand alone as short-term experiences",
    description:
      "A single programme delivers real value — without requiring a gap year commitment.",
  },
  {
    label: "Complement academic or professional pathways",
    description:
      "Built to fit around degrees, work, or other commitments rather than replace them.",
  },
  {
    label: "Be combined over time for cumulative growth",
    description:
      "Participants can return for different programmes as they gain clarity and progress.",
  },
];

export function GlobalBeyondGapYear() {
  return (
    <SectionFrame id="beyond-gap-year" className="bg-foreground">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
            Beyond the Traditional Gap Year
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
            Explore the world with intention, not uncertainty.
          </h2>
          <p className="mt-5 text-sm sm:text-base font-light text-background leading-relaxed max-w-prose">
            Rather than promoting a single long gap year, iCollege Life focuses
            on modular international experiences. Programmes can stand alone,
            complement other pathways, or be combined over time as participants
            gain clarity.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-4" style={{ background: "oklch(0.18 0.01 255)" }}>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/15 shrink-0">
              <Layers className="w-5 h-5 text-secondary" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-light text-background leading-relaxed">
              Modular by design — each experience builds on the last.
            </p>
          </div>
        </motion.div>

        {/* Right: benefit strips */}
        <div className="flex flex-col gap-4">
          {modularBenefits.map((item, i) => (
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
              <div
                className="relative rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-all duration-300 overflow-hidden"
                style={{ background: "oklch(0.18 0.01 255)" }}
              >
                <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-secondary" aria-hidden />
                <div className="pl-4">
                  <h3 className="text-sm font-semibold text-background mb-1">
                    {item.label}
                  </h3>
                  <p className="text-sm font-light text-background leading-relaxed">
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
