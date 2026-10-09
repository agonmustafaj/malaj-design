"use client";

import { stats } from "@/data/site";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Statistics() {
  return (
    <ul className="border-t border-ink/15">
      {stats.map((stat) => (
        <li
          key={stat.label}
          aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
          className="grid grid-cols-[minmax(4.5rem,auto)_1fr] items-baseline gap-x-6 border-b border-ink/15 py-5 md:py-7"
        >
          <span className="text-[clamp(2.4rem,5vw,4rem)] leading-none font-medium tracking-[-0.04em] tabular-nums" aria-hidden="true">
            <CountUp value={stat.value} />
            {stat.suffix}
          </span>
          <span className="text-base md:text-lg">{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const shown = reduced && inView ? value : current;

  useEffect(() => {
    if (!inView || reduced) return;

    let frame = 0;
    const start = performance.now();
    const duration = 1100;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className="inline-block min-w-[2ch] text-right">
      {shown}
    </span>
  );
}
