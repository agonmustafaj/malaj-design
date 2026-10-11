"use client";

import { nav, site } from "@/data/site";
import Link from "next/link";
import { useEffect, useRef } from "react";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

export function MobileMenu({ open, onClose, onNavigate }: MobileMenuProps) {
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

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="menu-in fixed inset-0 z-40 bg-white text-ink md:hidden"
    >
      <nav className="page-x flex h-full flex-col justify-end pb-12 pt-24" aria-label="Mobile">
        <ul>
          {nav.map((item) => (
            <li key={item.href} className="border-b border-ink/10">
              <Link
                href={item.href}
                scroll={false}
                onClick={(event) => onNavigate(event, item.href)}
                className="flex min-h-16 items-center text-[clamp(2.1rem,9vw,3.2rem)] leading-none font-semibold tracking-[-0.04em]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-2">
          <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center text-lg text-ink/70">
            {site.email}
          </a>
          <a href={site.phoneHref} className="inline-flex min-h-11 items-center text-lg text-ink/70">
            {site.phone}
          </a>
        </div>
      </nav>
    </div>
  );
}
