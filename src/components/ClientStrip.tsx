import { clients } from "@/data/site";
import Link from "next/link";

export function ClientStrip() {
  return (
    <section aria-label="Works in this series" className="border-y border-ink/15">
      <div className="page-x flex flex-col gap-5 py-8 md:flex-row md:items-center md:gap-12 md:py-9">
        <p className="eyebrow shrink-0">In this series</p>
        <ul className="flex flex-1 flex-wrap gap-x-[clamp(1.25rem,3vw,2.75rem)] gap-y-3">
          {clients.map((client) => (
            <li key={client.href}>
              <Link
                href={client.href}
                className="inline-flex min-h-11 items-center text-sm tracking-[0.14em] text-ink uppercase transition-colors duration-300 hover:text-accent sm:text-base"
              >
                {client.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
