function PhraseGroup() {
  return (
    <div className="flex">
      {Array.from({ length: 4 }, (_, index) => (
        <p key={index} className="marquee-phrase flex items-center px-[0.55em]">
          <span>Design is not decoration</span>
          <span className="px-[0.4em] font-serif text-accent italic" aria-hidden="true">
            —
          </span>
          <span>it&apos;s communication.</span>
        </p>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section
      className="marquee overflow-hidden border-y border-ink/15 py-[clamp(0.85rem,2vw,1.4rem)]"
      aria-label="Design is not decoration — it's communication."
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
