import { site } from "@/data/site";
import Link from "next/link";

export function Hero() {
  return (
    <section className="page-x pt-28 pb-16 md:pt-36 md:pb-24">
      <p className="text-[11px] tracking-[0.2em] text-muted uppercase">
        {site.studio} · {site.role}
      </p>
      <div className="mt-8 grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
        <h1 className="max-w-[12ch] text-[clamp(2.7rem,5.6vw,4.4rem)] leading-[1.04] font-semibold tracking-[-0.035em] lg:col-span-7">
          A graphic designer crafting bold identities and thoughtful visual work.
        </h1>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-[36ch] text-[15px] leading-relaxed text-ink/70">
            I&apos;m Andi Malaj, based in Prishtina. I design brands, posters, and digital work that feel clear, specific, and human.
          </p>
          <div className="mt-7 flex items-center gap-5">
            <Link
              href="/work"
              scroll={false}
              className="inline-flex min-h-11 items-center rounded-[14px] bg-accent px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              View Work
            </Link>
            <Link
              href="/about"
              scroll={false}
              className="inline-flex min-h-11 items-center text-sm text-ink/80 hover:text-ink"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
