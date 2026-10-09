"use client";

import { ProjectItem } from "@/components/ProjectItem";
import { SectionTitle } from "@/components/SectionTitle";
import { projects } from "@/data/projects";

export function ProjectGrid() {
  return (
    <section id="work" className="section-y page-x" aria-labelledby="work-heading">
      <div className="mb-[clamp(2.5rem,6vw,4.5rem)] grid items-end gap-6 lg:grid-cols-12">
        <SectionTitle id="work-heading" className="lg:col-span-7" lines={["Selected", "Work"]} />
        <p className="max-w-[32ch] text-base leading-relaxed text-muted lg:col-span-4 lg:col-start-9 lg:pb-2 lg:text-lg">
          Five recent collaborations across identity, digital, editorial, and campaign work.
        </p>
      </div>
      <div>
        {projects.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
