import { footerSocials, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-ink/15">
      <div className="page-x grid gap-8 pt-10 md:grid-cols-3 md:items-start md:pt-12">
        <div>
          <p className="text-sm tracking-[0.16em]">{site.mark}</p>
          <p className="mt-1 text-base">{site.name}</p>
          <p className="text-base text-muted">{site.role}</p>
        </div>
        <p className="text-base md:text-center">{site.footerNote}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
          {footerSocials.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-base underline decoration-transparent underline-offset-4 hover:decoration-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="page-x mt-10 flex items-end justify-between gap-4 border-t border-ink/10 py-6">
        <p className="text-sm text-muted">
          © 2026 {site.studio}.
          <br />
          All rights reserved.
        </p>
        <a
          href="#top"
          className="inline-flex min-h-11 items-center text-xs tracking-[0.16em] uppercase"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
