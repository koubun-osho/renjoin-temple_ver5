# Phase 1 Progress Notes

## Next.js ↔ Sanity Integration
- Implemented typed GROQ queries for blogs, news, and static pages (`src/lib/queries.ts`).
- Added server-side fetch helpers with graceful fallbacks in `src/lib/sanity.ts`.
- Exposed `sanityConfigured` flag for diagnostics when environment variables are missing.
- SEOヘルパーに`NEXT_PUBLIC_SITE_URL`環境変数を適用し、パス結合時の二重スラッシュを防止 (`src/components/common/SEO.tsx`).
- OGP対応の下準備としてSanityスキーマ拡張・OG APIプレースホルダー・URLビルダーを追加 (`sanity/schemaTypes/*`, `src/app/api/og/[type]/route.ts`, `src/lib/og.ts`, `src/components/common/SEO.tsx`).

## Sanity Studio Setup
- Added custom desk structure with dedicated lists for お知らせ／ブログ／固定ページ (`sanity/deskStructure.ts`, `sanity.config.ts`).
- Prepared seed dataset (`sanity/seed/testContent.ndjson`) for quick local verification。
- Launch Studio locally via `npm run sanity:dev` and import seed data with `npx sanity dataset import sanity/seed/testContent.ndjson <dataset> --replace`.

## Page Updates
- Blog一覧／詳細ページをSanityの実データ取得に対応 (`src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`).
- お知らせ一覧／詳細ページをSanityデータで描画、Portable Textレンダリングを導入 (`src/app/news/page.tsx`, `src/app/news/[slug]/page.tsx`).
- 共通Portable Textレンダラーを追加し、安全なリンク・画像描画を実装 (`src/components/sanity/PortableTextContent.tsx`).
- Portable Textのテキスト抽出ユーティリティを追加 (`src/lib/portableText.ts`).

## Outstanding Items
- `/api/og/[type]` の生成結果をローカルで検証し、フォールバック画像やレイアウトの最終調整を行う（`docs/ogp-plan.md` フェーズD）。
