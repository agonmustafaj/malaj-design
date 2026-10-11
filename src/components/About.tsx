import { Statistics } from "@/components/Statistics";
import { SectionTitle } from "@/components/SectionTitle";
import { portrait } from "@/data/projects";
import { RevealText } from "@/components/Reveal";
import Image from "next/image";

const story = [
  "I'm Andi Malaj, a graphic designer based in Prishtina, Kosovo. I studied Integrated Design at UBT University, specializing in graphic design.",
  "The degree also takes in interior design, product design, and fashion design. Working across those four is how I learned to hold visual communication, function, and aesthetics in the same hand.",
  "The practice is branding, visual identity, logos, typography, advertising, packaging, and digital design. Motion graphics and visual storytelling are where I keep pushing.",
  "Design that works does more than look right. It solves a problem, says the thing clearly, and stays in the memory.",
  "This portfolio is the professional work, the independent concepts, and the studies — including the Branding and Advertising series.",
];

export function About({ page = false }: { page?: boolean }) {
  return (
    <section
      id="about"
      className={page ? "page-x pt-8 pb-[clamp(4.25rem,8vw,8rem)] md:pt-14" : "section-y page-x"}
      aria-labelledby="about-heading"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <SectionTitle
          id="about-heading"
          as={page ? "h1" : "h2"}
          className="lg:col-span-7"
          lines={["About", "the designer"]}
          italicLine={1}
        />
        <div className="lg:col-span-5 lg:pt-3">
          <RevealText>
            <p className="max-w-[22ch] text-[clamp(1.35rem,2.2vw,1.9rem)] leading-[1.25] tracking-[-0.02em]">
              I&apos;m Andi Malaj. Graphic designer — branding, visual identity, and digital design.
            </p>
          </RevealText>
          {page ? null : (
            <RevealText delay={0.08}>
              <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-muted md:text-lg">
                Based in Prishtina. Integrated Design at UBT, with graphic design at the center.
              </p>
            </RevealText>
          )}
        </div>
      </div>

      <div className="mt-[clamp(2.5rem,6vw,5rem)] grid items-end gap-10 lg:grid-cols-12 lg:items-start">
        <figure className="lg:col-span-5">
          <div className="relative aspect-square w-full max-w-[26rem] overflow-hidden rounded-full bg-[#c8c4bc]">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              quality={85}
              sizes="(min-width: 1024px) 420px, 80vw"
              className="object-cover object-[center_22%]"
            />
          </div>
          <figcaption className="eyebrow mt-4">Andi Malaj — Prishtina</figcaption>
        </figure>
        <div className="lg:col-span-6 lg:col-start-7">
          {page ? (
            <div className="mb-10 space-y-5 text-base leading-relaxed text-ink/90 md:text-lg">
              {story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          <Statistics />
        </div>
      </div>
    </section>
  );
}
