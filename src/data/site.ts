export const site = {
  name: "Andi Malaj",
  studio: "Malaj Design",
  mark: "MALAJ DESIGN",
  title: "Malaj Design | Andi Malaj, Graphic Designer",
  description:
    "Andi Malaj is a graphic designer in Prishtina, Kosovo. Branding, visual identity, posters, streetwear, and digital design.",
  url: "https://malaj-design.netlify.app",
  email: "malajandi05@gmail.com",
  phone: "+383 49 588 161",
  phoneHref: "tel:+38349588161",
  role: "Graphic Designer",
  location: "Based in Prishtina",
  availability: "Available Worldwide",
  footerNote: "Available for selected projects, 2026",
} as const;

export const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Project inquiry")}`;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const clients = [
  { label: "RAGE", href: "/work/andi-malaj-rage" },
  { label: "KAMENICA", href: "/work/kamenica" },
  { label: "FLOWPATHS", href: "/work/flowpaths" },
  { label: "CTRL/FADE", href: "/work/ctrl-fade" },
  { label: "STONECASTLE", href: "/work/stonecastle" },
  { label: "SPAIN", href: "/work/spain-national-team" },
  { label: "LUPIN", href: "/work/lupin" },
  { label: "BALANCE", href: "/work/balance" },
  { label: "NATA FRIKES", href: "/work/nata-frikes" },
  { label: "LYNX", href: "/work/lynx" },
  { label: "INSTANT CRUSH", href: "/work/instant-crush" },
  { label: "DIOR", href: "/work/dior-stationery" },
] as const;

export const workGroups = [
  { id: "streetwear", value: 1, suffix: "", label: "Streetwear identity" },
  { id: "posters", value: 3, suffix: "+", label: "Posters" },
  { id: "mascot", value: 1, suffix: "", label: "Mascot" },
  { id: "series", value: 7, suffix: "+", label: "Pieces in this series" },
] as const;

export const services = [
  {
    number: "01",
    title: "Brand Identity",
    description:
      "Marks, color, and a system that can move from a poster to a hoodie without losing its voice.",
  },
  {
    number: "02",
    title: "Poster Design",
    description:
      "Film, type, events, and cultural posters composed to be read from across a street.",
  },
  {
    number: "03",
    title: "Mascot & Character",
    description:
      "A figure with a stance, drawn in the round so it can live on cloth, print, and a pin.",
  },
  {
    number: "04",
    title: "Typography",
    description:
      "Letterforms pushed until they carry the idea: tension, balance, and a point of view.",
  },
  {
    number: "05",
    title: "Stationery",
    description:
      "Cards, letters, and small objects that make a brand feel considered in the hand.",
  },
  {
    number: "06",
    title: "Cover Design",
    description:
      "Artwork for sound: geometry and motion standing in for a track.",
  },
] as const;

export const socialGroups = [
  {
    label: "Brand",
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@malajdesign" },
      { label: "Instagram", href: "https://www.instagram.com/malajdesign/" },
    ],
  },
  {
    label: "Personal",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/_andimalaj_/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/andi-malaj/" },
    ],
  },
] as const;

export const featured = {
  kicker: "Featured Case",
  titleLines: ["Andi Malaj", "Rage"],
  description:
    "A streetwear brand born from the Illyrian helmet. The mark folds that contour into A and M: protection, courage, and a language meant for the street.",
  disciplines: ["Identity", "Logo", "Poster", "Stationery"],
} as const;
