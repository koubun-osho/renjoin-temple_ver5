import "server-only";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { createClient, type QueryParams } from "next-sanity";

import type { BlogPost, NewsItem, StaticPage, SanityImage } from "@/types/sanity";

import {
  BLOG_POST_DETAIL_QUERY,
  BLOG_POST_LIST_QUERY,
  BLOG_POST_SLUGS_QUERY,
  NEWS_DETAIL_QUERY,
  NEWS_LIST_QUERY,
  NEWS_SLUGS_QUERY,
  STATIC_PAGE_QUERY,
} from "./queries";

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

const isSanityConfigured = Boolean(projectId && dataset);
export const sanityConfigured = isSanityConfigured;

const imageBuilder = projectId && dataset ? imageUrlBuilder({ projectId, dataset }) : null;

export function buildImageUrl(source?: SanityImage | SanityImageSource | null, width = 1200) {
  if (!source || !imageBuilder) {
    return null;
  }

  try {
    return imageBuilder.image(source).width(width).fit("max").auto("format").url();
  } catch (error) {
    console.error("Failed to build Sanity image URL", error);
    return null;
  }
}

async function fetchFromSanity<T>(query: string, params: QueryParams | undefined, fallback: T): Promise<T> {
  if (!isSanityConfigured) {
    return fallback;
  }

  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.error(`Failed to fetch Sanity data for query: ${query}`, error);
    return fallback;
  }
}

export async function fetchBlogPosts(limit?: number): Promise<BlogPost[]> {
  const posts = await fetchFromSanity<BlogPost[]>(BLOG_POST_LIST_QUERY, undefined, []);
  const sanitized = posts.filter((post) => Boolean(post.slug));
  return typeof limit === "number" ? sanitized.slice(0, Math.max(limit, 0)) : sanitized;
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug) {
    return null;
  }

  return fetchFromSanity<BlogPost | null>(BLOG_POST_DETAIL_QUERY, { slug }, null);
}

export async function fetchBlogSlugs(): Promise<string[]> {
  const rows = await fetchFromSanity<Array<{ slug: string }>>(BLOG_POST_SLUGS_QUERY, undefined, []);
  return rows.map((row) => row.slug).filter((slug): slug is string => Boolean(slug));
}

export async function fetchNewsItems(limit?: number): Promise<NewsItem[]> {
  const items = await fetchFromSanity<NewsItem[]>(NEWS_LIST_QUERY, undefined, []);
  const sanitized = items.filter((item) => Boolean(item.slug));
  return typeof limit === "number" ? sanitized.slice(0, Math.max(limit, 0)) : sanitized;
}

export async function fetchNewsItemBySlug(slug: string): Promise<NewsItem | null> {
  if (!slug) {
    return null;
  }

  return fetchFromSanity<NewsItem | null>(NEWS_DETAIL_QUERY, { slug }, null);
}

export async function fetchNewsSlugs(): Promise<string[]> {
  const rows = await fetchFromSanity<Array<{ slug: string }>>(NEWS_SLUGS_QUERY, undefined, []);
  return rows.map((row) => row.slug).filter((slug): slug is string => Boolean(slug));
}

export async function fetchStaticPageBySlug(slug: string): Promise<StaticPage | null> {
  if (!slug) {
    return null;
  }

  return fetchFromSanity<StaticPage | null>(STATIC_PAGE_QUERY, { slug }, null);
}
