"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Check, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { easing, duration, stagger } from "@/lib/animations";

const benefits = [
  "Stronger athlete recruitment",
  "Better parent reassurance",
  "Improved retention",
  "No school-building burden",
  "Flexible fit around training schedules",
  "University pathway credibility",
];

const partnershipOptions = [
  {
    title: "Referral Partner",
    description:
      "Refer families to iCollege and we handle everything. No infrastructure needed — your athletes get a credible academic pathway and you stay focused on performance.",
  },
  {
    title: "Integrated Academy Pathway",
    description:
      "A closer collaboration: iCollege academic support is embedded into your academy's structure, giving athletes a seamless education experience alongside their training.",
  },
];

export function AthletesForSportsAcademies() {
  return (
    <section
      id="sports-academies"
      className="py-14 md:py-24 bg-foreground"
      aria-label="For Sports Academies"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-2">
            For Sports Academies
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.875rem] font-heading font-bold tracking-tight leading-tight text-background mb-4">
            Give your athletes a credible academic pathway without having to build a school.
          </h2>
          <p className="text-sm sm:text-base font-light text-background leading-relaxed mb-3">
            Many sports academies attract ambitious young athletes, but families still need a clear answer to one question:
          </p>
          <p className="text-sm sm:text-base font-semibold text-background border-l-2 border-secondary pl-4 mb-4">
            "What about their education?"
          </p>
          <p className="text-sm sm:text-base font-light text-background leading-relaxed mb-2">
            iCollege provides flexible academic pathways around the student and academy needs — not the other way around.
          </p>
          <p className="text-sm sm:text-base font-semibold text-secondary">
            You focus on performance. We support the academic pathway.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 mb-12">
          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-4">
              Benefits
            </p>
            <ul className="space-y-3">
              {benefits.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * stagger.list, duration: 0.4 }}
                  className="flex items-start gap-3 text-sm sm:text-base font-light text-background leading-relaxed"
                >
                  <Check
                    className="h-4 w-4 shrink-0 mt-0.5 text-secondary"
                    strokeWidth={2}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Partnership options */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary mb-4">
              Partnership Options
            </p>
            <div className="flex flex-col gap-4">
              {partnershipOptions.map((option, i) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * stagger.cards,
                    duration: duration.slow,
                    ease: easing.apple,
                  }}
                  className="relative rounded-2xl border border-white/10 overflow-hidden flex flex-col p-5"
                  style={{ background: "oklch(0.18 0.01 255)" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary" aria-hidden />
                  <h3 className="text-base font-heading font-bold text-background mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm font-light text-background leading-relaxed">
                    {option.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
        >
          <Button
            asChild
            size="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm rounded-xl shadow-md group"
          >
            <a href="mailto:info@icollege.life">
              <Mail className="mr-2 h-4 w-4" strokeWidth={1.5} />
              info@icollege.life
              <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>
          </Button>
          <Button
            asChild
            size="default"
            variant="outline"
            className="border-white/20 bg-white/5 text-background hover:bg-white/10 hover:text-background hover:border-white/40 px-6 py-2.5 text-sm rounded-xl group"
          >
            <a
              href="https://wa.me/34618332384"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-4 w-4" strokeWidth={1.5} />
              WhatsApp: +34 618 332 384
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
