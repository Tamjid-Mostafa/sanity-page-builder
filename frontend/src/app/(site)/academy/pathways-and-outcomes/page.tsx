import type { Metadata } from "next";
import { PathwaysHero } from "@/components/academy/pathways/PathwaysHero";
import { PathwaysUniversity } from "@/components/academy/pathways/PathwaysUniversity";
import { PathwaysGlobal } from "@/components/academy/pathways/PathwaysGlobal";
import { PathwaysAlternative } from "@/components/academy/pathways/PathwaysAlternative";
import { PathwaysGuidedDecisions } from "@/components/academy/pathways/PathwaysGuidedDecisions";
import { PathwaysWhatSuccess } from "@/components/academy/pathways/PathwaysWhatSuccess";
import { PathwaysFinalCTA } from "@/components/academy/pathways/PathwaysFinalCTA";
import { AcademyFooterMicroLine } from "@/components/academy/AcademyFooterMicroLine";

export const metadata: Metadata = {
  title: "Pathways & Outcomes | iCollege Academy | iCollege Life",
  description:
    "iCollege Academy prepares students aged 15–18 for thoughtful next steps — university, global experiences, and other well-considered pathways beyond school, with guided planning built into the programme.",
};

export default function PathwaysPage() {
  return (
    <main>
      <PathwaysHero />
      <PathwaysUniversity />
      <PathwaysGlobal />
      <PathwaysAlternative />
      <PathwaysGuidedDecisions />
      <PathwaysWhatSuccess />
      <PathwaysFinalCTA />
      <AcademyFooterMicroLine />
    </main>
  );
}
