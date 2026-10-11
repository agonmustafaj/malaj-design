function PhraseGroup() {
  return (
    <div className="flex">
      {Array.from({ length: 4 }, (_, index) => (
        <p key={index} className="marquee-phrase flex items-center px-[0.55em]">
          <span>Symbols speak louder</span>
          <span className="px-[0.4em]" aria-hidden="true">
            ·
          </span>
          <span>than words.</span>
        </p>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section
      className="marquee overflow-hidden border-y border-ink/15 py-[clamp(0.85rem,2vw,1.4rem)]"
      aria-label="Symbols speak louder than words."
    >
      <div
        aria-hidden="true"
        className="marquee-track text-[clamp(2.15rem,7.5vw,6.25rem)] leading-none font-medium tracking-[-0.045em] uppercase"
      >
        <PhraseGroup />
        <div className="marquee-duplicate" aria-hidden="true">
          <PhraseGroup />
        </div>
      </div>
    </section>
  );
}
