"use client";

import { ProjectItem } from "@/components/ProjectItem";
import { projects, type ProjectGroup } from "@/data/projects";
import { workGroups } from "@/data/site";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const groupIds = new Set<string>(workGroups.map((item) => item.id));

function isProjectGroup(value: string | null | undefined): value is ProjectGroup {
  return typeof value === "string" && groupIds.has(value);
}

export function ProjectBrowser({ group }: { group?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState<ProjectGroup | null | undefined>(undefined);
  const active = pending !== undefined ? pending : isProjectGroup(group) ? group : null;
  const shown = active ? projects.filter((project) => project.group === active) : [];
  const activeLabel = workGroups.find((item) => item.id === active)?.label;

  useEffect(() => {
    setPending(undefined);
  }, [group]);

  function select(id: ProjectGroup) {
    const next = active === id ? null : id;
    setPending(next);
    router.replace(next ? `/work?group=${next}` : "/work", { scroll: false });
  }

  return (
    <section className="page-x pt-10 pb-20 md:pt-16" aria-labelledby="work-heading">
      <div className="mb-10">
        <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Selected work</p>
        <h1
          id="work-heading"
          className="mt-3 text-[clamp(2.4rem,5vw,3.6rem)] leading-none font-semibold tracking-[-0.035em]"
        >
          All projects
        </h1>
        <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-muted md:text-base">
          Identity, kits, motion, posters, and cover art. Choose a card to see the projects.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="group" aria-label="Work types">
        {workGroups.map((item) => {
          const selected = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => select(item.id)}
              className={`flex min-h-24 cursor-pointer items-end rounded-2xl border px-5 py-5 text-left transition-colors ${
                selected
                  ? "border-accent bg-accent text-white"
                  : "border-ink/15 bg-white hover:border-ink"
              }`}
            >
              <span className="text-lg leading-tight font-semibold tracking-[-0.02em]">{item.label}</span>
            </button>
          );
        })}
      </div>

      {active ? (
        <div className="mt-14">
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] leading-none font-semibold tracking-[-0.03em]">
            {activeLabel}
          </h2>
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((project, index) => (
              <ProjectItem key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
