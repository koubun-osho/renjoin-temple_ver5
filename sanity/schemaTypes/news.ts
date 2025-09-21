import { defineField, defineType } from "sanity";

const NEWS_CATEGORY_OPTIONS = [
  { title: "行事案内", value: "event" },
  { title: "お知らせ", value: "notice" },
  { title: "法要", value: "service" },
];

export const news = defineType({
  name: "news",
  title: "お知らせ",
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
      name: "category",
      title: "カテゴリー",
      type: "string",
      options: {
        list: NEWS_CATEGORY_OPTIONS,
        layout: "dropdown",
      },
    }),
    defineField({
      name: "content",
      title: "内容",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "attachments",
      title: "添付ファイル",
      type: "array",
      of: [
        {
          type: "file",
          options: {
            accept: "application/pdf",
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "category",
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
