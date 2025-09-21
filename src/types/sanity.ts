import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  body: PortableTextBlock[];
  mainImage?: SanityImage;
};

export type NewsItem = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category?: string;
  content: PortableTextBlock[];
};

export type StaticPage = {
  _id: string;
  title: string;
  slug: { current: string };
  body: PortableTextBlock[];
  metaDescription?: string;
};
