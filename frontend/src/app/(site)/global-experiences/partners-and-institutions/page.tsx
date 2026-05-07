import type { Metadata } from "next";
import { GlobalPartnersHero } from "@/components/global/partners-and-institutions/GlobalPartnersHero";
import { GlobalWhoWeWorkWith } from "@/components/global/partners-and-institutions/GlobalWhoWeWorkWith";
import { GlobalHowWeCollaborate } from "@/components/global/partners-and-institutions/GlobalHowWeCollaborate";
import { GlobalResponsibleDelivery } from "@/components/global/partners-and-institutions/GlobalResponsibleDelivery";
import { GlobalPartnersCTA } from "@/components/global/partners-and-institutions/GlobalPartnersCTA";
import { GlobalFooterMicroLine } from "@/components/global/GlobalFooterMicroLine";

export const metadata: Metadata = {
  title: "Partners & Institutions | Global Experiences | iCollege Life",
  description:
    "iCollege Global works with schools, colleges, universities, and organisations to design international learning experiences that connect education with the real world.",
  alternates: {
    canonical: "/global-experiences/partners-and-institutions",
  },
  openGraph: {
    title: "Partners & Institutions | iCollege Global Experiences",
    description:
      "Built with partners, delivered with care. Learn how iCollege Global collaborates with institutions to design meaningful international learning experiences.",
    url: "/global-experiences/partners-and-institutions",
    type: "website",
  },
};

export default function PartnersAndInstitutionsPage() {
  return (
    <main>
      <GlobalPartnersHero />
      <GlobalWhoWeWorkWith />
      <GlobalHowWeCollaborate />
      <GlobalResponsibleDelivery />
      <GlobalPartnersCTA />
      <GlobalFooterMicroLine />
    </main>
  );
}
