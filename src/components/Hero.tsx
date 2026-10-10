"use client";

import { heroImage } from "@/data/projects";
import { site } from "@/data/site";
import { EASE } from "@/lib/motion";
import { ArrowDown } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const lines = [
  { text: "Creative", delay: 0.05 },
  { text: "Designer", delay: 0.13 },
  { text: "visual", delay: 0.21, serif: true },
  { text: "Thinker", delay: 0.29 },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="page-x flex min-h-[100svh] flex-col pt-[clamp(5.5rem,12vh,7.75rem)] pb-[clamp(1.5rem,3vw,2.5rem)]">
      <div className="grid flex-1 grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-8 lg:row-start-1 lg:flex lg:h-full lg:flex-col lg:justify-end">
          <motion.p
            className="eyebrow mb-5 md:mb-7"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Branding and Advertising — 2026
          </motion.p>
          <h1 className="hero-title uppercase">
            {lines.map((line) => (
              <motion.span
                key={line.text}
                className="block"
                initial={reduced ? false : { opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: line.delay }}
              >
                {line.serif ? (
                  <>
                    &amp;{" "}
                    <span className="font-serif italic font-normal">{line.text}</span>
                  </>
                ) : (
                  line.text
                )}
              </motion.span>
            ))}
          </h1>
        </div>

        <figure className="relative lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:h-full lg:min-h-[26rem]">
          <HeroPortrait />
        </figure>
      </div>

      <motion.div
        className="mt-[clamp(1.75rem,4vw,2.75rem)] grid gap-8 border-t border-ink/15 pt-6 md:grid-cols-12 md:items-end"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
      >
        <p className="max-w-[36ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-snug md:col-span-5">
          Identity, posters, and visual systems — from a streetwear brand to film, type, and stationery.
        </p>
        <ul className="space-y-1 text-base text-muted md:col-span-4">
          <li>{site.role}</li>
          <li>{site.location}</li>
          <li>{site.availability}</li>
        </ul>
        <div className="md:col-span-3 md:justify-self-end">
          <a
            href="#work"
            className="group inline-flex min-h-11 items-center gap-3 text-sm tracking-[0.16em] uppercase"
          >
            View Selected Work
            <ArrowDown
              className="size-4 transition-transform duration-300 group-hover:translate-y-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function HeroPortrait() {
  const frame = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 70, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 70, damping: 20, mass: 0.6 });
  const reduced = useReducedMotion();

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-[#e4dfd6] lg:absolute lg:inset-0 lg:aspect-auto">
      <div
        ref={frame}
        className="absolute inset-0"
        onMouseMove={(event) => {
          if (reduced || !frame.current) return;
          if (!window.matchMedia("(pointer: fine)").matches) return;
          const rect = frame.current.getBoundingClientRect();
          const dx = (event.clientX - rect.left) / rect.width - 0.5;
          const dy = (event.clientY - rect.top) / rect.height - 0.5;
          x.set(dx * 16);
          y.set(dy * 12);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { x: springX, y: springY, scale: 1.08 }}
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            quality={60}
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="object-cover object-[center_40%]"
          />
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/65 to-transparent" />
      <figcaption className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between text-[11px] tracking-[0.16em] text-paper uppercase [text-shadow:0_1px_10px_rgb(0_0_0/0.45)] sm:text-xs">
        <span>Fig. 01</span>
        <span>Studio study</span>
      </figcaption>
    </div>
  );
}
