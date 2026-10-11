import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

const description =
  "Andi Malaj is a graphic designer in Prishtina, Kosovo. Branding, visual identity, and digital design. Integrated Design at UBT.";

export const metadata = pageMetadata("About", description, "/about");

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
