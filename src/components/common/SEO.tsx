import type { Metadata } from "next";

const SITE_NAME = "蓮城院";
const DEFAULT_DESCRIPTION = "蓮城院の公式サイト。副住職・荒木弘文によるブログや寺院情報をお届けします。";
const DEFAULT_URL = "https://example.com"; // TODO: replace with production URL

export type SeoParams = {
  title?: string;
  description?: string;
  path?: string;
  imageUrl?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  imageUrl,
}: SeoParams = {}): Metadata {
  const computedTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | 曹洞宗の寺院`;
  const computedDescription = description ?? DEFAULT_DESCRIPTION;
  const url = path ? `${DEFAULT_URL}${path}` : DEFAULT_URL;

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
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: computedTitle,
      description: computedDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  } satisfies Metadata;
}
