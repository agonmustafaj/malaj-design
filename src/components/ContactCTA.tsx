"use client";

import { Magnetic } from "@/components/Magnetic";
import { mailto, site, socialGroups } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section id="contact" className="pt-[clamp(4.25rem,8vw,8rem)]" aria-labelledby="contact-heading">
      <div className="page-x">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-heading" className="contact-title mt-5 uppercase">
          <span className="block">Have a</span>
          <span className="block">project</span>
          <span className="block font-serif font-normal italic normal-case">in mind?</span>
        </h2>
        <p className="mt-8 max-w-[22ch] text-[clamp(1.15rem,2vw,1.6rem)] leading-snug">
          Let&apos;s create something people remember.
        </p>
      </div>

      <div className="mt-[clamp(2.5rem,6vw,4.5rem)] border-y border-ink">
        <Magnetic className="block" strength={0.06}>
          <a
            href={mailto}
            className="group flex min-h-[5.5rem] items-center justify-between gap-6 py-8 transition-colors duration-300 page-x hover:bg-ink hover:text-bg md:min-h-[7.5rem] md:py-12"
          >
            <span className="text-[clamp(1.45rem,4vw,3.25rem)] leading-none font-medium tracking-[-0.045em] uppercase">
              Start a project
            </span>
            <ArrowUpRight
              className="size-8 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:size-12"
              aria-hidden="true"
            />
          </a>
        </Magnetic>
      </div>

      <div className="page-x flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
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
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          {socialGroups.map((group) => (
            <div key={group.label}>
              <p className="eyebrow">{group.label}</p>
              <ul className="mt-1 flex flex-wrap gap-x-5">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-base underline decoration-ink/20 underline-offset-4 hover:decoration-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
