import { readImage } from "@/lib/dashboard-store";
import { NextResponse } from "next/server";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const bytes = await readImage(id);
  if (!bytes) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=2592000, stale-while-revalidate=86400",
    },
  });
}
