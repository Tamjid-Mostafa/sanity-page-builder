import type { Metadata } from "next";
import { HowWeWorkHero } from "@/components/about/how-we-work/HowWeWorkHero";
import { HowWeWorkIntro } from "@/components/about/how-we-work/HowWeWorkIntro";
import { HowWeWorkPrinciples } from "@/components/about/how-we-work/HowWeWorkPrinciples";
import { HowWeWorkVisual } from "@/components/about/how-we-work/HowWeWorkVisual";
import { HowWeWorkClosing } from "@/components/about/how-we-work/HowWeWorkClosing";

export const metadata: Metadata = {
  title: "How We Work | About | iCollege Life",
  description:
    "iCollege Life is built around clear principles for how learning is designed, delivered, and supported — with care, structure, and long-term thinking at the centre.",
};

export default function HowWeWorkPage() {
  return (
    <main>
      <HowWeWorkHero />
      <HowWeWorkIntro />
      <HowWeWorkPrinciples />
      <HowWeWorkVisual />
      <HowWeWorkClosing />
    </main>
  );
}
