import { sessionCookie, sessionIsValid } from "@/lib/dashboard-auth";
import { saveImage } from "@/lib/dashboard-store";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const maxBytes = 6 * 1024 * 1024;

export async function POST(request: Request) {
  const jar = await cookies();
  if (!sessionIsValid(jar.get(sessionCookie.name)?.value)) {
    return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image." }, { status: 400 });
  if (file.size > maxBytes) return NextResponse.json({ error: "Each photo needs to be under 6 MB." }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "That file is not an image." }, { status: 400 });

  try {
    const saved = await saveImage(Buffer.from(await file.arrayBuffer()));
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: "That image could not be converted." }, { status: 400 });
  }
}
