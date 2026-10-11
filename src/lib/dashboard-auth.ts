import { createHash, createHmac, timingSafeEqual } from "crypto";

const USERNAME = "andi.admin";
const PASSWORD = "Andi.2005!";
const SESSION_SECRET = "malaj-dashboard-session-9f3c2a";
const SESSION_MS = 1000 * 60 * 60 * 24 * 14;

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function same(input: string, expected: string) {
  return timingSafeEqual(digest(input), digest(expected));
}

export function credentialsMatch(username: string, password: string) {
  return same(username, USERNAME) && same(password, PASSWORD);
}

export function signSession() {
  const expires = Date.now() + SESSION_MS;
  const payload = Buffer.from(JSON.stringify({ user: USERNAME, expires })).toString("base64url");
  const signature = createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function sessionIsValid(token: string | undefined) {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString()) as { user?: string; expires?: number };
    return parsed.user === USERNAME && typeof parsed.expires === "number" && parsed.expires > Date.now();
  } catch {
    return false;
  }
}

export const sessionCookie = {
  name: "malaj_dashboard",
  maxAge: SESSION_MS / 1000,
} as const;
