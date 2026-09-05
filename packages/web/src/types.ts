export type ShotCategory =
  | "selfie"
  | "mirror"
  | "gym"
  | "car"
  | "dog"
  | "casual"
  | "work"
  | "night-out";

export interface Shot {
  id: number;
  category: ShotCategory;
  title: string;
  vibe: string;
  setting: string;
  framing: string;
  lighting: string;
  prompt: string;
}

export interface CategoryMeta {
  id: ShotCategory;
  label: string;
  blurb: string;
}

export interface LewisProfile {
  name: string;
  age: number;
  heightCm: number;
  heightFtIn: string;
  weightKg: number;
  build: string;
  location: string;
  priority: string;
  styleRules: string[];
  consistencyLocks: string[];
  avoid: string[];
}
