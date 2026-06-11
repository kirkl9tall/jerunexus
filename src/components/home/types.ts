import type { getDictionary } from "@/lib/translations";

export type Dictionary = ReturnType<typeof getDictionary>;

export interface SectionProps {
  t: Dictionary;
  lang: string;
}
