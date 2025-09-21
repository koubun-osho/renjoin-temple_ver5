import { buildMetadata } from "@/components/common/SEO";

export const metadata = buildMetadata({
  title: "蓮城院について",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-4 px-6 py-12">
      <h1 className="text-3xl font-semibold text-zinc-900">蓮城院について</h1>
      <p className="text-sm leading-relaxed text-zinc-600">
        Sanity CMSの固定ページから由緒や歴史を取得し、寺院の歩みと教えを紹介する予定です。
      </p>
      <p className="text-sm leading-relaxed text-zinc-600">
        Phase 1でPortable Textレンダリングを実装したあとに、実際のコンテンツに差し替えます。
      </p>
    </section>
  );
}
