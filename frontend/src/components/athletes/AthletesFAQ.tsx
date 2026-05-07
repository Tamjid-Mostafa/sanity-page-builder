"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { easing } from "@/lib/animations";

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Is the High School Diploma recognised?",
    a: "Yes. We work with fully accredited providers. Students use this qualification to gain admission to universities in the US, UK, and across Europe.",
  },
  {
    q: "How flexible is the schedule?",
    a: "Fully adaptable around training and competition. Students work to a structured plan while maintaining the flexibility serious athletes need.",
  },
  {
    q: "Do students get support?",
    a: "Yes. This is a guided programme, not independent online learning. Students receive weekly teaching, structure, and ongoing accountability.",
  },
  {
    q: "How many hours per week does it require?",
    a: "Typically 15–25 hours per week, depending on the student and their goals. This is designed to work alongside training schedules.",
  },
  {
    q: "Will my child fall behind academically?",
    a: "No. Students follow a structured academic pathway with clear progression. In many cases, they perform better due to increased focus and personalised support of achievement.",
  },
  {
    q: "What university options does this lead to?",
    a: "Students can progress to universities in the US, UK, and Europe. We support families in understanding and planning the best pathway.",
  },
  {
    q: "Is this suitable for all athletes?",
    a: "This is designed for committed student-athletes who are serious about sport, education and their future. It's not for those looking for an easier option, as it requires discipline and consistency.",
  },
  {
    q: "Do you offer in-person support?",
    a: "Yes. Students can access optional in-person sessions in Barcelona at The Social Hub, alongside the online programme.",
  },
  {
    q: "When can students start?",
    a: "We have limited places for the September intake. We recommend booking a call early to explore fit.",
  },
];

function FAQColumn({ items }: { items: typeof FAQ_ITEMS }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            className="border-t border-white/10 first:border-t-0"
          >
            <button
              type="button"
              onClick={() =>
                setOpenIndex(isOpen ? null : i)
              }
              className={cn(
                "w-full flex items-start justify-between gap-4 py-5 text-left transition-colors duration-200",
                isOpen ? "text-secondary" : "text-background",
              )}
              aria-expanded={isOpen}
            >
              <span className="text-sm sm:text-[15px] font-medium leading-snug pr-2">
                {item.q}
              </span>
              <span
                className={cn(
                  "shrink-0 w-6 text-center text-xl font-light leading-none select-none",
                  isOpen ? "text-secondary" : "text-background",
                )}
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: easing.smooth }}
                  className="overflow-hidden"
                >
                  <p className="text-sm leading-relaxed text-background/70 pb-5 pr-8">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function AthletesFAQ() {
  const mid = Math.ceil(FAQ_ITEMS.length / 2);
  const left = FAQ_ITEMS.slice(0, mid);
  const right = FAQ_ITEMS.slice(mid);

  return (
    <section
      className="py-16 md:py-24 bg-foreground"
      aria-label="Frequently asked questions"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl">
        <h2 className="text-center text-xl sm:text-2xl font-bold uppercase tracking-[0.12em] text-background mb-10 md:mb-14">
          FAQ
        </h2>
        <div className="grid md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <FAQColumn items={left} />
          <FAQColumn items={right} />
        </div>
      </div>
    </section>
  );
}
