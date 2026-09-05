# Lewis

Photorealistic Instagram shot studio for **Lewis Hameka**.

Every prompt should produce images that look like a normal phone photo of a
19-year-old bloke in regional Victoria — not AI. Realism always wins.

- **`@lol/server`** — Express + TypeScript API (profile, categories, shot prompts, reference libraries)
- **`@lol/web`** — Vite + React client for browsing shots, refs, and copying prompts

## Requirements

- Node.js `>= 20` (developed against Node 22)
- npm `>= 10`

## Getting started

```bash
npm ci        # install all workspace dependencies
npm run dev   # start API (:3001) and web client (:5173) together
```

Then open http://localhost:5173. Vite proxies `/api/*` and `/references/*` to the API on
port `3001`.

## Reference libraries

| Folder | Purpose |
| --- | --- |
| `references/lewis/` | Identity lock — face, hair, body, tattoos, sunglasses style (39 photos) |
| `references/settings/` | Backgrounds & vibes only — place, lighting, flash look (10 photos) |

Rules:

1. Sunglasses on Lewis’s face in every generated photo.
2. Match Lewis only from `references/lewis`.
3. Never recreate mates / other people from any refs — invent different strangers.
4. Settings refs are environments only — never copy people from them.

## How generation works

1. Pick a category (selfie, mirror, gym, car, dog, casual, work, nights out).
2. Copy the ready-made prompt — it locks height, build, sunglasses, and phone-photo realism.
3. Use Lewis identity refs for likeness; use settings refs for place/lighting vibe.
4. Keep lighting natural; no text overlays unless asked.

## Project layout

```
packages/
  server/   Express API (@lol/server)
  web/      Vite + React client (@lol/web)
references/
  lewis/      Identity photos + manifest
  settings/   Background / vibe photos + manifest
```

## Common commands

| Command | Description |
| --- | --- |
| `npm run dev` | Run API and web client together (hot reload) |
| `npm run build` | Type-check and build both packages |
| `npm test` | Run all workspace tests (Vitest) |
| `npm run lint` | Lint all packages (ESLint) |
| `npm run typecheck` | Type-check all packages |
| `npm start` | Run the built API (`@lol/server`) |

## API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | Liveness probe |
| GET | `/api/profile` | Lewis subject + style rules |
| GET | `/api/references` | Lewis + settings libraries |
| GET | `/api/references/lewis` | Identity refs only |
| GET | `/api/references/settings` | Background / vibe refs only |
| GET | `/api/categories` | Shot categories |
| GET | `/api/shots` | List shots (`?category=` optional) |
| GET | `/api/shots/random` | Random shot (`?exclude=` / `?category=`) |
| GET | `/api/shots/:id` | Shot by id |
| GET | `/references/lewis/*` | Static identity images |
| GET | `/references/settings/*` | Static setting images |
