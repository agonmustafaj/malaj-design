import { RevealImage } from "@/components/Reveal";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";

type ProjectItemProps = {
  project: Project;
  index: number;
};

export function ProjectItem({ project, index }: ProjectItemProps) {
  return (
    <article
      id={project.id}
      className={cn(
        "scroll-mt-24",
        index > 0 && "mt-[clamp(2.75rem,6vw,4.5rem)] border-t border-ink/10 pt-[clamp(2.75rem,6vw,4.5rem)]",
      )}
    >
      <Link
        href={project.href}
        data-cursor="view"
        className="group block"
        aria-label={`View ${project.title}`}
      >
        {project.layout === "full" ? <Full project={project} /> : null}
        {project.layout === "right" ? <Right project={project} /> : null}
        {project.layout === "split" ? <Split project={project} /> : null}
        {project.layout === "landscape" ? <Landscape project={project} /> : null}
        {project.layout === "overlap" ? <Overlap project={project} /> : null}
      </Link>
    </article>
  );
}

function Number({ value }: { value: string }) {
  return <span className="font-mono text-sm tracking-[0.16em] text-muted">{value}</span>;
}

function Title({ children, className }: { children: string; className?: string }) {
  return (
    <h3
      className={cn(
        "leading-[0.92] tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-2",
        className,
      )}
    >
      {children}
    </h3>
  );
}

function Meta({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("text-base text-muted", className)}>
      <p>{project.category}</p>
      <p>{project.year}</p>
      <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-ink uppercase">
        View project <span className="text-accent">↗</span>
      </p>
    </div>
  );
}

function Media({
  project,
  sizes,
  className,
}: {
  project: Project;
  sizes: string;
  className?: string;
}) {
  return (
    <RevealImage className={cn("relative bg-[#e6e1d8]", className)}>
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        quality={85}
        sizes={sizes}
        style={{ objectPosition: project.position }}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
      />
      <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
    </RevealImage>
  );
}

function Full({ project }: { project: Project }) {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-4 md:mb-6 md:flex-row md:items-end md:justify-between">
        <div className="flex items-baseline gap-4 md:gap-6">
          <Number value={project.number} />
          <Title className="text-[clamp(2.15rem,5.5vw,4.6rem)]">{project.title}</Title>
        </div>
        <Meta project={project} className="md:text-right" />
      </div>
      <Media
        project={project}
        sizes="100vw"
        className="full-bleed aspect-[4/5] sm:aspect-[16/10] lg:aspect-[2.15/1]"
      />
      <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-muted">{project.description}</p>
    </div>
  );
}

function Right({ project }: { project: Project }) {
  return (
    <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-4 md:pb-2">
        <Number value={project.number} />
        <Title className="mt-3 text-[clamp(2.15rem,4vw,3.5rem)]">{project.title}</Title>
        <Meta project={project} className="mt-4" />
        <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-muted">{project.description}</p>
      </div>
      <Media
        project={project}
        sizes="(min-width: 768px) 66vw, 100vw"
        className="aspect-[4/5] md:col-span-8 md:col-start-5"
      />
    </div>
  );
}

function Split({ project }: { project: Project }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-0">
      <Media
        project={project}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="order-2 aspect-[4/5] md:order-1 md:aspect-auto md:min-h-[70vh]"
      />
      <div className="order-1 flex flex-col justify-center md:order-2 md:border-l md:border-ink/15 md:px-[clamp(1.5rem,3vw,3.5rem)] md:py-10">
        <Number value={project.number} />
        <Title className="mt-4 text-[clamp(2.4rem,5vw,5.2rem)]">{project.title}</Title>
        <Meta project={project} className="mt-6" />
        <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-muted">{project.description}</p>
      </div>
    </div>
  );
}

function Landscape({ project }: { project: Project }) {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-baseline gap-4">
          <Number value={project.number} />
          <Title className="text-[clamp(2.15rem,5vw,4rem)]">{project.title}</Title>
        </div>
        <Meta project={project} />
      </div>
      <Media
        project={project}
        sizes="(min-width: 1024px) 82vw, 100vw"
        className="aspect-[4/3] sm:aspect-[16/9] lg:ml-[8vw] lg:aspect-[2.1/1]"
      />
      <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-muted lg:ml-[8vw]">
        {project.description}
      </p>
    </div>
  );
}

function Overlap({ project }: { project: Project }) {
  return (
    <div className="relative flex flex-col md:block md:pb-16">
      <div className="relative z-10 order-1 border border-ink/15 bg-bg p-6 sm:p-8 md:absolute md:right-0 md:bottom-0 md:w-[min(26rem,42%)]">
        <Number value={project.number} />
        <Title className="mt-3 text-[clamp(2.15rem,4vw,3.4rem)]">{project.title}</Title>
        <Meta project={project} className="mt-4" />
        <p className="mt-4 text-base leading-relaxed text-muted">{project.description}</p>
      </div>
      <Media
        project={project}
        sizes="(min-width: 768px) 74vw, 100vw"
        className="order-2 mt-6 aspect-[4/5] md:mt-0 md:aspect-[16/11] md:w-[74%]"
      />
    </div>
  );
}
