import type { Metadata } from "next";
import { getAthletesImages } from "@/sanity/data/athletes.server";
import { urlForImage } from "@/sanity/lib/image";
import { AthletesNav } from "@/components/athletes/AthletesNav";
import { AthletesHero } from "@/components/athletes/AthletesHero";
import { AthletesTheProblem } from "@/components/athletes/AthletesTheProblem";
import { AthletesTheSolution } from "@/components/athletes/AthletesTheSolution";
import { AthletesHowItWorks } from "@/components/athletes/AthletesHowItWorks";
import { AthletesWhoItsFor } from "@/components/athletes/AthletesWhoItsFor";
import { AthletesOutcomes } from "@/components/athletes/AthletesOutcomes";
import { AthletesWhyUs } from "@/components/athletes/AthletesWhyUs";
import { AthletesAbout } from "@/components/athletes/AthletesAbout";
import { AthletesPricing } from "@/components/athletes/AthletesPricing";
import { AthletesConversationInsights } from "@/components/athletes/AthletesConversationInsights";
import { AthletesFinalCTA } from "@/components/athletes/AthletesFinalCTA";
import { AthletesFAQ } from "@/components/athletes/AthletesFAQ";
import { AthletesFooter } from "@/components/athletes/AthletesFooter";
import { AthletesForSportsAcademies } from "@/components/athletes/AthletesForSportsAcademies";

export async function generateMetadata(): Promise<Metadata> {
  const images = await getAthletesImages();
  const ogImg = urlForImage(images.hero, { maxWidth: 1200 });

  const ogImages = ogImg
    ? [
        {
          url: ogImg.src,
          width: 1200,
          height: Math.round((ogImg.height / ogImg.width) * 1200),
          alt: ogImg.alt ?? "Student-athletes in action — iCollege Athletes programme",
        },
      ]
    : [];

  return {
    title: "iCollege Athletes — Flexible Education for Dedicated Student-Athletes",

    description:
      "Accredited US High School Diploma, flexible scheduling, and university pathways for student-athletes aged 13–19. Train fully without choosing between sport and education.",

    keywords: [
      "student athlete education",
      "flexible school for athletes",
      "online school for athletes",
      "US high school diploma athlete",
      "student athlete programme",
      "education and sport balance",
      "accredited diploma Barcelona",
      "iCollege Athletes",
      "athlete academic programme",
      "university pathways for athletes",
    ],

    alternates: {
      canonical: "/athletes",
    },

    openGraph: {
      title: "iCollege Athletes — Flexible Education for Dedicated Student-Athletes",
      description:
        "Accredited US High School Diploma, flexible scheduling, and university pathways for student-athletes aged 13–19. Train fully — without choosing between sport and education.",
      url: "/athletes",
      type: "website",
      images: ogImages,
    },

    twitter: {
      card: "summary_large_image",
      title: "iCollege Athletes — Flexible Education for Dedicated Student-Athletes",
      description:
        "Accredited US High School Diploma, flexible scheduling, and university pathways for student-athletes aged 13–19.",
      images: ogImg ? [ogImg.src] : [],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// ─── JSON-LD structured data ──────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://icollege.life/#organization",
      name: "iCollege Life",
      url: "https://icollege.life",
      logo: "https://icollege.life/logo_nobg.png",
      description:
        "iCollege Life provides flexible, accredited education and global experiences for ambitious young people aged 13–25.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Barcelona",
        addressCountry: "ES",
      },
    },
    {
      "@type": "Course",
      "@id": "https://icollege.life/athletes#programme",
      name: "iCollege Athletes Programme",
      description:
        "An accredited US High School Diploma programme with flexible scheduling designed for dedicated student-athletes aged 13–19, available online and in Barcelona.",
      provider: { "@id": "https://icollege.life/#organization" },
      url: "https://icollege.life/athletes",
      educationalLevel: "High School",
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Online Athlete Programme",
          price: "7500",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "7500",
            priceCurrency: "EUR",
            unitCode: "ANN",
          },
        },
        {
          "@type": "Offer",
          name: "Barcelona Athlete Programme",
          price: "10500",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "10500",
            priceCurrency: "EUR",
            unitCode: "ANN",
          },
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the High School Diploma recognised?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We work with fully accredited providers. Students use this qualification to gain admission to universities in the US, UK, and across Europe.",
          },
        },
        {
          "@type": "Question",
          name: "How flexible is the schedule?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fully adaptable around training and competition. Students work to a structured plan while maintaining the flexibility serious athletes need.",
          },
        },
        {
          "@type": "Question",
          name: "Do students get support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. This is a guided programme, not independent online learning. Students receive weekly teaching, structure, and ongoing accountability.",
          },
        },
        {
          "@type": "Question",
          name: "How many hours per week does it require?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Typically 15–25 hours per week, depending on the student and their goals. This is designed to work alongside training schedules.",
          },
        },
        {
          "@type": "Question",
          name: "Will my child fall behind academically?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Students follow a structured academic pathway with clear progression. In many cases, they perform better due to increased focus and personalised support of achievement.",
          },
        },
        {
          "@type": "Question",
          name: "What university options does this lead to?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Students can progress to universities in the US, UK, and Europe. We support families in understanding and planning the best pathway.",
          },
        },
        {
          "@type": "Question",
          name: "Is this suitable for all athletes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This is designed for committed student-athletes who are serious about sport, education and their future. It's not for those looking for an easier option, as it requires discipline and consistency.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer in-person support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Students can access optional in-person sessions in Barcelona at The Social Hub, alongside the online programme.",
          },
        },
        {
          "@type": "Question",
          name: "When can students start?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We have limited places for the September intake. We recommend booking a call early to explore fit.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://icollege.life",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "iCollege Athletes",
          item: "https://icollege.life/athletes",
        },
      ],
    },
  ],
};

export default async function AthletesPage() {
  const images = await getAthletesImages();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AthletesNav />
      <main>
        <AthletesHero heroImage={images.hero} />
        <AthletesTheProblem />
        <AthletesTheSolution />
        <AthletesHowItWorks
          studyRoomImage={images.studyRoom}
          tabletLearningImage={images.tabletLearning}
          classroomImage={images.classroom}
        />
        <AthletesWhoItsFor />
        <AthletesOutcomes tennisImage={images.tennis} />
        <AthletesWhyUs />
        <AthletesAbout founderPortrait={images.founderPortrait} />
        <AthletesPricing />
        <AthletesConversationInsights />
        <AthletesForSportsAcademies />
        <AthletesFinalCTA />
        <AthletesFAQ />
      </main>
      <AthletesFooter />
    </>
  );
}
