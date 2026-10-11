import { About } from "@/components/About";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Services } from "@/components/Services";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <ProjectGrid />
        <section className="bg-ink text-white">
          <div className="page-x py-20 md:py-28">
            <p className="text-[11px] tracking-[0.18em] text-white/50 uppercase">About</p>
            <h2 className="mt-4 max-w-[16ch] text-[clamp(2.3rem,5vw,4rem)] leading-[1.05] font-semibold tracking-[-0.035em]">
              A graphic designer building brands with clarity, personality, and purpose.
            </h2>
            <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-white/70">
              Based in Prishtina. Integrated Design at UBT, working across identity, posters, type, and digital design.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-11 items-center rounded-[14px] bg-accent px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Start a project
            </Link>
          </div>
        </section>
        <About />
        <Services />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
