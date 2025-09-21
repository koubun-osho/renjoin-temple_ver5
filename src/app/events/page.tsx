import { buildMetadata } from "@/components/common/SEO";

export const metadata = buildMetadata({
  title: "年間行事",
  path: "/events",
});

export default function EventsPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-4 px-6 py-12">
      <h1 className="text-3xl font-semibold text-zinc-900">年間行事</h1>
      <p className="text-sm leading-relaxed text-zinc-600">
        年間行事リストをSanityの構造化データから取得し、季節ごとの行事をリスト表示する予定です。
      </p>
      <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-600">
        <li>Phase 1: CMSにテスト行事データを登録</li>
        <li>Phase 2: Portable Textあるいはカスタム型で表示形式を整備</li>
      </ul>
    </section>
  );
}
