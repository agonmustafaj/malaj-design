import { CaseStudy } from "@/components/CaseStudy";
import { getProject, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
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
  if (!project) return {};

  const description = project.description;
  const url = `/work/${project.slug}`;

  return {
    ...pageMetadata(project.title, description, url),
    openGraph: {
      title: `${project.title} | Malaj Design`,
      description,
      url,
      type: "article",
    },
  } satisfies Metadata;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  return <CaseStudy project={project} index={index} />;
}
