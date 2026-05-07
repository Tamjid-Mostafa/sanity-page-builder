"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { cn } from "@/lib/utils";
import { easing, duration, stagger } from "@/lib/animations";

type FAQItem = {
  q: string;
  a: string;
  bullets?: string[];
};

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "What are Global Experiences at iCollege Life?",
    a: "Global Experiences are structured international learning experiences designed to help students and young adults gain perspective, confidence, and clarity through place-based learning and guided reflection.",
  },
  {
    q: "Who are Global Experiences designed for?",
    a: "Global Experiences are suited to:",
    bullets: [
      "Students and young adults at key moments of transition",
      "Partner schools and colleges seeking high-quality international learning experiences",
    ],
  },
  {
    q: "Are Global Experiences full gap years?",
    a: "No. Global Experiences are not long, unstructured gap years. They are short-format, modular experiences designed to complement academic, professional, or transitional pathways.",
  },
  {
    q: "How long do Global Experiences last?",
    a: "Global Experiences vary in format and length depending on the context and partner. Experiences are intentionally time-bound and manageable, reducing legal, logistical, and personal complexity. Specific details are shared clearly during consultation.",
  },
  {
    q: "What do participants do during a Global Experience?",
    a: "Depending on the experience, participants may engage in:",
    bullets: [
      "Structured workshops and discussions",
      "Applied or project-based activities",
      "Site visits and real-world exposure",
      "Guided reflection and learning sessions",
    ],
  },
  {
    q: "How are Global Experiences supported and supervised?",
    a: "All Global Experiences are delivered through trusted partners and include:",
    bullets: [
      "Clear structure and expectations",
      "Appropriate supervision and safeguarding",
      "Defined roles and responsibilities",
    ],
  },
  {
    q: "Do Global Experiences replace academic study?",
    a: "No. Global Experiences are designed to complement academic learning, not replace it. They often support clearer thinking about future study, work, or life direction.",
  },
  {
    q: "Where do Global Experiences take place?",
    a: "Global Experiences are delivered in collaboration with international partners and may take place in different locations depending on the programme. All locations and arrangements are communicated clearly in advance.",
  },
  {
    q: "How do I know if a Global Experience is the right fit?",
    a: "The best place to start is a conversation. We encourage students, families, and partners to book a call to discuss suitability, timing, and intended outcomes.",
  },
];

function FAQCard({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        delay: (index % 5) * stagger.cards,
        duration: duration.slow,
        ease: easing.apple,
      }}
    >
      <div className="relative rounded-2xl bg-card border border-border overflow-hidden transition-shadow duration-300 hover:shadow-sm">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" aria-hidden />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full flex items-start justify-between gap-4 px-5 py-5 text-left"
        >
          <span
            className={cn(
              "text-sm sm:text-[15px] font-semibold leading-snug transition-colors duration-200",
              open ? "text-primary" : "text-foreground",
            )}
          >
            {item.q}
          </span>
          <span
            className={cn(
              "shrink-0 mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center text-sm font-light transition-all duration-200",
              open
                ? "border-primary text-primary bg-primary/8"
                : "border-border text-foreground",
            )}
            aria-hidden
          >
            {open ? "−" : "+"}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: easing.smooth }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-3">
                <p className="text-sm font-light text-foreground leading-relaxed">
                  {item.a}
                </p>
                {item.bullets && (
                  <ul className="space-y-2 pl-1">
                    {item.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm font-light text-foreground leading-relaxed"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
                          aria-hidden
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function GlobalFAQ() {
  const mid = Math.ceil(FAQ_ITEMS.length / 2);
  const left = FAQ_ITEMS.slice(0, mid);
  const right = FAQ_ITEMS.slice(mid);

  return (
    <SectionFrame id="faq" className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          Common Questions
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
          Everything you need to know.
        </h2>
        <p className="mt-4 text-sm sm:text-base font-light text-foreground leading-relaxed max-w-2xl">
          If something isn&apos;t covered here, book a call — we&apos;re happy
          to answer any questions directly.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-3 md:gap-4 items-start">
        <div className="flex flex-col gap-3 md:gap-4">
          {left.map((item, i) => (
            <FAQCard key={item.q} item={item} index={i} />
          ))}
        </div>
        <div className="flex flex-col gap-3 md:gap-4">
          {right.map((item, i) => (
            <FAQCard key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
