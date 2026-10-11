"use client";

import { Magnetic } from "@/components/Magnetic";
import { mailto, site } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

export function ContactCTA({ page = false }: { page?: boolean }) {
  const Heading = page ? "h1" : "h2";

  return (
    <section
      id="contact"
      className={page ? "pt-8 md:pt-14" : "pt-[clamp(4.25rem,8vw,8rem)]"}
      aria-labelledby="contact-heading"
    >
      <div className="page-x">
        <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Contact</p>
        <Heading id="contact-heading" className="mt-4 max-w-[12ch] text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
          Have a project in mind?
        </Heading>
        <p className="mt-6 max-w-[36ch] text-base leading-relaxed text-ink/70 md:text-lg">
          Tell me what you&apos;re building. I&apos;ll shape a direction that is clear, bold, and ready to make.
        </p>
      </div>

      <div className="mt-[clamp(2.5rem,6vw,4.5rem)] border-y border-ink">
        <Magnetic className="block" strength={0.06}>
          <a
            href={mailto}
            className="group flex min-h-20 items-center justify-between gap-6 py-8 page-x transition-colors duration-300 hover:bg-ink hover:text-white md:min-h-28"
          >
            <span className="text-[clamp(1.4rem,3vw,2.4rem)] leading-none font-semibold tracking-[-0.03em]">
              Start a project
            </span>
            <ArrowUpRight
              className="size-8 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:size-12"
              aria-hidden="true"
            />
          </a>
        </Magnetic>
      </div>

      <div className="page-x flex flex-col gap-3 py-10">
        <a
          href={mailto}
          className="inline-flex min-h-11 max-w-full items-center font-serif text-[clamp(1.2rem,3.2vw,2.35rem)] leading-none italic underline decoration-ink/25 underline-offset-[7px] hover:decoration-accent"
        >
          {site.email}
        </a>
        <a
          href={site.phoneHref}
          className="inline-flex min-h-11 items-center text-[clamp(1.15rem,2vw,1.5rem)] tracking-[-0.02em] underline decoration-ink/25 underline-offset-[6px] hover:decoration-accent"
        >
          {site.phone}
        </a>
      </div>
    </section>
  );
}
