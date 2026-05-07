import type { Metadata } from "next";
import { TuitionHero } from "@/components/academy/one-to-one-tuition/TuitionHero";
import { TuitionWhatWeOffer } from "@/components/academy/one-to-one-tuition/TuitionWhatWeOffer";
import { TuitionLevelsSubjects } from "@/components/academy/one-to-one-tuition/TuitionLevelsSubjects";
import { TuitionExamPrep } from "@/components/academy/one-to-one-tuition/TuitionExamPrep";
import { TuitionHowItWorks } from "@/components/academy/one-to-one-tuition/TuitionHowItWorks";
import { TuitionGoodFit } from "@/components/academy/one-to-one-tuition/TuitionGoodFit";
import { TuitionWiderApproach } from "@/components/academy/one-to-one-tuition/TuitionWiderApproach";
import { TuitionFinalCTA } from "@/components/academy/one-to-one-tuition/TuitionFinalCTA";
import { AcademyFooterMicroLine } from "@/components/academy/AcademyFooterMicroLine";

export const metadata: Metadata = {
  title: "1-to-1 Tuition | iCollege Academy | iCollege Life",
  description:
    "Focused academic support for GCSE, IGCSE, A-Level and international qualifications — experienced tutors, online or in Barcelona, for Academy and external students.",
};

export default function OneToOneTuitionPage() {
  return (
    <main>
      <TuitionHero />
      <TuitionWhatWeOffer />
      <TuitionLevelsSubjects />
      <TuitionExamPrep />
      <TuitionHowItWorks />
      <TuitionGoodFit />
      <TuitionWiderApproach />
      <TuitionFinalCTA />
      <AcademyFooterMicroLine />
    </main>
  );
}
