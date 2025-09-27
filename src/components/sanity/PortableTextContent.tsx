import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

import { buildImageUrl } from "@/lib/sanity";
import type { SanityImage } from "@/types/sanity";

type PortableTextContentProps = {
  value?: PortableTextBlock[];
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageValue = value as SanityImage | undefined;
      const url = buildImageUrl(imageValue, 1200);

      if (!url || !imageValue) {
        return null;
      }

      return (
        <figure className="space-y-2">
          <Image
            src={url}
            alt={imageValue.alt ?? ""}
            width={1200}
            height={800}
            className="h-auto w-full rounded-lg"
          />
          {imageValue.alt ? (
            <figcaption className="text-xs text-zinc-500">{imageValue.alt}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => <h2 className="text-xl font-semibold text-zinc-900">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-semibold text-zinc-900">{children}</h3>,
    normal: ({ children }) => <p className="leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-zinc-300 pl-4 italic text-zinc-600">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      const isExternal = href.startsWith("http");

      if (!href) {
        return <span>{children}</span>;
      }

      return (
        <a
          href={href}
          className="underline decoration-zinc-400 underline-offset-4 transition hover:decoration-zinc-600"
          rel={isExternal ? "noopener noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
  },
};

export function PortableTextContent({ value }: PortableTextContentProps) {
  if (!value?.length) {
    return null;
  }

  return (
    <div className="space-y-4 text-sm leading-relaxed text-zinc-700">
      <PortableText value={value} components={components} />
    </div>
  );
}
