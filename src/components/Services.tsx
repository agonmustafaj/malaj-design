import { services } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

export function Services({ page = false }: { page?: boolean }) {
  const Heading = page ? "h1" : "h2";

  return (
    <section
      id="services"
      className={page ? "pt-8 pb-[clamp(4.25rem,8vw,8rem)] md:pt-14" : "section-y"}
      aria-labelledby="services-heading"
    >
      <div className="page-x">
        <p className="eyebrow mb-4">Practice</p>
        <Heading id="services-heading" className="display uppercase">
          What I do
        </Heading>
      </div>

      <ul className="mt-[clamp(2rem,5vw,3.5rem)] border-b border-ink/15">
        {services.map((service) => (
          <li
            key={service.number}
            className="group border-t border-ink/15 transition-colors duration-300 hover:bg-ink hover:text-bg"
          >
            <div className="page-x py-6 md:grid md:grid-cols-12 md:items-center md:gap-4 md:py-8">
              <div className="flex items-center justify-between gap-4 md:contents">
                <span className="font-mono text-sm tracking-[0.14em] text-muted group-hover:text-accent md:col-span-1">
                  {service.number}
                </span>
                <h3 className="flex-1 text-[clamp(1.7rem,3vw,2.65rem)] leading-none tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-2 md:col-span-4">
                  {service.title}
                </h3>
                <ArrowUpRight
                  className="size-5 shrink-0 text-accent md:col-span-1 md:col-start-12 md:justify-self-end md:opacity-0 md:transition md:group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-muted group-hover:text-paper/75 md:col-span-6 md:col-start-6 md:mt-0">
                {service.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
