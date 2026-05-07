"use client";

import { motion } from "motion/react";
import { Check, Globe, MapPin, Star } from "lucide-react";
import { easing, duration, stagger } from "@/lib/animations";

const plans = [
  {
    icon: Globe,
    name: "Flex Online Athlete Pathway",
    price: "€7,500",
    enrolment: "€1,000 enrolment fee",
    period: "per year",
    blurb: "For athletes who train or travel frequently and need a flexible academic route.",
    features: [
      "HSD pathway",
      "Academic planning",
      "Progress tracking",
      "Online mentoring",
      "Teacher support",
    ],
    addons: "AP/SAT/Additional English support and university guidance available as add-ons.",
    featured: false,
    recommended: false,
  },
  {
    icon: MapPin,
    name: "University Athlete Pathway — Barcelona",
    price: "€13,500",
    enrolment: "€1,500 enrolment fee",
    period: "per year",
    blurb: "For athletes training in Barcelona who want structure, AP/SAT/English support, and university pathway guidance.",
    features: [
      "HSD pathway",
      "Barcelona learning hub",
      "Structured weekly support",
      "AP pathway support",
      "SAT preparation",
      "University guidance",
    ],
    addons: null,
    featured: true,
    recommended: true,
  },
  {
    icon: Star,
    name: "Premier Athlete Pathway — Online/Barcelona",
    price: "From €19,500",
    enrolment: "€2,000 enrolment fee",
    period: "per year",
    blurb: "For families wanting deeper personalisation, 1:1 tutoring, and bespoke university planning.",
    features: [
      "Everything in the University Athlete Pathway",
      "Regular 1:1 tutoring",
      "Enhanced AP/SAT support",
      "Athlete recruitment guidance",
      "Parent reviews",
      "Bespoke university strategy",
    ],
    addons: "A premium alternative to traditional school: similar investment, far greater personalisation.",
    featured: false,
    recommended: false,
  },
];

const tableRows = [
  { feature: "Annual fee",                  flex: "€7,500",     university: "€13,500",    premier: "From €19,500" },
  { feature: "Delivery",                    flex: "Online",     university: "Hybrid / Barcelona", premier: "Hybrid / Barcelona" },
  { feature: "Best for",                    flex: "Travelling athletes", university: "Athletes in Barcelona", premier: "High-support athletes" },
  { feature: "HSD pathway",                 flex: "Included",   university: "Included",   premier: "Included" },
  { feature: "Academic planning",           flex: "Included",   university: "Included",   premier: "Enhanced" },
  { feature: "AP & SAT",                    flex: "Add-on",     university: "Included",   premier: "Enhanced" },
  { feature: "University guidance",         flex: "Add-on",     university: "Included",   premier: "Bespoke" },
  { feature: "1:1 tutoring",                flex: "Add-on",     university: "As needed",  premier: "Included" },
  { feature: "Parent reviews",              flex: "As needed",  university: "Regular",    premier: "Priority" },
  { feature: "Athlete recruitment support", flex: "Add-on",     university: "Available",  premier: "Enhanced" },
];

export function AthletesPricing() {
  return (
    <section className="py-14 md:py-24 bg-background" aria-label="Pricing">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
            Pathways &amp; Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.875rem] font-heading font-bold tracking-tight leading-tight text-foreground mb-3">
            Simple, transparent pricing designed for serious student-athletes.
          </h2>
        </motion.div>

        {/* 3 pricing cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                delay: i * stagger.cards,
                duration: duration.slow,
                ease: easing.apple,
              }}
              className="relative"
            >

              <div
                className={`rounded-2xl border p-6 flex flex-col h-full ${
                  plan.featured
                    ? "border-primary bg-card shadow-sm ring-1 ring-primary/20"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <plan.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </span>
                  <h3 className="text-base font-heading font-bold text-foreground leading-snug">
                    {plan.name}
                  </h3>
                </div>
                <div className="flex items-baseline gap-1.5 mb-0.5">
                  <span className="text-2xl font-heading font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{plan.enrolment}</p>
                <p className="text-sm text-foreground font-light mb-4 leading-relaxed">{plan.blurb}</p>
                <ul className="space-y-2 flex-1 mb-4">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-foreground">
                      <Check
                        className="h-4 w-4 shrink-0 mt-0.5 text-primary"
                        strokeWidth={2}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {plan.addons && (
                  <p className="text-xs text-muted-foreground border-t border-border pt-3 leading-relaxed">
                    {plan.addons}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto rounded-2xl border border-border"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-foreground border-b border-border">
                <th className="text-left px-5 py-4 font-bold text-background w-[34%] text-base">Feature</th>
                <th className="text-center px-4 py-4 font-bold text-background text-base">Flex Online</th>
                <th className="text-center px-4 py-4 font-bold text-secondary text-base">University Athlete</th>
                <th className="text-center px-4 py-4 font-bold text-background text-base">Premier Athlete</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
                >
                  <td className="px-5 py-3.5 font-semibold text-foreground">{row.feature}</td>
                  <td className="px-4 py-3.5 text-center font-medium text-foreground">{row.flex}</td>
                  <td className="px-4 py-3.5 text-center text-primary font-semibold">{row.university}</td>
                  <td className="px-4 py-3.5 text-center font-medium text-foreground">{row.premier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>


      </div>
    </section>
  );
}
