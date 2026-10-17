import { CaseStudy } from "@/components/CaseStudy";
import { getProject, projects } from "@/data/projects";
import { pageMetadata, projectOgImage } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };

  const description = project.description;
  const url = `/work/${project.slug}`;
  const image = projectOgImage(project.slug, project.title);

  return {
    ...pageMetadata(project.title, description, url),
    openGraph: {
      title: `${project.title} | Malaj Design`,
      description,
      url,
      type: "article",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Malaj Design`,
      description,
      images: [image.url],
    },
  } satisfies Metadata;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudy project={project} list={projects} />;
}
