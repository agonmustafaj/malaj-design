"use client";

import { EASE } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

export function Philosophy() {
  const reduced = useReducedMotion();

  return (
    <section className="section-y page-x" aria-labelledby="philosophy-heading">
      <p className="eyebrow">Design philosophy</p>
      <h2 id="philosophy-heading" className="philosophy-title mt-6 uppercase">
        <span className="block">Good design</span>
        <span className="block">should feel</span>
        <span className="mt-1 block font-serif font-normal italic normal-case sm:mt-2">inevitable.</span>
      </h2>
      <motion.div
        className="mt-8 h-px w-[min(14rem,46vw)] origin-left bg-accent"
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        aria-hidden="true"
      />
      <p className="mt-8 max-w-[28ch] text-base text-muted md:text-lg">
        Heritage becomes identity, and identity becomes style.
      </p>
    </section>
  );
}
