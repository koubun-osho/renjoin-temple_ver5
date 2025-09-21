import { buildMetadata } from "@/components/common/SEO";
import { Card } from "@/components/ui/Card";

export const metadata = buildMetadata({
  title: "副住職ブログ",
  path: "/blog",
});

export default function BlogListPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-6 px-6 py-12">
      <header>
        <h1 className="text-3xl font-semibold text-zinc-900">副住職ブログ</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Sanityから公開日順で取得した記事をカード形式で表示します。ページネーションもPhase 2で実装します。
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <Card
            key={item}
            title={`ブログ記事タイトル ${item}`}
            description="CMS接続後に抜粋文を表示予定です。"
            href="/blog/sample"
          />
        ))}
      </div>
    </section>
  );
}
