import { Statistics } from "@/components/Statistics";
import { portrait } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

const story = [
  "I'm Andi Malaj, a graphic designer based in Prishtina, Kosovo. I studied Integrated Design at UBT University, specializing in graphic design.",
  "The degree also takes in interior design, product design, and fashion design. Working across those four is how I learned to hold visual communication, function, and aesthetics in the same hand.",
  "The practice is branding, visual identity, logos, typography, advertising, packaging, and digital design. Motion graphics and visual storytelling are where I keep pushing.",
  "Design that works does more than look right. It solves a problem, says the thing clearly, and stays in the memory.",
  "This portfolio is the professional work, the independent concepts, and the studies, including the Branding and Advertising series.",
];

export function About({ page = false }: { page?: boolean }) {
  const Heading = page ? "h1" : "h2";

  return (
    <section
      id="about"
      className={page ? "page-x pt-8 pb-[clamp(4.25rem,8vw,8rem)] md:pt-14" : "section-y page-x defer-render"}
      aria-labelledby="about-heading"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <p className="text-[11px] tracking-[0.18em] text-muted uppercase">About</p>
          <Heading
            id="about-heading"
            className="mt-3 max-w-[14ch] text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.035em]"
          >
            {page ? "Andi Malaj" : "A designer building work with clarity and a point of view."}
          </Heading>
        </div>
        <div className="lg:col-span-5 lg:pt-8">
          <p className="max-w-[36ch] text-base leading-relaxed text-ink/75 md:text-lg">
            I&apos;m Andi Malaj. Graphic designer for branding, visual identity, and digital design.
          </p>
          {page ? null : (
            <Link href="/about" className="mt-5 inline-flex text-sm font-medium underline decoration-ink/20 underline-offset-4 hover:decoration-accent">
              More about me
            </Link>
          )}
        </div>
      </div>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-12">
        <figure className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full max-w-[28rem] overflow-hidden rounded-2xl bg-[#ececec]">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              quality={82}
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover object-[center_18%]"
            />
          </div>
          <figcaption className="mt-4 text-sm text-muted">Andi Malaj, Prishtina</figcaption>
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
