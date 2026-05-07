import type { Metadata } from "next";
import { PersonalSupportHero } from "@/components/academy/personal-support/PersonalSupportHero";
import { PersonalSupportWhyItMatters } from "@/components/academy/personal-support/PersonalSupportWhyItMatters";
import { PersonalSupportIntegrated } from "@/components/academy/personal-support/PersonalSupportIntegrated";
import { PersonalSupportLifeDesign } from "@/components/academy/personal-support/PersonalSupportLifeDesign";
import { PersonalSupportFamilyPartnership } from "@/components/academy/personal-support/PersonalSupportFamilyPartnership";
import { PersonalSupportPrivateTuition } from "@/components/academy/personal-support/PersonalSupportPrivateTuition";
import { PersonalSupportOutcome } from "@/components/academy/personal-support/PersonalSupportOutcome";
import { PersonalSupportFinalCTA } from "@/components/academy/personal-support/PersonalSupportFinalCTA";
import { AcademyFooterMicroLine } from "@/components/academy/AcademyFooterMicroLine";

export const metadata: Metadata = {
  title: "Personal Support | iCollege Academy | iCollege Life",
  description:
    "At iCollege Academy, academic progress, confidence, and direction are supported together through mentoring, structured guidance, and individual attention for students aged 15–18.",
};

export default function PersonalSupportPage() {
  return (
    <main>
      <PersonalSupportHero />
      <PersonalSupportWhyItMatters />
      <PersonalSupportIntegrated />
      <PersonalSupportLifeDesign />
      <PersonalSupportFamilyPartnership />
      <PersonalSupportPrivateTuition />
      <PersonalSupportOutcome />
      <PersonalSupportFinalCTA />
      <AcademyFooterMicroLine />
    </main>
  );
}
