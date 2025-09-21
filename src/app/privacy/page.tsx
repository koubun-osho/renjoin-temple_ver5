import { buildMetadata } from "@/components/common/SEO";

export const metadata = buildMetadata({
  title: "プライバシーポリシー",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-4 px-6 py-12">
      <h1 className="text-3xl font-semibold text-zinc-900">プライバシーポリシー（準備中）</h1>
      <p className="text-sm leading-relaxed text-zinc-600">
        個人情報保護方針をSanityの固定ページで管理し、公開前に最新の内容へ更新します。
      </p>
      <p className="text-sm leading-relaxed text-zinc-600">
        Phase 1でSanityスキーマを整備し、Phase 2以降で分析ツール連携時の追記事項を検討します。
      </p>
    </section>
  );
}
