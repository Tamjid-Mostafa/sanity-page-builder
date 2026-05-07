import type { Metadata } from "next";
import { PartnersHero } from "@/components/about/partners/PartnersHero";
import { WhyPartnershipsMatter } from "@/components/about/partners/WhyPartnershipsMatter";
import { SelectiveApproach } from "@/components/about/partners/SelectiveApproach";
import { TypesOfCollaboration } from "@/components/about/partners/TypesOfCollaboration";
import { ResponsibilityOversight } from "@/components/about/partners/ResponsibilityOversight";
import { GrowingEcosystem } from "@/components/about/partners/GrowingEcosystem";
import { PartnersClosing } from "@/components/about/partners/PartnersClosing";

export const metadata: Metadata = {
  title: "Partners & Collaborators | About | iCollege Life",
  description:
    "iCollege Life works with a small number of carefully chosen partners and collaborators who share our values, standards, and long-term view of education.",
};

export default function PartnersPage() {
  return (
    <main>
      <PartnersHero />
      <WhyPartnershipsMatter />
      <SelectiveApproach />
      <TypesOfCollaboration />
      <ResponsibilityOversight />
      <GrowingEcosystem />
      <PartnersClosing />
    </main>
  );
}
