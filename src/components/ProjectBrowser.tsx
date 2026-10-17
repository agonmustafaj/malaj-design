"use client";

import { ProjectItem } from "@/components/ProjectItem";
import { projects, type Project, type ProjectGroup } from "@/data/projects";
import { workGroups } from "@/data/site";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const groupIds = new Set<string>(workGroups.map((item) => item.id));

function isProjectGroup(value: string | null | undefined): value is ProjectGroup {
  return typeof value === "string" && groupIds.has(value);
}

function sectionProjects(catalog: readonly Project[], id: ProjectGroup) {
  return catalog.filter((project) => project.group === id);
}

function tileLayout(count: number) {
  if (count <= 1) return "grid-cols-1 grid-rows-1";
  if (count === 3) return "grid-cols-3 grid-rows-1";
  return "grid-cols-2 grid-rows-2";
}

function GroupCard({
  id,
  label,
  selected,
  onSelect,
  catalog,
}: {
  id: ProjectGroup;
  label: string;
  selected: boolean;
  onSelect: (id: ProjectGroup) => void;
  catalog: readonly Project[];
}) {
  const pieces = sectionProjects(catalog, id);
  const visual = pieces.filter((piece) => piece.image !== "/photos/kamenica/01.jpg");
  const tiles = (visual.length > 0 ? visual : pieces).slice(0, 4);

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      className={`group relative flex min-h-12 cursor-pointer items-center overflow-hidden rounded-2xl border px-3 py-2 text-left text-[13px] leading-tight font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99] md:min-h-[380px] md:items-end md:rounded-3xl md:border-0 md:p-0 md:text-base md:transition-transform md:duration-300 lg:min-h-[440px] ${
        selected
          ? "border-accent bg-accent text-white md:bg-transparent md:ring-2 md:ring-accent md:ring-offset-4 md:ring-offset-white"
          : "border-ink/15 bg-white text-ink hover:border-ink md:bg-transparent md:text-white"
      }`}
    >
      <span className={`absolute inset-0 hidden md:grid ${tileLayout(tiles.length)}`} aria-hidden="true">
        {tiles.map((piece, index) => (
          <PreviewTile key={piece.id} piece={piece} index={index} />
        ))}
      </span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-32 bg-gradient-to-t from-black via-black/50 to-transparent md:block" />
      <span className="md:hidden">{label}</span>
      <span className="relative z-10 mt-auto hidden w-full flex-col px-6 pt-10 pb-6 sm:px-7 sm:pb-7 md:flex">
        <span className="text-[clamp(1.7rem,3vw,2.4rem)] leading-none font-semibold tracking-[-0.03em] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.85)]">
          {label}
        </span>
        <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
          <span
            className={`border-b pb-0.5 transition-colors ${
              selected ? "border-white" : "border-white/0 group-hover:border-white/80"
            }`}
          >
            {selected ? "Hide" : "See the projects"}
          </span>
          <span
            aria-hidden="true"
            className={`inline-block transition-transform duration-300 ${
              selected ? "translate-x-1" : "group-hover:translate-x-1"
            }`}
          >
            →
          </span>
        </span>
      </span>
    </button>
  );
}

function PreviewTile({ piece, index }: { piece: Project; index: number }) {
  return (
    <span className="relative block h-full min-h-0 overflow-hidden">
      <Image
        src={piece.image}
        alt=""
        fill
        quality={75}
        sizes="(min-width: 1024px) 24vw, 50vw"
        style={{ objectPosition: piece.position }}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        priority={index === 0}
      />
    </span>
  );
}

export function ProjectBrowserFromUrl() {
  const group = useSearchParams().get("group") ?? undefined;
  return <ProjectBrowser group={group} />;
}

export function ProjectBrowser({
  group,
  catalog = projects,
}: {
  group?: string;
  catalog?: readonly Project[];
}) {
  const router = useRouter();
  const [pending, setPending] = useState<ProjectGroup | null | undefined>(undefined);
  const active = pending !== undefined ? pending : isProjectGroup(group) ? group : null;
  const shown = active ? sectionProjects(catalog, active) : [];
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

      <div className="grid grid-cols-2 gap-2 md:gap-5" role="group" aria-label="Work types">
        {workGroups.map((item) => (
          <GroupCard
            key={item.id}
            id={item.id}
            label={item.label}
            selected={active === item.id}
            onSelect={select}
            catalog={catalog}
          />
        ))}
      </div>

      {active ? (
        <div className="mt-8 md:mt-14">
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
