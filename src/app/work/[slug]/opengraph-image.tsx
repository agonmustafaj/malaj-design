import { getProject } from "@/data/projects";
import { ogContentType, ogSize, projectOgImage, siteOgImage } from "@/lib/og";

export const alt = "Malaj Design project";
export const size = ogSize;
export const contentType = ogContentType;

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return siteOgImage();

  return projectOgImage(project);
}
