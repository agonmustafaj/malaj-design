import { credentialsMatch, sessionCookie, sessionIsValid, signSession } from "@/lib/dashboard-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { username?: string; password?: string } | null;
  const username = body?.username ?? "";
  const password = body?.password ?? "";
  if (!credentialsMatch(username, password)) {
    return NextResponse.json({ error: "That login does not match." }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(sessionCookie.name, signSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionCookie.maxAge,
  });
  return NextResponse.json({ ok: true });
}
