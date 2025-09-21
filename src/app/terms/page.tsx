import { buildMetadata } from "@/components/common/SEO";

export const metadata = buildMetadata({
  title: "利用規約",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-4 px-6 py-12">
      <h1 className="text-3xl font-semibold text-zinc-900">利用規約（準備中）</h1>
      <p className="text-sm leading-relaxed text-zinc-600">
        Sanity CMS経由で管理できるよう、Phase 1でPortable Textベースの固定ページとして実装します。
      </p>
      <p className="text-sm leading-relaxed text-zinc-600">
        公開前に法務確認を行い、必要な条項を整備します。
      </p>
    </section>
  );
}
