import Link from "next/link";

const NAV_ITEMS: Array<{ href: string; label: string }> = [
  { href: "/about", label: "蓮城院について" },
  { href: "/events", label: "年間行事" },
  { href: "/news", label: "お知らせ" },
  { href: "/blog", label: "副住職ブログ" },
  { href: "/contact", label: "お問い合わせ" },
];

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          蓮城院
        </Link>
        <nav aria-label="主要ナビゲーション">
          <ul className="flex flex-wrap items-center gap-6 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-zinc-700 transition hover:text-zinc-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
