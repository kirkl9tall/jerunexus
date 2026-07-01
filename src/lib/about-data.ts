// Structural data for the About page, shared across locales. All display text
// (titles, descriptions, labels, quotes) lives in the i18n dictionaries under
// pages.about.*; these arrays only hold locale-independent structure — icons,
// ordering ids, and partner entities. The page zips each array with the
// matching dictionary array by index.

export type Pillar = { id: string; icon: string };
export const pillars: Pillar[] = [
  { id: "infra", icon: "🖥️" },
  { id: "software", icon: "🔗" },
  { id: "automation", icon: "🤖" },
  { id: "compliance", icon: "🛡️" },
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
  { id: "swiss", icon: "🇨🇭" },
  { id: "medical-first", icon: "🩺" },
  { id: "open-source", icon: "🧩" },
  { id: "devops", icon: "⚙️" },
  { id: "ai", icon: "✨" },
  { id: "one-partner", icon: "🤝" },
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
