"use client";

import { RevealText } from "@/components/Reveal";

export function Testimonial() {
  return (
    <section className="section-y page-x border-t border-ink/10" aria-labelledby="testimonial-label">
      <p id="testimonial-label" className="eyebrow">
        Client note
      </p>
      <RevealText className="mt-8">
        <blockquote>
          <p className="max-w-[40rem] font-serif text-[clamp(1.7rem,4.2vw,3.55rem)] leading-[1.14] tracking-[-0.025em] italic">
            “Working with Andi completely changed how we saw our brand. The result wasn&apos;t just better design — it gave the company a new level of confidence.”
          </p>
        </blockquote>
      </RevealText>
      <footer className="mt-10 flex items-center gap-4">
        <span className="h-px w-12 bg-ink" aria-hidden="true" />
        <div>
          <p className="text-base font-medium">Sarah Mitchell</p>
          <p className="text-base text-muted">Founder — NØR Studio</p>
        </div>
      </footer>
    </section>
  );
}
