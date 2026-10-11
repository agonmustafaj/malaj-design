"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function DashboardLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/dashboard/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setPending(false);
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? "That login does not match.");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-md">
      <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Dashboard</p>
      <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-none font-semibold tracking-[-0.035em]">Sign in</h1>
      <label className="mt-8 block text-sm font-medium" htmlFor="username">
        Username
      </label>
      <input
        id="username"
        name="username"
        autoComplete="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-ink/15 px-4 py-3 text-base outline-none focus:border-ink"
        required
      />
      <label className="mt-5 block text-sm font-medium" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-ink/15 px-4 py-3 text-base outline-none focus:border-ink"
        required
      />
      {error ? <p className="mt-4 text-sm text-accent">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex min-h-11 items-center rounded-[14px] bg-accent px-5 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? "Signing in" : "Sign in"}
      </button>
    </form>
  );
}
