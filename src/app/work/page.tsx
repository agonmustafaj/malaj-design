import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { projects } from "@/data/projects";
import { workList } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";

const description =
  "Selected work by Andi Malaj: a streetwear identity, posters, a mascot, sound artwork, and a stationery study.";

export const metadata = pageMetadata("Work", description, "/work");

export default function WorkPage({ searchParams }: { searchParams: Promise<{ group?: string }> }) {
  return (
    <>
      <main id="main" tabIndex={-1} className="pt-16 outline-none md:pt-[4.5rem]">
        <Suspense fallback={<ProjectBrowser />}>
          <WorkListing searchParams={searchParams} />
        </Suspense>
      </main>
      <Footer />
      <JsonLd data={workList(projects)} />
    </>
  );
}

async function WorkListing({ searchParams }: { searchParams: Promise<{ group?: string }> }) {
  const { group } = await searchParams;
  return <ProjectBrowser group={group} />;
}
