"use client";

import { motion } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";

const capabilities = [
  "Understand themselves — their strengths, motivations, and limits",
  "Develop clarity of direction rather than follow default paths",
  "Exercise independent judgment and adapt to change",
  "Take responsibility, show initiative, and lead themselves",
  "Create value, not just follow instructions",
];

export function WhyICollegeExists() {
  return (
    <>
      <SectionFrame id="why-we-exist" className="bg-background border-t border-border">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              Why we exist
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground mb-8">
              A changing world requires a different kind of education
            </h2>
            <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed mb-6">
              Academic knowledge remains important, but it&apos;s no longer
              enough on its own. Young people need to develop deeper
              capabilities:
            </p>
            <ul className="space-y-3">
              {capabilities.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="flex items-start gap-3 text-sm sm:text-base font-medium text-foreground leading-relaxed"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-5"
          >
            <div className="rounded-2xl bg-foreground p-7 md:p-9">
              <p className="text-xl sm:text-2xl font-heading font-bold text-background leading-snug mb-5">
                &ldquo;Not to replace traditional schooling — but to complete it.&rdquo;
              </p>
              <p className="text-sm font-light text-background leading-relaxed">
                We offer real-world experiences, structured mentoring, academic
                support, and the space for students to develop self-awareness
                and agency.
              </p>
            </div>
            <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed">
              Our purpose is not exam results alone, travel for its own sake,
              or impressive credentials. It&apos;s to support young people in
              developing the clarity, confidence, and self-understanding
              they&apos;ll need to design their own lives.
            </p>
          </motion.div>

        </div>
      </SectionFrame>

      {/* Full-width image break */}
      <div className="relative h-[340px] md:h-[420px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80"
          alt="Students collaborating"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-background leading-[1.15] max-w-2xl"
            >
              Education should prepare people for the world they are{" "}
              <span className="text-secondary">actually entering.</span>
            </motion.p>
          </div>
        </div>
      </div>
    </>
  );
}
