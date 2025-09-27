import type { Metadata } from "next";

import { buildOgImageUrl } from "@/lib/og";
import type { OgTheme } from "@/types/sanity";

const SITE_NAME = "蓮城院";
const DEFAULT_DESCRIPTION = "蓮城院の公式サイト。副住職・荒木弘文によるブログや寺院情報をお届けします。";
const DEFAULT_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");

type OgImageParams = {
  type: "blog" | "news" | "page" | "static";
  slug?: string;
  theme?: OgTheme;
  imageUrl?: string;
};

export type SeoParams = {
  title?: string;
  description?: string;
  path?: string;
  imageUrl?: string;
  og?: OgImageParams;
};

export function buildMetadata({
  title,
  description,
  path,
  imageUrl,
  og,
}: SeoParams = {}): Metadata {
  const computedTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | 曹洞宗の寺院`;
  const computedDescription = description ?? DEFAULT_DESCRIPTION;
  const normalizedPath = path?.startsWith("/") ? path : path ? `/${path}` : undefined;
  const url = normalizedPath ? `${DEFAULT_URL}${normalizedPath}` : DEFAULT_URL;
  const ogImageUrl =
    og?.imageUrl ??
    imageUrl ??
    (og ? buildOgImageUrl({ siteUrl: DEFAULT_URL, type: og.type, slug: og.slug, theme: og.theme }) : undefined);

  return {
    title: computedTitle,
    description: computedDescription,
    openGraph: {
      title: computedTitle,
      description: computedDescription,
      type: "website",
      locale: "ja_JP",
      url,
      siteName: SITE_NAME,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: computedTitle,
      description: computedDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  } satisfies Metadata;
}
