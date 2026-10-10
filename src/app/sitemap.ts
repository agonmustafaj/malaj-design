import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: "2026-10-10",
      changeFrequency: "monthly",
      priority: 1,
    },
    ...["/work", "/about", "/services", "/contact"].map((path) => ({
      url: `${site.url}${path}`,
      lastModified: "2026-10-10",
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified: "2026-10-10",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
