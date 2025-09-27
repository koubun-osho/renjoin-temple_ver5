import type { OgTheme } from "@/types/sanity";

type OgImageType = "blog" | "news" | "page" | "static";

type BuildOgImageUrlOptions = {
  siteUrl: string;
  type: OgImageType;
  slug?: string;
  theme?: OgTheme;
};

export function buildOgImageUrl({ siteUrl, type, slug, theme }: BuildOgImageUrlOptions): string {
  const url = new URL(`/api/og/${type}`, siteUrl);

  if (slug) {
    url.searchParams.set("slug", slug);
  }

  if (theme && theme !== "auto") {
    url.searchParams.set("theme", theme);
  }

  return url.toString();
}
