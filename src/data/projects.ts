export type ProjectLayout = "full" | "right" | "split" | "landscape" | "overlap";

export type CaseImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type ProjectFact = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  lead: string;
  story: readonly string[];
  image: string;
  imageAlt: string;
  position: string;
  layout: ProjectLayout;
  href: string;
  role: string;
  context: string;
  facts: readonly ProjectFact[];
  palette?: readonly { name: string; hex: string }[];
  quote?: { text: string; source: string };
  tracks?: readonly string[];
  frames: readonly CaseImage[];
};

/**
 * Copy and pictures come from the Branding and Advertising presentation,
 * February 2026. Swap a picture by replacing the file in /public/photos.
 */
export const projects: Project[] = [
  {
    id: "andi-malaj-rage",
    slug: "andi-malaj-rage",
    number: "01",
    title: "Andi Malaj Rage",
    category: "Brand Identity / Streetwear",
    year: "2025",
    description:
      "A streetwear identity drawn from the Illyrian helmet — a mark, a poster, and a system meant to be worn.",
    lead: "Symbols speak louder than words. The brand starts with the Illyrian helmet: a language of courage, belonging, and the self.",
    story: [
      "Andi Malaj Rage is a streetwear identity built on clean lines, modern silhouettes, and color with depth. The pieces are not made only to be worn. They are made to be felt, carried with stance, and lived.",
      "The logo takes the helmet’s contour and folds it into the letters A and M. It stands for protection, courage, cultural legacy, strength, continuity, and roots. It is the primary element of every piece of communication, constructed on a grid, with variants for square, landscape, and portrait formats.",
      "Clear space equals the height of the letter A. The system shows where the mark belongs, and the uses that break it. From there it moves onto a street poster and a stationery set without changing its voice.",
      "Heritage becomes identity, and identity becomes style.",
    ],
    image: "/photos/rage-poster.jpg",
    imageAlt: "Andi Malaj Rage poster pasted on a graffiti-covered wall",
    position: "center",
    layout: "full",
    href: "/work/andi-malaj-rage",
    role: "Identity, logo, poster, stationery",
    context: "Personal brandbook",
    facts: [
      { label: "Year", value: "2025" },
      { label: "Role", value: "Designer" },
      { label: "Format", value: "Mark, poster, stationery, apparel" },
      { label: "Context", value: "Personal brandbook" },
    ],
    palette: [
      { name: "Black", hex: "#000000" },
      { name: "Off-white", hex: "#FEFEFE" },
      { name: "Gray", hex: "#C4C4C4" },
    ],
    quote: {
      text: "They aren’t made just to be worn. They are made to be felt. To be carried with stance. To be lived.",
      source: "Andi Malaj Rage brandbook, 2025",
    },
    frames: [
      {
        src: "/photos/rage-poster.jpg",
        alt: "Andi Malaj Rage poster pasted on a graffiti-covered wall",
        width: 2400,
        height: 1359,
        caption: "The street poster, pasted where the brand is meant to be read.",
      },
      {
        src: "/photos/rage-sign.jpg",
        alt: "Square wall sign carrying the Andi Malaj Rage helmet mark",
        width: 2382,
        height: 1341,
        caption: "The mark as a wall sign. Clear space equals the height of the letter A.",
      },
      {
        src: "/photos/rage-hoodie.jpg",
        alt: "Black hoodie with the Andi Malaj Rage mark, photographed in a station corridor",
        width: 2583,
        height: 1452,
        caption: "On cloth. The identity has to survive a body, not only a page.",
      },
      {
        src: "/photos/rage-logo.jpg",
        alt: "Andi Malaj Rage logo lockup built from the Illyrian helmet",
        width: 1946,
        height: 1095,
        caption: "Helmet contours drawn into A and M — the primary element of the system.",
      },
      {
        src: "/photos/rage-stationery.jpg",
        alt: "Andi Malaj Rage stationery laid out as a brand system",
        width: 2000,
        height: 1500,
        caption: "Stationery carrying the same grid, the same mark, the same restraint.",
      },
    ],
  },
  {
    id: "lupin",
    slug: "lupin",
    number: "02",
    title: "Lupin",
    category: "Film Poster",
    year: "2026",
    description:
      "A Season 2 poster built on a spotlight, a silhouette, and the line “The Chase is On.”",
    lead: "Suspense, held in one silhouette. The poster for Lupin Season 2 is a chase you are already late for.",
    story: [
      "The frame is built from dramatic light and a figure that never fully steps forward. A spotlight does the explaining. Everything else stays in the dark.",
      "The line is “The Chase is On.” The type is bold, cinematic, and slightly mystic — a title that behaves like a still from the series, not a summary of the plot.",
      "This is a film-poster study: a way of directing attention with shadow, scale, and a single sentence.",
    ],
    image: "/photos/lupin.jpg",
    imageAlt: "Lupin Season 2 poster in a black frame against a ridged wall",
    position: "center",
    layout: "right",
    href: "/work/lupin",
    role: "Poster design",
    context: "Film poster study",
    facts: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Poster designer" },
      { label: "Format", value: "Film poster" },
      { label: "Context", value: "Study — Lupin, Season 2" },
    ],
    frames: [
      {
        src: "/photos/lupin.jpg",
        alt: "Lupin Season 2 poster in a black frame against a ridged wall",
        width: 2400,
        height: 1351,
        caption: "Framed. The spotlight, the silhouette, and “The Chase is On.”",
      },
    ],
  },
  {
    id: "balance",
    slug: "balance",
    number: "03",
    title: "Balance",
    category: "Typography Poster",
    year: "2026",
    description:
      "Stretched and mirrored letterforms split across purple and green, holding tension and symmetry in one frame.",
    lead: "The letters are stretched until they almost break, then mirrored until the poster holds still.",
    story: [
      "Balance is a typography poster. There is no scene to illustrate. The idea is carried by letterforms that have been pulled out of proportion and set against their own reflection.",
      "A diagonal splits the sheet into purple and green. Contrast does one job. Symmetry does the other. The tension between them is the poster.",
      "Read from across a room, it is a single shape. Up close, it is a word that has been asked to work harder than type usually does.",
    ],
    image: "/photos/balance.jpg",
    imageAlt: "Framed typography poster titled Balance on a living room wall",
    position: "center",
    layout: "split",
    href: "/work/balance",
    role: "Typography, poster",
    context: "Typography poster",
    facts: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Designer" },
      { label: "Format", value: "Typography poster" },
      { label: "Context", value: "Letterform study" },
    ],
    frames: [
      {
        src: "/photos/balance.jpg",
        alt: "Framed typography poster titled Balance on a living room wall",
        width: 2400,
        height: 1352,
        caption: "Stretched and mirrored letterforms, purple against green.",
      },
    ],
  },
  {
    id: "nata-frikes",
    slug: "nata-frikes",
    number: "04",
    title: "Nata Frikes",
    category: "Event Poster",
    year: "2026",
    description:
      "A Halloween night in Prishtina: a skeleton at the decks, flame type, and the details of the party.",
    lead: "Fear and music in the same room. The poster has to work on a boarded door, at night, in a hurry.",
    story: [
      "Nata Frikes is a Halloween event poster. A skeleton takes the decks. The type is cut like flame. The job is to feel like the night before you have read a single line.",
      "Then the lines do their work. Halloween night. 31 October. 9PM. DjGhost on techno, DjPrima on r’n’b, DjStorm on hip hop. Entry is printed as $10. The address on the poster is 313 8th Avenue, Prishtina.",
      "It is designed as a street object: bold enough to be seen in passing, specific enough that you know where to go.",
    ],
    image: "/photos/nata-frikes.jpg",
    imageAlt: "Nata Frikes Halloween poster pasted on a boarded doorway",
    position: "center",
    layout: "landscape",
    href: "/work/nata-frikes",
    role: "Event poster",
    context: "Event poster",
    facts: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Poster designer" },
      { label: "Format", value: "Event poster" },
      { label: "Night", value: "31 October, 9PM — Prishtina" },
    ],
    frames: [
      {
        src: "/photos/nata-frikes.jpg",
        alt: "Nata Frikes Halloween poster pasted on a boarded doorway",
        width: 2632,
        height: 1483,
        caption: "Pasted. The poster meeting the street it was made for.",
      },
      {
        src: "/photos/nata-poster.jpg",
        alt: "Flat Nata Frikes poster with a skeleton DJ and the night’s lineup",
        width: 1050,
        height: 1350,
        caption: "The poster flat: skeleton, flame type, lineup, and the door.",
      },
    ],
  },
  {
    id: "shqipni-etnike",
    slug: "shqipni-etnike",
    number: "05",
    title: "Shqipni Etnike",
    category: "Independence Day Poster",
    year: "2026",
    description:
      "A poster joining medieval and modern Albania across a cracked map — one people, one oath, one flag.",
    lead: "One people. One oath. One flag. Two figures, centuries apart, reaching across the same map.",
    story: [
      "Shqipni Etnike is an independence poster about unity across time. Medieval Albania and a modern identity occupy one sheet, joined by the outline of a map and a cracked field between them.",
      "The line printed on the poster is “NJI KOMB, NJI BES, NJI FLAMUR.” The image does not explain the sentence. It stages it: a knight and a soldier, heritage and the present, held in the same frame.",
      "The poster treats ethnic and cultural union as a visual fact — two bodies, one ground, one flag.",
    ],
    image: "/photos/shqipni.jpg",
    imageAlt: "Independence poster of a soldier and a medieval knight reaching toward each other",
    position: "center",
    layout: "overlap",
    href: "/work/shqipni-etnike",
    role: "Poster design",
    context: "Independence Day poster",
    facts: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Poster designer" },
      { label: "Format", value: "Cultural poster" },
      { label: "Line", value: "Nji komb, nji bes, nji flamur" },
    ],
    frames: [
      {
        src: "/photos/shqipni.jpg",
        alt: "Independence poster of a soldier and a medieval knight reaching toward each other",
        width: 1053,
        height: 1489,
        caption: "Medieval and modern Albania, one map, one oath.",
      },
    ],
  },
  {
    id: "lynx",
    slug: "lynx",
    number: "06",
    title: "Lynx",
    category: "Mascot",
    year: "2026",
    description:
      "The face of Andi Malaj Rage: a lynx drawn for strength, agility, and an attitude you can wear.",
    lead: "Strength, agility, and an energy that will not be tidied up. Lynx is the face of Andi Malaj Rage.",
    story: [
      "The mascot carries the brand’s stance: rebellion and confidence, drawn bold, sharp, and specific. The initials A and M stay in the mark, so the character and the logo are one identity, not a mascot parked next to a logo.",
      "Lynx is designed in the round. Front, side, back, angry, and nonchalant — the same animal, five temperatures. A pattern and a palette of black, off-white, and gray move it from a drawing onto cloth.",
      "It leaves the page as a hoodie back, a poster that reads “Rise above the fashion,” a pin, and a sticker. The character has to survive all four without being redrawn into a different animal.",
    ],
    image: "/photos/lynx-poster.jpg",
    imageAlt: "Lynx mascot poster reading Rise Above the Fashion",
    position: "center",
    layout: "right",
    href: "/work/lynx",
    role: "Character design",
    context: "Mascot for Andi Malaj Rage",
    facts: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Character designer" },
      { label: "Format", value: "Mascot, apparel, poster, pin" },
      { label: "For", value: "Andi Malaj Rage" },
    ],
    palette: [
      { name: "Black", hex: "#111111" },
      { name: "Off-white", hex: "#F5F3EE" },
      { name: "Gray", hex: "#C4C4C4" },
    ],
    frames: [
      {
        src: "/photos/lynx-poster.jpg",
        alt: "Lynx mascot poster reading Rise Above the Fashion",
        width: 2400,
        height: 1601,
        caption: "“Rise above the fashion.” The character as a poster.",
      },
      {
        src: "/photos/lynx-character.jpg",
        alt: "Lynx mascot character sheet with multiple poses",
        width: 2876,
        height: 2223,
        caption: "The animal, studied: stance, face, and the A M initial.",
      },
      {
        src: "/photos/lynx-turnaround.jpg",
        alt: "Lynx turnaround sheet labeled front, side, back, angry, and nonchalant",
        width: 1920,
        height: 1080,
        caption: "Turnaround. Front, side, back, angry, nonchalant.",
      },
      {
        src: "/photos/lynx.jpg",
        alt: "Back of a black hoodie with the lynx mascot and Andi Malaj lettering",
        width: 2100,
        height: 1356,
        caption: "On the back of the hoodie. Same mark, worn.",
      },
      {
        src: "/photos/lynx-pin.jpg",
        alt: "Enamel-style pin of the lynx mascot",
        width: 1024,
        height: 1012,
        caption: "The pin. Small enough to keep, sharp enough to recognize.",
      },
      {
        src: "/photos/lynx-sticker.jpg",
        alt: "Sticker of the lynx mascot",
        width: 1024,
        height: 1317,
        caption: "The sticker. The mascot leaving the brandbook.",
      },
    ],
  },
  {
    id: "instant-crush",
    slug: "instant-crush",
    number: "07",
    title: "Instant Crush",
    category: "Sound / Cover Design",
    year: "2026",
    description:
      "Cover art for a track heard before the artist was known — geometry, motion, and a digital atmosphere.",
    lead: "A picture made from a song, before the artist had a name. Electronic energy, drawn as geometry in motion.",
    story: [
      "Instant Crush began as a sound-design assignment: make a visual for a track without being told who made it. The only brief was the feeling — electronic, digital, abstract, futuristic, and moving.",
      "The artwork became a cover, a sleeve, and a back. Abstract geometry stands in for the drop. The image is meant to feel like the song is still playing after you look away.",
      "The titles printed on the art are the cover’s tracklist. They belong to the object. They are not a claim that the music was written here.",
    ],
    image: "/photos/instant-crush.jpg",
    imageAlt: "Instant Crush CD and cover spread on a purple background",
    position: "center",
    layout: "split",
    href: "/work/instant-crush",
    role: "Cover design",
    context: "Sound-design assignment",
    facts: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Cover designer" },
      { label: "Format", value: "Cover, sleeve, back" },
      { label: "Context", value: "Made from the sound, before the artist" },
    ],
    tracks: [
      "Neon Pulse",
      "Fragmented Memory",
      "Crash Loop",
      "Synthetic Horizon",
      "Echoes in Circuitry",
      "Voltage Dreams",
      "Pixel Drift",
      "Core Meltdown",
      "Instant Crash",
      "Reboot Ritual",
    ],
    frames: [
      {
        src: "/photos/instant-crush.jpg",
        alt: "Instant Crush CD and cover spread on a purple background",
        width: 1303,
        height: 1050,
        caption: "The cover and the disc. Geometry standing in for the track.",
      },
      {
        src: "/photos/instant-vinyl.jpg",
        alt: "Instant Crush artwork shown as a vinyl sleeve",
        width: 1296,
        height: 1079,
        caption: "The same system, as a sleeve.",
      },
    ],
  },
  {
    id: "dior-stationery",
    slug: "dior-stationery",
    number: "08",
    title: "Dior Stationery",
    category: "Stationery Study",
    year: "2026",
    description:
      "A study in how a house rooted in tradition can speak through cards, letters, and a quieter mark.",
    lead: "A study, not a commission. What happens when a house built on tradition is asked to speak through a card you can hold.",
    story: [
      "The exercise is a rebranding concept for Dior’s stationery: timeless elegance rebuilt as a fresher visual language, without throwing out the thing that made the house recognizable. Luxury, here, is restraint.",
      "The set is letters, cards, and envelopes — objects that have to feel considered in the hand, not only in a photograph. Tradition stays in the proportion and the name. The new language is in the spacing, the paper, and how little else is allowed on the sheet.",
      "One piece is an NFC business card: minimal, professional, with a chip meant to open a portfolio and a set of social links. The card stays quiet. The chip does the introduction.",
      "Dior is not a client of Malaj Design. This page is a brand study from the Branding and Advertising series.",
    ],
    image: "/photos/dior.jpg",
    imageAlt: "Dior stationery set arranged on white marble, with letterhead, cards, and envelopes",
    position: "center",
    layout: "landscape",
    href: "/work/dior-stationery",
    role: "Stationery, identity study",
    context: "Brand study — not a client project",
    facts: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Designer" },
      { label: "Format", value: "Letterhead, cards, folder, NFC card" },
      { label: "Context", value: "Study. Dior is not a client." },
    ],
    frames: [
      {
        src: "/photos/dior.jpg",
        alt: "Dior stationery set arranged on white marble, with letterhead, cards, and envelopes",
        width: 2000,
        height: 1500,
        caption: "The set: letters, cards, and envelopes on stone.",
      },
      {
        src: "/photos/dior-folder.jpg",
        alt: "Dior folder from the stationery study",
        width: 1800,
        height: 1350,
        caption: "The card, opened. The name does the work. The rest stays quiet.",
      },
      {
        src: "/photos/dior-banner.jpg",
        alt: "Wide presentation of the Dior stationery study",
        width: 2228,
        height: 1485,
        caption: "The mark, at the scale of a street banner.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

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
