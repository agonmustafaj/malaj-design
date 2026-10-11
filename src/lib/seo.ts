import type { Metadata } from "next";

export const siteOgImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Malaj Design | Andi Malaj, Graphic Designer",
} as const;

export function projectOgImage(slug: string, alt: string) {
  return {
    url: `/og/${slug}.jpg`,
    width: 1200,
    height: 630,
    type: "image/jpeg" as const,
    alt,
  };
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | Malaj Design`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: "website",
      images: [siteOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [siteOgImage.url],
    },
  };
}
