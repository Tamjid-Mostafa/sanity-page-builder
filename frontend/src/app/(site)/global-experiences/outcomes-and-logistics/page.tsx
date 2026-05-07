import type { Metadata } from "next";
import { GlobalOutcomesLogisticsHero } from "@/components/global/outcomes-and-logistics/GlobalOutcomesLogisticsHero";
import { GlobalOutcomesThatMatter } from "@/components/global/outcomes-and-logistics/GlobalOutcomesThatMatter";
import { GlobalReflectionLifeDesign } from "@/components/global/outcomes-and-logistics/GlobalReflectionLifeDesign";
import { GlobalLogistics } from "@/components/global/outcomes-and-logistics/GlobalLogistics";
import { GlobalGoodFit } from "@/components/global/outcomes-and-logistics/GlobalGoodFit";
import { GlobalFinalCTA } from "@/components/global/GlobalFinalCTA";
import { GlobalFooterMicroLine } from "@/components/global/GlobalFooterMicroLine";

export const metadata: Metadata = {
  title: "Outcomes & Logistics | Global Experiences | iCollege Life",
  description:
    "Understand what participants gain from iCollege Global Experiences — confidence, clarity, and cultural awareness — and how programmes are responsibly designed and delivered.",
  alternates: {
    canonical: "/global-experiences/outcomes-and-logistics",
  },
  openGraph: {
    title: "Outcomes & Logistics | iCollege Global Experiences",
    description:
      "Clarity, confidence, and responsible delivery. Learn how iCollege Global programmes are structured to deliver meaningful outcomes and safe, manageable experiences.",
    url: "/global-experiences/outcomes-and-logistics",
    type: "website",
  },
};

export default function OutcomesAndLogisticsPage() {
  return (
    <main>
      <GlobalOutcomesLogisticsHero />
      <GlobalOutcomesThatMatter />
      <GlobalReflectionLifeDesign />
      <GlobalLogistics />
      <GlobalGoodFit />
      <GlobalFinalCTA />
      <GlobalFooterMicroLine />
    </main>
  );
}
