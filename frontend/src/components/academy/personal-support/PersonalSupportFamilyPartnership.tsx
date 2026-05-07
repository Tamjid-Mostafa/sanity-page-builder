"use client";

import { motion } from "motion/react";
import { Bell, RefreshCw, Map } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const parentExpectations = [
  {
    icon: Bell,
    heading: "Clear communication about progress",
    body: "Parents receive consistent, honest updates — no surprises, no ambiguity about how their child is doing.",
  },
  {
    icon: RefreshCw,
    heading: "Regular updates and conversations",
    body: "Scheduled check-ins and responsive communication ensure families are always part of the picture.",
  },
  {
    icon: Map,
    heading: "Guidance on academic and future decisions",
    body: "From subject choices to post-school pathways, families have access to informed, experienced guidance.",
  },
];

export function PersonalSupportFamilyPartnership() {
  return (
    <SectionFrame id="family-partnership" className="bg-foreground">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: heading + philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
            Family Partnership
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
            Support works best when everyone is aligned.
          </h2>
          <p className="mt-5 text-sm sm:text-base font-light text-background leading-relaxed max-w-prose">
            When students, educators, and families work together, outcomes
            improve significantly. iCollege Academy treats families as genuine
            partners in their child&apos;s development — not as outside
            observers.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 p-5" style={{ background: "oklch(0.18 0.01 255)" }}>
            <p className="text-sm font-semibold text-background leading-relaxed border-l-2 border-secondary pl-4">
              Students are treated as young adults — appropriately trusted and
              carefully guided as they develop independence.
            </p>
          </div>
        </motion.div>

        {/* Right: expectation cards */}
        <div className="flex flex-col gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary"
          >
            Parents can expect
          </motion.p>
          {parentExpectations.map((item, i) => (
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
                className="relative rounded-2xl border border-white/10 p-5 flex gap-4 items-start hover:border-white/20 transition-all duration-300 overflow-hidden"
                style={{ background: "oklch(0.18 0.01 255)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
                <div className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-secondary/15">
                  <item.icon className="w-4 h-4 text-secondary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-background mb-1">
                    {item.heading}
                  </h3>
                  <p className="text-sm font-light text-background leading-relaxed">
                    {item.body}
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
