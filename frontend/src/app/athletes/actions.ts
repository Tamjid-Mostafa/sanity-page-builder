"use server";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/lib/client";

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export interface FitFormData {
  parentName: string;
  email: string;
  phone: string;
  childAge: string;
  childAgeOther?: string;
  location: string;
  locationOther?: string;
  studyMode: string;
  currentAcademics: string;
  currentAcademicsOther?: string;
  mainChallenge: string;
  mainChallengeOther?: string;
  englishLevel: string;
  startTiming: string;
  hearAboutUs: string;
  referral?: string;
}

export async function submitFitForm(
  data: FitFormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    await writeClient.create({
      _type: "athletesFitSubmission",
      ...data,
      submittedAt: new Date().toISOString(),
      status: "new",
    });
    return { success: true };
  } catch (err) {
    console.error("Fit form submission error:", err);
    return { success: false, error: "Submission failed. Please try again." };
  }
}
