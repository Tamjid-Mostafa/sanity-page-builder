import { HeroSection } from "./Hero";
import { EducationHasChangedSection } from "./EducationHasChanged";
import { ThreePathwaysGrid } from "./ThreePathwaysGrid";
import { WhyiCollegeSection } from "./WhyiCollege";
import { BarcelonaExperienceSection } from "./BarcelonaExperience";
import { StudentStoriesSection } from "./StudentStories";
import { FAQSection } from "./FAQ";
import { FinalCTASection } from "./FinalCTA";
import { MethodSection } from "./Method";
import { Testimonials } from "./Testimonials";
import { getHeroVideo, getAllVideoAssets, getSectionImages } from "@/sanity/queries";

export async function Homepage() {
  const [videoData, videos, images] = await Promise.all([
    getHeroVideo(),
    getAllVideoAssets(),
    getSectionImages(),
  ]);

  return (
    <>
      <HeroSection videoData={videoData} videos={videos} />
      <EducationHasChangedSection />
      <ThreePathwaysGrid images={images} />
      <WhyiCollegeSection images={images} />
      <MethodSection images={images} />
      <BarcelonaExperienceSection images={images} />
      <Testimonials />
      <StudentStoriesSection images={images} />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}

