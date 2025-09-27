import type { PortableTextBlock } from "@portabletext/types";

type PortableTextSpan = { text?: string };

type PortableTextBlockWithChildren = PortableTextBlock & {
  children?: PortableTextSpan[];
};

function isPortableTextBlockWithChildren(block: PortableTextBlock): block is PortableTextBlockWithChildren {
  return Array.isArray((block as PortableTextBlockWithChildren).children);
}

export function extractPlainText(blocks?: PortableTextBlock[], maxLength = 160): string | undefined {
  if (!blocks?.length) {
    return undefined;
  }

  const text = blocks
    .filter((block) => block._type === "block" && isPortableTextBlockWithChildren(block))
    .map((block) => block.children?.map((child) => child.text ?? "").join("") ?? "")
    .join(" ")
    .trim();

  if (!text) {
    return undefined;
  }

  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}
