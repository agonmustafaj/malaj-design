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
  href: string;
};

/**
 * Images come from the Branding and Advertising presentation, February 2026.
 * Swap a picture by replacing the file in /public/photos.
 */
export const projects: Project[] = [
  {
    id: "andi-malaj-rage",
    number: "01",
    title: "Andi Malaj Rage",
    category: "Brand Identity / Streetwear",
    year: "2025",
    description:
      "A streetwear identity drawn from the Illyrian helmet — a mark, a poster, and a system meant to be worn.",
    image: "/photos/rage-poster.jpg",
    imageAlt: "Andi Malaj Rage poster pasted on a graffiti-covered wall",
    position: "center",
    layout: "full",
    href: "#featured",
  },
  {
    id: "lupin",
    number: "02",
    title: "Lupin",
    category: "Film Poster",
    year: "2026",
    description:
      "A Season 2 poster built on a spotlight, a silhouette, and the line “The Chase is On.”",
    image: "/photos/lupin.jpg",
    imageAlt: "Lupin Season 2 poster in a black frame against a ridged wall",
    position: "center",
    layout: "right",
    href: "#lupin",
  },
  {
    id: "balance",
    number: "03",
    title: "Balance",
    category: "Typography Poster",
    year: "2026",
    description:
      "Stretched and mirrored letterforms split across purple and green, holding tension and symmetry in one frame.",
    image: "/photos/balance.jpg",
    imageAlt: "Framed typography poster titled Balance on a living room wall",
    position: "center",
    layout: "split",
    href: "#balance",
  },
  {
    id: "nata-frikes",
    number: "04",
    title: "Nata Frikes",
    category: "Event Poster",
    year: "2026",
    description:
      "A Halloween night in Prishtina: a skeleton at the decks, flame type, and the details of the party.",
    image: "/photos/nata-frikes.jpg",
    imageAlt: "Nata Frikes Halloween poster pasted on a boarded doorway",
    position: "center",
    layout: "landscape",
    href: "#nata-frikes",
  },
  {
    id: "shqipni-etnike",
    number: "05",
    title: "Shqipni Etnike",
    category: "Independence Day Poster",
    year: "2026",
    description:
      "A poster joining medieval and modern Albania across a cracked map — one people, one oath, one flag.",
    image: "/photos/shqipni.jpg",
    imageAlt: "Independence poster of a soldier and a medieval knight reaching toward each other",
    position: "center",
    layout: "overlap",
    href: "#shqipni-etnike",
  },
  {
    id: "lynx",
    number: "06",
    title: "Lynx",
    category: "Mascot",
    year: "2026",
    description:
      "The face of Andi Malaj Rage: a lynx in the brand hoodie, drawn for strength, agility, and attitude.",
    image: "/photos/lynx.jpg",
    imageAlt: "Back of a black hoodie with the lynx mascot and Andi Malaj lettering",
    position: "center",
    layout: "right",
    href: "#lynx",
  },
  {
    id: "instant-crush",
    number: "07",
    title: "Instant Crush",
    category: "Sound / Cover Design",
    year: "2026",
    description:
      "Cover art for a track heard before the artist was known — geometry, motion, and a digital atmosphere.",
    image: "/photos/instant-crush.jpg",
    imageAlt: "Instant Crush CD and cover spread on a purple background",
    position: "center",
    layout: "split",
    href: "#instant-crush",
  },
  {
    id: "dior-stationery",
    number: "08",
    title: "Dior Stationery",
    category: "Stationery Study",
    year: "2026",
    description:
      "A study in how a house rooted in tradition can speak through cards, letters, and a quieter mark.",
    image: "/photos/dior.jpg",
    imageAlt: "Dior stationery set arranged on white marble, with letterhead, cards, and envelopes",
    position: "center",
    layout: "landscape",
    href: "#dior-stationery",
  },
];

export const portrait = {
  src: "/andi-malaj.png",
  alt: "Portrait of Andi Malaj",
};

export const heroImage = {
  src: "/photos/rage-hoodie.jpg",
  alt: "Black hoodie with the Andi Malaj Rage mark, photographed in a station corridor",
};

export const featuredImage = {
  src: "/photos/rage-sign.jpg",
  alt: "Square wall sign carrying the Andi Malaj Rage helmet mark",
};
