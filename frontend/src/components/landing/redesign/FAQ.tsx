"use client";

import { motion } from "motion/react";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { openCalendly } from "@/lib/site-cta";
import Image from "next/image";
import { SectionFrame } from "./SectionFrame";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import faqIllustration from "../../../../assets/illustrations/undraw_deep-thinker-avatar_6xg6.svg";

// ─── Data ────────────────────────────────────────────────────────────────────

interface FAQItem {
  q: string;
  a: string;
}

interface FAQGroup {
  label: string;
  accent: "primary" | "secondary";
  items: FAQItem[];
}

const FAQ_GROUPS: FAQGroup[] = [
  {
    label: "About iCollege",
    accent: "primary",
    items: [
      {
        q: "What is iCollege Life?",
        a: "iCollege Life is a selective international education organisation based in Barcelona. We work with young people at pivotal moments — when direction, independence, and identity begin to take shape.\n\nOur programmes combine recognised qualifications, structured mentorship, and a global perspective. Education here is preparation for a life of meaning, competence, and responsibility — not simply examination.",
      },
      {
        q: "What makes iCollege Life different?",
        a: "iCollege Life is shaped by three commitments:\n\n• Depth over superficiality — learning is approached seriously, with focus and discipline.\n• Responsibility before entitlement — support is matched with expectation; independence is developed deliberately.\n• Exposure beyond the classroom — education connects to the wider world, culturally, intellectually, and practically.\n\nOur aim is not only examination success, but the formation of capable, grounded adults prepared for a life worth living.",
      },
    ],
  },
  {
    label: "iCollege Academy",
    accent: "secondary",
    items: [
      {
        q: "What is iCollege Academy?",
        a: "iCollege Academy is our academic pathway for students aged 15–18. Students complete internationally recognised qualifications (such as IGCSEs, A Levels, and HSDs) within a small, focused environment.\n\nWe integrate:\n• Academic rigour\n• Structured study expectations\n• In-person learning and online opportunities\n• Carefully integrated online subject teaching\n• Ongoing mentoring and accountability\n\nHybrid delivery provides access to specialist teachers while maintaining daily structure and supervision.",
      },
      {
        q: "Who is iCollege Academy designed for?",
        a: "We work best with:\n• Motivated students seeking focus, depth, and more than what traditional education offers\n• Young adults at meaningful transition points\n• Families who value structure and long-term thinking\n\nAdmission is based on readiness, goals, and fit. Students who resist academic commitment, require constant supervision, or seek a low-expectation setting may not thrive here. We provide guidance and support — but we expect engagement and responsibility. Growth requires participation.",
      },
      {
        q: "Are Academy programmes academically rigorous?",
        a: "Yes. Students follow recognised international qualifications. Timetables are structured. Progress is monitored.\n\nUniversity progression in the UK, USA, Europe, and internationally remains fully open to qualified students. Academic credibility matters.",
      },
      {
        q: "How does online learning work within the Academy?",
        a: "Students are based in Barcelona but may receive part of their instruction through structured online teaching with specialist educators.\n\nOnline delivery is integrated into the timetable and supervised daily. Flexibility does not mean informality. Standards remain consistent.",
      },
    ],
  },
  {
    label: "iCollege Global",
    accent: "primary",
    items: [
      {
        q: "What is iCollege Global?",
        a: "iCollege Global serves young adults (typically 18–26) navigating transition. Some arrive after school. Others after university. All arrive at a moment of reflection.\n\nProgrammes may include:\n• Structured gap-year experiences\n• Leadership and entrepreneurial development\n• International collaboration\n• Academic or professional redirection\n\nIt is not tourism. It is a deliberate period of growth and forward movement.",
      },
      {
        q: "Who is iCollege Global designed for?",
        a: "iCollege Global serves thoughtful young adults who recognise that transition requires intention. It is well-suited to those who:\n• Are academically capable but seeking clarity\n• Want structure during a gap year rather than drift\n• Are open to challenge and honest self-assessment\n• Prefer guided development over passive travel\n\nIt may not suit those looking for an extended holiday or a low-accountability environment.",
      },
    ],
  },
  {
    label: "Process & Investment",
    accent: "secondary",
    items: [
      {
        q: "How many students do you accept?",
        a: "Cohorts are intentionally limited. Small numbers allow meaningful supervision, mentoring, and community. Capacity is capped each year.",
      },
      {
        q: "What happens when we book a call?",
        a: "A consultation explores:\n• Academic background\n• Current context\n• Goals and direction\n• Suitability\n\nIf alignment exists, we outline the next steps. If not, we advise honestly. Clarity matters more than persuasion.",
      },
      {
        q: "What is the investment?",
        a: "iCollege Life operates as a premium, small-cohort model. Full programme details — including structure and investment — are discussed during consultation.\n\nFamilies who choose iCollege Life prioritise quality, focus, and long-term development.",
      },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Renders plain text, supporting `•` bullet lines and `\n\n` paragraphs. */
function FAQBody({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");
  return (
    <div className="space-y-3 text-foreground font-light leading-relaxed text-sm">
      {paragraphs.map((para, pi) => {
        const lines = para.split("\n");
        const hasBullets = lines.some((l) => l.trimStart().startsWith("•"));
        if (hasBullets) {
          return (
            <ul key={pi} className="space-y-2">
              {lines.map((line, li) => {
                const isBullet = line.trimStart().startsWith("•");
                const content = isBullet ? line.trimStart().slice(1).trim() : line;
                return isBullet ? (
                  <li key={li} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{content}</span>
                  </li>
                ) : content ? (
                  <p key={li}>{content}</p>
                ) : null;
              })}
            </ul>
          );
        }
        return <p key={pi}>{para}</p>;
      })}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function FAQSection() {
  return (
    <SectionFrame className="bg-background">
      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            Questions answered
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.625rem] font-heading font-bold tracking-tight leading-[1.08] text-foreground">
            Frequently asked questions.
          </h2>
        </div>
        <button
          type="button"
          onClick={() => openCalendly()}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-foreground transition-colors shrink-0 cursor-pointer"
        >
          <Calendar className="h-4 w-4" />
          Book a Conversation
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </motion.div>

      {/* One accordion for the complete FAQ section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="faq-all" className="border-b-0">
            <AccordionTrigger
              className={cn(
                "px-6 py-5 text-left transition-colors duration-200 hover:no-underline",
                "text-base font-semibold text-foreground hover:text-foreground data-[state=open]:text-foreground"
              )}
            >
              <div className="flex w-full items-center justify-between gap-4 pr-3">
                <div className="min-w-0">
                  <p>View all frequently asked questions</p>
                  <p className="mt-1 text-xs font-normal text-foreground">
                    Tap to expand the complete section
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-8">
                {FAQ_GROUPS.map((group) => (
                  <div key={group.label} className="space-y-4">
                    <p
                      className={cn(
                        "text-[11px] font-semibold uppercase tracking-[0.13em]",
                        group.accent === "primary" ? "text-primary" : "text-secondary-foreground"
                      )}
                    >
                      {group.label}
                    </p>

                    <div className="space-y-5">
                      {group.items.map((item) => (
                        <div key={item.q} className="space-y-2">
                          <h3 className="text-base font-semibold text-foreground">{item.q}</h3>
                          <FAQBody text={item.a} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </SectionFrame>
  );
}
