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

/** Canonical subject + look for every generation. Face locked from reference photos when available. */
export const lewis: LewisProfile = {
  name: "Lewis Hameka",
  age: 19,
  heightCm: 188,
  heightFtIn: "6'2\"",
  weightKg: 73,
  build: "athletic skinny — long limbs, lean muscle, not bulky",
  location: "regional Victoria, Australia",
  priority: "realism over everything — must look like a normal phone photo",
  styleRules: [
    "Smartphone photography look (iPhone-style): slight grain, natural colours, mild lens distortion, real autofocus feel",
    "Real Instagram aesthetic: selfies, mirror pics, gym, car, with the dog, casual everyday, work, nights out",
    "Natural lighting only: window light, outdoor, gym fluorescents, golden hour — never studio softboxes or ring-light perfection",
    "Varied but consistent face, body, hair and style across all images",
    "Ready to post — good composition, no text overlays unless specifically requested",
  ],
  consistencyLocks: [
    "Same young man in every shot: Lewis Hameka, 19, ~188 cm / 6'2\", ~73 kg, athletic skinny build",
    "Match uploaded reference photos for face, hair, skin, and body as closely as possible",
    "Regional Victoria everyday bloke vibe — casual Aussie, not fashion-editorial or influencer polish",
  ],
  avoid: [
    "AI look, plastic skin, beauty-filter smoothness",
    "Weird hands, extra fingers, melted jewellery, warped ears",
    "Overly perfect cinematic lighting or HDR glow",
    "Stock-photo posing, glossy magazine retouching",
    "Watermarks, logos, or text overlays (unless asked)",
  ],
};

/** Shared prompt prefix baked into every shot. */
export function subjectLock(): string {
  return [
    `Photorealistic candid Instagram photo of ${lewis.name}, a real ${lewis.age}-year-old bloke from ${lewis.location}.`,
    `He is ${lewis.heightFtIn} (${lewis.heightCm} cm), ${lewis.weightKg} kg, ${lewis.build}.`,
    "Match his real face and body from reference photos exactly — same facial structure, hair, skin texture, and proportions.",
    "Looks completely real, as if taken on an iPhone by a mate or as a casual selfie. Slight natural grain, natural colour science, imperfect real-world lighting.",
    "No AI plastic skin, no beauty filter, no overly perfect lighting, no text overlays.",
  ].join(" ");
}

export function negativeLook(): string {
  return [
    "Avoid: CGI, illustration, plastic skin, poreless face, uncanny valley,",
    "deformed hands, extra fingers, warped anatomy, studio softbox beauty lighting,",
    "HDR glow, heavy retouching, watermark, logo, text overlay, influencer polish.",
  ].join(" ");
}
