// /components/BlocksRenderer.tsx (SERVER COMPONENT — no "use client")
import { Suspense } from "react";
import dynamic from "next/dynamic";
import type {
  HOMEPAGE_QUERYResult,
  PAGE_BY_SLUG_QUERYResult,
} from "@/sanity/types";

/** ---- Minimal types derived from your query results ---- */
type ContentItem<T> = T extends { content: infer A | null }
  ? A extends Array<infer I>
    ? I
    : never
  : never;

type HomeBlocks = ContentItem<NonNullable<HOMEPAGE_QUERYResult>>;
type SlugBlocks = ContentItem<NonNullable<PAGE_BY_SLUG_QUERYResult>>;
export type PageBlocks = HomeBlocks | SlugBlocks;

/** ---- Simple block registry (add/remove lines here) ----
 *  Using dynamic imports for better code splitting.
 *  Each component can be typed locally; the registry stays simple.
 */
const blocks: Record<string, React.ComponentType<any>> = {
  hero: dynamic(() => import("./blocks/HeroBlock"), { ssr: true }),
  heroQuote: dynamic(() => import("./blocks/HeroQuoteBlock"), { ssr: true }),
  features: dynamic(() => import("./blocks/FeaturesBlock"), { ssr: true }),
  testimonialSection: dynamic(() => import("./blocks/TestimonialBlock"), { ssr: true }),
  ctaSection: dynamic(() => import("./blocks/CTABlock"), { ssr: true }),
  richText: dynamic(() => import("./blocks/RichTextBlock"), { ssr: true }),
  imageGallery: dynamic(() => import("./blocks/ImageGalleryBlock"), { ssr: true }),
  programGrid: dynamic(() => import("./blocks/ProgramGridBlock"), { ssr: true }),
  faqSection: dynamic(() => import("./blocks/FAQBlock"), { ssr: true }),
  brandPositioningStrip: dynamic(() => import("./blocks/BrandPositioningStripBlock"), { ssr: true }),
  threePathwaysGrid: dynamic(() => import("./blocks/ThreePathwaysGridBlock"), { ssr: true }),
  whoThisIsFor: dynamic(() => import("./blocks/WhoThisIsForBlock"), { ssr: true }),
  whyiCollege: dynamic(() => import("./blocks/WhyiCollegeBlock"), { ssr: true }),
  worldChanging: dynamic(() => import("./blocks/WorldChangingBlock"), { ssr: true }),
  methodSection: dynamic(() => import("./blocks/MethodSectionBlock"), { ssr: true }),
  barcelonaExperience: dynamic(() => import("./blocks/BarcelonaExperienceBlock"), { ssr: true }),
  learningExperience: dynamic(() => import("./blocks/LearningExperienceBlock"), { ssr: true }),
  studentStories: dynamic(() => import("./blocks/StudentStoriesBlock"), { ssr: true }),
  finalCta: dynamic(() => import("./blocks/FinalCTABlock"), { ssr: true }),
};

/** ---- Renderers (tiny + predictable) ---- */
export function BlockRenderer({ 
  block, 
  searchParams,
  pageSlug 
}: { 
  block: PageBlocks | any; 
  searchParams?: { [key: string]: string | string[] | undefined };
  pageSlug?: string[];
}) {
  const Cmp = blocks[block._type];
  if (!Cmp) {
    return (
      <div className="m-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
        <p className="font-semibold">Unknown block: {block._type}</p>
        <p className="text-sm mt-1">Add this block to the registry in BlocksRenderer.tsx</p>
      </div>
    );
  }
  
  // Extract last slug segment if needed
  const slug = pageSlug?.length ? pageSlug[pageSlug.length - 1] : undefined;
  
  return (
    <Suspense fallback={<div className="py-16 bg-gray-100 animate-pulse" />}>
      <Cmp {...(block as any)} searchParams={searchParams} slug={slug} />
    </Suspense>
  );
}

export function BlocksRenderer({
  blocks: list,
  searchParams,
  pageSlug,
}: {
  blocks: ReadonlyArray<PageBlocks>;
  searchParams?: { [key: string]: string | string[] | undefined };
  pageSlug?: string[];
}) {
  if (!list?.length) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-2">No content blocks yet.</p>
          <p className="text-sm text-gray-500">Add content blocks in Sanity Studio to see them here.</p>
        </div>
      </div>
    );
  }
  return (
    <>
      {list.map((b) => (
        <BlockRenderer key={b._key} block={b} searchParams={searchParams} pageSlug={pageSlug} />
      ))}
    </>
  );
}
