"use client";

import { motion } from "motion/react";
import { MapPin, Link2, Presentation, Layers } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const collaborations = [
  {
    icon: MapPin,
    label: "Short international study visits",
    description:
      "Time-limited in-person experiences designed to deliver real-world exposure within a structured learning framework.",
  },
  {
    icon: Link2,
    label: "University-linked programmes",
    description:
      "Experiences built around academic transitions — helping students gain perspective before or during degree study.",
  },
  {
    icon: Presentation,
    label: "Workshops & facilitated learning sessions",
    description:
      "Modular sessions on life design, career discovery, and decision-making, deliverable in-person or online.",
  },
  {
    icon: Layers,
    label: "Collaborative programme development",
    description:
      "Working with institutions from the ground up to design custom learning experiences aligned to their student needs.",
  },
];

export function GlobalHowWeCollaborate() {
  return (
    <SectionFrame id="how-we-collaborate" className="bg-foreground">
      <div className="grid lg:grid-cols-2 gap-12 items-start">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
            How We Collaborate
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
            Programme design and delivery, built around your students.
          </h2>
          <p className="mt-5 text-sm sm:text-base font-light text-background/75 leading-relaxed max-w-prose">
            iCollege Global acts as a programme design and delivery partner,
            working with institutions to create meaningful international
            experiences. Partnerships may include:
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 p-5" style={{ background: "oklch(0.18 0.01 255)" }}>
            <p className="text-sm font-semibold text-background leading-relaxed border-l-2 border-primary pl-4">
              We work with partners to create experiences — not just itineraries.
              The outcome is what guides every decision.
            </p>
          </div>
        </motion.div>

        {/* Right */}
        <div className="flex flex-col gap-4">
          {collaborations.map((item, i) => (
            <motion.div
              key={item.label}
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
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" aria-hidden />
                <div className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 mt-0.5">
                  <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-background mb-0.5">
                    {item.label}
                  </h3>
                  <p className="text-sm font-light text-background/70 leading-relaxed">
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
