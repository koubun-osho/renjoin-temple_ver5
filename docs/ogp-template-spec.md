# OGP Template Design Spec (Draft)

## 1. Canvas Settings
- Size: 1200 × 630 px (OGP standard)
- Safe area: 100 px padding on all sides to avoid clipping.
- Background: Main photo (cover) with 60% black overlay (#000000, opacity 0.6).

## 2. Layout Structure
```
┌──────────────────────────────────────────────┐
│  Top Margin 80px                             │
│      ┌────────────────────────────────┐      │
│      │   Temple Crest (40px square)   │      │
│      └────────────────────────────────┘      │
│      Subtitle (Category / Date)              │
│      ─────────────────────────────────────   │
│      Title (2–3 lines, max 26 chars/line)    │
│                                              │
│      Footer Bar (40% opacity, 120px height)  │
│        └ 寺院名 + URL                        │
│                                              │
└──────────────────────────────────────────────┘
```

## 3. Typography
- Category Label: Noto Sans JP Medium / 22 pt / Letter spacing 200.
- Date: Noto Sans JP Regular / 18 pt / Letter spacing 80.
- Title: Shippori Mincho Bold / 64 pt / Line height 1.2 / Tracking 0.
- Footer temple name: Shippori Mincho Semibold / 30 pt.
- Footer URL: Noto Sans JP Regular / 20 pt, uppercase romanization (`RENJYO-IN.COM`).

## 4. Color Palette
- Overlay: #000000 @ 60%.
- Accent line: #C7A25A (2px) under subtitle.
- Footer bar: #1B1B1B @ 80% opacity.
- Text: Pure white (#FFFFFF) with subtle drop shadow (0, 4, 12, 40%).

## 5. Variants
- BLOG: Subtitle = "副住職ブログ"; accent color #1D3B32; optional tag pill below title.
- NEWS: Subtitle = "お知らせ"; accent color #C7A25A; date displayed on same line.
- STATIC PAGE: Subtitle = ページカテゴリ (例: "蓮城院について"); accent color #ffffff40.
- FALLBACK: 和紙テクスチャ背景 (#F8F4ED) + outline photo frame (no image case).

## 6. Assets
- ロゴ: `public/assets/logo-monochrome.svg`（未登録の場合は後続タスクで準備）。
- テクスチャ: `public/assets/washi-texture.png`.

## 7. Export Guidelines
- Figma: Use Components with variants (blog/news/page/fallback)。
- Export format: PNG @1x (1200×630)。
- Naming: `og-blog-{slug}.png`, `og-news-{slug}.png`, etc.

> 現在の参照テンプレート（Canva試作版）: https://www.canva.com/design/DAGzwAV32aU/xMv_Y-nr6LNSxcx4v24fyw/view?utm_content=DAGzwAV32aU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h71f8a3098b

## 8. Copywriting & Branding Elements
- **サイト名（JP）**: 蓮城院
- **サイト名（EN/Romanized）**: RENJYO-IN
- **サブタイトル候補**: 「曹洞宗 蓮城院」「Renjoin Temple Official Site」
- **ブログラベル**: 副住職ブログ
- **お知らせラベル**: お知らせ
- **固定ページカテゴリ例**: 蓮城院について / 年間行事 / アクセス
- **日付書式**: `YYYY.MM.DD`（OGP上は半角ドット区切り）
- **URL表記**: RENJYO-IN.COM
- **タグライン案**: 「静寂とともに歩む、蓮城院の四季」
- **ロゴデータ**: 家紋風円形ロゴ（単色白・単色金の2種）。ない場合は仮置き文字ロゴ `RENJYO-IN` をShippori Minchoで表示。


## 8. Open Items
- ロゴSVGの最終版が未決定 → タスク#3で確定予定。
- カラーアクセントの明度調整は実装時に微調整。
