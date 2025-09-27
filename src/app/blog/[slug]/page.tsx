import Image from "next/image";
import { notFound } from "next/navigation";

import { buildMetadata } from "@/components/common/SEO";
import { PortableTextContent } from "@/components/sanity/PortableTextContent";
import { buildImageUrl, fetchBlogPostBySlug, fetchBlogSlugs } from "@/lib/sanity";
import { extractPlainText } from "@/lib/portableText";

export const revalidate = 60;

type BlogDetailPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const post = await fetchBlogPostBySlug(params.slug);

  if (!post) {
    return buildMetadata({ title: "ブログ記事", path: `/blog/${params.slug}` });
  }

  const ogImage = buildImageUrl(post.ogImage ?? post.mainImage);

  return buildMetadata({
    title: post.title,
    description: post.excerpt ?? extractPlainText(post.body),
    path: `/blog/${post.slug}`,
    og: {
      type: "blog",
      slug: post.slug,
      theme: post.ogTheme,
      imageUrl: ogImage ?? undefined,
    },
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = await fetchBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(post.publishedAt))
    : null;

  const mainImageUrl = buildImageUrl(post.mainImage);

  return (
    <article className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-zinc-500">副住職ブログ</p>
        <h1 className="text-3xl font-semibold text-zinc-900">{post.title}</h1>
        {formattedDate ? (
          <p className="text-sm text-zinc-600">
            公開日: <time dateTime={post.publishedAt}>{formattedDate}</time>
          </p>
        ) : null}
        {post.excerpt ? <p className="text-sm text-zinc-600">{post.excerpt}</p> : null}
      </header>

      {mainImageUrl ? (
        <div className="overflow-hidden rounded-lg">
          <Image
            src={mainImageUrl}
            alt={post.mainImage?.alt ?? "ブログ記事の画像"}
            width={1200}
            height={800}
            className="h-auto w-full"
            priority
          />
        </div>
      ) : null}

      <PortableTextContent value={post.body} />
    </article>
  );
}

export async function generateStaticParams() {
  const slugs = await fetchBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}
