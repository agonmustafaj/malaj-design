import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const updated = "2026-10-11";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/work`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/about`,
      lastModified: updated,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${site.url}/services`,
      lastModified: updated,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${site.url}/contact`,
      lastModified: updated,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [...new Set([project.image, project.frames[0]?.src].filter((src): src is string => Boolean(src)))].map(
        (src) => `${site.url}${src}`,
      ),
    })),
  ];
}
