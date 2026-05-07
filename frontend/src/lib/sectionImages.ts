/**
 * Section images stored in Sanity media library.
 *
 * These were uploaded from Pexels (free license) via scripts/upload-section-images.mjs
 * and are now served from cdn.sanity.io for consistent delivery and CMS management.
 *
 * To re-upload or add new images, run:  node scripts/upload-section-images.mjs
 */

const BASE = "https://cdn.sanity.io/images/jh8orl91/production";
const Q = "?w=1200&auto=format";

export const SECTION_IMAGES = {
  // WhoThisIsForSection
  who_academy:    `${BASE}/8d6d56504a89e35f9a5cf38dae970140cc4a799d-1200x1800.jpg${Q}`,
  who_global:     `${BASE}/35282c7912916263f0bd2b45a22e3a127da52000-1200x800.jpg${Q}`,

  // ThreePathwaysGrid
  pathway_academy: `${BASE}/57583bce091d9c534ef371c9219748cd1c9ede41-1200x1800.jpg${Q}`,
  pathway_global:  `${BASE}/65e888d4d02f82a7ad8130e9950507b73df9b351-1200x786.jpg${Q}`,

  // WhyiCollegeSection (carousel)
  why_philosophy:  `${BASE}/d1cf4b571544a41202f6f04417d0c57edc86d114-1200x1800.jpg${Q}`,
  why_framework:   `${BASE}/daff21fb6ad933442a7207cdf25ab3240f88c472-1200x800.jpg${Q}`,
  why_approach:    `${BASE}/d49dd0b63e4b0521aefcca35bea2891901aabf24-1200x801.jpg${Q}`,
  why_outcomes:    `${BASE}/cf976421ace3ddf44ac1d57e7d3c2e9beb02c365-1200x800.jpg${Q}`,
  why_future:      `${BASE}/83bc85c23ccae16912b00d157db1630f32a985ae-1200x800.jpg${Q}`,

  // MethodSection
  method_learn:    `${BASE}/3da5b46bfbf6131358b18b2874af04428191b872-1200x800.jpg${Q}`,
  method_design:   `${BASE}/5b7510ad1fbbf603367ea87b9999a708ee3aeead-1200x1803.jpg${Q}`,
  method_build:    `${BASE}/725ba3e1b2ace65f2a510a4d373a1546b1e904c3-1200x800.jpg${Q}`,

  // StudentStoriesSection
  stories_community: `${BASE}/61b5ed4f1156775ef53a0c60431497e0d825633d-1200x800.jpg${Q}`,
  stories_realworld: `${BASE}/56690470d300b8efbe4ee721971c251bcc1d815e-1200x800.jpg${Q}`,
  stories_cohorts:   `${BASE}/c7b52a1ea71b922d80f3ba080fb5647c0586c622-1200x800.jpg${Q}`,
} as const;
