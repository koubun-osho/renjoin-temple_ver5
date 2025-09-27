# OGP Technical Specification (Draft)

## 1. Sanity Schema Additions (Task #4)

### 1.1 Common Fields
- `ogTitle` (`string`, optional): Override for the OGP title when記事タイトルをそのまま使えない場合。
- `ogDescription` (`text`, optional, max 200): Custom OGP説明文。未設定時は既存excerpt/portable textから抽出。
- `ogImage` (`image`, optional): 専用画像。未設定時は`mainImage`やフォールバックテンプレートを使用。
- `ogTheme` (`string`, optional): テンプレートバリアント指定。候補: `auto`(default), `blog`, `news`, `page`。

### 1.2 Document Types
| Document Type | Fields追加 | 備考 |
| --- | --- | --- |
| `blog` | `ogTitle`, `ogDescription`, `ogImage`, `ogTheme` | `ogTheme` 初期値は `blog` |
| `news` | 同上 | 初期値 `news` |
| `page` | `ogTitle`, `ogDescription`, `ogImage`, `ogTheme` | 初期値 `page` |

### 1.3 Sanity Schema Sample (blog)
```ts
defineField({
  name: "ogTitle",
  title: "OGPタイトル上書き",
  type: "string",
  validation: (rule) => rule.max(120),
}),
defineField({
  name: "ogDescription",
  title: "OGP説明文",
  type: "text",
  rows: 3,
  validation: (rule) => rule.max(200),
}),
defineField({
  name: "ogImage",
  title: "OGP専用画像",
  type: "image",
  options: { hotspot: true },
  fields: [{
    name: "alt",
    type: "string",
    title: "代替テキスト",
    validation: (rule) => rule.required().max(120),
  }],
}),
defineField({
  name: "ogTheme",
  title: "OGPテンプレート",
  type: "string",
  options: {
    list: [
      { title: "自動", value: "auto" },
      { title: "ブログ", value: "blog" },
      { title: "お知らせ", value: "news" },
      { title: "固定ページ", value: "page" },
    ],
    layout: "radio",
  },
  initialValue: "blog",
}),
```

### 1.4 Migration Strategy
- 既存ドキュメントに対しては `ogTheme` をSanityの「Initial Value Templates」で自動設定。
- `ogImage` を空のまま許容。`mainImage` が必須でないドキュメントはフォールバックテンプレートに委ねる。

## 2. OGP API Design (Task #5)

### 2.1 Endpoint Structure
- `/api/og/blog/[slug]`
- `/api/og/news/[slug]`
- `/api/og/page/[slug]`
- `/api/og/static?slug=<preset>` (ブログ一覧・お知らせ一覧など)

### 2.2 Request Flow
1. APIが該当slugのSanityデータをGROQで取得（必要fields: title, ogTitle, mainImage, ogImage, publishedAt, ogTheme, categoryなど）。
2. OG情報を整形し `ImageResponse` (1200×630) を返却。
3. レスポンスヘッダに `Cache-Control: public, max-age=600, stale-while-revalidate=86400` を設定。

### 2.3 Data Dependencies
```ts
const BLOG_OG_QUERY = groq`
  *[_type == "blog" && slug.current == $slug][0]{
    title,
    ogTitle,
    ogDescription,
    mainImage,
    ogImage,
    ogTheme,
    publishedAt,
    tags,
  }
`;
```

### 2.4 Error Handling
- NotFound → HTTP 404 + シンプルなfallback画像 (`OGP Not Ready`).
- Sanity接続不可 → HTTP 503, fallback画像。

## 3. Fallback Rules (Task #6)

1. `ogImage` が存在 → その画像を背景に描画。
2. `ogImage` なし & `mainImage` あり → `mainImage` を使用。
3. 上記どちらもなし → CSSグラデーション／今後追加するデフォルト画像で背景を構成。
4. タイトルは `ogTitle ?? title`、説明は `ogDescription ?? excerpt ?? extractPlainText(body)`。
5. `ogTheme` が `auto` の場合はドキュメントタイプに応じて `blog/news/page` を割り当て。
6. カテゴリ・日付はtypeに応じて任意表示。お知らせでは日付必須、ブログでは日付オプション。

## 4. Outstanding Questions
- ロゴSVGの準備が必要（単色白/金の2種類）。
- デフォルト背景画像を撮影するか、免許情報のないフリー素材を使用するか要決定。
- APIレスポンスの言語切替（英語版展開予定）をどうするか。
