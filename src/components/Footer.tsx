import { Mark } from "@/components/Mark";
import { nav, site, socialGroups } from "@/data/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="page-x flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between md:py-14">
        <Link href="/" className="inline-flex items-center gap-3">
          <Mark className="h-11 w-[2.46rem]" />
          <span className="text-lg font-semibold tracking-[-0.03em]">Malaj Design</span>
        </Link>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 md:pt-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-base text-white/75 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap gap-x-12 gap-y-6">
          {socialGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[11px] tracking-[0.16em] text-white/45 uppercase">{group.label}</p>
              <ul className="mt-3 space-y-1">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-white/75 hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="page-x border-t border-white/15 py-5">
        <p className="text-sm text-white/50">© 2026 {site.studio}. {site.location}.</p>
      </div>
    </footer>
  );
}
