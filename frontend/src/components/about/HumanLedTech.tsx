"use client";

import { motion } from "motion/react";
import { User, HeartHandshake, Cpu } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration } from "@/lib/animations";

const principles = [
  {
    text: "Led by experienced educators and mentors",
    icon: User,
    accent: "bg-primary",
  },
  {
    text: "Grounded in human connection and responsibility",
    icon: HeartHandshake,
    accent: "bg-secondary",
  },
  {
    text: "Supported by modern tools, which add genuine value",
    icon: Cpu,
    accent: "bg-primary",
  },
];

export function HumanLedTech() {
  return (
    <SectionFrame id="human-led-tech" className="bg-foreground">
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20 items-start">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
            Our approach
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background mb-6">
            Human-led, technology-supported
          </h2>
          <div className="space-y-4 text-sm sm:text-base font-medium text-background leading-relaxed">
            <p>
              Technology can enhance learning, but it can&apos;t replace the
              human judgement, relationships, and mentoring that matter most in
              education.
            </p>
            <p>
              We use AI-supported systems carefully and responsibly — for
              administrative tasks, personalised learning pathways, and
              reflection prompts — but always with human oversight and the
              understanding that these tools serve people, not the other way
              around.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-background p-5">
            <p className="text-base font-bold text-foreground">
              Technology is a tool, not the driver.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {principles.map((p, index) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: index * 0.12, duration: duration.slow, ease: easing.apple }}
                whileHover={{ x: 4 }}
              >
                <div
                  className="relative rounded-2xl border border-white/10 overflow-hidden flex items-start gap-4 p-5 transition-all duration-300 hover:border-white/20"
                  style={{ background: "oklch(0.18 0.01 255)" }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-0.5 ${p.accent}`} aria-hidden />
                  <div className="mt-0.5 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 shrink-0">
                    <Icon className="w-5 h-5 text-background" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold text-background leading-relaxed pt-1">
                    {p.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </SectionFrame>
  );
}
