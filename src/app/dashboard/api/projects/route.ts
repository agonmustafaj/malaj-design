import { sessionCookie, sessionIsValid } from "@/lib/dashboard-auth";
import { deleteProject, listStored, parseProjectInput, saveProject } from "@/lib/dashboard-store";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function allowed() {
  const jar = await cookies();
  return sessionIsValid(jar.get(sessionCookie.name)?.value);
}

export async function GET() {
  if (!(await allowed())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  return NextResponse.json({ projects: await listStored() });
}

export async function POST(request: Request) {
  if (!(await allowed())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const parsed = parseProjectInput(await request.json().catch(() => null));
  if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const saved = await saveProject(parsed.input);
  if ("error" in saved) return NextResponse.json({ error: saved.error }, { status: 400 });
  return NextResponse.json({ project: saved.project });
}

export async function DELETE(request: Request) {
  if (!(await allowed())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) return NextResponse.json({ error: "Choose a project to delete." }, { status: 400 });
  const result = await deleteProject(body.id);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}
