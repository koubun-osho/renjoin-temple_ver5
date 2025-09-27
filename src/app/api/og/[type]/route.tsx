import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { buildImageUrl, fetchBlogPostBySlug, fetchNewsItemBySlug, fetchStaticPageBySlug } from "@/lib/sanity";
import { extractPlainText } from "@/lib/portableText";
import type { OgTheme } from "@/types/sanity";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

type OgRequestType = "blog" | "news" | "page" | "static";
type OgResolvedTheme = "blog" | "news" | "page";

type OgPayload = {
  title: string;
  description?: string;
  label: string;
  theme: OgResolvedTheme;
  backgroundImage?: string;
  dateText?: string;
  footer?: string;
};

const DEFAULT_THEME_BY_TYPE: Record<OgRequestType, OgResolvedTheme> = {
  blog: "blog",
  news: "news",
  page: "page",
  static: "page",
};

const THEME_STYLE: Record<OgResolvedTheme, { overlay: string; accent: string; backgroundColor: string; secondary: string }> = {
  blog: {
    overlay: "rgba(15, 15, 15, 0.55)",
    accent: "#C7A25A",
    backgroundColor: "#1B1B1B",
    secondary: "rgba(255, 255, 255, 0.78)",
  },
  news: {
    overlay: "rgba(12, 20, 26, 0.58)",
    accent: "#D2B667",
    backgroundColor: "#142028",
    secondary: "rgba(255, 255, 255, 0.82)",
  },
  page: {
    overlay: "rgba(20, 20, 20, 0.6)",
    accent: "#F1E4C6",
    backgroundColor: "#1C1A18",
    secondary: "rgba(255, 255, 255, 0.8)",
  },
};

const STATIC_PRESETS: Record<string, OgPayload> = {
  blog: {
    title: "副住職ブログ",
    description: "寺院の日々と季節の便りをお届けします。",
    label: "Renjoin Temple",
    theme: "blog",
    footer: "RENJYO-IN.COM",
  },
  news: {
    title: "蓮城院からのお知らせ",
    description: "行事やご案内、寺院の最新情報をお届けします。",
    label: "Information",
    theme: "news",
    footer: "RENJYO-IN.COM",
  },
};

const TEMPLE_NAME = "蓮城院";
const TEMPLE_URL = "RENJYO-IN.COM";

function resolveTheme(type: OgRequestType, docTheme?: OgTheme | null, queryTheme?: string | null): OgResolvedTheme {
  const candidates = [queryTheme, docTheme, DEFAULT_THEME_BY_TYPE[type]];
  for (const value of candidates) {
    if (value === "blog" || value === "news" || value === "page") {
      return value;
    }
  }
  return "page";
}

function truncate(text: string | undefined, max = 110) {
  if (!text) {
    return undefined;
  }
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

function formatDate(dateString?: string) {
  if (!dateString) {
    return undefined;
  }
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  } catch (error) {
    console.warn("Failed to format OGP date", error);
    return undefined;
  }
}

function renderOgImage(payload: OgPayload) {
  const themeStyle = THEME_STYLE[payload.theme];
  const backgroundStyle = payload.backgroundImage
    ? {
        backgroundImage: `url(${payload.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        backgroundImage:
          "linear-gradient(135deg, rgba(24,29,32,0.92) 0%, rgba(48,38,30,0.88) 55%, rgba(22,22,22,0.94) 100%)",
      };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: themeStyle.backgroundColor,
        ...backgroundStyle,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: themeStyle.overlay,
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 96px",
          width: "100%",
          height: "100%",
          color: "#FFFFFF",
          fontFamily: "Noto Sans JP, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 28, letterSpacing: 10, textTransform: "uppercase", color: themeStyle.accent }}>
            {payload.label}
          </div>
          <div style={{ width: 120, height: 2, backgroundColor: themeStyle.accent }} />
          <div style={{ fontSize: 66, lineHeight: 1.2, fontWeight: 700, fontFamily: "Shippori Mincho, serif" }}>
            {payload.title}
          </div>
          {payload.description ? (
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.42,
                color: themeStyle.secondary,
                maxWidth: 840,
                whiteSpace: "pre-wrap",
              }}
            >
              {payload.description}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 30, fontFamily: "Shippori Mincho, serif", letterSpacing: 4 }}>{TEMPLE_NAME}</span>
            {payload.dateText ? <span style={{ fontSize: 24 }}>{payload.dateText}</span> : null}
          </div>
          <span style={{ letterSpacing: 6 }}>{payload.footer ?? TEMPLE_URL}</span>
        </div>
      </div>
    </div>
  );
}


function renderPlaceholder(type: string, slug?: string | null) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1B1B1B",
        color: "#FFFFFF",
        fontFamily: "Noto Sans JP, sans-serif",
        gap: 16,
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 48, letterSpacing: 6 }}>OGP Not Ready</div>
      <div style={{ fontSize: 28, opacity: 0.7 }}>{`type: ${type}`}</div>
      {slug ? <div style={{ fontSize: 24, opacity: 0.6 }}>{`slug: ${slug}`}</div> : null}
    </div>
  );
}

async function buildPayload(type: OgRequestType, slug: string | null, queryTheme: string | null): Promise<OgPayload | null> {
  if (type === "static") {
    const preset = slug ? STATIC_PRESETS[slug] : undefined;
    if (preset) {
      return preset;
    }
    return {
      title: TEMPLE_NAME,
      description: "曹洞宗 蓮城院 公式サイト",
      label: "Renjoin Temple",
      theme: "page",
      footer: TEMPLE_URL,
    };
  }

  if (!slug) {
    return null;
  }

  if (type === "blog") {
    const post = await fetchBlogPostBySlug(slug);
    if (!post) {
      return null;
    }

    const theme = resolveTheme(type, post.ogTheme, queryTheme);
    const backgroundImage = buildImageUrl(post.ogImage ?? post.mainImage) ?? undefined;
    const description = truncate(post.ogDescription ?? post.excerpt ?? extractPlainText(post.body));

    return {
      title: post.ogTitle ?? post.title,
      description,
      label: "副住職ブログ",
      theme,
      backgroundImage,
      dateText: formatDate(post.publishedAt),
      footer: TEMPLE_URL,
    };
  }

  if (type === "news") {
    const news = await fetchNewsItemBySlug(slug);
    if (!news) {
      return null;
    }

    const theme = resolveTheme(type, news.ogTheme, queryTheme);
    const backgroundImage = buildImageUrl(news.ogImage ?? null) ?? undefined;
    const description = truncate(news.ogDescription ?? extractPlainText(news.content));

    return {
      title: news.ogTitle ?? news.title,
      description,
      label: news.category ? `お知らせ｜${news.category}` : "お知らせ",
      theme,
      backgroundImage,
      dateText: formatDate(news.publishedAt),
      footer: TEMPLE_URL,
    };
  }

  if (type === "page") {
    const page = await fetchStaticPageBySlug(slug);
    if (!page) {
      return null;
    }

    const theme = resolveTheme(type, page.ogTheme, queryTheme);
    const backgroundImage = buildImageUrl(page.ogImage ?? null) ?? undefined;
    const description = truncate(page.ogDescription ?? extractPlainText(page.body));

    return {
      title: page.ogTitle ?? page.title,
      description,
      label: "Renjoin Temple",
      theme,
      backgroundImage,
      footer: TEMPLE_URL,
    };
  }

  return null;
}

export async function GET(request: NextRequest, context: { params: Promise<{ type: string }> }) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const themeParam = searchParams.get("theme");

  const { type } = await context.params;
  const typeParam = type as OgRequestType;
  const payload = await buildPayload(typeParam, slug, themeParam);

  if (!payload) {
    return new ImageResponse(renderPlaceholder(typeParam, slug), size);
  }

  return new ImageResponse(renderOgImage(payload), size, {
    headers: {
      "Cache-Control": "public, max-age=600, stale-while-revalidate=86400",
    },
  });
}
