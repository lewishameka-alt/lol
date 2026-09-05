import { negativeLook, subjectLock } from "./profile.js";

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
  /** Full ready-to-use generation prompt */
  prompt: string;
}

const categoriesMeta: Record<
  ShotCategory,
  { label: string; blurb: string }
> = {
  selfie: {
    label: "Selfies",
    blurb: "Front-camera, arm's length, everyday face checks",
  },
  mirror: {
    label: "Mirror",
    blurb: "Bathroom / bedroom mirror fits — phone in hand",
  },
  gym: {
    label: "Gym",
    blurb: "Regional gym lighting, real sweat, no fitness-model gloss",
  },
  car: {
    label: "Car",
    blurb: "Dash, passenger seat, carpark — classic Aussie snaps",
  },
  dog: {
    label: "With the dog",
    blurb: "Backyard, walk, couch — dog as the co-star",
  },
  casual: {
    label: "Casual everyday",
    blurb: "Street, kitchen, mates' place, nothing staged",
  },
  work: {
    label: "Work",
    blurb: "On the tools / break / hi-vis adjacent regional work energy",
  },
  "night-out": {
    label: "Nights out",
    blurb: "Pub, street at night, mates — phone flash or warm bar light",
  },
};

export function listCategories(): Array<{
  id: ShotCategory;
  label: string;
  blurb: string;
}> {
  return (Object.keys(categoriesMeta) as ShotCategory[]).map((id) => ({
    id,
    ...categoriesMeta[id],
  }));
}

function buildPrompt(parts: {
  scene: string;
  framing: string;
  lighting: string;
  extras?: string;
}): string {
  return [
    subjectLock(),
    parts.scene,
    parts.framing,
    parts.lighting,
    parts.extras ?? "",
    "Authentic Instagram feed photo, ready to post, vertical or square phone crop feel.",
    negativeLook(),
  ]
    .filter(Boolean)
    .join(" ");
}

export const shots: Shot[] = [
  {
    id: 1,
    category: "selfie",
    title: "Bedroom window selfie",
    vibe: "Just woke up-ish, soft morning",
    setting: "Bedroom near a window, regional Vic house",
    framing: "Front-camera selfie, slight high angle, face and upper chest",
    lighting: "Cool morning window light on one side of the face",
    prompt: buildPrompt({
      scene:
        "Casual morning selfie in a messy-but-real bedroom. Wearing a plain faded tee. Natural expression, half-smile, not posing hard.",
      framing:
        "Front camera, arm extended, slight wide-angle selfie distortion, eyes toward the lens.",
      lighting: "Soft side window light, shadows under the chin, nothing flattering on purpose.",
    }),
  },
  {
    id: 2,
    category: "selfie",
    title: "Carpark sun selfie",
    vibe: "Squinting in daylight",
    setting: "Outdoor carpark, pale sky",
    framing: "Close selfie, forehead to mid-chest",
    lighting: "Harsh midday Aussie sun",
    prompt: buildPrompt({
      scene:
        "Standing outside after getting out of the car. Sunglasses pushed up into his hair or held in hand. Mild squint from real sun.",
      framing: "Tight front-camera selfie, phone held a bit low.",
      lighting: "Bright harsh daylight, blown highlights on skin edges, realistic contrast.",
    }),
  },
  {
    id: 3,
    category: "selfie",
    title: "Couch scroll selfie",
    vibe: "Bored at home",
    setting: "Living room couch",
    framing: "Low casual selfie from the couch",
    lighting: "Warm lamp + TV glow mix",
    prompt: buildPrompt({
      scene:
        "Laid back on a couch in trackies and a hoodie, taking a quick selfie. Slightly messy hair, relaxed face.",
      framing: "Front camera, chin slightly down, living room depth behind him.",
      lighting: "Mixed indoor evening light — lamp warmth and cool screen spill.",
    }),
  },
  {
    id: 4,
    category: "mirror",
    title: "Bathroom mirror fit check",
    vibe: "Going out soon",
    setting: "Small bathroom with mirror fog-ish edges",
    framing: "Full-ish body in mirror, phone covering part of face",
    lighting: "Overhead bathroom LEDs",
    prompt: buildPrompt({
      scene:
        "Mirror selfie in a normal Australian bathroom. Nice casual shirt or clean hoodie, jeans. Phone visible in the reflection.",
      framing:
        "Vertical mirror shot from waist or mid-thigh up, phone held at chest height, face partly behind phone is fine.",
      lighting: "Flat bathroom overhead light with mild yellow cast — not beauty lighting.",
      extras: "Visible phone, slight mirror smudges, real tiles — not a luxury bathroom.",
    }),
  },
  {
    id: 5,
    category: "mirror",
    title: "Bedroom mirror outfit",
    vibe: "Trying something on",
    setting: "Bedroom full-length mirror",
    framing: "Almost full body",
    lighting: "Daylight through curtains",
    prompt: buildPrompt({
      scene:
        "Standing in front of a cheap full-length mirror propped against the wall. Casual outfit — jeans and a thrifted jacket or flannel.",
      framing: "Phone in one hand, body slightly angled, tall 6'2\" frame readable in the mirror.",
      lighting: "Diffused daylight through thin curtains, soft shadows.",
    }),
  },
  {
    id: 6,
    category: "gym",
    title: "Gym mirror pump",
    vibe: "Post-set, sweaty",
    setting: "Regional Vic gym — racks, rubber floors",
    framing: "Mirror selfie mid-torso",
    lighting: "Harsh gym fluorescents",
    prompt: buildPrompt({
      scene:
        "Sweaty after lifting. Gym singlet or plain tee, earbuds in. Athletic skinny build visible — lean, not bodybuilder.",
      framing: "Gym mirror selfie, phone in hand, racks and machines softly in background.",
      lighting: "Ugly real gym fluorescent lighting, slight skin shine from sweat — keep it honest.",
      extras: "No fitness-influencer posing grid. Just a normal bloke mid-session.",
    }),
  },
  {
    id: 7,
    category: "gym",
    title: "Walking out of the gym",
    vibe: "Done for the day",
    setting: "Gym carpark at dusk",
    framing: "Mate-style photo or selfie, three-quarter",
    lighting: "Golden hour fading to blue hour",
    prompt: buildPrompt({
      scene:
        "Leaving the gym with a duffel or backpack. Gym clothes, slightly flushed. Tall lean frame against the carpark.",
      framing: "Casual three-quarter shot as if a mate took it, or a selfie with gym doors behind.",
      lighting: "Late afternoon / early evening outdoor light, natural colour.",
    }),
  },
  {
    id: 8,
    category: "car",
    title: "Driver seat snap",
    vibe: "Waiting in the car",
    setting: "Inside a regular Aussie car",
    framing: "Selfie from driver's seat",
    lighting: "Daylight through windscreen",
    prompt: buildPrompt({
      scene:
        "Sitting in the driver's seat of an ordinary car (sedan or ute). One hand on the wheel or phone. Cap optional. Seatbelt detail ok.",
      framing: "Classic car selfie, steering wheel and dash partially visible, slight wide-angle.",
      lighting: "Bright windscreen light on the face, darker cabin corners.",
    }),
  },
  {
    id: 9,
    category: "car",
    title: "Passenger window light",
    vibe: "On the highway",
    setting: "Passenger seat, rural Vic roadside blur",
    framing: "Side-on phone photo by a mate or selfie angled",
    lighting: "Side window daylight",
    prompt: buildPrompt({
      scene:
        "In the passenger seat on a regional drive. Hoodie, earbuds, looking out or toward camera with a small smirk.",
      framing: "Phone photo from the driver's side or a casual angled selfie — road blur through the window.",
      lighting: "Strong side window light, moving car feel, slight motion softness acceptable.",
    }),
  },
  {
    id: 10,
    category: "dog",
    title: "Backyard with the dog",
    vibe: "Soft spot for the dog",
    setting: "Suburban / regional backyard",
    framing: "Crouched or sitting with dog",
    lighting: "Late afternoon golden light",
    prompt: buildPrompt({
      scene:
        "In a real backyard with his dog — grass, fence, ordinary Aussie house behind. Smiling naturally at the dog or camera. Casual shorts and tee.",
      framing: "Phone photo at dog height or slightly above, both faces readable, tall guy folding down to the dog.",
      lighting: "Golden hour backyard light, long soft shadows.",
      extras: "Real dog fur texture, no breed fantasy gloss — like a normal family dog.",
    }),
  },
  {
    id: 11,
    category: "dog",
    title: "Walk selfie with dog",
    vibe: "On the lead",
    setting: "Footpath / park trail in regional Vic",
    framing: "High-angle selfie with dog below",
    lighting: "Overcast soft daylight",
    prompt: buildPrompt({
      scene:
        "Walking the dog on a lead. Hoodie, runners. Dog near his legs in frame. Trees or quiet street behind.",
      framing: "Classic high-angle front-camera selfie including the dog's head.",
      lighting: "Soft overcast daylight, muted natural colours.",
    }),
  },
  {
    id: 12,
    category: "casual",
    title: "Kitchen counter lean",
    vibe: "Home nothingness",
    setting: "Ordinary kitchen",
    framing: "Waist-up, phone on counter timer or mate shot",
    lighting: "Window over the sink",
    prompt: buildPrompt({
      scene:
        "Leaning on a kitchen bench with a coffee or soft drink. Sleepy casual clothes. Real messy kitchen details — not a styled set.",
      framing: "Casual waist-up composition, slightly off-centre like a quick snap.",
      lighting: "Natural window light from the side, indoor shadows.",
    }),
  },
  {
    id: 13,
    category: "casual",
    title: "Street / town walk",
    vibe: "Out and about",
    setting: "Regional Victorian main street",
    framing: "Walking toward camera or candid side",
    lighting: "Bright outdoor",
    prompt: buildPrompt({
      scene:
        "Walking down a regional town street — shops, brick, parked cars. Jeans, sneakers, simple jacket. Looking mid-conversation or at phone.",
      framing: "Candid-style phone photo, environmental portrait, tall proportions clear.",
      lighting: "Clear daylight, realistic Aussie colour — not teal-orange grade.",
    }),
  },
  {
    id: 14,
    category: "work",
    title: "Smoko break",
    vibe: "Work break selfie",
    setting: "Worksiteshed / ute tray / site fence",
    framing: "Selfie or mate photo outdoors",
    lighting: "Midday sun or shade under a verandah",
    prompt: buildPrompt({
      scene:
        "On a smoko break at a regional job — dusty boots, work pants, plain tee or light hi-vis layer. Holding a drink. Tired honest face.",
      framing: "Quick phone snap, environment reads as real Australian work, not construction stock photo.",
      lighting: "Harsh sun or verandah shade — pick one and keep it real.",
    }),
  },
  {
    id: 15,
    category: "work",
    title: "End of shift carpark",
    vibe: "Knocking off",
    setting: "Work carpark",
    framing: "Leaning on ute or car",
    lighting: "Late day sun",
    prompt: buildPrompt({
      scene:
        "End of shift, leaning against a ute or work car. Dusty clothes, tall lean frame. Soft tired smile.",
      framing: "Three-quarter environmental photo as if a coworker took it on a phone.",
      lighting: "Warm late-day sun, long shadows on asphalt.",
    }),
  },
  {
    id: 16,
    category: "night-out",
    title: "Pub beer light",
    vibe: "With the boys",
    setting: "Regional pub / sports bar",
    framing: "Close selfie or booth shot",
    lighting: "Warm indoor bar lights",
    prompt: buildPrompt({
      scene:
        "At a regional pub. Clean casual shirt or polo. Holding a schooner or soft drink. Soft smile, real social energy — not club VIP.",
      framing: "Close phone photo across a table or a booth selfie, background lightly busy and out of focus.",
      lighting: "Warm tungsten / pub LEDs, mild noise/grain from low light phone photo.",
    }),
  },
  {
    id: 17,
    category: "night-out",
    title: "Street after dark",
    vibe: "Heading home",
    setting: "Town street at night",
    framing: "Flash selfie or under streetlight",
    lighting: "Phone flash or streetlight",
    prompt: buildPrompt({
      scene:
        "Outside at night after being out. Jacket on, hair a bit messy. Honest end-of-night face.",
      framing: "Front-camera flash selfie or streetlight three-quarter — phone night photo artefacts welcome.",
      lighting: "Harsh phone flash OR dim streetlight with grain — pick one realistic phone look.",
      extras: "Slight noise, imperfect white balance — classic Instagram night snap.",
    }),
  },
  {
    id: 18,
    category: "casual",
    title: "Golden hour fence lean",
    vibe: "Quiet weekend",
    setting: "Farm fence / suburban fence line",
    framing: "Portrait leaning on fence",
    lighting: "Golden hour",
    prompt: buildPrompt({
      scene:
        "Leaning on a fence at golden hour in regional Victoria — paddock or quiet street behind. Simple tee, relaxed posture.",
      framing: "Mate-taken phone portrait, vertical, head-to-waist or three-quarter.",
      lighting: "True golden hour warmth, sun low behind or side — natural lens flare ok if subtle.",
    }),
  },
];

export function getShotById(id: number): Shot | undefined {
  return shots.find((shot) => shot.id === id);
}

export function getShotsByCategory(category: ShotCategory): Shot[] {
  return shots.filter((shot) => shot.category === category);
}

export function getRandomShot(
  rng: () => number = Math.random,
  options: { excludeId?: number; category?: ShotCategory } = {},
): Shot {
  let pool = shots;
  if (options.category) {
    pool = getShotsByCategory(options.category);
  }
  if (options.excludeId !== undefined) {
    const filtered = pool.filter((shot) => shot.id !== options.excludeId);
    if (filtered.length > 0) pool = filtered;
  }
  if (pool.length === 0) pool = shots;
  const index = Math.floor(rng() * pool.length);
  return pool[index];
}

export function isShotCategory(value: string): value is ShotCategory {
  return Object.prototype.hasOwnProperty.call(categoriesMeta, value);
}
