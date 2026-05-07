"use client";

import { motion } from "motion/react";
import { Globe2, BookOpen, Compass, Briefcase } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const wantItems = [
  {
    icon: Globe2,
    label: "Exposure to different cultures and perspectives",
    description:
      "Immersion in real environments that challenge assumptions and broaden worldview.",
  },
  {
    icon: BookOpen,
    label: "Learning beyond classrooms and textbooks",
    description:
      "Structured programmes that draw on industry, community, and lived experience.",
  },
  {
    icon: Compass,
    label: "Space to reflect on direction and future choices",
    description:
      "Life design frameworks and guided conversations that help participants think clearly.",
  },
  {
    icon: Briefcase,
    label: "Vital work experience and skill development",
    description:
      "Professional exposure, project-based learning, and transferable capability.",
  },
];

export function GlobalWhatItIs() {
  return (
    <SectionFrame id="what-it-is" className="bg-background">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            What Global Experiences Are
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
            Structured international programmes — not tourism.
          </h2>
          <p className="mt-5 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-prose">
            Global Experiences at iCollege Life are delivered through
            partnerships with organisations, educators, and professional
            networks. These programmes combine experience, reflection, and
            guidance — not unstructured travel.
          </p>

          <div className="mt-6 rounded-2xl bg-card border border-border p-5">
            <p className="text-sm font-semibold text-foreground leading-relaxed border-l-2 border-primary pl-4">
              Designed for young people who want more than a stamp in their
              passport — they want to come back different.
            </p>
          </div>
        </motion.div>

        {/* Right: want items */}
        <div className="flex flex-col gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-primary"
          >
            Designed for young people who want
          </motion.p>
          {wantItems.map((item, i) => (
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
              <div className="relative rounded-2xl bg-card border border-border p-4 flex gap-3 items-start shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" aria-hidden />
                <div className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 mt-0.5">
                  <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">
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
