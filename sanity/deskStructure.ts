import type { StructureBuilder } from "sanity/desk";

export function deskStructure(S: StructureBuilder) {
  return S.list()
    .title("コンテンツ")
    .items([
      S.listItem()
        .title("お知らせ")
        .schemaType("news")
        .child(S.documentTypeList("news").title("お知らせ")),
      S.listItem()
        .title("副住職ブログ")
        .schemaType("blog")
        .child(S.documentTypeList("blog").title("副住職ブログ")),
      S.listItem()
        .title("固定ページ")
        .schemaType("page")
        .child(S.documentTypeList("page").title("固定ページ")),
      S.divider(),
      S.listItem()
        .title("すべてのドキュメント")
        .child(S.documentList().title("すべてのドキュメント")),
    ]);
}

export function defaultDocumentNode(S: StructureBuilder) {
  return S.document().views([S.view.form()]);
}
