"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

export function HumanLedTechHowWeWork() {
  return (
    <SectionFrame id="human-led-tech" className="bg-foreground border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="border-l-2 border-secondary pl-6 md:pl-8 space-y-6 max-w-3xl"
      >
        <span className="block text-4xl md:text-5xl font-heading font-bold text-secondary tabular-nums">
          05
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Human-led, technology-supported
        </h2>
        <div className="space-y-4 text-sm sm:text-base font-light text-background leading-relaxed">
          <p>
            We believe technology should enhance education — not replace human
            judgement or relationships. At iCollege Life, learning is always
            led by experienced educators and mentors, grounded in human
            connection and responsibility.
          </p>
          <p>
            We use AI-supported systems carefully — for administrative tasks,
            personalised learning pathways, and reflection prompts — but
            always with human oversight and the understanding that these tools
            serve people, not the other way around.
          </p>
          <p className="font-semibold text-background border-l-2 border-secondary pl-4">
            Technology is a tool, not the driver.
          </p>
        </div>
      </motion.div>
    </SectionFrame>
  );
}
