"use client";

import { Mark } from "@/components/Mark";
import { MobileMenu } from "@/components/MobileMenu";
import { Magnetic } from "@/components/Magnetic";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50", open ? "text-bg" : "text-ink")}>
      <div
        className={cn(
          "page-x flex h-16 items-center justify-between gap-4 border-b md:h-[4.5rem]",
          open
            ? "border-transparent bg-transparent"
            : "border-ink/10 bg-bg/88 backdrop-blur-md",
        )}
      >
        <a
          href="/"
          className="inline-flex min-h-11 items-center gap-2.5 text-[12px] tracking-[0.16em] whitespace-nowrap sm:text-[13px] sm:tracking-[0.18em]"
        >
          <Mark className="h-7 w-[1.55rem]" />
          {site.mark}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-7">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex min-h-11 items-center text-[12px] tracking-[0.16em] uppercase"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Magnetic className="inline-block">
            <a
              href="/#contact"
              className="inline-flex min-h-11 items-center gap-2 text-[12px] tracking-[0.16em] uppercase"
            >
              Let&apos;s talk
              <ArrowUpRight className="size-4 text-accent" aria-hidden="true" />
            </a>
          </Magnetic>
        </div>

        <button
          id="menu-toggle"
          type="button"
          className="relative h-11 w-11 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={cn(
              "absolute right-2.5 left-2.5 h-px bg-current transition-transform duration-300",
              open ? "top-1/2 rotate-45" : "top-[18px]",
            )}
          />
          <span
            className={cn(
              "absolute right-2.5 left-2.5 h-px bg-current transition-transform duration-300",
              open ? "top-1/2 -rotate-45" : "top-[26px]",
            )}
          />
        </button>
      </div>
      <MobileMenu open={open} onClose={close} />
    </header>
  );
}
