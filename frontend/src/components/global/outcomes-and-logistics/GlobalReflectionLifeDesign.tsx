"use client";

import { motion } from "motion/react";
import { Lightbulb, Briefcase, BookOpen, Route } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const elements = [
  {
    icon: Lightbulb,
    label: "Life design workshops",
    description:
      "Structured frameworks to help participants understand what they value, what motivates them, and how to design a path forward.",
  },
  {
    icon: Briefcase,
    label: "Career discovery workshops",
    description:
      "Exploration of professional directions through real-world exposure, conversation, and guided reflection.",
  },
  {
    icon: BookOpen,
    label: "Guided reflection & discussion",
    description:
      "Regular sessions to process experience, surface insights, and build the habit of thinking clearly under real conditions.",
  },
  {
    icon: Route,
    label: "Decision-making & direction",
    description:
      "Facilitated conversations designed to help participants think more clearly about education, work, and future choices.",
  },
];

export function GlobalReflectionLifeDesign() {
  return (
    <SectionFrame id="reflection" className="bg-foreground">
      <div className="grid lg:grid-cols-2 gap-12 items-start">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
            Reflection & Life Design
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
            Experience alone does not create growth. Reflection does.
          </h2>
          <p className="mt-5 text-sm sm:text-base font-light text-background/75 leading-relaxed max-w-prose">
            iCollege Global programmes integrate structured reflection into every
            experience — helping participants interpret what they encounter,
            understand their strengths and motivations, and think more clearly
            about education, work, and future choices.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 p-5" style={{ background: "oklch(0.18 0.01 255)" }}>
            <p className="text-sm font-semibold text-background leading-relaxed border-l-2 border-secondary pl-4">
              The goal is not to give participants answers — it is to help them
              ask better questions.
            </p>
          </div>
        </motion.div>

        {/* Right: elements */}
        <div className="flex flex-col gap-4">
          {elements.map((el, i) => (
            <motion.div
              key={el.label}
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
                className="relative rounded-2xl border border-white/10 overflow-hidden flex gap-3 p-4 transition-all duration-300 hover:border-white/20"
                style={{ background: "oklch(0.18 0.01 255)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
                <div className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/15 mt-0.5">
                  <el.icon className="w-4 h-4 text-secondary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-background mb-0.5">
                    {el.label}
                  </h3>
                  <p className="text-sm font-light text-background/70 leading-relaxed">
                    {el.description}
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
