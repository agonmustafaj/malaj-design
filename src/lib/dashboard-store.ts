import { projects, type Project, type ProjectGroup } from "@/data/projects";
import type { ProjectInput, StoredFrame, StoredProject } from "@/lib/dashboard-types";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import { cookies } from "next/headers";
import path from "path";
import sharp from "sharp";

const groups = new Set<ProjectGroup>(["streetwear", "posters", "mascot", "series"]);

const dataDir = path.join(process.cwd(), "data", "dashboard");
const uploadDir = path.join(process.cwd(), "public", "uploads");
const listFile = path.join(dataDir, "projects.json");

function useBlobs() {
  return Boolean(process.env.NETLIFY_BLOBS_CONTEXT);
}

async function blobStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore("dashboard");
}

export async function listStored(): Promise<StoredProject[]> {
  try {
    if (useBlobs()) {
      const store = await blobStore();
      const saved = await store.get("projects", { type: "json", consistency: "strong" });
      return Array.isArray(saved) ? (saved as StoredProject[]) : [];
    }
    const raw = await readFile(listFile, "utf8");
    const saved = JSON.parse(raw) as unknown;
    return Array.isArray(saved) ? (saved as StoredProject[]) : [];
  } catch {
    return [];
  }
}

async function writeStored(list: StoredProject[]) {
  if (useBlobs()) {
    const store = await blobStore();
    await store.setJSON("projects", list);
    return;
  }
  await mkdir(dataDir, { recursive: true });
  await writeFile(listFile, JSON.stringify(list, null, 2));
}

export function toPublicProject(item: StoredProject): Project {
  return {
    id: item.id,
    slug: item.slug,
    group: item.group,
    number: "00",
    title: item.title,
    category: item.category,
    year: item.createdAt.slice(0, 4),
    description: item.description,
    lead: item.description,
    story: [],
    image: item.image,
    imageAlt: item.title,
    position: "center",
    layout: "full",
    href: `/work/${item.slug}`,
    role: "Designer",
    context: "Published from the dashboard",
    facts: [],
    frames: item.frames.map((frame) => ({
      src: frame.src,
      alt: frame.caption || item.title,
      width: frame.width,
      height: frame.height,
      caption: frame.caption,
    })),
  };
}

export async function getAllProjects(): Promise<Project[]> {
  await cookies();
  const extra = (await listStored()).map(toPublicProject);
  return [...projects, ...extra].map((project, index) => ({
    ...project,
    number: String(index + 1).padStart(2, "0"),
  }));
}

function slugify(title: string) {
  const base = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return base || "project";
}

async function uniqueSlug(title: string, currentId?: string) {
  const base = slugify(title);
  const taken = new Set((await getAllProjects()).filter((project) => project.id !== currentId).map((project) => project.slug));
  if (!taken.has(base)) return base;
  for (let index = 2; index < 100; index += 1) {
    const next = `${base}-${index}`;
    if (!taken.has(next)) return next;
  }
  return `${base}-${Date.now()}`;
}

function imageId(src: string) {
  const name = src.split("/").pop() ?? "";
  return name.replace(/\.webp$/, "");
}

async function removeImage(src: string) {
  const id = imageId(src);
  if (!/^[a-zA-Z0-9-]+$/.test(id)) return;
  if (src.startsWith("/uploads/")) {
    await unlink(path.join(uploadDir, `${id}.webp`)).catch(() => undefined);
    return;
  }
  if (src.startsWith("/media/") && useBlobs()) {
    const store = await blobStore();
    await store.delete(`images/${id}`);
  }
}

export async function saveImage(bytes: Buffer) {
  const id = crypto.randomUUID();
  const converted = await sharp(bytes, { failOn: "none", animated: false })
    .rotate()
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer({ resolveWithObject: true });

  if (useBlobs()) {
    const store = await blobStore();
    const payload = converted.data.buffer.slice(
      converted.data.byteOffset,
      converted.data.byteOffset + converted.data.byteLength,
    );
    await store.set(`images/${id}`, payload);
    return { src: `/media/${id}`, width: converted.info.width, height: converted.info.height };
  }

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, `${id}.webp`), converted.data);
  return { src: `/uploads/${id}.webp`, width: converted.info.width, height: converted.info.height };
}

export async function readImage(id: string) {
  if (!/^[a-zA-Z0-9-]+$/.test(id)) return null;
  if (useBlobs()) {
    const store = await blobStore();
    const bytes = await store.get(`images/${id}`, { type: "arrayBuffer", consistency: "strong" });
    return bytes ? Buffer.from(bytes) : null;
  }
  try {
    return await readFile(path.join(uploadDir, `${id}.webp`));
  } catch {
    return null;
  }
}

function cleanText(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

export function parseProjectInput(body: unknown): { input: ProjectInput } | { error: string } {
  if (!body || typeof body !== "object") return { error: "The project could not be read." };
  const record = body as Record<string, unknown>;
  const group = record.group;
  if (typeof group !== "string" || !groups.has(group as ProjectGroup)) {
    return { error: "Choose a section for the project." };
  }
  const title = cleanText(record.title, 80);
  const category = cleanText(record.category, 80);
  const description = cleanText(record.description, 500);
  if (title.length < 2) return { error: "Add a title." };
  if (category.length < 2) return { error: "Add the small line above the title." };
  if (description.length < 8) return { error: "Add the description that sits under the title." };
  if (typeof record.image !== "string" || !record.image.startsWith("/")) {
    return { error: "Add the featured image." };
  }
  if (!Array.isArray(record.frames) || record.frames.length === 0) {
    return { error: "Add at least one photo for the pieces." };
  }
  if (record.frames.length > 30) return { error: "A project can hold up to 30 photos." };

  const frames: StoredFrame[] = [];
  for (const frame of record.frames) {
    if (!frame || typeof frame !== "object") return { error: "One of the photos could not be read." };
    const item = frame as Record<string, unknown>;
    const caption = cleanText(item.caption, 240);
    if (typeof item.src !== "string" || !item.src.startsWith("/")) return { error: "Each photo needs an upload." };
    if (caption.length < 2) return { error: "Each photo needs a description." };
    frames.push({
      src: item.src,
      width: Number(item.width) || 1200,
      height: Number(item.height) || 1500,
      caption,
    });
  }

  return {
    input: {
      id: typeof record.id === "string" ? record.id : undefined,
      group: group as ProjectGroup,
      title,
      category,
      description,
      image: record.image,
      imageWidth: Number(record.imageWidth) || 1200,
      imageHeight: Number(record.imageHeight) || 1500,
      frames,
    },
  };
}

export async function saveProject(input: ProjectInput) {
  const list = await listStored();
  const existing = input.id ? list.find((item) => item.id === input.id) : undefined;
  if (input.id && !existing) return { error: "That project is not in the dashboard." } as const;
  if (input.id && !input.id.startsWith("dash-")) return { error: "That project is not in the dashboard." } as const;

  const slug = existing?.slug ?? (await uniqueSlug(input.title));
  const saved: StoredProject = {
    id: existing?.id ?? `dash-${crypto.randomUUID()}`,
    slug,
    group: input.group,
    title: input.title,
    category: input.category,
    description: input.description,
    image: input.image,
    imageWidth: input.imageWidth,
    imageHeight: input.imageHeight,
    frames: input.frames,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };

  const next = existing ? list.map((item) => (item.id === existing.id ? saved : item)) : [saved, ...list];
  await writeStored(next);

  if (existing) {
    const keep = new Set([saved.image, ...saved.frames.map((frame) => frame.src)]);
    const previous = [existing.image, ...existing.frames.map((frame) => frame.src)];
    await Promise.all(previous.filter((src) => !keep.has(src)).map((src) => removeImage(src)));
  }

  return { project: saved } as const;
}

export async function deleteProject(id: string) {
  const list = await listStored();
  const existing = list.find((item) => item.id === id);
  if (!existing) return { error: "That project is not in the dashboard." } as const;
  await writeStored(list.filter((item) => item.id !== id));
  await Promise.all([existing.image, ...existing.frames.map((frame) => frame.src)].map((src) => removeImage(src)));
  return { ok: true } as const;
}
