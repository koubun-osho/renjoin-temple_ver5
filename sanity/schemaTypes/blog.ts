import { defineField, defineType } from "sanity";

export const blog = defineType({
  name: "blog",
  title: "ブログ記事",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "URL スラッグ",
      type: "slug",
      options: {
        source: "title",
        maxLength: 120,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "公開日",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "概要",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "body",
      title: "本文",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "代替テキスト",
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "メイン画像",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "代替テキスト",
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "タグ",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
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
      fields: [
        {
          name: "alt",
          type: "string",
          title: "代替テキスト",
          validation: (rule) => rule.required().max(120),
        },
      ],
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString("ja-JP") : "公開日未設定",
        media,
      };
    },
  },
  orderings: [
    {
      title: "公開日 (新しい順)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
