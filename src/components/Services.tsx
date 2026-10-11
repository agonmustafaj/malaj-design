import { services } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

export function Services({ page = false }: { page?: boolean }) {
  const Heading = page ? "h1" : "h2";

  return (
    <section
      id="services"
      className={page ? "pt-10 pb-20 md:pt-16" : "pb-20 md:pb-28"}
      aria-labelledby="services-heading"
    >
      <div className="page-x">
        <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Services</p>
        <Heading id="services-heading" className="mt-3 max-w-[16ch] text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.05] font-semibold tracking-[-0.035em]">
          Six disciplines, one practice.
        </Heading>
      </div>

      <ul className="mt-[clamp(2rem,5vw,3.5rem)] border-b border-ink/15">
        {services.map((service) => (
          <li
            key={service.number}
            className="border-t border-ink/10"
          >
            <div className="page-x py-6 md:grid md:grid-cols-12 md:items-center md:gap-4 md:py-7">
              <div className="flex items-center justify-between gap-4 md:contents">
                <span className="font-mono text-sm text-muted md:col-span-1">
                  {service.number}
                </span>
                <h3 className="flex-1 text-[clamp(1.35rem,2.2vw,1.85rem)] leading-none font-semibold tracking-[-0.03em] md:col-span-4">
                  {service.title}
                </h3>
                <ArrowUpRight
                  className="size-5 shrink-0 text-accent md:col-span-1 md:col-start-12 md:justify-self-end"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted md:col-span-6 md:col-start-6 md:mt-0 md:text-base">
                {service.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
