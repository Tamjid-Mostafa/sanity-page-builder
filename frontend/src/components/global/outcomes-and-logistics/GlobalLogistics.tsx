"use client";

import { motion } from "motion/react";
import {
  FileCheck,
  CalendarDays,
  UserCheck,
  MessageSquare,
  ShieldCheck,
  Eye,
  Handshake,
  Bell,
} from "lucide-react";
import { SectionFrame } from "@/components/landing/redesign/SectionFrame";
import { easing, duration, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const designItems = [
  {
    icon: FileCheck,
    label: "Short-stay visa realities",
    description: "Programmes are structured to work within common short-stay visa allowances, avoiding unnecessary complexity.",
  },
  {
    icon: CalendarDays,
    label: "Academic calendars",
    description: "Timing is planned around existing study commitments so participants do not have to choose between the two.",
  },
  {
    icon: UserCheck,
    label: "Participant maturity & readiness",
    description: "Suitability is assessed carefully; programmes are matched to the readiness and context of each participant.",
  },
  {
    icon: MessageSquare,
    label: "Communication with families & institutions",
    description: "Clear information is shared with parents and partner institutions throughout the process.",
  },
];

const safeguardingItems = [
  {
    icon: ShieldCheck,
    label: "Participant safety & well-being",
    description: "Safety is the first design constraint — logistics, supervision, and environment are assessed accordingly.",
  },
  {
    icon: Eye,
    label: "Clear supervision structures",
    description: "All in-person programmes include defined oversight arrangements appropriate to the setting and group.",
  },
  {
    icon: Handshake,
    label: "Defined partner responsibilities",
    description: "Roles and accountabilities are agreed with partner organisations before any programme begins.",
  },
  {
    icon: Bell,
    label: "Transparent family communication",
    description: "Families are kept informed before, during, and after the experience with clear and consistent updates.",
  },
];

function LogisticsBlock({
  eyebrow,
  heading,
  body,
  items,
  accentClass,
  iconColorClass,
  iconBgClass,
  delay = 0,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  items: typeof designItems;
  accentClass: string;
  iconColorClass: string;
  iconBgClass: string;
  delay?: number;
}) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay }}
        className="mb-5"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
          {eyebrow}
        </p>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight leading-[1.1] text-foreground mb-3">
          {heading}
        </h2>
        <p className="text-sm font-light text-foreground leading-relaxed max-w-prose">
          {body}
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              delay: delay + i * stagger.cards,
              duration: duration.slow,
              ease: easing.apple,
            }}
          >
            <div className="relative rounded-2xl bg-card border border-border overflow-hidden flex gap-3 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className={cn("absolute top-0 left-0 right-0 h-0.5", accentClass)} aria-hidden />
              <div className={cn("shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg mt-0.5", iconBgClass)}>
                <item.icon className={cn("w-4 h-4", iconColorClass)} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-0.5 leading-snug">
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
  );
}

export function GlobalLogistics() {
  return (
    <SectionFrame id="logistics" className="bg-background">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <LogisticsBlock
          eyebrow="Responsible Programme Design"
          heading="Practical, safe, and manageable by design."
          body="Most experiences are short-term and partner-led, allowing meaningful exposure without the complexity of long-term relocation. Planning takes into account:"
          items={designItems}
          accentClass="bg-primary"
          iconColorClass="text-primary"
          iconBgClass="bg-primary/10"
          delay={0}
        />
        <LogisticsBlock
          eyebrow="Accommodation, Supervision & Safeguarding"
          heading="Where relevant, fully supported and clearly structured."
          body="Where programmes include partner-arranged accommodation or supervised group arrangements, all provisions prioritise:"
          items={safeguardingItems}
          accentClass="bg-secondary"
          iconColorClass="text-secondary"
          iconBgClass="bg-secondary/15"
          delay={0.1}
        />
      </div>
    </SectionFrame>
  );
}
