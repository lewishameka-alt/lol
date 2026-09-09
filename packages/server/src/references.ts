import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export const lewisRefsDir = path.resolve(here, "../../../references/lewis");
export const settingsRefsDir = path.resolve(here, "../../../references/settings");

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

export interface LewisReferenceLibrary {
  library: "lewis";
  subject: string;
  version: number;
  appearance: Record<string, string>;
  rules: Record<string, string>;
  photos: LewisReferencePhoto[];
  count: number;
}

export interface SettingsReferenceLibrary {
  library: "settings";
  version: number;
  purpose: string;
  rules: Record<string, string>;
  photos: SettingReferencePhoto[];
  count: number;
}

export function getLewisReferenceLibrary(): LewisReferenceLibrary {
  const raw = readFileSync(path.join(lewisRefsDir, "manifest.json"), "utf8");
  const manifest = JSON.parse(raw) as {
    subject: string;
    version: number;
    appearance: Record<string, string>;
    rules: Record<string, string>;
    photos: Array<{
      id: string;
      file: string;
      kind: "solo" | "group" | "crowd";
      note: string;
    }>;
  };
  const photos = manifest.photos.map((photo) => ({
    ...photo,
    url: `/references/lewis/${photo.file}`,
  }));
  return {
    library: "lewis",
    subject: manifest.subject,
    version: manifest.version,
    appearance: manifest.appearance,
    rules: manifest.rules,
    photos,
    count: photos.length,
  };
}

export function getSettingsReferenceLibrary(): SettingsReferenceLibrary {
  const raw = readFileSync(path.join(settingsRefsDir, "manifest.json"), "utf8");
  const manifest = JSON.parse(raw) as {
    version: number;
    purpose: string;
    rules: Record<string, string>;
    photos: Array<{
      id: string;
      file: string;
      vibe: string;
      note: string;
    }>;
  };
  const photos = manifest.photos.map((photo) => ({
    ...photo,
    url: `/references/settings/${photo.file}`,
  }));
  return {
    library: "settings",
    version: manifest.version,
    purpose: manifest.purpose,
    rules: manifest.rules,
    photos,
    count: photos.length,
  };
}

/** @deprecated prefer getLewisReferenceLibrary */
export function getReferenceLibrary(): LewisReferenceLibrary {
  return getLewisReferenceLibrary();
}
