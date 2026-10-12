import { CaseStudy } from "@/components/CaseStudy";
import { getAllProjects } from "@/lib/dashboard-store";
import { notFound } from "next/navigation";

export async function DashboardProject({ slug }: { slug: string }) {
  const list = await getAllProjects();
  const project = list.find((item) => item.slug === slug);
  if (!project) notFound();
  return <CaseStudy project={project} list={list} />;
}
