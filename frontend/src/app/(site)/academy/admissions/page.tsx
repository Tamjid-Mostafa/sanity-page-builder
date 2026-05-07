import type { Metadata } from "next";
import { AdmissionsHero } from "@/components/academy/admissions/AdmissionsHero";
import { AdmissionsWhoItsFor } from "@/components/academy/admissions/AdmissionsWhoItsFor";
import { AdmissionsProcess } from "@/components/academy/admissions/AdmissionsProcess";
import { AdmissionsWhenToApply } from "@/components/academy/admissions/AdmissionsWhenToApply";
import { AdmissionsTuition } from "@/components/academy/admissions/AdmissionsTuition";
import { AdmissionsPayment } from "@/components/academy/admissions/AdmissionsPayment";
import { AdmissionsCohortSize } from "@/components/academy/admissions/AdmissionsCohortSize";
import { AdmissionsFinalCTA } from "@/components/academy/admissions/AdmissionsFinalCTA";
import { AcademyFooterMicroLine } from "@/components/academy/AcademyFooterMicroLine";

export const metadata: Metadata = {
  title: "Admissions | iCollege Academy | iCollege Life",
  description:
    "Joining iCollege Academy begins with a conversation. Small cohorts, personalised admissions, and clear academic pathways for students aged 15–18 in Barcelona.",
};

export default function AdmissionsPage() {
  return (
    <main>
      <AdmissionsHero />
      <AdmissionsWhoItsFor />
      <AdmissionsProcess />
      <AdmissionsWhenToApply />
      <AdmissionsTuition />
      <AdmissionsPayment />
      <AdmissionsCohortSize />
      <AdmissionsFinalCTA />
      <AcademyFooterMicroLine />
    </main>
  );
}
