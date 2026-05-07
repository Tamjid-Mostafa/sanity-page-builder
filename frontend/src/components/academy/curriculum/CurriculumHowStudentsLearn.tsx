"use client";

import { motion } from "motion/react";
import { Users, BookOpen, GraduationCap, Monitor } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration } from "@/lib/animations";
import { cn } from "@/lib/utils";

const methods = [
  {
    icon: Users,
    step: "01",
    title: "Small-group teaching",
    description:
      "Discussion-led classes and strong teacher relationships. Every student is known and can contribute meaningfully.",
    colorClass: "text-primary",
    accentBar: "bg-primary",
  },
  {
    icon: BookOpen,
    step: "02",
    title: "Guided independent study",
    description:
      "Students develop focus, academic responsibility, and resilience — essential skills for university and beyond.",
    colorClass: "text-secondary",
    accentBar: "bg-secondary",
  },
  {
    icon: GraduationCap,
    step: "03",
    title: "Specialist teaching",
    description:
      "Access to teachers locally and internationally where needed, ensuring the right expertise for every subject.",
    colorClass: "text-primary",
    accentBar: "bg-primary",
  },
  {
    icon: Monitor,
    step: "04",
    title: "Structured online learning",
    description:
      "Online learning is always structured and integrated into the wider academic programme — never isolated or unsupported.",
    colorClass: "text-secondary",
    accentBar: "bg-secondary",
  },
];

export function CurriculumHowStudentsLearn() {
  return (
    <SectionFrame id="how-students-learn" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          Learning
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          How Students Learn
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-2xl">
          Learning combines in-person teaching with structured online support
          where appropriate. Students benefit from a range of approaches
          designed to build independence and academic confidence.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {methods.map((method, index) => (
          <motion.div
            key={method.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: index * 0.1,
              duration: duration.slow,
              ease: easing.apple,
            }}
          >
            <div
              className="group relative h-full rounded-2xl border border-white/10 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:border-white/20"
              style={{ background: "oklch(0.18 0.01 255)" }}
            >
              <div className={cn("absolute top-0 left-0 right-0 h-0.5", method.accentBar)} aria-hidden />
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                    <method.icon className={cn("w-4 h-4", method.colorClass)} strokeWidth={1.5} />
                  </div>
                  <span className="text-2xl font-bold text-background select-none tabular-nums">
                    {method.step}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-background leading-snug">
                  {method.title}
                </h3>
                <p className="text-sm font-light text-background leading-relaxed">
                  {method.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionFrame>
  );
}
