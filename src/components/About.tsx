import { Statistics } from "@/components/Statistics";
import { SectionTitle } from "@/components/SectionTitle";
import { portrait } from "@/data/projects";
import { RevealText } from "@/components/Reveal";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="section-y page-x" aria-labelledby="about-heading">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <SectionTitle
          id="about-heading"
          className="lg:col-span-7"
          lines={["About", "the designer"]}
          italicLine={1}
        />
        <div className="lg:col-span-5 lg:pt-3">
          <RevealText>
            <p className="max-w-[28ch] text-[clamp(1.35rem,2.2vw,1.9rem)] leading-[1.25] tracking-[-0.02em]">
              I&apos;m Andi Malaj. I design marks, posters, and characters that carry a point of view.
            </p>
          </RevealText>
          <RevealText delay={0.08}>
            <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-muted md:text-lg">
              This series is the work from Branding and Advertising: Andi Malaj Rage, four posters, the lynx mascot, a sound cover, and a stationery study.
            </p>
          </RevealText>
        </div>
      </div>

      <div className="mt-[clamp(2.5rem,6vw,5rem)] grid items-end gap-10 lg:grid-cols-12">
        <figure className="lg:col-span-5">
          <div className="relative aspect-square w-full max-w-[26rem] overflow-hidden rounded-full bg-ink">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              quality={60}
              sizes="(min-width: 1024px) 420px, 80vw"
              className="scale-[1.34] object-cover"
            />
          </div>
          <figcaption className="eyebrow mt-4">Andi Malaj</figcaption>
        </figure>
        <div className="lg:col-span-6 lg:col-start-7">
          <Statistics />
        </div>
      </div>
    </section>
  );
}
