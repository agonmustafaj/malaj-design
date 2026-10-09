import { clients } from "@/data/site";

export function ClientStrip() {
  return (
    <section aria-label="Selected clients" className="border-y border-ink/15">
      <div className="page-x flex flex-col gap-5 py-8 md:flex-row md:items-center md:gap-12 md:py-9">
        <p className="eyebrow shrink-0">Selected Clients</p>
        <ul className="flex flex-1 flex-wrap gap-x-[clamp(1.25rem,3vw,2.75rem)] gap-y-3">
          {clients.map((client) => (
            <li
              key={client}
              className="text-sm tracking-[0.14em] text-ink uppercase sm:text-base"
            >
              {client}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
