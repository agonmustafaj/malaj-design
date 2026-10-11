"use client";

import type { StoredProject } from "@/lib/dashboard-types";
import { workGroups } from "@/data/site";
import type { ProjectGroup } from "@/data/projects";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Upload = { src: string; width: number; height: number };

type Piece = Upload & { caption: string; key: string };

const emptyPiece = (): Piece => ({ key: crypto.randomUUID(), src: "", width: 0, height: 0, caption: "" });

async function sendFile(file: File) {
  const form = new FormData();
  form.set("file", file);
  const response = await fetch("/dashboard/api/upload", { method: "POST", body: form });
  const body = (await response.json().catch(() => null)) as (Upload & { error?: string }) | null;
  if (!response.ok || !body?.src) throw new Error(body?.error ?? "That image could not be converted.");
  return body;
}

export function DashboardPanel({ projects }: { projects: StoredProject[] }) {
  const router = useRouter();
  const [list, setList] = useState(projects);
  const [editing, setEditing] = useState<string | null>(null);
  const [group, setGroup] = useState<ProjectGroup>("streetwear");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<Upload | null>(null);
  const [pieces, setPieces] = useState<Piece[]>([emptyPiece()]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState("");

  function reset() {
    setEditing(null);
    setGroup("streetwear");
    setTitle("");
    setCategory("");
    setDescription("");
    setImage(null);
    setPieces([emptyPiece()]);
    setError("");
  }

  function edit(project: StoredProject) {
    setEditing(project.id);
    setGroup(project.group);
    setTitle(project.title);
    setCategory(project.category);
    setDescription(project.description);
    setImage({ src: project.image, width: project.imageWidth, height: project.imageHeight });
    setPieces(
      project.frames.map((frame) => ({
        key: crypto.randomUUID(),
        src: frame.src,
        width: frame.width,
        height: frame.height,
        caption: frame.caption,
      })),
    );
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onFeatured(file: File | undefined) {
    if (!file) return;
    setError("");
    setPending(true);
    try {
      setImage(await sendFile(file));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "That image could not be converted.");
    } finally {
      setPending(false);
    }
  }

  async function onPieceFile(key: string, file: File | undefined) {
    if (!file) return;
    setError("");
    setPending(true);
    try {
      const saved = await sendFile(file);
      setPieces((current) => current.map((piece) => (piece.key === key ? { ...piece, ...saved } : piece)));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "That image could not be converted.");
    } finally {
      setPending(false);
    }
  }

  async function publish() {
    setPending(true);
    setError("");
    setNotice("");
    const response = await fetch("/dashboard/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editing ?? undefined,
        group,
        title,
        category,
        description,
        image: image?.src,
        imageWidth: image?.width,
        imageHeight: image?.height,
        frames: pieces.map(({ src, width, height, caption }) => ({ src, width, height, caption })),
      }),
    });
    const body = (await response.json().catch(() => null)) as { error?: string; project?: StoredProject } | null;
    setPending(false);
    if (!response.ok || !body?.project) {
      setError(body?.error ?? "The project could not be published.");
      return;
    }
    setList((current) => {
      const without = current.filter((item) => item.id !== body.project?.id);
      return [body.project as StoredProject, ...without];
    });
    setNotice(editing ? "Project updated." : "Project published.");
    reset();
    router.refresh();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this project from the site?")) return;
    const response = await fetch("/dashboard/api/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? "The project could not be deleted.");
      return;
    }
    setList((current) => current.filter((item) => item.id !== id));
    if (editing === id) reset();
    router.refresh();
  }

  async function logout() {
    await fetch("/dashboard/api/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.8fr)]">
      <form
        className="min-w-0"
        onSubmit={(event) => {
          event.preventDefault();
          void publish();
        }}
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Dashboard</p>
            <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-none font-semibold tracking-[-0.035em]">
              {editing ? "Edit project" : "New project"}
            </h1>
          </div>
          <button type="button" onClick={() => void logout()} className="text-sm text-muted underline underline-offset-4">
            Sign out
          </button>
        </div>

        <label className="mt-8 block text-sm font-medium" htmlFor="section">
          Section
        </label>
        <select
          id="section"
          value={group}
          onChange={(event) => setGroup(event.target.value as ProjectGroup)}
          className="mt-2 w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-base outline-none focus:border-ink"
        >
          {workGroups.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>

        <label className="mt-5 block text-sm font-medium" htmlFor="category">
          Line above the title
        </label>
        <input
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Brand Identity / Streetwear"
          className="mt-2 w-full rounded-2xl border border-ink/15 px-4 py-3 text-base outline-none focus:border-ink"
          required
        />

        <label className="mt-5 block text-sm font-medium" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-ink/15 px-4 py-3 text-base outline-none focus:border-ink"
          required
        />

        <label className="mt-5 block text-sm font-medium" htmlFor="description">
          Description under the title
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          placeholder="A streetwear identity drawn from the Illyrian helmet: a mark, a poster, and a system meant to be worn."
          className="mt-2 w-full rounded-2xl border border-ink/15 px-4 py-3 text-base leading-relaxed outline-none focus:border-ink"
          required
        />

        <label className="mt-5 block text-sm font-medium" htmlFor="featured">
          Featured image
        </label>
        <input
          id="featured"
          type="file"
          accept="image/*"
          onChange={(event) => void onFeatured(event.target.files?.[0])}
          className="mt-2 block w-full text-sm"
        />
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.src} alt="" className="mt-3 h-40 w-full rounded-2xl object-cover" />
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-[-0.02em]">The pieces</h2>
          <button
            type="button"
            onClick={() => setPieces((current) => [...current, emptyPiece()])}
            className="text-sm font-medium text-accent"
          >
            Add photo
          </button>
        </div>
        <p className="mt-2 text-sm text-muted">The first photo is the one that opens the project page. Each photo needs its own description.</p>

        <ul className="mt-4 space-y-4">
          {pieces.map((piece, index) => (
            <li key={piece.key} className="rounded-2xl border border-ink/15 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Photo {String(index + 1).padStart(2, "0")}</p>
                <div className="flex gap-3 text-sm">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() =>
                      setPieces((current) => {
                        const next = [...current];
                        const [item] = next.splice(index, 1);
                        next.splice(index - 1, 0, item);
                        return next;
                      })
                    }
                    className="disabled:opacity-30"
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    disabled={index === pieces.length - 1}
                    onClick={() =>
                      setPieces((current) => {
                        const next = [...current];
                        const [item] = next.splice(index, 1);
                        next.splice(index + 1, 0, item);
                        return next;
                      })
                    }
                    className="disabled:opacity-30"
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    onClick={() => setPieces((current) => (current.length === 1 ? current : current.filter((item) => item.key !== piece.key)))}
                    className="text-accent"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => void onPieceFile(piece.key, event.target.files?.[0])}
                className="mt-3 block w-full text-sm"
              />
              {piece.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={piece.src} alt="" className="mt-3 h-36 w-full rounded-xl object-cover" />
              ) : null}
              <label className="mt-3 block text-sm font-medium" htmlFor={`caption-${piece.key}`}>
                Description
              </label>
              <input
                id={`caption-${piece.key}`}
                value={piece.caption}
                onChange={(event) =>
                  setPieces((current) => current.map((item) => (item.key === piece.key ? { ...item, caption: event.target.value } : item)))
                }
                className="mt-2 w-full rounded-xl border border-ink/15 px-3 py-2 text-sm outline-none focus:border-ink"
                required
              />
            </li>
          ))}
        </ul>

        {error ? <p className="mt-5 text-sm text-accent">{error}</p> : null}
        {notice ? <p className="mt-5 text-sm">{notice}</p> : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-11 items-center rounded-[14px] bg-accent px-5 text-sm font-medium text-white disabled:opacity-60"
          >
            {pending ? "Saving" : editing ? "Update project" : "Publish project"}
          </button>
          {editing ? (
            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center px-3 text-sm">
              Cancel
            </button>
          ) : null}
        </div>
        <p className="mt-4 text-sm text-muted">Uploaded photos are saved as WebP.</p>
      </form>

      <aside>
        <h2 className="text-lg font-semibold tracking-[-0.02em]">Published here</h2>
        {list.length === 0 ? <p className="mt-4 text-sm text-muted">No projects from the dashboard yet.</p> : null}
        <ul className="mt-4 space-y-4">
          {list.map((project) => (
            <li key={project.id} className="rounded-2xl border border-ink/15 p-4">
              <p className="text-[11px] tracking-[0.16em] text-muted uppercase">
                {workGroups.find((item) => item.id === project.group)?.label}
              </p>
              <p className="mt-1 font-semibold">{project.title}</p>
              <p className="mt-1 text-sm text-muted">{project.description}</p>
              <div className="mt-3 flex gap-4 text-sm">
                <button type="button" onClick={() => edit(project)} className="font-medium">
                  Edit
                </button>
                <button type="button" onClick={() => void remove(project.id)} className="text-accent">
                  Delete
                </button>
                <a href={`/work/${project.slug}`} className="text-muted">
                  View
                </a>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
