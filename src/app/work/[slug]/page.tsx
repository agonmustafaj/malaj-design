import { CaseStudy } from "@/components/CaseStudy";
import { projects } from "@/data/projects";
import { getAllProjects } from "@/lib/dashboard-store";
import { pageMetadata, projectOgImage, siteOgImage } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const list = await getAllProjects();
  const project = list.find((item) => item.slug === slug);
  if (!project) return {};

  const description = project.description;
  const url = `/work/${project.slug}`;
  const image = project.id.startsWith("dash-") ? siteOgImage : projectOgImage(project.slug, project.title);

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

export default function ProjectPage({ params }: PageProps) {
  return (
    <Suspense>
      <ProjectBody params={params} />
    </Suspense>
  );
}

async function ProjectBody({ params }: PageProps) {
  const { slug } = await params;
  const list = await getAllProjects();
  const project = list.find((item) => item.slug === slug);
  if (!project) notFound();

  return <CaseStudy project={project} list={list} />;
}
