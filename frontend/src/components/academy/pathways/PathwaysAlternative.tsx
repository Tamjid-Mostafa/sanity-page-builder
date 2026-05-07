"use client";

import { motion } from "motion/react";
import { Lightbulb, Briefcase, FlaskConical } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const alternativePaths = [
  {
    icon: Lightbulb,
    title: "Entrepreneurial & creative projects",
    description:
      "Students with a clear vision may pursue ventures, creative work, or independent projects — guided to build something with intention.",
  },
  {
    icon: Briefcase,
    title: "Internships & work experience",
    description:
      "Structured early-career exposure helps students test interests, build networks, and develop professional confidence.",
  },
  {
    icon: FlaskConical,
    title: "Specialised training & further study",
    description:
      "Vocational programmes, conservatoires, or specialised institutions may be the right fit for students with a defined focus.",
  },
];

const considerations = [
  "Readiness — is the student genuinely prepared for this route?",
  "Timing — does it make sense now, or later?",
  "Long-term flexibility — does this path keep doors open?",
];

export function PathwaysAlternative() {
  return (
    <SectionFrame id="alternative-pathways" className="bg-background">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            Alternative Pathways
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
            Not every successful life follows the same route.
          </h2>
          <p className="mt-5 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-prose">
            Students are encouraged to think carefully about readiness, timing,
            and long-term flexibility when considering these options. Whatever
            the path, iCollege Academy ensures students approach it
            thoughtfully — not impulsively.
          </p>

          <div className="mt-6 rounded-2xl bg-card border border-border p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">
              Students consider
            </p>
            <ul className="space-y-2.5">
              {considerations.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm font-light text-foreground leading-relaxed"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right: path cards */}
        <div className="flex flex-col gap-4">
          {alternativePaths.map((item, i) => (
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
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-border" aria-hidden />
                <div className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-muted">
                  <item.icon className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {item.title}
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
