export type ProjectLayout = "full" | "right" | "split" | "landscape" | "overlap";

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  imageAlt: string;
  position: string;
  layout: ProjectLayout;
  /** Swap this for a case-study route when pages exist. */
  href: string;
};

const photo = (id: string) => `https://images.unsplash.com/photo-${id}`;

/**
 * Replace any image by editing the Unsplash photo id (or a local `/public` path).
 * Titles, categories, years, and layout live in this array.
 */
export const projects: Project[] = [
  {
    id: "nor-studio",
    number: "01",
    title: "NØR Studio",
    category: "Brand Identity / Art Direction",
    year: "2026",
    description:
      "A visual identity shaped by raw material, quiet type, and the geometry of the studio’s architecture.",
    image: photo("1487958449943-2429e8be8625"),
    imageAlt: "White modernist building with a strict grid of windows",
    position: "center",
    layout: "full",
    href: "#featured",
  },
  {
    id: "forma",
    number: "02",
    title: "Forma",
    category: "Digital Experience / UI Design",
    year: "2026",
    description:
      "An interface system for a digital atelier — precise grids, slow motion, and type that leads.",
    image: photo("1586717791821-3f44a563fa4c"),
    imageAlt: "Design desk covered with interface sketches and typography studies",
    position: "center",
    layout: "right",
    href: "#contact",
  },
  {
    id: "atelier-09",
    number: "03",
    title: "Atelier 09",
    category: "Editorial / Branding",
    year: "2025",
    description:
      "Seasonal editorial language for a fashion house, from lookbook to storefront.",
    image: photo("1445205170230-053b83016050"),
    imageAlt: "Clothing rack in a quiet fashion studio",
    position: "center",
    layout: "split",
    href: "#contact",
  },
  {
    id: "kinetic",
    number: "04",
    title: "Kinetic",
    category: "Campaign / Creative Direction",
    year: "2025",
    description:
      "Campaign direction for a launch that treated motion, stills, and sound as one composition.",
    image: photo("1515886657613-9f3515b0c78f"),
    imageAlt: "Fashion campaign portrait against a warm yellow backdrop",
    position: "center 20%",
    layout: "landscape",
    href: "#contact",
  },
  {
    id: "mono-objects",
    number: "05",
    title: "Mono Objects",
    category: "Brand Strategy / Packaging",
    year: "2024",
    description:
      "Strategy and packaging for a collection of everyday objects reduced to their essential form.",
    image: photo("1541643600914-78b084683601"),
    imageAlt: "Amber glass bottle on a neutral surface, shot as a product study",
    position: "center",
    layout: "overlap",
    href: "#contact",
  },
];

export const portrait = {
  src: "/andi-malaj.png",
  alt: "Portrait of Andi Malaj",
};

export const heroImage = {
  src: photo("1618221195710-dd6b41faaea6"),
  alt: "Sunlit stone interior with sculptural furniture and warm neutral materials",
};

export const featuredImage = {
  src: photo("1600607687939-ce8a6c25118c"),
  alt: "Bright architectural interior with precise lines and quiet materials for NØR Studio",
};
