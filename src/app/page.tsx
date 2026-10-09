import { About } from "@/components/About";
import { ClientStrip } from "@/components/ClientStrip";
import { ContactCTA } from "@/components/ContactCTA";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Philosophy } from "@/components/Philosophy";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Services } from "@/components/Services";
import { Testimonial } from "@/components/Testimonial";

export default function Home() {
  return (
    <>
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <ClientStrip />
        <ProjectGrid />
        <Marquee />
        <About />
        <Services />
        <FeaturedProject />
        <Philosophy />
        <Testimonial />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
