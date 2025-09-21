import { buildMetadata } from "@/components/common/SEO";

export const metadata = buildMetadata({
  title: "お知らせ詳細",
  path: "/news/[slug]",
});

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <section className="mx-auto max-w-3xl space-y-4 px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-zinc-500">お知らせ</p>
      <h1 className="text-3xl font-semibold text-zinc-900">{`仮のお知らせタイトル (${slug})`}</h1>
      <p className="text-sm text-zinc-600">
        CMSが接続され次第、Portable Textレンダリングで本文を表示します。現状はテキストのみのスタブです。
      </p>
    </section>
  );
}

export function generateStaticParams() {
  return [] as Array<{ slug: string }>;
}
