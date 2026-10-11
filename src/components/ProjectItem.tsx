import type { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

export function ProjectItem({ project }: { project: Project; index?: number }) {
  return (
    <article>
      <Link href={project.href} className="group block" aria-label={`View ${project.title}`}>
        <div data-cursor="view" className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f3f3f3]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            quality={75}
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
            style={{ objectPosition: project.position }}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <p className="mt-4 text-[11px] tracking-[0.16em] text-muted uppercase">{project.category}</p>
        <h3 className="mt-1 text-lg leading-tight font-semibold tracking-[-0.02em]">{project.title}</h3>
        <p className="mt-1.5 max-w-[36ch] text-sm leading-relaxed text-muted">{project.description}</p>
      </Link>
    </article>
  );
}
