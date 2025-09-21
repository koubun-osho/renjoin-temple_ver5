import { buildMetadata } from "@/components/common/SEO";
import { Card } from "@/components/ui/Card";

export const metadata = buildMetadata({
  title: "お知らせ一覧",
  path: "/news",
});

export default function NewsListPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-6 px-6 py-12">
      <header>
        <h1 className="text-3xl font-semibold text-zinc-900">お知らせ</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Sanityから公開日順で取得したお知らせを掲載します。CMS接続まではダミーデータを表示します。
        </p>
      </header>
      <div className="grid gap-4">
        {[1, 2, 3].map((item) => (
          <Card
            key={item}
            title={`お知らせタイトル ${item}`}
            description="CMS連携後に内容が表示されます。"
            href="/news/sample"
          />
        ))}
      </div>
    </section>
  );
}
