"use client";

import { motion } from "motion/react";
import { MapPin, Monitor } from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";

const formats = [
  {
    icon: MapPin,
    label: "In Person — Barcelona",
    description:
      "Many programmes take place in Barcelona, using the city as a real-world learning environment. Barcelona's diverse industries, cultures, and entrepreneurial community provide a unique backdrop for structured international learning.",
    accent: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: Monitor,
    label: "Online — Global Access",
    description:
      "Selected modules can be delivered online, allowing participants from around the world to join workshops, discussions, and guided reflection — without needing to travel.",
    accent: "bg-secondary",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/15",
  },
];

export function GlobalFormats() {
  return (
    <SectionFrame id="formats" className="bg-foreground">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
          In Person and Online
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-background">
          Both formats combine global perspective, structured learning, and real-world insight.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-background leading-relaxed max-w-2xl">
          Whether you join us in Barcelona or connect from home, programmes are
          designed to deliver the same depth of experience and personal development.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {formats.map((format, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: i * stagger.cards,
              duration: duration.slow,
              ease: easing.apple,
            }}
            whileHover={{ y: -4 }}
          >
            <div
              className="group relative h-full rounded-2xl border border-white/10 overflow-hidden flex flex-col p-6 gap-4 transition-all duration-300 hover:border-white/20"
              style={{ background: "oklch(0.18 0.01 255)" }}
            >
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 ${format.accent}`}
                aria-hidden
              />
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${format.iconBg}`}>
                <format.icon className={`w-5 h-5 ${format.iconColor}`} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-background mb-2">
                  {format.label}
                </h3>
                <p className="text-sm font-light text-background leading-relaxed">
                  {format.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionFrame>
  );
}
