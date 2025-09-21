import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="bg-white">
      <section className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 md:flex-row md:items-end">
        <div className="flex-1 space-y-4">
          <p className="text-sm text-zinc-500">曹洞宗 蓮城院 公式サイト</p>
          <h1 className="text-3xl font-semibold text-zinc-900 md:text-4xl">
            静謐な境内から、日々の祈りと学びをお届けします
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-600">
            副住職・荒木弘文によるブログや、年間行事・アクセス情報など、
            蓮城院に関する最新の情報を発信していきます。
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/news">最新のお知らせを見る</Button>
            <Button href="/blog" variant="secondary">
              副住職ブログへ
            </Button>
          </div>
        </div>
        <div className="hidden h-48 w-32 items-center justify-center rounded-lg bg-zinc-900 p-4 text-white md:flex">
          <p className="vertical-text text-lg tracking-widest">蓮城院</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-6">
          <h2 className="section-heading">お知らせ</h2>
          <p className="section-subtext">最新情報を3件まで表示予定です。</p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card
              key={item}
              title={`お知らせタイトル ${item}`}
              description="Sanity CMSのテストデータが揃い次第、自動的に差し替えます。"
              href="/news"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-6">
          <h2 className="section-heading">副住職ブログ</h2>
          <p className="section-subtext">最新記事をカード形式で紹介します。</p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card
              key={item}
              title={`ブログ記事タイトル ${item}`}
              description="CMS接続後に記事概要を表示予定です。"
              href="/blog"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-6">
          <h2 className="section-heading">アクセス</h2>
          <p className="section-subtext">所在地と交通手段を掲載予定です。</p>
        </header>
        <div className="rounded-lg border border-zinc-200 bg-neutral-50 p-6 text-sm text-zinc-600">
          <p>
            Google Maps埋め込みと公共交通機関・駐車場情報をSanityの固定ページから取得して掲載します。
          </p>
        </div>
      </section>
    </div>
  );
}
