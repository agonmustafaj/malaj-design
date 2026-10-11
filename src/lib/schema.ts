import type { Project } from "@/data/projects";
import { portrait } from "@/data/projects";
import { services, site, socialGroups } from "@/data/site";

const personId = `${site.url}/#andi-malaj`;
const studioId = `${site.url}/#malaj-design`;

const address = {
  "@type": "PostalAddress",
  addressLocality: "Prishtina",
  addressCountry: "XK",
};

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.studio,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": studioId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        jobTitle: site.role,
        image: `${site.url}${portrait.src}`,
        url: site.url,
        email: site.email,
        telephone: "+38349588161",
        description: site.description,
        address,
        sameAs: socialGroups.flatMap((group) => group.links.map((link) => link.href)),
        knowsAbout: [
          "Brand identity",
          "Poster design",
          "Mascot design",
          "Typography",
          "Stationery",
          "Cover design",
          "Visual identity",
        ],
        worksFor: { "@id": studioId },
      },
      {
        "@type": "ProfessionalService",
        "@id": studioId,
        name: site.studio,
        url: site.url,
        image: `${site.url}${portrait.src}`,
        description: site.description,
        founder: { "@id": personId },
        email: site.email,
        telephone: "+38349588161",
        areaServed: "Worldwide",
        address,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Design services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
            },
          })),
        },
      },
    ],
  };
}

export function workList(projects: readonly Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected work by Andi Malaj",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: `${site.url}${project.href}`,
      image: `${site.url}${project.image}`,
    })),
  };
}

export function projectGraph(project: Project) {
  const url = `${site.url}/work/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VisualArtwork",
        name: project.title,
        description: project.description,
        url,
        image: project.frames.map((frame) => `${site.url}${frame.src}`),
        creator: { "@id": personId },
        dateCreated: project.year,
        artform: project.category,
        artMedium: "Digital graphic design",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}
