import { buildMetadata } from "@/components/common/SEO";
import { Card } from "@/components/ui/Card";
import { fetchBlogPosts } from "@/lib/sanity";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "副住職ブログ",
  path: "/blog",
  og: {
    type: "static",
    slug: "blog",
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
    console.warn("Failed to format blog date", error);
    return dateString;
  }
}

export default async function BlogListPage() {
  const posts = await fetchBlogPosts();

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-6 py-12">
      <header>
        <h1 className="text-3xl font-semibold text-zinc-900">副住職ブログ</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Sanityから公開日順で取得した記事をカード形式で表示します。
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-300 bg-white/60 p-6 text-sm text-zinc-600">
          公開済みの記事がまだありません。Sanityに記事を公開すると自動的に表示されます。
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Card
              key={post._id}
              title={post.title}
              description={post.excerpt ?? "続きは本文でご覧ください。"}
              href={`/blog/${post.slug}`}
            >
              <div className="mt-4 text-xs text-zinc-500">
                公開日: <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
