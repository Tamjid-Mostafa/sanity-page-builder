import type { Metadata } from "next";
import { CurriculumHero } from "@/components/academy/curriculum/CurriculumHero";
import { CurriculumChoosingPathway } from "@/components/academy/curriculum/CurriculumChoosingPathway";
import { CurriculumPathways } from "@/components/academy/curriculum/CurriculumPathways";
import { CurriculumComparison } from "@/components/academy/curriculum/CurriculumComparison";
import { CurriculumProviders } from "@/components/academy/curriculum/CurriculumProviders";
import { CurriculumFlexible } from "@/components/academy/curriculum/CurriculumFlexible";
import { CurriculumHowStudentsLearn } from "@/components/academy/curriculum/CurriculumHowStudentsLearn";
import { CurriculumAssessment } from "@/components/academy/curriculum/CurriculumAssessment";
import { CurriculumFinalCTA } from "@/components/academy/curriculum/CurriculumFinalCTA";
import { AcademyFooterMicroLine } from "@/components/academy/AcademyFooterMicroLine";

export const metadata: Metadata = {
  title: "Curriculum & Qualifications | iCollege Academy | iCollege Life",
  description:
    "Flexible academic pathways built around the student — internationally recognised UK and US qualifications delivered in small cohorts with personalised academic guidance.",
};

export default function CurriculumPage() {
  return (
    <main>
      <CurriculumHero />
      <CurriculumChoosingPathway />
      <CurriculumPathways />
      <CurriculumComparison />
      <CurriculumProviders />
      <CurriculumFlexible />
      <CurriculumHowStudentsLearn />
      <CurriculumAssessment />
      <CurriculumFinalCTA />
      <AcademyFooterMicroLine />
    </main>
  );
}
