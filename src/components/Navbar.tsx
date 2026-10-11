"use client";

import { Mark } from "@/components/Mark";
import { MobileMenu } from "@/components/MobileMenu";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { useCallback, useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-ink">
      <div
        className={cn(
          "page-x flex h-16 items-center justify-between gap-4 md:h-[4.5rem]",
          open ? "border-transparent bg-white" : "border-b border-ink/8 bg-white/90 backdrop-blur-md",
        )}
      >
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2.5 text-[15px] font-semibold tracking-[-0.03em] whitespace-nowrap"
        >
          <Mark className="h-8 w-[1.8rem] sm:h-9 sm:w-[2.02rem]" />
          Malaj Design
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-5">
              {nav
                .filter((item) => item.href !== "/contact")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center text-sm text-ink/75 transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          <Link
            href="/contact"
            className="inline-flex min-h-10 items-center rounded-[14px] bg-accent px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Contact
          </Link>
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
