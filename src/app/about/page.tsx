import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

const title = "About — Malaj Design";
const description =
  "Andi Malaj designs marks, posters, and characters. Based in Kosovo, available worldwide.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <main id="main" tabIndex={-1} className="pt-16 outline-none md:pt-[4.5rem]">
        <About page />
      </main>
      <Footer />
    </>
  );
}
