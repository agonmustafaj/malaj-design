import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

const description = "Start a project with Andi Malaj in Prishtina. Email malajandi05@gmail.com or call +383 49 588 161.";

export const metadata = pageMetadata("Contact", description, "/contact");

export default function ContactPage() {
  return (
    <>
      <main id="main" tabIndex={-1} className="pt-16 outline-none md:pt-[4.5rem]">
        <ContactCTA page />
      </main>
      <Footer />
    </>
  );
}
