# Sanity Schema Proposal (MVP)

## Overview
- **Schemas**: `blog`, `news`, `page`
- **Location**: `sanity/schemaTypes`
- **Studio Config**: `sanity/sanity.config.ts` with base path `/studio`

## blog (ブログ記事)
- 必須フィールド: `title`, `slug`, `publishedAt`, `body`
- 任意フィールド: `excerpt`, `mainImage`, `tags`
- 画像には必ず代替テキストを要求し、ホットスポット有効化
- 並び順: 公開日降順

## news (お知らせ)
- カテゴリー: `event`, `notice`, `service` の3分類
- 本文は Portable Text ブロック
- 添付資料として PDF ファイルを想定（任意）
- 並び順: 公開日降順

## page (固定ページ)
- 由緒・年間行事・規約等で共通利用
- 本文に画像ブロック + 代替テキスト
- `metaDescription` で SEO 設定をCMS側に保持

## 今後の追加想定
- Phase 2で `category` や `tag` の参照型へ拡張可能なよう、`tags` を文字列配列でプレースホルダー定義
- CTAやHeroセクション用にトップページ向けドキュメントを追加予定（Phase 3検討）

## レビュー観点
1. プロジェクトID / dataset の命名方針（`sanity/sanity.config.ts` 内）
2. カテゴリー選択肢やタグ構成の拡張有無
3. 添付ファイルや画像サイズ上限などのバリデーション要否
