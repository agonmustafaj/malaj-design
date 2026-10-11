"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function snapToTop() {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  root.style.scrollBehavior = previous;
}

export function ScrollToTop() {
  const pathname = usePathname();
  const previous = useRef(pathname);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    snapToTop();
    const frame = requestAnimationFrame(snapToTop);
    const timer = window.setTimeout(snapToTop, 60);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
