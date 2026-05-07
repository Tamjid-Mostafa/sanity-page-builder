"use client";

import { motion } from "motion/react";
import { Compass } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration } from "@/lib/animations";

const futureAreas = [
  "Deeper experiential learning",
  "Professional and leadership development",
  "Advanced tools for reflection and decision-making",
];

export function BuildingLongTerm() {
  return (
    <SectionFrame id="building-long-term" className="bg-foreground">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-start">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
            Long-term vision
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background mb-6">
            Building for the long term
          </h2>
          <div className="space-y-4 text-sm sm:text-base font-medium text-background leading-relaxed">
            <p>
              iCollege Life is not a single program or a quick solution.
              It&apos;s a long-term educational ecosystem that we&apos;re
              building with care, stage by stage.
            </p>
            <p>
              We&apos;re not chasing trends or trying to scale quickly.
              We&apos;re building something durable, thoughtful, and capable of
              evolving as the world changes and as we learn more about what
              works.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-8 rounded-2xl bg-background p-5 flex items-center gap-4"
          >
            <Compass className="w-5 h-5 text-primary shrink-0" strokeWidth={1.5} />
            <p className="text-sm sm:text-base font-bold text-foreground leading-snug italic">
              What genuinely serves people at each stage of life?
            </p>
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-1"
          >
            Areas we&apos;re developing
          </motion.p>
          {futureAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.12, duration: duration.slow, ease: easing.apple }}
              whileHover={{ y: -4 }}
            >
              <div
                className="relative rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20"
                style={{ background: "oklch(0.18 0.01 255)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
                <div className="p-6 flex items-center gap-4">
                  <span className="text-2xl font-bold text-secondary tabular-nums select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-semibold text-background leading-relaxed">
                    {area}
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
