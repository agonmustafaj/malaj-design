import { Footer } from "@/components/Footer";
import { Services } from "@/components/Services";
import type { Metadata } from "next";

const title = "Services | Malaj Design";
const description =
  "Brand identity, posters, mascots, typography, stationery, and cover design by Andi Malaj.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <main id="main" tabIndex={-1} className="pt-16 outline-none md:pt-[4.5rem]">
        <Services page />
      </main>
      <Footer />
    </>
  );
}
