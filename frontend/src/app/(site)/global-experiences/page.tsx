import type { Metadata } from "next";
import { GlobalHero } from "@/components/global/GlobalHero";
import { GlobalWhatItIs } from "@/components/global/GlobalWhatItIs";
import { GlobalWhoFor } from "@/components/global/GlobalWhoFor";
import { GlobalHowItWorks } from "@/components/global/GlobalHowItWorks";
import { GlobalBeyondGapYear } from "@/components/global/GlobalBeyondGapYear";
import { GlobalWhatParticipantsGain } from "@/components/global/GlobalWhatParticipantsGain";
import { GlobalFormats } from "@/components/global/GlobalFormats";
import { GlobalFAQ } from "@/components/global/GlobalFAQ";
import { GlobalFinalCTA } from "@/components/global/GlobalFinalCTA";
import { GlobalFooterMicroLine } from "@/components/global/GlobalFooterMicroLine";

export const metadata: Metadata = {
  title: "Global Experiences | iCollege Life",
  description:
    "Short-term international learning experiences that help young adults aged 18–25 gain perspective, confidence, and direction through real-world experience, life design, and global networks.",
};

export default function GlobalExperiencesPage() {
  return (
    <main>
      <GlobalHero />
      <GlobalWhatItIs />
      <GlobalWhoFor />
      <GlobalHowItWorks />
      <GlobalBeyondGapYear />
      <GlobalWhatParticipantsGain />
      <GlobalFormats />
      <GlobalFAQ />
      <GlobalFinalCTA />
      <GlobalFooterMicroLine />
    </main>
  );
}
