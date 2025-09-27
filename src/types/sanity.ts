import type { PortableTextBlock } from "@portabletext/types";

export type SanitySlug = string;

export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type OgTheme = "auto" | "blog" | "news" | "page";

export type SanityFileAsset = {
  _ref?: string;
  _type?: "reference";
  _id?: string;
  url?: string;
};

export type SanityFile = {
  _type: "file";
  asset: SanityFileAsset;
  _key?: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  mainImage?: SanityImage;
  tags?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImage;
  ogTheme?: OgTheme;
};

export type NewsItem = {
  _id: string;
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  category?: string;
  content?: PortableTextBlock[];
  attachments?: SanityFile[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImage;
  ogTheme?: OgTheme;
};

export type StaticPage = {
  _id: string;
  title: string;
  slug: SanitySlug;
  body?: PortableTextBlock[];
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImage;
  ogTheme?: OgTheme;
};
