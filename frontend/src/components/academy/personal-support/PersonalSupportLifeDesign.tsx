"use client";

import { motion } from "motion/react";
import { Compass, BarChart2, Brain } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const tools = [
  {
    icon: Compass,
    name: "Life Design Conversations",
    description:
      "Structured coaching conversations that help students reflect on their interests, values, and direction — moving from vague ambition to clear, personal intention.",
  },
  {
    icon: BarChart2,
    name: "Highlands Ability Battery (HAB)",
    description:
      "A research-backed assessment that identifies a student's natural abilities and working style, helping them understand what they are genuinely built to do well.",
  },
  {
    icon: Brain,
    name: "CAT4 Learning Insights",
    description:
      "Cognitive ability data used to support learning profiles — revealing reasoning strengths, study preferences, and the academic areas where students are most likely to thrive.",
  },
];

export function PersonalSupportLifeDesign() {
  return (
    <SectionFrame id="life-design" className="bg-background">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: intro text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            Life Design & Self-Understanding
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
            Personal development is part of the Academy experience.
          </h2>
          <p className="mt-5 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-prose">
            Students are supported in developing self-understanding and
            direction through reflective conversations and structured
            frameworks. Where appropriate, students may access a range of
            tools that help them better understand their abilities, make
            thoughtful academic choices, and plan their next steps.
          </p>

          <div className="mt-6 rounded-2xl bg-card border border-border p-5">
            <p className="text-sm font-semibold text-foreground leading-relaxed border-l-2 border-primary pl-4">
              These tools help students move from vague ambition to clear,
              personal intention — understanding not just where they want to go,
              but why.
            </p>
          </div>
        </motion.div>

        {/* Right: tool cards */}
        <div className="flex flex-col gap-4">
          {tools.map((tool, i) => (
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
              <div className="relative rounded-2xl bg-card border border-border p-5 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" aria-hidden />
                <div className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
                  <tool.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-sm font-light text-foreground leading-relaxed">
                    {tool.description}
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
