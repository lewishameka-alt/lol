export type ShotCategory =
  | "selfie"
  | "mirror"
  | "gym"
  | "car"
  | "dog"
  | "casual"
  | "work"
  | "night-out"
  | "stakeout";

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

export interface LewisReferencePhoto {
  id: string;
  file: string;
  kind: "solo" | "group" | "crowd";
  note: string;
  url: string;
}

export interface SettingReferencePhoto {
  id: string;
  file: string;
  vibe: string;
  note: string;
  url: string;
}

export interface ReferencesPayload {
  lewis: {
    library: "lewis";
    subject: string;
    count: number;
    photos: LewisReferencePhoto[];
  };
  settings: {
    library: "settings";
    purpose: string;
    count: number;
    photos: SettingReferencePhoto[];
  };
}
