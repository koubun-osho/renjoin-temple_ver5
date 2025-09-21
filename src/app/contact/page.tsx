import { buildMetadata } from "@/components/common/SEO";

export const metadata = buildMetadata({
  title: "お問い合わせ",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-4 px-6 py-12">
      <h1 className="text-3xl font-semibold text-zinc-900">お問い合わせ</h1>
      <p className="text-sm leading-relaxed text-zinc-600">
        Phase 1ではメールアドレスと電話番号のみを掲載し、Phase 2でフォーム機能を追加する予定です。
      </p>
      <div className="rounded-lg border border-zinc-200 bg-neutral-50 p-6 text-sm text-zinc-600">
        <p>メール: <span className="font-medium">info@example.com</span>（仮）</p>
        <p className="mt-2">電話: <span className="font-medium">000-0000-0000</span>（仮）</p>
      </div>
    </section>
  );
}
