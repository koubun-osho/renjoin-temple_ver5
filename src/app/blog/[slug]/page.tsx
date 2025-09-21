import { buildMetadata } from "@/components/common/SEO";

export const metadata = buildMetadata({
  title: "ブログ記事",
  path: "/blog/[slug]",
});

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <article className="mx-auto max-w-3xl space-y-4 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-zinc-500">副住職ブログ</p>
        <h1 className="text-3xl font-semibold text-zinc-900">{`仮のブログ記事タイトル (${slug})`}</h1>
        <p className="text-sm text-zinc-600">公開日と著者情報をCMSから取得して表示します。</p>
      </header>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-600">
        <p>
          SanityのPortable TextをReactコンポーネントに変換し、画像や引用のカスタムブロックを整備する予定です。
        </p>
        <p>
          XSS対策としてDOMPurifyまたはPortable Textのサニタイズルールを適用し、安全にHTMLを描画します。
        </p>
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return [] as Array<{ slug: string }>;
}
