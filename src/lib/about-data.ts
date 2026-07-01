// Structural data for the About page, shared across locales. All display text
// (titles, descriptions, labels, quotes) lives in the i18n dictionaries under
// pages.about.*; these arrays only hold locale-independent structure — icons,
// ordering ids, and partner entities. The page zips each array with the
// matching dictionary array by index.

// `icon` is a key into the ICONS map in the About page (stroke SVGs, site style).
export type Pillar = { id: string; icon: string };
export const pillars: Pillar[] = [
  { id: "infra", icon: "server" },
  { id: "software", icon: "link" },
  { id: "automation", icon: "cpu" },
  { id: "compliance", icon: "shield" },
];

export type JourneyMilestone = { id: string };
export const journey: JourneyMilestone[] = [
  { id: "experience" },
  { id: "network" },
  { id: "standardization" },
  { id: "voice" },
  { id: "nexus" },
];

export type Differentiator = { id: string; icon: string };
export const differentiators: Differentiator[] = [
  { id: "swiss", icon: "pin" },
  { id: "medical-first", icon: "pulse" },
  { id: "open-source", icon: "code" },
  { id: "devops", icon: "gear" },
  { id: "ai", icon: "zap" },
  { id: "one-partner", icon: "layers" },
];

// Labels live in the dictionary (compliance.badges), same order as this array.
export type Badge = { id: string };
export const badges: Badge[] = [
  { id: "ndsg" },
  { id: "equam" },
  { id: "fmh" },
  { id: "hin" },
  { id: "residency" },
  { id: "iso" },
];

export type PartnerEntity = { name: string; logo?: string };
export type PartnerGroup = { id: string; entities: PartnerEntity[] };
// Group labels live in the dictionary (partners.groups[id]).
export const partners: PartnerGroup[] = [
  { id: "hosting", entities: [{ name: "Infomaniak" }, { name: "IONOS" }] },
  { id: "software", entities: [{ name: "tomedo", logo: "/logos/partners/tomedo.webp" }, { name: "HIN" }] },
  { id: "network", entities: [{ name: "Jerumed clinic group" }] },
];

// Quote + attribution live in the dictionary (testimonials.items), same order.
export type Testimonial = { id: string };
export const testimonials: Testimonial[] = [
  { id: "clinic" },
  { id: "jeruhealth" },
];
