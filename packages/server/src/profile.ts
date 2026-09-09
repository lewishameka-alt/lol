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
    "Sunglasses locked on his face in every single photo — never bare eyes, never sunglasses on the head or in hand",
    "If mates / other people appear: invent completely different people — never copy likeness from mates in reference photos",
    "Ready to post — good composition, no text overlays unless specifically requested",
  ],
  consistencyLocks: [
    "Same young man in every shot: Lewis Hameka, 19, ~188 cm / 6'2\", ~73 kg, athletic skinny build",
    "Match references/lewis photos for Lewis only — short dark textured crop, defined jaw, light stubble, lean tall frame",
    "Tattoos when shirtless/visible: HAMEKA lettering across upper chest/base of throat, two swallow birds on left upper chest",
    "Sunglasses ON his face in 100% of photos — black thick rectangular / wrap frames with dark lenses (some refs are bare-eye for structure only; generations still require shades)",
    "Silver metal watch often on left wrist; casual Aussie fits (white/cream tees, linen, oversized)",
    "Other people in frame must be total strangers vs any mates in reference uploads — different faces, hair, builds, clothes",
    "Regional Victoria everyday bloke vibe — casual Aussie, not fashion-editorial or influencer polish",
  ],
  avoid: [
    "Any photo of Lewis without sunglasses on his face",
    "Sunglasses perched on hair, hanging from shirt, held in hand, or hanging off one ear",
    "Recreating or resembling mates / friends from reference photos",
    "AI look, plastic skin, beauty-filter smoothness",
    "Weird hands, extra fingers, melted jewellery, warped ears",
    "Overly perfect cinematic lighting or HDR glow",
    "Stock-photo posing, glossy magazine retouching",
    "Watermarks, logos, or text overlays (unless asked)",
    "For stakeout/surveillance: portrait-close framing, subject looking at lens, Hollywood teal-orange or neon night grade, fake film scratches, twin extras, giant steering-wheel silhouette every frame",
  ],
};

/** Shared prompt prefix baked into every shot. */
export function subjectLock(): string {
  return [
    `Photorealistic candid Instagram photo of ${lewis.name}, a real ${lewis.age}-year-old bloke from ${lewis.location}.`,
    `He is ${lewis.heightFtIn} (${lewis.heightCm} cm), ${lewis.weightKg} kg, ${lewis.build}.`,
    "Match Lewis from the references/lewis library exactly — short dark textured crop hair, defined jaw, light stubble, lean tall frame, black thick rectangular/wrap sunglasses, HAMEKA + swallow chest tattoos when visible.",
    "HARD LOCK: he is wearing sunglasses on his face in this photo. Eyes covered. Never bare eyes. Never sunglasses on his head, shirt, or in his hand. (Some identity refs are bare-eye for structure only — generations always keep shades on.)",
    "If any other people appear: they must be completely different people from anyone in the reference photos — do not recreate or resemble his mates.",
    "Backgrounds/vibes may follow references/settings for place, lighting, and phone-photo texture only — never copy people from settings refs.",
    "Looks completely real, as if taken on an iPhone by a mate or as a casual selfie. Slight natural grain, natural colour science, imperfect real-world lighting.",
    "No AI plastic skin, no beauty filter, no overly perfect lighting, no text overlays.",
  ].join(" ");
}

export function negativeLook(): string {
  return [
    "Avoid: Lewis without sunglasses, bare eyes, sunglasses on head or in hand,",
    "recognisable mates from reference photos, CGI, illustration, plastic skin, poreless face, uncanny valley,",
    "deformed hands, extra fingers, warped anatomy, studio softbox beauty lighting,",
    "HDR glow, heavy retouching, watermark, logo, text overlay, influencer polish.",
  ].join(" ");
}
