"use client";

import { Magnetic } from "@/components/Magnetic";
import { featuredImage } from "@/data/projects";
import { featured } from "@/data/site";
import { EASE } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function FeaturedProject() {
  const frame = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section id="featured" className="bg-ink text-bg" data-theme="dark" aria-labelledby="featured-heading">
      <div className="section-y page-x grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{featured.kicker}</p>
          <h2
            id="featured-heading"
            className="mt-4 text-[clamp(3rem,7vw,6.2rem)] leading-[0.88] tracking-[-0.045em]"
          >
            NØR
            <br />
            Studio
          </h2>
          <p className="mt-6 max-w-[38ch] text-base leading-relaxed text-paper/75 md:text-lg">
            {featured.description}
          </p>
          <ol className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-paper/15 pt-6">
            {featured.disciplines.map((item, index) => (
              <li key={item} className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-accent">0{index + 1}</span>
                <span className="text-base tracking-[0.06em] uppercase">{item}</span>
              </li>
            ))}
          </ol>
          <Magnetic className="mt-10 inline-block">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center gap-3 border border-paper/30 px-6 text-xs tracking-[0.18em] uppercase transition-colors duration-300 hover:bg-paper hover:text-ink"
            >
              Explore Project
              <ArrowUpRight className="size-4 text-accent" aria-hidden="true" />
            </a>
          </Magnetic>
        </div>

        <div
          ref={frame}
          className="relative aspect-[4/5] overflow-hidden bg-ink sm:aspect-[5/4] lg:col-span-7"
        >
          <motion.div
            className="absolute inset-x-0 -top-[10%] h-[120%]"
            style={{ y }}
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <Image
              src={featuredImage.src}
              alt={featuredImage.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
