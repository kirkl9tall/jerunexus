// Team structure shared across locales. Translatable strings (role, bio) live
// in the i18n dictionaries under pages.about.team.members[i]; everything here is
// locale-independent (name is a proper noun, expertise tags are technical terms).

export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  photo?: string;
  expertise: string[];
  linkedin?: string;
  github?: string;
};

export const team: TeamMember[] = [
  {
    id: "abuawad",
    name: "A. Abuawad",
    initials: "AA",
    photo: "/team/doc2.jpeg",
    expertise: ["Medical IT", "Network Architecture", "System Administration", "tomedo"],
  },
  {
    id: "security",
    name: "IT Security",
    initials: "CS",
    expertise: ["Penetration Testing", "FMH Audits", "Incident Response", "SIEM"],
  },
  {
    id: "abdelilah",
    name: "Abdelilah Ismaili Alaoui",
    initials: "AI",
    photo: "/team/1757854645138.jpeg",
    expertise: ["DevOps", "Cloud Infrastructure", "Automation", "Web Development"],
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/kirkl9tall",
  },
  {
    id: "support",
    name: "Support",
    initials: "TS",
    expertise: ["Helpdesk", "Remote Support", "On-site Service"],
  },
];
