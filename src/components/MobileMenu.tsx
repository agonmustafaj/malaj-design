"use client";

import { nav, site } from "@/data/site";
import { EASE } from "@/lib/motion";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    const toggle = document.getElementById("menu-toggle");
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialog?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;

      const nodes = [toggle, ...dialog.querySelectorAll<HTMLElement>("a[href]")].filter(
        (node): node is HTMLElement => Boolean(node),
      );
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    document.addEventListener("keydown", onKey);

    const onResize = () => {
      if (window.innerWidth >= 768) onClose();
    };
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.getElementById("main")?.removeAttribute("inert");
      document.querySelector("footer")?.removeAttribute("inert");
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={dialogRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 bg-ink text-bg md:hidden"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <nav className="page-x flex h-full flex-col justify-end pb-12 pt-24" aria-label="Mobile">
            <ul>
              {nav.map((item, index) => (
                <li key={item.href} className="border-b border-paper/15">
                  <motion.a
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-16 items-center text-[clamp(2.6rem,12vw,4.25rem)] leading-none tracking-[-0.045em]"
                    initial={reduced ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.08 + index * 0.06 }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-10 flex flex-col gap-2"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center font-serif text-[clamp(1.15rem,4.5vw,1.75rem)] leading-snug italic text-paper/80"
              >
                {site.email}
              </a>
              <a href={site.phoneHref} className="inline-flex min-h-11 items-center text-lg text-paper/80">
                {site.phone}
              </a>
            </motion.div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
