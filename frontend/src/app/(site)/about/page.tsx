import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { WhyICollegeExists } from "@/components/about/WhyICollegeExists";
import { FounderNote } from "@/components/about/FounderNote";
import { EducationJourney } from "@/components/about/EducationJourney";
import { ClarityOverHype } from "@/components/about/ClarityOverHype";
import { HumanLedTech } from "@/components/about/HumanLedTech";
import { ResponsibilityCare } from "@/components/about/ResponsibilityCare";
import { BuildingLongTerm } from "@/components/about/BuildingLongTerm";
import { AboutClosing } from "@/components/about/AboutClosing";

export const metadata: Metadata = {
  title: "Purpose & Philosophy | About | iCollege Life",
  description:
    "iCollege Life exists to help young people build strong academic foundations, gain clarity through experience, and develop the confidence, judgement, and self-understanding needed for adulthood and beyond.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <WhyICollegeExists />
      <FounderNote />
      <EducationJourney />
      <ClarityOverHype />
      <HumanLedTech />
      <ResponsibilityCare />
      <BuildingLongTerm />
      <AboutClosing />
    </main>
  );
}
