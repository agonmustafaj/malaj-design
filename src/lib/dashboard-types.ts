import type { ProjectGroup } from "@/data/projects";

export type StoredFrame = {
  src: string;
  width: number;
  height: number;
  caption: string;
};

export type StoredProject = {
  id: string;
  slug: string;
  group: ProjectGroup;
  title: string;
  category: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  frames: StoredFrame[];
  createdAt: string;
};

export type ProjectInput = {
  id?: string;
  group: ProjectGroup;
  title: string;
  category: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  frames: StoredFrame[];
};
