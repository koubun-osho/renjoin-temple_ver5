import { groq } from "next-sanity";

export const BLOG_POST_LIST_QUERY = groq`
  *[_type == "blog" && defined(slug.current)]
    | order(publishedAt desc) {
      _id,
      _updatedAt,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage,
      tags,
      ogTitle,
      ogDescription,
      ogImage,
      ogTheme
    }
`;

export const BLOG_POST_DETAIL_QUERY = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    mainImage,
    tags,
    ogTitle,
    ogDescription,
    ogImage,
    ogTheme
  }
`;

export const BLOG_POST_SLUGS_QUERY = groq`
  *[_type == "blog" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`;

export const NEWS_LIST_QUERY = groq`
  *[_type == "news" && defined(slug.current)]
    | order(publishedAt desc) {
      _id,
      _updatedAt,
      title,
      "slug": slug.current,
      publishedAt,
      category,
      content,
      attachments,
      ogTitle,
      ogDescription,
      ogImage,
      ogTheme
    }
`;

export const NEWS_DETAIL_QUERY = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    publishedAt,
    category,
    content,
    attachments[]{
      _type,
      _key,
      asset->{
        _id,
        url
      }
    },
    ogTitle,
    ogDescription,
    ogImage,
    ogTheme
  }
`;

export const NEWS_SLUGS_QUERY = groq`
  *[_type == "news" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`;

export const STATIC_PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    body,
    metaDescription,
    ogTitle,
    ogDescription,
    ogImage,
    ogTheme
  }
`;
