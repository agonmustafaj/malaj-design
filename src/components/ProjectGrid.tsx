import { ProjectItem } from "@/components/ProjectItem";
import { projects } from "@/data/projects";
import Link from "next/link";

export function ProjectGrid({ page = false, limit = page ? undefined : 6 }: { page?: boolean; limit?: number }) {
  const shown = typeof limit === "number" ? projects.slice(0, limit) : projects;
  const hasMore = shown.length < projects.length;

  return (
    <section
      id="work"
      className={page ? "page-x pt-10 pb-20 md:pt-16" : "page-x pb-20 md:pb-28"}
      aria-labelledby="work-heading"
    >
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Selected work</p>
          <h2
            id="work-heading"
            className={page ? "mt-3 text-[clamp(2.4rem,5vw,3.6rem)] leading-none font-semibold tracking-[-0.035em]" : "mt-3 text-[clamp(2rem,4vw,2.8rem)] leading-none font-semibold tracking-[-0.035em]"}
          >
            {page ? "All projects" : "Recent projects"}
          </h2>
          <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-muted md:text-base">
            Identity, kits, motion, posters, and cover art. Each card is the short version. The project page goes further.
          </p>
        </div>
      </div>
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>
      {hasMore ? (
        <div className="mt-12 flex justify-center">
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center rounded-[14px] bg-accent px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            View more
          </Link>
        </div>
      ) : null}
    </section>
  );
}
