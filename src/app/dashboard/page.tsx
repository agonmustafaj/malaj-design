import { DashboardLogin } from "@/components/DashboardLogin";
import { DashboardPanel } from "@/components/DashboardPanel";
import { Footer } from "@/components/Footer";
import { sessionCookie, sessionIsValid } from "@/lib/dashboard-auth";
import { listStored } from "@/lib/dashboard-store";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <>
      <main id="main" tabIndex={-1} className="page-x pt-28 pb-20 outline-none md:pt-36">
        <Suspense fallback={<p className="text-sm text-ink/50">Loading</p>}>
          <DashboardGate />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

async function DashboardGate() {
  await connection();
  const jar = await cookies();
  const signedIn = sessionIsValid(jar.get(sessionCookie.name)?.value);
  if (!signedIn) return <DashboardLogin />;
  return <DashboardPanel projects={await listStored()} />;
}
