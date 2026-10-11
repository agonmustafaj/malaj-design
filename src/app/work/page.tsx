import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";
import { workList } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Selected work by Andi Malaj: a streetwear identity, posters, a mascot, sound artwork, and a stationery study.";

export const metadata = pageMetadata("Work", description, "/work");

export default function WorkPage() {
  return (
    <>
      <main id="main" tabIndex={-1} className="pt-16 outline-none md:pt-[4.5rem]">
        <ProjectGrid page />
      </main>
      <Footer />
      <JsonLd data={workList(projects)} />
    </>
  );
}
