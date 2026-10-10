import { ClientStrip } from "@/components/ClientStrip";
import { Footer } from "@/components/Footer";
import { ProjectGrid } from "@/components/ProjectGrid";
import type { Metadata } from "next";

const title = "Work — Malaj Design";
const description =
  "Selected work by Andi Malaj: a streetwear identity, posters, a mascot, sound artwork, and a stationery study.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: { title, description, url: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <main id="main" tabIndex={-1} className="pt-16 outline-none md:pt-[4.5rem]">
        <ClientStrip />
        <ProjectGrid page />
      </main>
      <Footer />
    </>
  );
}
