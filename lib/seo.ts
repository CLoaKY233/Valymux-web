import type { Metadata } from "next";

// ── Site-wide constants ──────────────────────────────────────────────
export const SITE_URL = "https://www.valymux.xyz";
export const SITE_NAME = "Valymux";
export const SITE_DESCRIPTION =
  "One simple API endpoint. Every model at your fingertips. Zero latency overhead. The intelligent gateway for developers building with AI providers.";
export const TWITTER_HANDLE = "@valymux";
export const GITHUB_URL = "https://github.com/cloaky233/Valymux";

// ── OG Image (fallback — replace with a real OG image later) ─────────
export const OG_IMAGE = `${SITE_URL}/logo.png`;

// ── Metadata helper ──────────────────────────────────────────────────
interface PageMeta {
  title: string;
  description: string;
  path: string; // e.g. "/product"
  ogImage?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
}: PageMeta): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage ?? OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: TWITTER_HANDLE,
      images: [image],
    },
  };
}
