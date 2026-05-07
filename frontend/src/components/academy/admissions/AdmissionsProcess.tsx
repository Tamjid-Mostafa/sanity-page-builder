"use client";

import { motion } from "motion/react";
import { MessageCircle, User, FileText, CheckSquare } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration } from "@/lib/animations";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Initial Conversation",
    description:
      "Families begin with a short conversation to discuss the student's background, goals, and current situation.",
    colorClass: "text-primary",
    accentBar: "bg-primary",
  },
  {
    icon: User,
    step: "02",
    title: "Student Discussion",
    description:
      "We speak directly with the student to understand their interests, motivation, and learning needs.",
    colorClass: "text-secondary",
    accentBar: "bg-secondary",
  },
  {
    icon: FileText,
    step: "03",
    title: "Academic Review",
    description:
      "Previous school records or transcripts are reviewed to understand the student's academic profile. CAT4 assessments may also provide insight into learning strengths and academic potential.",
    colorClass: "text-primary",
    accentBar: "bg-primary",
  },
  {
    icon: CheckSquare,
    step: "04",
    title: "Offer & Enrolment",
    description:
      "If the Academy is a good fit, we provide a place and guide families through the full enrolment process.",
    colorClass: "text-secondary",
    accentBar: "bg-secondary",
  },
];

export function AdmissionsProcess() {
  return (
    <SectionFrame id="admissions-process" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          How it works
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Our Admissions Approach
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-2xl">
          Admissions at iCollege Academy are selective but personal. Our goal is
          not to select only the highest-achieving students, but to ensure that
          each student benefits from the environment and contributes positively
          to the learning community.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {steps.map((s, index) => (
          <motion.div
            key={s.step}
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
              <div className={cn("absolute top-0 left-0 right-0 h-0.5", s.accentBar)} aria-hidden />
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                    <s.icon className={cn("w-4 h-4", s.colorClass)} strokeWidth={1.5} />
                  </div>
                  <span className="text-2xl font-bold text-background select-none tabular-nums">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-background leading-snug">
                  {s.title}
                </h3>
                <p className="text-sm font-light text-background leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionFrame>
  );
}
