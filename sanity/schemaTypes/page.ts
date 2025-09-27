import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "固定ページ",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "ページタイトル",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "URL スラッグ",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
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
      name: "metaDescription",
      title: "メタディスクリプション",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(200),
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
      initialValue: "page",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
