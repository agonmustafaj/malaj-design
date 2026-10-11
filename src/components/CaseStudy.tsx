import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import type { CaseImage, Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";
import { projectGraph } from "@/lib/schema";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const IMAGE_QUALITY = 82;

type CaseStudyProps = {
  project: Project;
  index: number;
};

export function CaseStudy({ project, index }: CaseStudyProps) {
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <main id="main" tabIndex={-1} className="pt-16 outline-none md:pt-[4.5rem]">
        <header className="page-x pt-8 md:pt-14">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center gap-2 text-xs tracking-[0.16em] uppercase"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              All work
            </Link>
            <p className="font-mono text-xs tracking-[0.16em] text-muted">
              {project.number}
              <span className="mx-2 text-ink/30">/</span>
              {String(projects.length).padStart(2, "0")}
            </p>
          </div>

          <p className="mt-12 font-mono text-xs tracking-[0.18em] text-accent uppercase md:mt-16">
            {project.category}
          </p>
          <h1 className="mt-4 max-w-[14ch] text-[clamp(2.8rem,6vw,5rem)] leading-[0.98] font-semibold tracking-[-0.04em]">
            {project.title}
          </h1>
          {project.pdf ? null : (
            <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-ink/75 md:text-xl">
              {project.lead}
            </p>
          )}
        </header>

        {project.video ? (
          <section className="page-x mt-10 md:mt-14" aria-label="Project film">
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Film</p>
            <video
              className="mx-auto mt-6 block aspect-video max-h-[58vh] w-full max-w-4xl bg-black object-contain"
              autoPlay
              muted
              loop
              controls
              playsInline
              preload="metadata"
              poster={project.video.poster}
            >
              <source src={project.video.src} type="video/mp4" />
            </video>
          </section>
        ) : null}

        {project.pdf && project.frames[0] ? (
          <section className="page-x mt-10 flex flex-col items-center pb-[clamp(4.25rem,8vw,8rem)] md:mt-14">
            <figure className="w-full max-w-3xl">
              <Frame image={project.frames[0]} priority sizes="(min-width: 768px) 768px, 100vw" />
            </figure>
            <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-ink/75 md:text-xl">
              {project.lead}
            </p>
            <a
              href={project.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center rounded-[14px] bg-accent px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              See all in PDF
            </a>
          </section>
        ) : project.frames.length > 0 ? (
          <section className="page-x mt-10 pb-[clamp(4.25rem,8vw,8rem)] md:mt-14" aria-label="Project images">
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">The pieces</p>
            <div className="mt-6 flex flex-col gap-12">
              {project.frames.map((image, imageIndex) => (
                <figure key={image.src}>
                  <Frame
                    image={image}
                    priority={imageIndex === 0 && !project.video}
                    sizes="(min-width: 1280px) 1200px, 100vw"
                  />
                  <figcaption className="mt-3 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <nav aria-label="More projects" className="border-t border-ink/15">
          <div className="grid md:grid-cols-2">
            <Neighbor project={previous} label="Previous" align="start" />
            <Neighbor project={next} label="Next" align="end" />
          </div>
        </nav>
      </main>
      <Footer />
      <JsonLd data={projectGraph(project)} />
    </>
  );
}

function Frame({
  image,
  sizes,
  priority = false,
  className,
}: {
  image: CaseImage;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("relative w-full bg-[#e6e1d8]", className)}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      {image.src.endsWith(".gif") || image.src.endsWith("motion.webp") ? (
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          quality={IMAGE_QUALITY}
          sizes={sizes}
          className="object-cover"
        />
      )}
    </div>
  );
}

function Neighbor({
  project,
  label,
  align,
}: {
  project: Project;
  label: string;
  align: "start" | "end";
}) {
  return (
    <Link
      href={project.href}
      scroll={false}
      className={cn(
        "group flex min-h-44 flex-col justify-between gap-8 border-ink/15 px-[var(--page-x)] py-8 transition-colors duration-300 hover:bg-ink hover:text-bg md:min-h-56 md:py-12",
        align === "end" ? "border-t md:border-t-0 md:border-l md:items-end md:text-right" : "border-b md:border-b-0",
      )}
    >
      <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
        {align === "start" ? <ArrowLeft className="size-3.5" aria-hidden="true" /> : null}
        {label}
        {align === "end" ? <ArrowRight className="size-3.5" aria-hidden="true" /> : null}
      </span>
      <span>
        <span className="block font-mono text-xs text-muted transition-colors duration-300 group-hover:text-paper/60">
          {project.number}
        </span>
        <span className="mt-2 block text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.95] tracking-[-0.04em]">
          {project.title}
        </span>
      </span>
    </Link>
  );
}
