export const site = {
  name: "Andi Malaj",
  studio: "Malaj Design",
  mark: "MALAJ DESIGN",
  title: "Malaj Design — Andi Malaj, Independent Designer & Creative Director",
  description:
    "Malaj Design is the studio of Andi Malaj, an independent designer specializing in brand identity, web design, art direction and digital experiences.",
  url: "https://malaj.design",
  email: "malajandi05@gmail.com",
  phone: "+383 49 588 161",
  phoneHref: "tel:+38349588161",
  role: "Independent Designer",
  location: "Based in Kosovo",
  availability: "Available Worldwide",
  footerNote: "Available for selected projects — 2026",
} as const;

export const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Project inquiry")}`;

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
] as const;

export const clients = [
  "NORTH®",
  "ARC STUDIO",
  "FORM",
  "ATELIER 09",
  "MONO",
  "KODA",
] as const;

export const stats = [
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 60, suffix: "+", label: "Projects" },
  { value: 14, suffix: "", label: "Countries" },
  { value: 23, suffix: "", label: "Awards & Features" },
] as const;

export const services = [
  {
    number: "01",
    title: "Brand Identity",
    description:
      "Marks, type systems, and visual languages built to last beyond a single campaign.",
  },
  {
    number: "02",
    title: "Art Direction",
    description:
      "Image, composition, and tone that give a brand a distinct point of view.",
  },
  {
    number: "03",
    title: "Web Design",
    description:
      "Digital spaces with editorial rhythm, clear structure, and memorable pacing.",
  },
  {
    number: "04",
    title: "UI / UX Design",
    description:
      "Interfaces that stay considered from the first screen to the last detail.",
  },
  {
    number: "05",
    title: "Creative Direction",
    description:
      "Guiding teams, shoots, and stories so every output belongs together.",
  },
  {
    number: "06",
    title: "Campaign Design",
    description:
      "A single idea carried across print, digital, and physical space.",
  },
] as const;

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "Behance", href: "https://www.behance.net" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/andi-malaj/" },
] as const;

export const footerSocials = socials.filter((item) => item.label !== "Dribbble");

export const featured = {
  kicker: "Featured Case",
  title: "NØR Studio",
  description:
    "A complete visual identity and digital system built around simplicity, typography and architectural precision.",
  disciplines: ["Strategy", "Identity", "Art Direction", "Digital"],
} as const;
