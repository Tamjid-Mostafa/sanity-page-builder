import type { Metadata } from "next";
import { AcademyHero } from "@/components/academy/AcademyHero";
import { WhatAcademyIs } from "@/components/academy/WhatAcademyIs";
import { WhoItsFor } from "@/components/academy/WhoItsFor";
import { OurApproach } from "@/components/academy/OurApproach";
import { AcademicsWithoutTunnelVision } from "@/components/academy/AcademicsWithoutTunnelVision";
import { SupportiveEnvironment } from "@/components/academy/SupportiveEnvironment";
import { OutcomesDirection } from "@/components/academy/OutcomesDirection";
import { WhyParentsChoose } from "@/components/academy/WhyParentsChoose";
import { AcademyFinalCTA } from "@/components/academy/AcademyFinalCTA";
import { AcademyFooterMicroLine } from "@/components/academy/AcademyFooterMicroLine";

export const metadata: Metadata = {
  title: "iCollege Academy | iCollege Life",
  description:
    "A premium, small-cohort academy for students aged 15–18 seeking academic rigour, personal growth, and clear direction beyond school.",
};

export default function AcademyPage() {
  return (
    <main>
      <AcademyHero />
      <WhatAcademyIs />
      <WhoItsFor />
      <OurApproach />
      <AcademicsWithoutTunnelVision />
      <SupportiveEnvironment />
      <OutcomesDirection />
      <WhyParentsChoose />
      <AcademyFinalCTA />
      <AcademyFooterMicroLine />
    </main>
  );
}
