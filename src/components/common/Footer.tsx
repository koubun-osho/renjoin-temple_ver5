import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 text-sm text-zinc-600 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-semibold text-zinc-800">曹洞宗 蓮城院</p>
          <p className="mt-2 leading-relaxed">
            静かで荘厳な境内から、仏教の教えと日々の営みをお届けします。
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-zinc-800">関連リンク</h2>
          <Link href="/terms" className="hover:text-zinc-900">
            利用規約
          </Link>
          <Link href="/privacy" className="hover:text-zinc-900">
            プライバシーポリシー
          </Link>
        </div>
      </div>
      <div className="bg-zinc-900 py-4 text-center text-xs text-zinc-200">
        &copy; {currentYear} 蓮城院. All rights reserved.
      </div>
    </footer>
  );
}
