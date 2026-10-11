import { Footer } from "@/components/Footer";
import type { CaseImage, Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
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
  const cover = project.frames[0];
  const gallery = project.frames.slice(1);

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
          <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-ink/75 md:text-xl">
            {project.lead}
          </p>
        </header>

        <figure className="page-x mt-10 md:mt-14">
          <div className="mx-auto" style={{ width: frameWidth(cover) }}>
            <Frame image={cover} priority sizes="(min-width: 1024px) 920px, 100vw" />
            <figcaption className="mt-3 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
              {cover.caption}
            </figcaption>
          </div>
        </figure>

        <section className="page-x section-y grid gap-12 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-4 lg:self-start lg:sticky lg:top-28">
            <dl className="border-t border-ink/15">
              {project.facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-ink/15 py-4">
                  <dt className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{fact.label}</dt>
                  <dd className="text-base leading-snug">{fact.value}</dd>
                </div>
              ))}
            </dl>
            {project.palette ? (
              <ul className="mt-8 flex flex-wrap gap-5" aria-label="Palette">
                {project.palette.map((swatch) => (
                  <li key={swatch.hex} className="flex items-center gap-3">
                    <span
                      className="size-8 border border-ink/15"
                      style={{ backgroundColor: swatch.hex }}
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-sm">{swatch.name}</span>
                      <span className="font-mono text-[11px] tracking-[0.08em] text-muted">{swatch.hex}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-6 text-[1.0625rem] leading-[1.7] text-ink/90 md:text-lg">
              {project.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {project.quote ? (
              <blockquote className="mt-12 border-t border-ink/15 pt-8">
                <p className="max-w-[28ch] font-serif text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.03em] italic">
                  {project.quote.text}
                </p>
                <footer className="mt-5 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {project.quote.source}
                </footer>
              </blockquote>
            ) : null}

            {project.tracks ? (
              <div className="mt-12">
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                  Printed on the artwork
                </p>
                <ol className="mt-4 border-t border-ink/15 sm:grid sm:grid-cols-2 sm:gap-x-10">
                  {project.tracks.map((track, trackIndex) => (
                    <li
                      key={track}
                      className="flex items-baseline gap-4 border-b border-ink/10 py-3"
                    >
                      <span className="font-mono text-[11px] text-muted">
                        {String(trackIndex + 1).padStart(2, "0")}
                      </span>
                      <span>{track}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </section>

        {project.video ? (
          <section className="page-x pb-12" aria-label="Project film">
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Film</p>
            <video
              className="mx-auto mt-6 block max-h-[58vh] w-full max-w-4xl bg-black object-contain"
              controls
              playsInline
              preload="metadata"
              poster={project.video.poster}
            >
              <source src={project.video.src} type="video/mp4" />
            </video>
          </section>
        ) : null}

        {gallery.length > 0 ? (
          <section className="page-x pb-[clamp(4.25rem,8vw,8rem)]" aria-label="Project images">
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">The pieces</p>
            <div className="mt-6 grid gap-x-6 gap-y-10 md:grid-cols-12">
              {gallery.map((image) => {
                const wide = image.width / image.height > 1.2;
                return (
                  <figure key={image.src} className={wide ? "md:col-span-12" : "md:col-span-6"}>
                    <div className="mx-auto" style={{ width: frameWidth(image) }}>
                      <Frame
                        image={image}
                        sizes={wide ? "(min-width: 1024px) 920px, 100vw" : "(min-width: 768px) 46vw, 100vw"}
                      />
                      <figcaption className="mt-3 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                        {image.caption}
                      </figcaption>
                    </div>
                  </figure>
                );
              })}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            creator: { "@type": "Person", name: site.name },
            dateCreated: project.year,
            url: `${site.url}/work/${project.slug}`,
          }),
        }}
      />
    </>
  );
}

function frameWidth(image: CaseImage) {
  return `min(100%, calc(min(58vh, 640px) * ${image.width} / ${image.height}))`;
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
          loading="lazy"
          decoding="async"
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
