import type { Metadata } from "next";
import { LeadershipHero } from "@/components/about/leadership/LeadershipHero";
import { WhyLeadershipMatters } from "@/components/about/leadership/WhyLeadershipMatters";
import { FounderDirector } from "@/components/about/leadership/FounderDirector";
import { ConsideredApproach } from "@/components/about/leadership/ConsideredApproach";
import { ContributorsCollaborators } from "@/components/about/leadership/ContributorsCollaborators";
import { AccountabilityOversight } from "@/components/about/leadership/AccountabilityOversight";
import { LeadershipClosing } from "@/components/about/leadership/LeadershipClosing";

export const metadata: Metadata = {
  title: "Leadership | About | iCollege Life",
  description:
    "iCollege Life is led with experience and intention — recognising the responsibility that comes with designing environments where people learn, grow, and develop direction over time.",
};

export default function LeadershipPage() {
  return (
    <main>
      <LeadershipHero />
      <WhyLeadershipMatters />
      <FounderDirector />
      <ConsideredApproach />
      <ContributorsCollaborators />
      <AccountabilityOversight />
      <LeadershipClosing />
    </main>
  );
}
