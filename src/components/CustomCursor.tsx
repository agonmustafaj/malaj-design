"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const SIZE = 52;

export function CustomCursor() {
  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const active = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.35 });
  const scale = useSpring(active, { stiffness: 320, damping: 24, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - SIZE / 2);
      y.set(event.clientY - SIZE / 2);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      active.set(target.closest("[data-cursor='view']") ? 1 : 0);
    };

    const onLeave = () => active.set(0);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [active, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden h-[52px] w-[52px] items-center justify-center rounded-full bg-ink text-[10px] tracking-[0.14em] text-bg uppercase md:flex"
      style={{ x: springX, y: springY, scale, opacity: scale }}
    >
      View
    </motion.div>
  );
}
