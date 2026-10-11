import { Footer } from "@/components/Footer";
import { Services } from "@/components/Services";
import { pageMetadata } from "@/lib/seo";

const description =
  "Brand identity, posters, mascots, typography, stationery, and cover design by Andi Malaj in Prishtina.";

export const metadata = pageMetadata("Services", description, "/services");

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
