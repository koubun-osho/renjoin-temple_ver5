import "server-only";

import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.warn("Sanity project ID is not set. Add NEXT_PUBLIC_SANITY_PROJECT_ID to .env.local");
}

if (!dataset) {
  console.warn("Sanity dataset is not set. Add NEXT_PUBLIC_SANITY_DATASET to .env.local");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token,
  perspective: "published",
});
