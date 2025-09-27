import { buildMetadata } from "@/components/common/SEO";
import { Card } from "@/components/ui/Card";
import { fetchNewsItems } from "@/lib/sanity";
import { extractPlainText } from "@/lib/portableText";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "お知らせ一覧",
  path: "/news",
  og: {
    type: "static",
    slug: "news",
  },
});

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

export default async function NewsListPage() {
  const items = await fetchNewsItems();

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-6 py-12">
      <header>
        <h1 className="text-3xl font-semibold text-zinc-900">お知らせ</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Sanityから公開日順で取得したお知らせを掲載します。
        </p>
      </header>

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-300 bg-white/60 p-6 text-sm text-zinc-600">
          公開済みのお知らせはまだありません。Sanityで公開すると自動的に反映されます。
        </p>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <Card
              key={item._id}
              title={item.title}
              description={
                extractPlainText(item.content, 120) ?? "詳細は本文をご覧ください。"
              }
              href={`/news/${item.slug}`}
            >
              <div className="mt-4 flex flex-col gap-1 text-xs text-zinc-500">
                <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                {item.category ? <span>カテゴリー: {item.category}</span> : null}
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
