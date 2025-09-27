import { notFound } from "next/navigation";

import { buildMetadata } from "@/components/common/SEO";
import { PortableTextContent } from "@/components/sanity/PortableTextContent";
import { buildImageUrl, fetchNewsItemBySlug, fetchNewsSlugs } from "@/lib/sanity";
import { extractPlainText } from "@/lib/portableText";

export const revalidate = 60;

type NewsDetailPageProps = {
  params: { slug: string };
};

function formatDate(dateString?: string) {
  if (!dateString) {
    return "公開日未設定";
  }

  try {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  } catch (error) {
    console.warn("Failed to format news date", error);
    return dateString;
  }
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const news = await fetchNewsItemBySlug(params.slug);

  if (!news) {
    return buildMetadata({ title: "お知らせ詳細", path: `/news/${params.slug}` });
  }

  const ogImageUrl = buildImageUrl(news.ogImage ?? null);

  return buildMetadata({
    title: news.title,
    description: extractPlainText(news.content) ?? formatDate(news.publishedAt),
    path: `/news/${news.slug}`,
    og: {
      type: "news",
      slug: news.slug,
      theme: news.ogTheme,
      imageUrl: ogImageUrl ?? undefined,
    },
  });
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const news = await fetchNewsItemBySlug(params.slug);

  if (!news) {
    notFound();
  }

  const formattedDate = formatDate(news.publishedAt);

  return (
    <section className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-zinc-500">お知らせ</p>
        <h1 className="text-3xl font-semibold text-zinc-900">{news.title}</h1>
        <div className="text-sm text-zinc-600">
          <time dateTime={news.publishedAt}>{formattedDate}</time>
          {news.category ? <span className="ml-3">カテゴリー: {news.category}</span> : null}
        </div>
      </header>

      <PortableTextContent value={news.content} />

      {news.attachments && news.attachments.length > 0 ? (
        <div className="space-y-3 rounded-lg border border-zinc-200 bg-white/80 p-4 text-sm text-zinc-600">
          <p className="font-semibold text-zinc-800">添付資料</p>
          <ul className="space-y-2">
            {news.attachments.map((file) => {
              const href = file.asset?.url;
              if (!href) {
                return null;
              }

              return (
                <li key={file._key ?? href}>
                  <a
                    href={href}
                    className="underline decoration-zinc-400 underline-offset-4 transition hover:decoration-zinc-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {href.split("/").pop()}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

export async function generateStaticParams() {
  const slugs = await fetchNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}
